"use client";

import { RiAddLine } from "@remixicon/react";
import { Button, Card, Dialog, List, ListItem } from "@tremor/react";
import type React from "react";
import { useState } from "react";

import type { Transaction } from "@/db/user";
import { FundsDialog } from "./FundsDialog";

interface WalletProps {
	balance: number;
	transactions: Transaction[];
}

export const Wallet: React.FC<WalletProps> = ({ balance, transactions }) => {
	const [showDialog, setShowDialog] = useState<boolean>(false);

	return (
		<>
			<Card>
				<div className="mb-5 flex items-center justify-between">
					<h3 className="text-tremor-title font-semibold text-tremor-content-strong">
						Wallet Transactions
					</h3>
					<Button
						icon={RiAddLine}
						size="xs"
						variant="secondary"
						onClick={() => setShowDialog(true)}
					>
						Add Funds
					</Button>
				</div>
				<List>
					{transactions.map(({ id, amount, notes, timestamp }) => (
						<ListItem key={id}>
							<span>{new Date(timestamp).toLocaleString()}</span>
							<span>{notes}</span>
							<span
								className={amount < 0 ? "text-red-500" : "text-emerald-500"}
							>
								{amount < 0 && "-"}${Math.abs(amount).toFixed(2)}
							</span>
						</ListItem>
					))}
					<ListItem className="text-tremor-content-emphasis font-medium">
						<span />
						<span />
						<span>Current Balance</span>
						<span>${balance.toFixed(2)}</span>
					</ListItem>
				</List>
			</Card>

			<Dialog static open={showDialog} onClose={() => setShowDialog(false)}>
				<FundsDialog onClose={() => setShowDialog(false)} />
			</Dialog>
		</>
	);
};
