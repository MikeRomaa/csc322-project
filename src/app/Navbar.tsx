"use server";

import { getBalance } from "@/db/user";
import { getCurrentUser } from "@/utils/cookies";
import { Badge, Button } from "@tremor/react";
import Link from "next/link";
import type React from "react";

export const Navbar: React.FC = async () => {
	const session = getCurrentUser();

	let balance = 0;
	if (session) {
		balance = await getBalance(session.id);
	}

	return (
		<nav className="container mx-auto flex items-center gap-3">
			<Link href="/" className="mr-auto">
				<h1 className="text-tremor-metric">
					<span className="font-bold text-tremor-brand-emphasis">Plate</span>
					<span className="font-medium text-tremor-brand-subtle">Pal</span>
				</h1>
			</Link>
			{session ? (
				<Link href="/profile" className="flex items-center gap-2">
					<p className="text-tremor-content-strong">
						{session.first_name} {session.last_name}
					</p>
					<Badge>${balance.toFixed(2)}</Badge>
				</Link>
			) : (
				<>
					<Link href="/auth/sign-in">
						<Button variant="secondary" size="xs">
							Sign In
						</Button>
					</Link>
					<Link href="/auth/register">
						<Button variant="primary" size="xs">
							Sign Up
						</Button>
					</Link>
				</>
			)}
		</nav>
	);
};
