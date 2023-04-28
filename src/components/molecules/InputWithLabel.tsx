import InputLabel, { InputLabelProps } from "../atoms/InputLabel";
import ValidationInput, { ValidationInputProps } from "../atoms/ValidationInput";

interface InputWithLabelProps extends ValidationInputProps, InputLabelProps {}

const InputWithLabel = ({
	type,
	name,
	id,
	value,
	placeholder,
	onChange,
	isError,
	errorMessage,
	label,
	htmlFor,
}: InputWithLabelProps) => {
	return (
		<>
			<InputLabel label={label} htmlFor={htmlFor} />
			<ValidationInput
				type={type}
				name={name}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				isError={isError}
				errorMessage={errorMessage}
			/>
		</>
	);
};

export default InputWithLabel;
