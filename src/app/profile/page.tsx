"use server";

import { RiArrowLeftSLine } from "@remixicon/react";
import type { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { getBalance, getTransactions } from "@/db/user";
import { getCurrentUser } from "@/utils/cookies";
import { Wallet } from "./Wallet";

const Profile: NextPage = async () => {
	const user = getCurrentUser();
	if (user === null) {
		return redirect("/");
	}

	const balance = await getBalance(user.id);
	const transactions = await getTransactions(user.id);

	return (
		<main>
			<div className="mb-10">
				<Link href="/">
					<span className="flex items-center gap-2 text-tremor-content">
						<RiArrowLeftSLine />
						Return to Home
					</span>
				</Link>
			</div>

			<h2 className="mb-10 text-tremor-metric font-medium">
				{user.first_name} {user.last_name}
			</h2>

			<div className="grid grid-cols-2 gap-10">
				<Wallet balance={balance} transactions={transactions} />
			</div>
		</main>
	);
};

export default Profile;
