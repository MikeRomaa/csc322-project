import type { RowDataPacket } from "mysql2";

import { pool } from "@/db";

export interface Restaurant extends RowDataPacket {
	id: number;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	banner?: string;
	vip: boolean;
	later: boolean;
	favorite: boolean;
}

/**
 * Retrieves all restaurants from database.
 * Optionally retrieves VIP information with user id.
 */
export async function getRestaurants(user_id?: number): Promise<Restaurant[]> {
	const [res] = await pool.execute<Restaurant[]>(
		`SELECT
            r.id AS id,
            r.name AS name,
            r.address AS address,
            r.city AS city,
            r.state AS state,
            r.zip AS zip,
            r.banner AS banner,
            COALESCE(s.later, false) AS later,
            COALESCE(s.favorite, false) AS favorite,
            CASE
                WHEN :user_id IS NULL THEN false
                WHEN (
                    SELECT COUNT(*)
                    FROM food_order
                    WHERE user_id = :user_id AND restaurant_id = r.id
                ) > 50 THEN true
                WHEN (
                    SELECT SUM(get_order_total(id))
                    FROM food_order
                    WHERE user_id = :user_id AND restaurant_id = r.id
                ) > 500 THEN true
                ELSE false
            END AS vip
        FROM restaurant AS r
        LEFT JOIN saved_restaurant AS s
            ON r.id = s.restaurant_id
        WHERE s.user_id = :user_id
            OR s.user_id IS NULL`,
		{ user_id: user_id ?? null },
	);

	return res;
}

export interface MenuItem extends RowDataPacket {
	id: number;
	name: string;
	price: number;
	description: string;
	thumbnail?: string;
	vip_exclusive: boolean;
}

export type RestaurantDetails = Restaurant & {
	menu: Record<number, MenuItem>;
	vip_orders: number | null;
	vip_spent: number | null;
};

/**
 * Retrieves restaurant with menu from database by id.
 * Optionally retrieves VIP information with user id.
 */
export async function getRestaurant(
	id: number,
	user_id?: number,
): Promise<RestaurantDetails | null> {
	const [res] = await pool.execute<Exclude<RestaurantDetails, "menu">[]>(
		`WITH vip_progress AS (
            SELECT
                COUNT(*) AS orders,
                SUM(get_order_total(id)) AS spent
            FROM food_order
            WHERE user_id = :user_id
                AND restaurant_id = :id
        )
        SELECT
            r.id AS id,
            r.name AS name,
            r.address AS address,
            r.city AS city,
            r.state AS state,
            r.zip AS zip,
            r.banner AS banner,
            COALESCE(s.later, false) AS later,
            COALESCE(s.favorite, false) AS favorite,
            CASE
                WHEN :user_id IS NULL THEN false
                WHEN vp.orders > 50 THEN true
                WHEN vp.spent > 500 THEN true
                ELSE false
            END AS vip,
            vp.orders AS vip_orders,
            vp.spent AS vip_spent
        FROM vip_progress AS vp
        JOIN restaurant AS r
        LEFT JOIN saved_restaurant AS s
            ON r.id = s.restaurant_id
        WHERE r.id = :id
            AND (
                s.user_id = :user_id
                OR s.user_id IS NULL
            )`,
		{ id, user_id: user_id ?? null },
	);

	if (res.length !== 1) {
		return null;
	}

	const [menu] = await pool.execute<MenuItem[]>(
		`SELECT id, name, price, description, thumbnail, vip_exclusive
        FROM dish
        WHERE restaurant_id = :id
            AND vip_exclusive <= :vip_status`,
		{ id, vip_status: res[0].vip ? 1 : 0 },
	);

	return {
		...res[0],
		menu: Object.fromEntries(menu.map((item) => [item.id, item])),
	};
}

/**
 * Insert saved restaurant on "Saved for Later" or "Favorites" list, or remove the restaurant from saved lists entirely.
 */
export async function insertSavedRestaurant(
	user_id: number,
	restaurant_id: number,
	later: boolean,
	favorite: boolean,
): Promise<void> {
	if (!later && !favorite) {
		await pool.execute(
			`DELETE FROM saved_restaurant
            WHERE user_id = :user_id AND restaurant_id = :restaurant_id`,
			{ user_id, restaurant_id },
		);
	} else {
		await pool.execute(
			`INSERT INTO saved_restaurant (user_id, restaurant_id, later, favorite)
            VALUES (:user_id, :restaurant_id, :later, :favorite)
            ON DUPLICATE KEY UPDATE
                later = :later,
                favorite = :favorite`,
			{ user_id, restaurant_id, later, favorite },
		);
	}
}
