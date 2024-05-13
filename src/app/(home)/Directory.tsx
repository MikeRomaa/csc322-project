"use client";

import { RiBookmarkFill, RiGlobalLine, RiStarFill } from "@remixicon/react";
import { Tab, TabGroup, TabList } from "@tremor/react";
import type React from "react";
import { useState } from "react";

import type { User } from "@/db/auth";
import type { Restaurant } from "@/db/restaurant";
import { RestaurantCard } from "./RestaurantCard";

enum Filter {
	All = 0,
	Later = 1,
	Favorites = 2,
}

interface DirectoryProps {
	user: User | null;
	restaurants: Restaurant[];
}

export const Directory: React.FC<DirectoryProps> = ({ user, restaurants }) => {
	const [filter, setFilter] = useState<Filter>(Filter.All);

	return (
		<>
			{user && (
				<TabGroup className="mb-5" index={filter} onIndexChange={setFilter}>
					<TabList variant="line">
						<Tab value={Filter.All} icon={RiGlobalLine}>
							All
						</Tab>
						<Tab value={Filter.Later} icon={RiBookmarkFill}>
							Saved for Later
						</Tab>
						<Tab value={Filter.Favorites} icon={RiStarFill}>
							Favorites
						</Tab>
					</TabList>
				</TabGroup>
			)}

			<div className="grid grid-cols-2 gap-5">
				{restaurants
					.filter(({ later, favorite }) =>
						filter === Filter.Later
							? later
							: filter === Filter.Favorites
								? favorite
								: true,
					)
					.map((restaurant) => (
						<RestaurantCard key={restaurant.id} {...restaurant} />
					))}
			</div>
		</>
	);
};
