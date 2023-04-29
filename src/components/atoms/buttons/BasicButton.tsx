import { ReactNode } from "react";
import getStyle from "@/utils/getStyle";
import { TinyButtonProps } from "./TinyButton";

interface BasicButtonProps extends TinyButtonProps {
	width: boolean;
}

function getWidth(width: boolean) {
	if (width) {
		return "w-full";
	}
}

const BasicButton = ({ id, name, type, children, onClick, width, style, deactivated }: BasicButtonProps) => {
	if (deactivated) {
		return (
			<button
				className={`btn border-none ${getWidth(width)} ${getStyle(style)}`}
				id={id}
				name={name}
				type={type}
				onClick={onClick}
				disabled
			>
				{children}
			</button>
		);
	}
	return (
		<button
			className={`btn border-none hover:bg-secondary-1 ${getWidth(width)} ${getStyle(style)}`}
			id={id}
			name={name}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default BasicButton;
