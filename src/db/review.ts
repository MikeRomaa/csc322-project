import type { ResultSetHeader } from "mysql2";

import { pool } from "@/db";

/**
 * Inserts a restaurant review into the database.
 */
export async function insertRestaurantReview(
	user_id: number,
	restaurant_id: number,
	rating: number,
	contents: string,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO restaurant_rating (user_id, restaurant_id, rating, contents)
        VALUES (:user_id, :restaurant_id, :rating, :contents)`,
		{ user_id, restaurant_id, rating, contents },
	);

	return res.insertId;
}

/**
 * Inserts a dish review into the database.
 */
export async function insertDishReview(
	user_id: number,
	dish_id: number,
	rating: number,
	contents: string,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO dish_rating (user_id, dish_id, rating, contents)
         VALUES (:user_id, :dish_id, :rating, :contents)`,
		{ user_id, dish_id, rating, contents },
	);

	return res.insertId;
}
