import z from "zod";

export const orderSchema = z.object({
	restaurant_id: z.coerce.number({ required_error: "Required" }),
	items: z
		.string()
		.transform(
			(data: string): Record<number, number> => JSON.parse(atob(data)),
		),
	billing_address: z.coerce.number({ required_error: "Required" }),
	delivery_address: z.coerce.number().optional(),
});
