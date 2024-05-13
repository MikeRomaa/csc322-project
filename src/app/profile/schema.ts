import z from "zod";

export const fundsSchema = z.object({
	amount: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative")
		.max(999, "Value too large"),
});
