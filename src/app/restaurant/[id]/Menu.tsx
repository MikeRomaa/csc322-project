"use client";

import {
	RiArrowRightLine,
	RiCloseLine,
	RiShoppingCart2Line,
} from "@remixicon/react";
import {
	Badge,
	Button,
	Dialog,
	DialogPanel,
	List,
	ListItem,
	NumberInput,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import type { MenuItem, RestaurantDetails } from "@/db/restaurant";
import { MenuItemCard } from "./MenuItemCard";

interface MenuProps {
	restaurant: RestaurantDetails;
	items: Record<number, MenuItem>;
}

export const Menu: React.FC<MenuProps> = ({ restaurant, items }) => {
	const router = useRouter();

	const [basket, setBasket] = useState<Map<number, number>>(new Map());
	const [showDialog, setShowDialog] = useState<boolean>(false);

	const addItem = useCallback((item: MenuItem) => {
		setBasket(
			(basket) => new Map(basket.set(item.id, (basket.get(item.id) ?? 0) + 1)),
		);
	}, []);

	const setQuantity = useCallback(
		(item: MenuItem, quantity: number) =>
			setBasket((basket) => {
				if (quantity === 0) {
					basket.delete(item.id);
					return new Map(basket);
				}

				return new Map(basket.set(item.id, quantity));
			}),
		[],
	);

	const order = useCallback(() => {
		const data = Object.fromEntries(basket.entries());
		const encodedData = window.btoa(JSON.stringify(data));
		router.push(`/restaurant/${restaurant.id}/order?data=${encodedData}`);
	}, [router, restaurant, basket]);

	useEffect(() => {
		if (basket.size === 0) {
			setShowDialog(false);
		}
	}, [basket]);

	return (
		<>
			{restaurant.vip ? (
				<div className="mb-10">
					<h3 className="mb-1 text-tremor-title font-medium">
						✨ VIP Exclusives
					</h3>
					<p className="mb-5 text-tremor-content text-tremor-default">
						Sweet! Your VIP status at <b>{restaurant.name}</b> earns you access
						to these exclusive menu items!
					</p>
					<div className="grid grid-cols-2 gap-5">
						{Object.values(items)
							.filter(({ vip_exclusive }) => vip_exclusive)
							.map((item) => (
								<MenuItemCard key={item.id} item={item} addItem={addItem} />
							))}
					</div>
				</div>
			) : null}

			<div className="mb-5 flex items-center">
				<h3 className="text-tremor-title font-medium">Menu</h3>
				{basket.size > 0 && (
					<Button
						className="ml-auto"
						icon={RiShoppingCart2Line}
						size="xs"
						variant="light"
						onClick={() => setShowDialog(true)}
					>
						Basket
						<Badge className="ml-2 pointer-events-none">
							{Array.from(basket.values()).reduce((sum, curr) => sum + curr, 0)}
						</Badge>
					</Button>
				)}
			</div>

			<div className="grid grid-cols-2 gap-5">
				{Object.values(items).map((item) => (
					<MenuItemCard key={item.id} item={item} addItem={addItem} />
				))}
			</div>

			<Dialog static open={showDialog} onClose={(show) => setShowDialog(show)}>
				<DialogPanel>
					<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
						Basket
					</h3>

					<List className="mb-5">
						{Array.from(basket.entries()).map(([itemId, quantity]) => (
							<ListItem key={itemId}>
								<span>{items[itemId].name}</span>
								<span className="flex items-center gap-1">
									${items[itemId].price.toFixed(2)}
									<RiCloseLine size={16} />
									<NumberInput
										className="w-[7.5rem] !min-w-[7.5rem]"
										value={quantity}
										min={0}
										onChange={(e) =>
											setQuantity(items[itemId], e.target.valueAsNumber)
										}
									/>
								</span>
							</ListItem>
						))}
						<ListItem className="h-16 font-medium text-tremor-content-emphasis">
							<span>Subtotal</span>
							<span>
								$
								{Array.from(basket.entries())
									.map(
										([itemId, quantity]) =>
											(items[itemId].price ?? 0) * quantity,
									)
									.reduce((sum, curr) => sum + curr, 0)
									.toFixed(2)}
							</span>
						</ListItem>
					</List>

					<div className="flex justify-end gap-2">
						<Button
							variant="secondary"
							size="xs"
							onClick={() => setShowDialog(false)}
						>
							Cancel
						</Button>
						<Button
							icon={RiArrowRightLine}
							iconPosition="right"
							size="xs"
							onClick={order}
						>
							Checkout
						</Button>
					</div>
				</DialogPanel>
			</Dialog>
		</>
	);
};
