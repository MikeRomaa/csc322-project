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

export interface Transaction extends RowDataPacket {
	id: number;
	amount: number;
	notes: string;
	timestamp: number;
}

/**
 * Retrieve a user's wallet transactions by user id.
 */
export async function getTransactions(user_id: number): Promise<Transaction[]> {
	const [res] = await pool.execute<Transaction[]>(
		`SELECT id, amount, notes, timestamp
        FROM wallet_transaction
        WHERE user_id = :user_id
        ORDER BY timestamp DESC`,
		{ user_id },
	);

	return res;
}

export interface Balance extends RowDataPacket {
	total: number;
}

/**
 * Retrieve a user's current wallet balance by user id.
 */
export async function getBalance(user_id: number): Promise<number> {
	const [res] = await pool.execute<Balance[]>(
		`SELECT SUM(amount) AS total
        FROM wallet_transaction
        WHERE user_id = :user_id`,
		{ user_id },
	);

	return res[0].total;
}

/**
 * Inserts new balance add transaction to a user's wallet.
 */
export async function insertBalance(
	user_id: number,
	amount: number,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO wallet_transaction (user_id, amount, notes)
        VALUES (:user_id, :amount, :notes)`,
		{ user_id, amount, notes: "Balance transfer from credit card" },
	);

	return res.insertId;
}
