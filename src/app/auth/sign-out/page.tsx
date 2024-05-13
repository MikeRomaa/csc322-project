import type { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignOut: NextPage = () => {
	cookies().delete("session");
	return redirect("/");
};

export default SignOut;
