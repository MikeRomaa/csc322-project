import { RiAddLine, RiPencilLine, RiStarFill } from "@remixicon/react";
import { Card, Dialog, DialogPanel } from "@tremor/react";
import Image from "next/image";
import type React from "react";
import { useState } from "react";

import { ReviewForm } from "@/components/ReviewForm";
import type { MenuItem } from "@/db/restaurant";

interface MenuItemCardProps {
	item: MenuItem;
	addItem: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
	item,
	addItem,
}) => {
	const [showDialog, setShowDialog] = useState<boolean>(false);

	return (
		<>
			<Card className="relative flex gap-5 h-44 shadow-xl">
				<div>
					<div className="mb-1.5 flex items-center gap-2">
						<h4 className="text-tremor-title font-medium">{item.name}</h4>
						{item.rating ? (
							<p className="flex items-center gap-1 text-yellow-500">
								<RiStarFill size={20} />
								{item.rating.toFixed(1)}
							</p>
						) : (
							<p className="text-tremor-content-subtle text-tremor-default">
								No Rating
							</p>
						)}
					</div>
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
				<div className="absolute bottom-2 right-2 flex items-center gap-2">
					<button
						type="button"
						className="flex items-center gap-2 pl-2 pr-3 py-1 bg-white border border-tremor-ring rounded-full shadow"
						onClick={() => addItem(item)}
					>
						<RiAddLine />
						Add to Basket
					</button>
					<button
						type="button"
						className="flex items-center gap-2 pl-2 pr-3 py-1 bg-white border border-tremor-ring rounded-full shadow"
						onClick={() => setShowDialog(true)}
					>
						<RiPencilLine />
						Add Review
					</button>
				</div>
			</Card>
			<Dialog static open={showDialog} onClose={() => setShowDialog(false)}>
				<DialogPanel>
					<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
						Add Review
					</h3>
					<ReviewForm
						type="dish"
						id={item.id}
						onClose={() => setShowDialog(false)}
					/>
				</DialogPanel>
			</Dialog>
		</>
	);
};
