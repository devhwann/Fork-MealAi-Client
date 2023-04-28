import { InputProps } from "./Input";

export interface ValidationInputProps extends InputProps {
	value: string;
	isError: boolean;
	errorMessage: string;
}

function getValidationColor(isError: boolean, value: string) {
	if (isError) {
		return "system-error"; // 유효하지 않은 값
	}
	if (value.length === 0) {
		return "gray-7"; // 빈 값
	}
	return "system-success"; // 유효한 값
}

const ValidationInput = ({
	type,
	name,
	id,
	value,
	placeholder,
	onChange,
	isError,
	errorMessage,
}: ValidationInputProps) => {
	return (
		<>
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`input input-bordered w-full border-${getValidationColor(isError, value)}`}
			/>
			<p className={`text-sm text-${getValidationColor(isError, value)}`}>{errorMessage}</p>
		</>
	);
};

export default ValidationInput;
