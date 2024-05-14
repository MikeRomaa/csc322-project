"use client";

import { RiLogoutBoxLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import type React from "react";

import { signOut } from "@/app/auth/sign-out/actions";

export const SignOutButton: React.FC = () => (
	<Button variant="secondary" size="xs" onClick={() => signOut()}>
		<div className="flex items-center gap-2">
			<RiLogoutBoxLine size={20} />
			Sign Out
		</div>
	</Button>
);
