import { Badge, Card } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

import type { Restaurant } from "@/db/restaurant";
import { RiStarLine } from "@remixicon/react";

export const RestaurantCard: React.FC<Restaurant> = ({
	id,
	name,
	banner,
	vip,
}) => (
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
			{vip ? (
				<div className="absolute top-4 right-4">
					<Badge
						className="bg-opacity-100 text-white font-medium px-2"
						color="yellow"
					>
						<div className="flex items-center gap-2">
							<RiStarLine size={16} />
							VIP
						</div>
					</Badge>
				</div>
			) : null}
		</Card>
	</Link>
);
