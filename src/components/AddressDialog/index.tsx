import {
	Button,
	DialogPanel,
	SearchSelect,
	SearchSelectItem,
	TextInput,
} from "@tremor/react";
import type React from "react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import type { Address } from "@/db/user";
import { states } from "@/utils/states";
import { type State, saveAddress } from "./actions";

interface AddressDialogProps {
	onClose: (data?: Address) => void;
}

export const AddressDialog: React.FC<AddressDialogProps> = ({ onClose }) => {
	const [state, formAction] = useFormState<State, FormData>(saveAddress, {});

	useEffect(() => {
		if (state.data) {
			onClose(state.data as Address);
		}
	}, [state, onClose]);

	return (
		<DialogPanel>
			<h3 className="mb-5 text-tremor-title font-semibold text-tremor-content-strong">
				Add a New Address
			</h3>
			<form action={formAction}>
				<div className="mb-2">
					<TextInput
						required
						name="address"
						placeholder="Street Address"
						error={!!state.fieldErrors?.address}
						errorMessage={state.fieldErrors?.address}
					/>
				</div>
				<div className="mb-5 grid grid-cols-5 gap-2 items-start">
					<div className="col-span-2">
						<TextInput
							required
							name="city"
							placeholder="City"
							error={!!state.fieldErrors?.city}
							errorMessage={state.fieldErrors?.city}
						/>
					</div>
					<div className="col-span-2">
						<SearchSelect
							required
							name="state"
							placeholder="State"
							enableClear={false}
							error={!!state.fieldErrors?.state}
							errorMessage={state.fieldErrors?.state}
						>
							{states.map(({ name, short }) => (
								<SearchSelectItem key={short} value={short}>
									<small className="text-tremor-content-subtle">{short}</small>
									<span className="hidden"> —</span> {name}
								</SearchSelectItem>
							))}
						</SearchSelect>
					</div>
					<div>
						<TextInput
							className="min-w-0"
							required
							name="zip"
							placeholder="ZIP Code"
							error={!!state.fieldErrors?.zip}
							errorMessage={state.fieldErrors?.zip}
						/>
					</div>
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
						Save
					</Button>
				</div>
			</form>
		</DialogPanel>
	);
};
