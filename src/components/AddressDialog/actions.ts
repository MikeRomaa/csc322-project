"use server";

import { type Address, insertAddress } from "@/db/user";
import { getCurrentUser } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";
import { addressSchema } from "./schema";

export type State = FormStatus<Omit<Address, "constructor">>;

export async function saveAddress(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(addressSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	const { address, city, state, zip } = data;

	const addressId = await insertAddress(user.id, address, city, state, zip);

	return { data: { id: addressId, address, city, state, zip } };
}
