import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db";
import { getRestaurant } from "@/db/restaurant";
import { getBalance } from "@/db/user";

interface Total extends RowDataPacket {
	value: number;
}

/**
 * Insert a placed order into the database.
 */
export async function insertOrder(
	user_id: number,
	restaurant_id: number,
	billing_address: number,
	delivery_address: number | null,
	items: Record<number, number>,
): Promise<number | null> {
	const restaurant = await getRestaurant(restaurant_id);
	if (restaurant === null) {
		throw new Error("wat.");
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	// Save the actual order information
	const [res] = await connection.execute<ResultSetHeader>(
		`INSERT INTO food_order (user_id, restaurant_id, billing_address, delivery_address)
        VALUES (:user_id, :restaurant_id, :billing_address, :delivery_address)`,
		{ user_id, restaurant_id, billing_address, delivery_address },
	);

	const order_id = res.insertId;

	// Save all items in the order
	await connection.query<ResultSetHeader[]>(
		`INSERT INTO order_item (order_id, dish_id, price, quantity)
         VALUES :items`,
		{
			items: Object.entries(items)
				.filter(([_, quantity]) => quantity > 0)
				.map(([dishId, quantity]) => [
					order_id,
					Number(dishId),
					restaurant.menu[Number(dishId)].price,
					quantity,
				]),
		},
	);

	// Compute total price for the order
	const [total] = await connection.execute<Total[]>(
		`WITH subtotal AS (
            SELECT SUM(price * quantity) AS subtotal
            FROM order_item
            WHERE order_id = :order_id
        )
        SELECT subtotal * 1.0875 + IF(delivery_address IS NULL, 0, 5) AS value
        FROM subtotal
        JOIN food_order
        WHERE id = :order_id`,
		{ order_id },
	);

	const user_balance = await getBalance(user_id);
	if (user_balance < total[0].value) {
		await connection.rollback();
		return null;
	}

	// Create a charge on the user's account
	await connection.execute(
		`INSERT INTO wallet_transaction (user_id, amount, notes)
        SELECT
            :user_id AS user_id,
            :amount AS amount,
            CONCAT('Order from ', name) AS notes
        FROM restaurant
        WHERE id = :restaurant_id`,
		{ user_id, restaurant_id, amount: -total[0].value },
	);

	await connection.commit();
	return order_id;
}
