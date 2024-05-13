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
