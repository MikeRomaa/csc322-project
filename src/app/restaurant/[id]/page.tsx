"use server";

import { RiArrowLeftSLine } from "@remixicon/react";
import { Card, Divider } from "@tremor/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { getRestaurant } from "@/db/restaurants";
import { MenuitemCard } from "./MenuItemCard";

interface Params {
	params: { id: string };
}

const ViewRestaurant: NextPage<Params> = async ({ params: { id } }) => {
	// Check if we're getting a valid numerical id
	const idNum = Number(id);
	if (Number.isNaN(idNum)) {
		return notFound();
	}

	const restaurant = await getRestaurant(idNum);

	if (restaurant === null) {
		return notFound();
	}

	const { name, address, city, state, zip, banner, menu } = restaurant;

	return (
		<main className="container mx-auto pt-10">
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

			<h2 className="mb-1.5 text-tremor-metric font-semibold">{name}</h2>
			<p className="text-tremor-content-emphasis">
				{address}, {city}, {state} {zip}
			</p>

			<Divider />

			<h3 className="mb-5 text-tremor-title font-medium">Menu</h3>
			<div className="grid grid-cols-2 gap-5">
				{menu.map((item) => (
					<MenuitemCard key={item.id} {...item} />
				))}
			</div>
		</main>
	);
};

export default ViewRestaurant;
