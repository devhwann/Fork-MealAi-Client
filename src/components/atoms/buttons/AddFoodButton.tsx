import AddIcon from "@/assets/icon_food_add.svg";

interface AddFoodButtonProps {
	onClick: () => void;
}

const AddFoodButton = ({ onClick }: AddFoodButtonProps) => {
	return (
		<div>
			<button
				className="w-184 h-258 p-4 border border-solid border-gray-7 rounded-lg flex justify-center items-center hover:bg-gray-9"
				onClick={onClick}
			>
				<div className="flex flex-col gap-6">
					<div className="flex justify-center">
						<img src={AddIcon} />
					</div>
					<p className="text-sm text-gray-6">음식 추가</p>
				</div>
			</button>
		</div>
	);
};

export default AddFoodButton;
