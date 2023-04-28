import { ChangeEvent, ReactNode } from "react";
import InputLabel, { InputLabelProps } from "../atoms/InputLabel";

export interface SelectProps extends InputLabelProps {
	name: string;
	id: string;
	value?: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	children: ReactNode;
}

const SelectWithLabel = ({ name, id, value, onChange, children, label, htmlFor }: SelectProps) => {
	return (
		<div>
			<InputLabel label={label} htmlFor={htmlFor} />
			<select name={name} id={id} value={value} onChange={onChange} className="select select-bordered min-w-full">
				{children}
			</select>
		</div>
	);
};

export default SelectWithLabel;
