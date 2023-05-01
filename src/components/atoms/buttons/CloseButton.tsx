import CloseIcon from "@/assets/icon_close.svg";

export interface CloseButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
	return (
		<button onClick={onClick}>
			<img src={CloseIcon} />
		</button>
	);
};

export default CloseButton;
