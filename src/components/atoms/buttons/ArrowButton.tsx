import PrevIcon from "@/assets/icon_prev.svg";
import NextIcon from "@/assets/icon_next.svg";

interface ArrowButtonProps {
	direction: "prev" | "next";
	onClick: () => void;
}

export function getIcon(direction: string) {
	switch (direction) {
		case "prev":
			return PrevIcon;
		case "next":
			return NextIcon;
	}
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
	return (
		<div className="my-auto select-none">
			<button onClick={onClick} className="transition ease-out hover:scale-125">
				<img src={getIcon(direction)} />
			</button>
		</div>
	);
};

export default ArrowButton;
