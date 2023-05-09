import { MouseEvent, ReactNode } from "react";
import getStyle from "@/utils/getStyle";

export interface TinyButtonProps {
	id?: string;
	name?: string;
	type?: "button" | "reset" | "submit";
	children: ReactNode;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	style: "primary" | "bg" | "deactivated" | "gray";
	deactivated?: boolean;
}

const TinyButton = ({ id, name, type, children, onClick, style, deactivated }: TinyButtonProps) => {
	if (deactivated) {
		return (
			<button
				className={`btn btn-xs border-none ${getStyle(style)}`}
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
			className={`btn btn-xs border-none hover:bg-secondary-1 ${getStyle(style)}`}
			id={id}
			name={name}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default TinyButton;
