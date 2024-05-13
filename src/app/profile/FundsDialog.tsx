import { Button, DialogPanel, NumberInput, TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { type State, addFunds } from "./actions";

interface FundsDialogProps {
	onClose: () => void;
}

export const FundsDialog: React.FC<FundsDialogProps> = ({ onClose }) => {
	const router = useRouter();

	const [state, formAction] = useFormState<State, FormData>(addFunds, {});

	useEffect(() => {
		if (state.data) {
			onClose();
			router.refresh();
		}
	}, [router, state, onClose]);

	return (
		<DialogPanel>
			<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
				Add Funds to Account
			</h3>
			<form action={formAction}>
				<div className="mb-5 grid grid-cols-6 gap-2">
					<TextInput
						className="col-span-3 min-w-0"
						disabled
						placeholder="1234 5678 9012 3456"
					/>
					<TextInput
						className="col-span-2 min-w-0"
						disabled
						placeholder="12/24"
					/>
					<TextInput className="min-w-0" disabled placeholder="1234" />
				</div>

				<div className="mb-5 flex items-center justify-end gap-2">
					<p className="text-tremor-content text-tremor-default">
						Amount (USD):
					</p>
					<NumberInput
						className="w-40"
						required
						min={0}
						name="amount"
						error={!!state.fieldErrors?.amount}
						errorMessage={state.fieldErrors?.amount}
					/>
				</div>

				<div className="flex justify-end gap-2">
					<Button
						variant="secondary"
						size="xs"
						type="button"
						onClick={() => onClose()}
					>
						Cancel
					</Button>
					<Button iconPosition="right" size="xs" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</DialogPanel>
	);
};
