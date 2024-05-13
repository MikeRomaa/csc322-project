"use server";

import { insertBalance } from "@/db/user";
import { getCurrentUser } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";
import { fundsSchema } from "./schema";

export type State = FormStatus<true>;

export async function addFunds(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(fundsSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	await insertBalance(user.id, data.amount);

	return { data: true };
}
