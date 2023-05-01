import CloseIcon from "@/assets/icon_close.svg";

export interface CloseButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
	return (
		<div>
			<button onClick={onClick}>
				<img src={CloseIcon} />
			</button>
		</div>
	);
};

export default CloseButton;
