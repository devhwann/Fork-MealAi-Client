import { ChangeEvent } from "react";

interface RadioButtonProps {
	type: "radio";
	id?: string;
	name?: string;
	gender: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/* 피그마 디자인과 동일하게 라디오버튼을 구현하려면 라디오버튼 컴포넌트를 쓰는 곳에서 
div태그로 감싸고 className="flex gap-8" 설정을 해주면 된다. */
const RadioButton = ({ type, id, name, gender, onChange }: RadioButtonProps) => {
	return (
		<div className="flex gap-2 items-center">
			<input
				type={type}
				id={id}
				name={name}
				onChange={onChange}
				className="radio border-primary-1 checked:bg-primary-1"
			/>
			<label htmlFor="radio-button">{gender === "M" ? "남자" : "여자"}</label>
		</div>
	);
};

export default RadioButton;
