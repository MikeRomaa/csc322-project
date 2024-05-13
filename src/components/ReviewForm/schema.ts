import z from "zod";

export const reviewSchema = z.object({
	id: z.coerce.number({ required_error: "Required" }),
	rating: z.coerce.number({ required_error: "Required" }),
	contents: z.string().min(1, "Required"),
});
