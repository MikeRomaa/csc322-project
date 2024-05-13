import type { ResultSetHeader } from "mysql2";

import { pool } from "@/db";

/**
 * Insert a placed order into the database.
 */
export async function insertOrder(
	user_id: number,
	restaurant_id: number,
	billing_address: number,
	delivery_address: number | null,
	items: Record<number, number>,
): Promise<number> {
	const connection = await pool.getConnection();
	await connection.beginTransaction();

	// Save the actual order information
	const [res] = await connection.execute<ResultSetHeader>(
		`INSERT INTO food_order (user_id, restaurant_id, billing_address, delivery_address)
        VALUES (:user_id, :restaurant_id, :billing_address, :delivery_address)`,
		{ user_id, restaurant_id, billing_address, delivery_address },
	);

	const orderId = res.insertId;

	// Save all items in the order
	await connection.query<ResultSetHeader[]>(
		`INSERT INTO order_item (order_id, dish_id, quantity)
         VALUES :items`,
		{
			items: Object.entries(items).map(([dishId, quantity]) => [
				orderId,
				Number(dishId),
				quantity,
			]),
		},
	);

	await connection.commit();
	return orderId;
}
