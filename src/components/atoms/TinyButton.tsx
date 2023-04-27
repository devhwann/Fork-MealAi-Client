import React, { ReactNode } from "react";
import GetStyle from "@/utils/GetStyle";

interface TinyButtonProps {
	id?: string;
	name?: string;
	type?: "button" | "reset" | "submit";
	children: ReactNode;
	onClick: () => void;
	style: string;
}

export default function TinyButton({ id, name, type, children, onClick, style }: TinyButtonProps) {
	return (
		<button
			className={`btn btn-xs border-none hover:bg-secondary-1 ${GetStyle(style)}`}
			id={id}
			name={name}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
