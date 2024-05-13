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
}

/**
 * Retrieves all restaurants from database.
 */
export async function getRestaurants(): Promise<Restaurant[]> {
	const [res] = await pool.execute<Restaurant[]>(
		`SELECT id, name, address, city, state, zip, banner
        FROM restaurant`,
	);

	return res;
}

export interface MenuItem extends RowDataPacket {
	id: number;
	name: string;
	price: number;
	description: string;
	thumbnail?: string;
}

export type RestaurantWithMenu = Restaurant & {
	menu: Record<number, MenuItem>;
};

/**
 * Retrieves restaurant with menu from database by id.
 */
export async function getRestaurant(
	id: number,
): Promise<RestaurantWithMenu | null> {
	const [res] = await pool.execute<Restaurant[]>(
		`SELECT id, name, address, city, state, zip, banner
         FROM restaurant
         WHERE id = :id`,
		{ id },
	);

	if (res.length !== 1) {
		return null;
	}

	const [menu] = await pool.execute<MenuItem[]>(
		`SELECT id, name, price, description, thumbnail
        FROM dish
        WHERE restaurant_id = :id`,
		{ id },
	);

	return {
		...res[0],
		menu: Object.fromEntries(menu.map((item) => [item.id, item])),
	};
}
