import { states } from "@/utils/states";
import z from "zod";

export const addressSchema = z.object({
	address: z.string().min(1, "Required").max(32, "Too long"),
	city: z.string().min(1, "Required").max(32, "Too long"),
	state: z.enum(states.map(({ short }) => short) as [string, ...string[]], {
		required_error: "Required",
		invalid_type_error: "Invalid state",
	}),
	zip: z
		.string()
		.min(1, "Required")
		.length(5, "Invalid ZIP code")
		.refine((zip) => !Number.isNaN(Number(zip)), {
			message: "Invalid ZIP code",
			path: ["zip"],
		}),
});
