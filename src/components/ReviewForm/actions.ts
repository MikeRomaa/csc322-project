"use server";

import { insertDishReview, insertRestaurantReview } from "@/db/review";
import { getCurrentUser } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";
import { reviewSchema } from "./schema";

export type State = FormStatus<true>;

export async function submitRestaurantReview(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(reviewSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	const { id, rating, contents } = data;

	await insertRestaurantReview(user.id, id, rating, contents);

	return { data: true };
}

export async function submitDishReview(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(reviewSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	const { id, rating, contents } = data;

	await insertDishReview(user.id, id, rating, contents);

	return { data: true };
}
