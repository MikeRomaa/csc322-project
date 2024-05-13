"use server";

import { MultiSelect, MultiSelectItem, TextInput } from "@tremor/react";
import type { NextPage } from "next";

import { Directory } from "@/app/(home)/Directory";
import { getRestaurants } from "@/db/restaurant";
import { getCurrentUser } from "@/utils/cookies";

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

			<Directory user={user} restaurants={restaurants} />
		</main>
	);
};

export default Home;
