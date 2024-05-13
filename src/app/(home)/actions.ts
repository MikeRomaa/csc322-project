"use server";

import { insertSavedRestaurant } from "@/db/restaurant";
import { getCurrentUser } from "@/utils/cookies";

export async function saveRestaurant(
	restaurant_id: number,
	later: boolean,
	favorite: boolean,
): Promise<void> {
	const user = getCurrentUser();
	if (!user) {
		throw new Error("You must be signed in");
	}

	await insertSavedRestaurant(user.id, restaurant_id, later, favorite);
}
