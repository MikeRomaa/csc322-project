"use client";

import { RiAddLine, RiArrowRightLine, RiCloseLine } from "@remixicon/react";
import {
	Button,
	Card,
	Dialog,
	List,
	ListItem,
	NumberInput,
	Select,
	SelectItem,
	Tab,
	TabGroup,
	TabList,
} from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

import { AddressDialog } from "@/components/AddressDialog";
import type { User } from "@/db/auth";
import type { MenuItem, RestaurantDetails } from "@/db/restaurant";
import type { Address } from "@/db/user";
import { type State, placeOrder } from "./actions";

enum DeliveryType {
	PickUp = 0,
	Delivery = 1,
}

interface OrderFormProps {
	user: User;
	addresses: Address[];
	restaurant: RestaurantDetails;
	order: Record<number, number>;
}

export const OrderForm: React.FC<OrderFormProps> = ({
	user,
	addresses: _addresses,
	restaurant,
	order,
}) => {
	const router = useRouter();

	const [state, formAction] = useFormState<State, FormData>(placeOrder, {});

	const [addresses, setAddresses] = useState<Address[]>(_addresses);
	const [showDialog, setShowDialog] = useState<boolean>(false);

	const [basket, setBasket] = useState<Map<number, number>>(
		new Map(
			Object.entries(order).map(([itemId, quantity]) => [
				Number(itemId),
				quantity,
			]),
		),
	);

	const serializedBasket = useMemo(() => {
		const data = Object.fromEntries(basket.entries());
		return window.btoa(JSON.stringify(data));
	}, [basket]);

	const [deliveryType, setDeliveryType] = useState<DeliveryType>(
		DeliveryType.PickUp,
	);
	const [deliveryAddress, setDeliveryAddress] = useState<Address | undefined>();
	const [billingAddress, setBillingAddress] = useState<Address | undefined>();

	const subtotal = useMemo(
		() =>
			Array.from(basket.entries())
				.map(
					([itemId, quantity]) =>
						(restaurant.menu[itemId].price ?? 0) * quantity,
				)
				.reduce((sum, curr) => sum + curr, 0),
		[restaurant, basket],
	);

	const setQuantity = useCallback(
		(item: MenuItem, quantity: number) =>
			setBasket((basket) => new Map(basket.set(item.id, quantity))),
		[],
	);

	const newAddress = useCallback((data?: Address) => {
		setShowDialog(false);
		if (data) {
			setAddresses((a) => [...a, data]);
		}
	}, []);

	useEffect(() => {
		if (state.data) {
			// TODO: Redirect to order history instead
			router.push("/");
			router.refresh();
		}
	}, [router, state]);

	return (
		<>
			<form action={formAction}>
				<input hidden name="restaurant_id" value={restaurant.id} />
				<input hidden name="items" value={serializedBasket} />
				<Card className="mb-5 flex flex-col gap-5">
					{Array.from(basket.entries()).map(([itemId, quantity]) => (
						<Card key={itemId} className="flex gap-5">
							<div className="relative h-36 aspect-square -ml-6 -my-6">
								{restaurant.menu[itemId].thumbnail && (
									<Image
										className="object-cover rounded-l-tremor-default"
										src={restaurant.menu[itemId].thumbnail}
										alt={restaurant.menu[itemId].name}
										fill
									/>
								)}
							</div>
							<div>
								<h4 className="mb-1.5 text-tremor-title font-medium">
									{restaurant.menu[itemId].name}
								</h4>
								<p className="mb-1.5 text-tremor-content line-clamp-1">
									{restaurant.menu[itemId].description}
								</p>
								<p className="text-tremor-content">
									${restaurant.menu[itemId].price.toFixed(2)}
								</p>
							</div>
							<div className="ml-auto flex items-center gap-1">
								${restaurant.menu[itemId].price.toFixed(2)}
								<RiCloseLine size={16} />
								<NumberInput
									className="w-[7.5rem] !min-w-[7.5rem]"
									value={quantity}
									min={0}
									onChange={(e) =>
										setQuantity(restaurant.menu[itemId], e.target.valueAsNumber)
									}
								/>
							</div>
						</Card>
					))}
				</Card>

				<div className="mb-5 grid grid-cols-5 gap-5">
					<Card className="col-span-2">
						<div className="mb-3 flex justify-between items-center">
							<h3 className="text-tremor-title font-medium text-tremor-content-strong">
								Delivery & Contact Information
							</h3>
							<div>
								<TabGroup index={deliveryType} onIndexChange={setDeliveryType}>
									<TabList variant="solid">
										<Tab value={DeliveryType.PickUp}>Pick Up</Tab>
										<Tab value={DeliveryType.Delivery}>Delivery</Tab>
									</TabList>
								</TabGroup>
							</div>
						</div>
						{deliveryType === DeliveryType.Delivery && (
							<div className="mb-2 flex items-center gap-5">
								<Select
									required
									name="delivery_address"
									placeholder="Select address..."
									value={deliveryAddress?.id.toString()}
									disabled={addresses.length === 0}
									onChange={(value: unknown) =>
										setDeliveryAddress(
											addresses.find(({ id }) => id === Number(value)),
										)
									}
								>
									{addresses.map(({ id, address }) => (
										<SelectItem key={id} value={id.toString()}>
											{address}
										</SelectItem>
									))}
								</Select>
								<Button
									icon={RiAddLine}
									size="xs"
									variant="light"
									type="button"
									onClick={() => setShowDialog(true)}
								>
									New Address
								</Button>
							</div>
						)}
						<div className="text-tremor-content text-tremor-default">
							<p>
								{user.first_name} {user.last_name}
							</p>
							{deliveryAddress && deliveryType === DeliveryType.Delivery && (
								<>
									<p>{deliveryAddress.address}</p>
									<p>
										{deliveryAddress.city}, {deliveryAddress.state}{" "}
										{deliveryAddress.zip}
									</p>
								</>
							)}
						</div>
					</Card>

					<Card className="col-span-2">
						<h3 className="mb-4 text-tremor-title font-medium text-tremor-content-strong">
							Billing Information
						</h3>
						<div className="mb-2 flex items-center gap-5">
							<Select
								required
								name="billing_address"
								placeholder="Select address..."
								value={billingAddress?.id.toString()}
								disabled={addresses.length === 0}
								onChange={(value: unknown) =>
									setBillingAddress(
										addresses.find(({ id }) => id === Number(value)),
									)
								}
							>
								{addresses.map(({ id, address }) => (
									<SelectItem key={id} value={id.toString()}>
										{address}
									</SelectItem>
								))}
							</Select>
							<Button
								icon={RiAddLine}
								size="xs"
								variant="light"
								type="button"
								onClick={() => setShowDialog(true)}
							>
								New Address
							</Button>
						</div>
						{billingAddress && (
							<div className="text-tremor-content text-tremor-default">
								<p>
									{user.first_name} {user.last_name}
								</p>
								<p>{billingAddress.address}</p>
								<p>
									{billingAddress.city}, {billingAddress.state}{" "}
									{billingAddress.zip}
								</p>
							</div>
						)}
					</Card>

					<Card>
						<List>
							<ListItem>
								<span>Subtotal</span>
								<span className="font-medium text-tremor-content-emphasis">
									${subtotal.toFixed(2)}
								</span>
							</ListItem>
							<ListItem>
								<span>Taxes (8.875%)</span>
								<span className="font-medium text-tremor-content-emphasis">
									${(subtotal * 0.0875).toFixed(2)}
								</span>
							</ListItem>
							<ListItem>
								<span>Delivery Fee</span>
								<span className="font-medium text-tremor-content-emphasis">
									${(deliveryType === DeliveryType.Delivery ? 5 : 0).toFixed(2)}
								</span>
							</ListItem>
							{restaurant.vip ? (
								<ListItem>
									<span>VIP Discount</span>
									<span className="font-medium text-tremor-content-emphasis">
										-${(subtotal * 0.1).toFixed(2)}
									</span>
								</ListItem>
							) : null}
							<ListItem>
								<span>Total</span>
								<span className="font-bold text-tremor-title text-tremor-content-emphasis">
									$
									{(
										subtotal * 1.0875 +
										(deliveryType === DeliveryType.Delivery ? 5 : 0) -
										(restaurant.vip ? subtotal * 0.1 : 0)
									).toFixed(2)}
								</span>
							</ListItem>
						</List>
					</Card>
				</div>

				{state.formError && (
					<div className="mb-5 flex justify-end">
						<small className="text-sm text-red-500">{state.formError}</small>
					</div>
				)}

				<div className="flex justify-end gap-2">
					<Link href={`/restaurant/${restaurant.id}`}>
						<Button variant="secondary" size="xs">
							Cancel
						</Button>
					</Link>
					<Button
						icon={RiArrowRightLine}
						iconPosition="right"
						size="xs"
						type="submit"
					>
						Place Order
					</Button>
				</div>
			</form>

			<Dialog static open={showDialog} onClose={() => setShowDialog(false)}>
				<AddressDialog onClose={newAddress} />
			</Dialog>
		</>
	);
};
