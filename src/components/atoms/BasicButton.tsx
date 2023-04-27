import React, { ReactNode } from "react";
import GetStyle from "@/utils/GetStyle";

interface BasicButtonProps {
	id?: string;
	name?: string;
	type?: "button" | "reset" | "submit";
	children: ReactNode;
	onClick: () => void;
	width: boolean;
	style: string;
}

function getWidth(width: boolean) {
	if (width) {
		return "w-full";
	}
}

export default function BasicButton({ id, name, type, children, onClick, width, style }: BasicButtonProps) {
	return (
		<button
			className={`btn border-none hover:bg-secondary-1 ${getWidth(width)} ${GetStyle(style)}`}
			id={id}
			name={name}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
