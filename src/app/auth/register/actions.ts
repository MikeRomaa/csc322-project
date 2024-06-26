"use server";

import { cookies } from "next/headers";

import { type User, createUser } from "@/db/auth";
import { encryptCookie } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";
import { registerSchema } from "./schema";

export type State = FormStatus<User>;

export async function register(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(registerSchema, formData);

	if (errors) {
		return errors;
	}

	const { first_name, last_name, email, password } = data;

	const id = await createUser(first_name, last_name, email, password);
	if (!id) {
		return { fieldErrors: { email: "Email already registered." } };
	}

	const user: User = { id, first_name, last_name, email };

	cookies().set({
		name: "session",
		value: encryptCookie(user),
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24,
		path: "/",
	});

	return { data: user };
}
