"use server";

import { RiArrowLeftSLine, RiStarFill } from "@remixicon/react";
import { BarList, Card, Divider, List, ListItem } from "@tremor/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { ReviewForm } from "@/components/ReviewForm";
import { getRestaurant } from "@/db/restaurant";
import { getCurrentUser } from "@/utils/cookies";
import { Menu } from "./Menu";

interface Params {
	params: { id: string };
}

const ViewRestaurant: NextPage<Params> = async ({ params: { id } }) => {
	// Check if we're getting a valid numerical id
	const idNum = Number(id);
	if (Number.isNaN(idNum)) {
		return notFound();
	}

	const user = getCurrentUser();

	const restaurant = await getRestaurant(idNum, user?.id);
	if (restaurant === null) {
		return notFound();
	}

	const { name, address, city, state, zip, banner, rating, menu } = restaurant;

	return (
		<main>
			<Link href="/">
				<span className="flex items-center gap-2 text-tremor-content">
					<RiArrowLeftSLine />
					Return to Home
				</span>
			</Link>

			<Card className="my-10 relative bg-black h-80 shadow-xl">
				<Image
					className="opacity-75 rounded-tremor-default object-cover"
					// TODO: Find some default image to show
					src={banner}
					alt={name}
					fill
				/>
			</Card>

			<div className="mb-1.5 flex items-center gap-3">
				<h2 className="text-tremor-metric font-semibold">{name}</h2>
				{rating ? (
					<p className="flex items-center gap-2 text-tremor-title text-yellow-500">
						<RiStarFill />
						{rating.toFixed(1)}
					</p>
				) : (
					<p className="text-tremor-content-subtle text-tremor-default">
						No Rating
					</p>
				)}
			</div>
			<p className="text-tremor-content-emphasis">
				{address}, {city}, {state} {zip}
			</p>

			<Divider />

			<Menu restaurant={restaurant} items={menu} />

			<Divider className="my-10" />

			<div className="grid grid-cols-4 items-start gap-10">
				<Card>
					<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
						Reviews
					</h3>
					<BarList
						color="yellow"
						data={restaurant.reviews
							.reduce((acc, { rating }) => {
								acc[rating - 1] += 1;
								return acc;
							}, Array(5).fill(0))
							.map((value, i) => ({ name: "★".repeat(i + 1), value }))
							.reverse()}
						className="mx-auto max-w-sm"
					/>
				</Card>
				<Card className="col-span-3">
					<List>
						<ListItem>
							<ReviewForm type="restaurant" id={restaurant.id} />
						</ListItem>
						{restaurant.reviews.map(
							({ author, rating, contents, timestamp }) => (
								<ListItem key={timestamp}>
									<div>
										<p className="mb-1 text-tremor-title text-yellow-500">
											{"★".repeat(rating)}
										</p>
										<div className="mb-3">
											<b className="text-tremor-content-emphasis text-tremor-title">
												{author}
											</b>
											<p className="text-tremor-content text-tremor-default">
												{new Date(timestamp).toLocaleString()}
											</p>
										</div>
										<p>{contents}</p>
									</div>
								</ListItem>
							),
						)}
					</List>
				</Card>
			</div>
		</main>
	);
};

export default ViewRestaurant;
