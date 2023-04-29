import { ReactNode } from "react";
import

interface RadioButtonProps {
	id?: string;
	name?: string;
	value?: string;
	type: "radio";
	children: ReactNode;
	onChange: () => void;
}
