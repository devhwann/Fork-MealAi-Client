import { ChangeEvent, KeyboardEvent, forwardRef } from "react";

export interface InputProps {
	type: string;
	name: string;
	id: string;
	value?: string | number;
	placeholder: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
	deactivated?: boolean;
}

const Input = (
	{ type, name, id, value, placeholder, onChange, onKeyPress, deactivated }: InputProps,
	ref: React.LegacyRef<HTMLInputElement>
) => {
	if (deactivated) {
		return (
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				ref={ref}
				className="input input-bordered w-full"
				disabled
			/>
		);
	}
	return (
		<input
			type={type}
			name={name}
			id={id}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			onKeyPress={onKeyPress}
			ref={ref}
			className="input input-bordered w-full"
		/>
	);
};

export default forwardRef(Input);
