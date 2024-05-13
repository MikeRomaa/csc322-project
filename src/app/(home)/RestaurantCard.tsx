import { Card } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

import type { Restaurant } from "@/db/restaurant";

export const RestaurantCard: React.FC<Restaurant> = ({ id, name, banner }) => (
	<Link href={`/restaurant/${id}`}>
		<Card className="relative bg-black h-44 shadow-xl hover:-translate-y-1 duration-300 transition-transform ease-out">
			<Image
				className="opacity-75 rounded-tremor-default object-cover"
				// TODO: Find some default image to show
				src={banner}
				alt={name}
				fill
			/>
			<div className="absolute inset-0 flex flex-col justify-end p-6">
				<h2 className="text-tremor-metric font-semibold text-tremor-brand-inverted">
					{name}
				</h2>
			</div>
		</Card>
	</Link>
);
