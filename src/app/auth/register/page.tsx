"use client";

import { Button, Card, TextInput } from "@tremor/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { type State, register } from "./actions";

const Register: NextPage = () => {
	const router = useRouter();

	const [state, formAction] = useFormState<State, FormData>(register, {});

	useEffect(() => {
		if (state.data) {
			router.push("/");
		}
	}, [router, state]);

	return (
		<div className="container mx-auto py-20">
			<Card className="max-w-96 mx-auto">
				<h1 className="mb-5 text-tremor-title font-medium">Register</h1>
				<form action={formAction}>
					<div className="mb-5 flex flex-col gap-3">
						<div className="flex gap-3">
							<TextInput
								required
								name="first_name"
								placeholder="First Name"
								error={!!state.fieldErrors?.first_name}
								errorMessage={state.fieldErrors?.first_name}
							/>
							<TextInput
								required
								name="last_name"
								placeholder="Last Name"
								error={!!state.fieldErrors?.last_name}
								errorMessage={state.fieldErrors?.last_name}
							/>
						</div>
						<div>
							<TextInput
								required
								name="email"
								type="email"
								placeholder="Email"
								error={!!state.fieldErrors?.email}
								errorMessage={state.fieldErrors?.email}
							/>
						</div>
						<div>
							<TextInput
								required
								name="password"
								type="password"
								placeholder="Password"
								error={!!state.fieldErrors?.password}
								errorMessage={state.fieldErrors?.password}
							/>
						</div>
						<div>
							<TextInput
								required
								name="confirm_password"
								type="password"
								placeholder="Confirm Password"
								error={!!state.fieldErrors?.confirm_password}
								errorMessage={state.fieldErrors?.confirm_password}
							/>
						</div>
						{state.formError && (
							<small className="text-sm text-red-500">{state.formError}</small>
						)}
					</div>
					<div className="flex flex-row-reverse items-center">
						<Button className="ml-auto" type="submit">
							Next
						</Button>
						<small>
							Already have an account?{" "}
							<Link href="/auth/sign-in">Sign in now.</Link>
						</small>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Register;
