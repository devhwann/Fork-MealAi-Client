import { ChangeEvent } from "react";

interface RadioButtonProps {
	type: "radio";
	id: string;
	gender: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({ type, id, gender, onChange }: RadioButtonProps) => {
	return (
		<div>
			<input type={type} id={id} onChange={onChange} />
			<label htmlFor="radio-button">{gender === "M" ? "남자" : "여자"}</label>
		</div>
	);
};

export default RadioButton;
