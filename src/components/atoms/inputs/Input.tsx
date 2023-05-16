import { ChangeEvent, KeyboardEvent, forwardRef } from "react";

export interface InputProps {
	type: string;
	name: string;
	id: string;
	value?: string | number;
	placeholder: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (
	{ type, name, id, value, placeholder, onChange, onKeyPress }: InputProps,
	ref: React.LegacyRef<HTMLInputElement>
) => {
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
