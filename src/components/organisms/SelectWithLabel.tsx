import { ChangeEvent, ReactNode } from "react";
import InputLabel, { InputLabelProps } from "../atoms/inputs/InputLabel";

interface SelectProps extends InputLabelProps {
	name: string;
	id: string;
	defaultValue?: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	children: ReactNode;
	value?: number;
}

const SelectWithLabel = ({ name, id, defaultValue, onChange, children, label, htmlFor, value }: SelectProps) => {
	return (
		<div>
			<InputLabel label={label} htmlFor={htmlFor} />
			<select
				name={name}
				id={id}
				defaultValue={defaultValue}
				onChange={onChange}
				className="select select-bordered w-full"
				value={value}
			>
				{children}
			</select>
		</div>
	);
};

export default SelectWithLabel;
