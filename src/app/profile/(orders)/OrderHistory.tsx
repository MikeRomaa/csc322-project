"use client";

import { Badge, Card, List, ListItem } from "@tremor/react";
import type React from "react";

import type { Order } from "@/db/order";

const BADGE_COLORS = {
	placed: "blue",
	picked_up: "green",
	delivered: "green",
	cancelled: "red",
};

const BADGE_TEXT = {
	placed: "Placed",
	picked_up: "Picked Up",
	delivered: "Delivered",
	cancelled: "Cancelled",
};

interface OrderHistoryProps {
	orders: Order[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => (
	<Card>
		<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
			Order History
		</h3>
		<List>
			{orders.map(({ id, restaurant, timestamp, status, total }) => (
				<ListItem key={id}>
					<div>
						<h4 className="mb-1 text-tremor-content-emphasis font-medium">
							{restaurant}
						</h4>
						<p>Placed On: {new Date(timestamp).toLocaleString()}</p>
					</div>
					<Badge color={BADGE_COLORS[status]}>{BADGE_TEXT[status]}</Badge>
					<span className="text-tremor-content-emphasis font-medium">
						${total.toFixed(2)}
					</span>
				</ListItem>
			))}
		</List>
	</Card>
);
