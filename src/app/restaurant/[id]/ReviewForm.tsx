"use client";

import { RiArrowRightLine, RiStarFill, RiStarLine } from "@remixicon/react";
import { Button, Textarea } from "@tremor/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { type State, submitReview } from "./actions";

interface ReviewFormProps {
	restaurantId: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId }) => {
	const router = useRouter();

	const [state, formAction] = useFormState<State, FormData>(submitReview, {});

	const [rating, setRating] = useState<number>(5);

	useEffect(() => {
		if (state.data) {
			router.refresh();
		}
	}, [router, state]);

	return (
		<form action={formAction}>
			<input hidden name="restaurant_id" value={restaurantId} />
			<input hidden name="rating" value={rating} />
			<div className="mb-3 flex gap-1">
				{Array(5)
					.fill(undefined)
					.map((_, i) => (
						<Button
							// biome-ignore lint/suspicious/noArrayIndexKey: tis the only way 😔
							key={i}
							variant="light"
							type="button"
							onClick={() => setRating(i + 1)}
						>
							{i < rating ? (
								<RiStarFill size={25} className="text-yellow-500" />
							) : (
								<RiStarLine size={25} className="text-slate-400" />
							)}
						</Button>
					))}
			</div>

			<div className="mb-5">
				<Textarea
					className="w-80"
					required
					name="contents"
					placeholder="Type in your review..."
				/>
			</div>

			<div className="mb-3 flex gap-2">
				<Button
					icon={RiArrowRightLine}
					iconPosition="right"
					size="xs"
					type="submit"
				>
					Submit
				</Button>
			</div>
		</form>
	);
};
