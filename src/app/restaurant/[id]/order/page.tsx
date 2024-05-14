"use server";

import { Card, Divider } from "@tremor/react";
import type { NextPage } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";

import { getRestaurant } from "@/db/restaurant";
import { getAddresses } from "@/db/user";
import { getCurrentUser } from "@/utils/cookies";
import { OrderForm } from "./OrderForm";
import { VipProgressCircle } from "./VipProgressCircle";

interface Params {
	params: { id: string };
	searchParams: { data: string };
}

const PlaceOrder: NextPage<Params> = async ({
	params: { id },
	searchParams: { data },
}) => {
	const user = getCurrentUser();
	if (user === null) {
		return redirect("/");
	}

	const addresses = await getAddresses(user.id);

	// Check if we're getting a valid numerical id
	const idNum = Number(id);
	if (Number.isNaN(idNum)) {
		return notFound();
	}

	const restaurant = await getRestaurant(idNum, user.id);
	if (restaurant === null) {
		return notFound();
	}

	const decodedData = JSON.parse(atob(data));

	return (
		<main>
			<h1 className="mb-1 text-tremor-content-emphasis text-tremor-title font-medium">
				🧾 Review your order from <b>{restaurant.name}</b>
			</h1>
			<p className="mb-5 text-tremor-content text-tremor-default">
				You’re almost there! Just make sure you added everything you want before
				submitting the order 😉
			</p>

			<Divider />

			{!restaurant.vip && (
				<div className="mb-10 grid grid-cols-3 items-center gap-10">
					<div className="text-tremor-content text-tremor-default">
						<p className="mb-2">
							You're getting really close to{" "}
							<span className="font-medium">✨ VIP Status ✨</span>!
						</p>
						<p className="mb-2">
							With VIP, you get 10% of all orders at{" "}
							<span className="font-medium">{restaurant.name}</span>, as well as
							access to exclusive menu items!
						</p>
						<p>Consider adding more items to reach VIP sooner!</p>
					</div>
					<Card>
						<div className="flex justify-start space-x-5 items-center">
							<VipProgressCircle progress={(restaurant.vip_spent ?? 0) / 500} />
							<div>
								<p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
									${restaurant.vip_spent?.toFixed(0) ?? 0}/$500
								</p>
								<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
									spent until{" "}
									<span className="font-medium">✨ VIP Status ✨</span>
								</p>
							</div>
						</div>
					</Card>
					<Card>
						<div className="flex justify-start space-x-5 items-center">
							<VipProgressCircle progress={(restaurant.vip_orders ?? 0) / 50} />
							<div>
								<p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
									{restaurant.vip_orders}/50
								</p>
								<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
									orders until{" "}
									<span className="font-medium">✨ VIP Status ✨</span>
								</p>
							</div>
						</div>
					</Card>
				</div>
			)}

			<OrderForm
				user={user}
				addresses={addresses}
				restaurant={restaurant}
				order={decodedData}
			/>
		</main>
	);
};

export default PlaceOrder;
