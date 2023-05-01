import { useState, ReactNode } from "react";
import CloseButton from "../atoms/buttons/CloseButton";

interface ModalProps {
	children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const handleClose = () => setIsOpen(false);
	return (
		<div>
			{isOpen && (
				<div>
					{children}
					<CloseButton onClick={handleClose} />
				</div>
			)}
		</div>
	);
};

export default Modal;
