"use server";

import {
	MultiSelect,
	MultiSelectItem,
	Tab,
	TabGroup,
	TabList,
	TextInput,
} from "@tremor/react";
import type { NextPage } from "next";

import { getRestaurants } from "@/db/restaurants";
import { RiBookmarkFill, RiGlobalLine, RiStarFill } from "@remixicon/react";
import { RestaurantCard } from "./RestaurantCard";

const Home: NextPage = async () => {
	const restaurants = await getRestaurants();

	return (
		<main className="container mx-auto flex flex-col gap-5 pt-10">
			<div>
				<h1 className="text-tremor-content-emphasis text-tremor-title font-medium">
					📍 Restaurants Near Me
				</h1>
				<p className="text-tremor-content text-tremor-default">
					Browse local restaurants, cafés, and bars!
				</p>
			</div>

			<div className="grid grid-cols-3 gap-2">
				<TextInput placeholder="Filter by restaurant name..." />
				<MultiSelect placeholder="Filter by cuisine...">
					<MultiSelectItem value="Mediterranean" />
					<MultiSelectItem value="Vegan" />
				</MultiSelect>
			</div>

			<TabGroup>
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
