import Thumb, { ThumbnailProps } from "../atoms/thumbnail/Thumbnail";
import EditIcon from "@/assets/icon_food_edit.svg";
import DeleteIcon from "@/assets/icon_food_delete.svg";

interface FoodCardProps extends ThumbnailProps {
	name: string;
	isEdit: boolean;
	editModal?: () => void;
	deleteModal?: () => void;
}

interface FoodCardButtonProps {
	role?: "edit" | "delete";
	onClick?: () => void;
}

const FoodCardButton = ({ role, onClick }: FoodCardButtonProps) => {
	return (
		<button className="p-2 border border-solid border-gray-7 rounded-lg hover:bg-gray-9" onClick={onClick}>
			<img src={role === "edit" ? EditIcon : DeleteIcon} />
		</button>
	);
};

/*
src, size, type : 이미지 썸네일 관련 props
name : 음식 이름
isEdit : 수정/삭제 여부
editModal, deleteModal : 수정/삭제 모달

*/
const FoodCard = ({ src, size, type, name, isEdit, editModal, deleteModal }: FoodCardProps) => {
	return (
		<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
			<Thumb src={src} size={size} type={type} />
			<p className="mt-4 mb-2 font-semibold text-gray-2">{name}</p>
			{isEdit && (
				<div className="flex justify-end gap-1">
					<FoodCardButton role="edit" onClick={editModal} />
					<FoodCardButton role="delete" onClick={deleteModal} />
				</div>
			)}
		</div>
	);
};

export default FoodCard;
