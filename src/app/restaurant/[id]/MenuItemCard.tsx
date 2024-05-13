import { RiAddLine } from "@remixicon/react";
import { Card } from "@tremor/react";
import Image from "next/image";
import type React from "react";

import type { MenuItem } from "@/db/restaurant";

interface MenuItemCardProps {
	item: MenuItem;
	addItem: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
	item,
	addItem,
}) => (
	<Card className="relative flex gap-5 h-44 shadow-xl">
		<div>
			<h4 className="mb-1.5 text-tremor-title font-medium">{item.name}</h4>
			<p className="mb-1.5 text-tremor-content line-clamp-3">
				{item.description}
			</p>
			<p className="text-tremor-content">${item.price.toFixed(2)}</p>
		</div>
		{item.thumbnail && (
			<div className="relative ml-auto aspect-square -m-6">
				<Image
					className="object-cover rounded-r-tremor-default"
					src={item.thumbnail}
					alt={item.name}
					fill
				/>
			</div>
		)}
		<button
			type="button"
			className="absolute bottom-2 right-2 flex items-center gap-2 pl-2 pr-3 py-1 bg-white border border-tremor-ring rounded-full shadow"
			onClick={() => addItem(item)}
		>
			<RiAddLine />
			Add to Basket
		</button>
	</Card>
);
