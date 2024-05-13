"use server";

import { insertOrder } from "@/db/order";
import { getCurrentUser } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";
import { orderSchema } from "./schema";

export type State = FormStatus<number>;

export async function placeOrder(
	_prev: State,
	formData: FormData,
): Promise<State> {
	// @ts-ignore
	const { data, errors } = validateFormData(orderSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	const { restaurant_id, items, billing_address, delivery_address } = data;

	const orderId = await insertOrder(
		user.id,
		restaurant_id,
		billing_address,
		delivery_address ?? null,
		items,
	);

	return { data: orderId };
}
