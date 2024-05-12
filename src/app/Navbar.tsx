import { getCurrentUser } from "@/utils/cookies";
import { Button } from "@tremor/react";
import Link from "next/link";
import type React from "react";

export const Navbar: React.FC = () => {
	const session = getCurrentUser();

	return (
		<nav className="container mx-auto flex items-center gap-3">
			<Link href="/" className="mr-auto">
				<h1 className="text-tremor-metric">
					<span className="font-bold text-tremor-brand-emphasis">Plate</span>
					<span className="font-medium text-tremor-brand-subtle">Pal</span>
				</h1>
			</Link>
			{session ? (
				<p>
					{session.first_name} {session.last_name}
				</p>
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
