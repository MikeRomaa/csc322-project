import {
	RiBookmarkFill,
	RiBookmarkLine,
	RiStarFill,
	RiStarLine,
} from "@remixicon/react";
import { Badge, Button, Card } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import type { Restaurant } from "@/db/restaurant";
import { saveRestaurant } from "./actions";

export const RestaurantCard: React.FC<Restaurant> = ({
	id,
	name,
	banner,
	vip,
	later: _later,
	favorite: _favorite,
	rating,
}) => {
	const router = useRouter();

	const mounted = useRef<boolean>(false);

	const [later, setLater] = useState<boolean>(_later);
	const [favorite, setFavorite] = useState<boolean>(_favorite);

	useEffect(() => {
		if (mounted.current) {
			saveRestaurant(id, later, favorite);
			router.refresh();
		}

		mounted.current = true;
	}, [router, id, later, favorite]);

	return (
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
					{rating ? (
						<p className="flex items-center gap-1 text-tremor-default text-tremor-brand-inverted">
							<RiStarFill size={15} />
							{rating.toFixed(1)}
						</p>
					) : (
						<p className="text-tremor-default text-tremor-brand-inverted">
							No Rating
						</p>
					)}
				</div>
				<div className="absolute top-4 right-4 flex gap-2">
					{vip ? (
						<Badge
							className="bg-opacity-100 text-white font-medium"
							color="yellow"
							icon={RiStarLine}
						>
							VIP
						</Badge>
					) : null}
					<Button
						className="!text-tremor-brand-inverted"
						variant="light"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setLater((v) => !v);
						}}
					>
						{later ? <RiBookmarkFill /> : <RiBookmarkLine />}
					</Button>
					<Button
						className="!text-tremor-brand-inverted"
						variant="light"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setFavorite((v) => !v);
						}}
					>
						{favorite ? <RiStarFill /> : <RiStarLine />}
					</Button>
				</div>
			</Card>
		</Link>
	);
};
