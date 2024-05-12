import { Card } from "@tremor/react";
import Image from "next/image";
import type React from "react";

import type { MenuItem } from "@/db/restaurants";

export const MenuitemCard: React.FC<MenuItem> = ({
	name,
	description,
	price,
	thumbnail,
}) => (
	<Card className="flex gap-5 h-44 shadow-xl">
		<div>
			<h4 className="mb-1.5 text-tremor-title font-medium">{name}</h4>
			<p className="mb-1.5 text-tremor-content line-clamp-3">{description}</p>
			<p className="text-tremor-content">${price.toFixed(2)}</p>
		</div>
		{thumbnail && (
			<div className="relative ml-auto aspect-square -m-6">
				<Image
					className="object-cover rounded-r-tremor-default"
					src={thumbnail}
					alt={name}
					fill
				/>
			</div>
		)}
	</Card>
);
