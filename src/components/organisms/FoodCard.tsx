import Thumb, { ThumbnailProps } from "../atoms/thumbnail/Thumbnail";
import EditIcon from "@/assets/icon_food_edit.svg";
import DeleteIcon from "@/assets/icon_food_delete.svg";
import Modal from "./Modal";
import Input from "../atoms/inputs/Input";
import TinyButton from "../atoms/buttons/TinyButton";
import BasicButton from "../atoms/buttons/BasicButton";

interface FoodCardProps extends ThumbnailProps {
	name: string;
	weight: number;
	handleEditModal: () => void;
	handleDeleteModal: () => void;
	handleSearchModal: () => void;
	editModalState?: boolean;
	deleteModalState?: boolean;
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

const FoodCard = ({
	src,
	size,
	type,
	name,
	weight,
	handleEditModal,
	handleDeleteModal,
	handleSearchModal,
	editModalState,
	deleteModalState,
}: FoodCardProps) => {
	return (
		<>
			<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
				<Thumb src={src} size={size} type={type} />
				<p className="mt-4 mb-2 font-semibold text-gray-2">{name}</p>
				<div className="flex justify-end gap-1">
					<FoodCardButton role="edit" onClick={handleEditModal} />
					<FoodCardButton role="delete" onClick={handleDeleteModal} />
				</div>
			</div>

			{editModalState && (
				<Modal onClose={handleEditModal} title="수정">
					<div className="mb-6 flex gap-4">
						<Thumb src={src} size="sm" type="none" />
						<div className="w-60 flex flex-col gap-3">
							<div onClick={handleSearchModal}>
								<Input type="text" name="name" id="name" value={name} placeholder="음식명" onChange={() => {}} />
							</div>
							<div>
								<Input type="number" name="weight" id="weight" value={weight} placeholder="중량" onChange={() => {}} />
							</div>
							<div className="flex justify-between">
								<p className="text-sm text-gray-4">다른 음식인가요?</p>
								<TinyButton type="button" onClick={handleSearchModal} style="gray" deactivated={false}>
									음식 검색
								</TinyButton>
							</div>
						</div>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleEditModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={() => {}} width={false} style="primary">
							수정 완료
						</BasicButton>
					</div>
				</Modal>
			)}
			{deleteModalState && (
				<Modal onClose={handleDeleteModal} title="삭제">
					<div className="mb-6">정말 삭제하시겠어요?</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleDeleteModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={() => {}} width={false} style="gray">
							삭제
						</BasicButton>
					</div>
				</Modal>
			)}
		</>
	);
};

export default FoodCard;
