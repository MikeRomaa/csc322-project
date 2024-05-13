"use server";

import { RiBookmarkFill, RiGlobalLine, RiStarFill } from "@remixicon/react";
import {
	MultiSelect,
	MultiSelectItem,
	Tab,
	TabGroup,
	TabList,
	TextInput,
} from "@tremor/react";
import type { NextPage } from "next";

import { getRestaurants } from "@/db/restaurant";
import { getCurrentUser } from "@/utils/cookies";
import { RestaurantCard } from "./RestaurantCard";

const Home: NextPage = async () => {
	const user = getCurrentUser();

	const restaurants = await getRestaurants(user?.id);

	return (
		<main>
			<h1 className="mb-1 text-tremor-content-emphasis text-tremor-title font-medium">
				📍 Restaurants Near Me
			</h1>
			<p className="mb-5 text-tremor-content text-tremor-default">
				Browse local restaurants, cafés, and bars!
			</p>

			<div className="mb-5 grid grid-cols-3 gap-2">
				<TextInput placeholder="Filter by restaurant name..." />
				<MultiSelect placeholder="Filter by cuisine...">
					<MultiSelectItem value="Mediterranean" />
					<MultiSelectItem value="Vegan" />
				</MultiSelect>
			</div>

			<TabGroup className="mb-5">
				<TabList variant="line">
					<Tab>
						<div className="flex items-center gap-2">
							<RiGlobalLine size={20} />
							All
						</div>
					</Tab>
					<Tab>
						<div className="flex items-center gap-2">
							<RiBookmarkFill size={20} />
							Saved for Later
						</div>
					</Tab>
					<Tab>
						<div className="flex items-center gap-2">
							<RiStarFill size={20} />
							Favorites
						</div>
					</Tab>
				</TabList>
			</TabGroup>

			<div className="grid grid-cols-2 gap-5">
				{restaurants.map((restaurant) => (
					<RestaurantCard key={restaurant.id} {...restaurant} />
				))}
			</div>
		</main>
	);
};

export default Home;
