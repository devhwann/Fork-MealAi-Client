import Thumb, { ThumbnailProps } from "@atoms/thumbnail/Thumbnail";
import EditIcon from "@/assets/icon_food_edit.svg";
import DeleteIcon from "@/assets/icon_food_delete.svg";

interface FoodCardProps extends ThumbnailProps {
	isEdit: boolean;
	onClick?: () => void;
}

// type, onclick,
const FoodCardButton = () => {
	return (
		<button className="p-2 border border-solid border-gray-7 rounded-lg">
			<img src={EditIcon} />
		</button>
	);
};

const FoodCard = ({ src, size, type, isEdit, onClick }: FoodCardProps) => {
	return (
		<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
			<Thumb src={src} size={size} type={type} />
			<p className="mt-4 mb-2 font-semibold text-gray-2">text</p>
			{isEdit && (
				<div className="flex justify-end gap-1">
					<button className="p-2 border border-solid border-gray-7 rounded-lg">
						<img src={EditIcon} />
					</button>
					<button className="p-2 border border-solid border-gray-7 rounded-lg">
						<img src={DeleteIcon} />
					</button>
				</div>
			)}
		</div>
	);
};

export default FoodCard;
