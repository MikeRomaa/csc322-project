import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db";

export interface Address extends RowDataPacket {
	id: number;
	address: string;
	city: string;
	state: string;
	zip: string;
}

/**
 * Retrieves all saved addresses from database by user id.
 */
export async function getAddresses(user_id: number): Promise<Address[]> {
	const [res] = await pool.execute<Address[]>(
		`SELECT id, address, city, state, zip
        FROM address
        WHERE user_id = :user_id`,
		{ user_id },
	);

	return res;
}

/**
 * Inserts a new address into the database.
 */
export async function insertAddress(
	user_id: number,
	address: string,
	city: string,
	state: string,
	zip: string,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO address (user_id, address, city, state, zip)
        VALUES (:user_id, :address, :city, :state, :zip)`,
		{ user_id, address, city, state, zip },
	);

	return res.insertId;
}
