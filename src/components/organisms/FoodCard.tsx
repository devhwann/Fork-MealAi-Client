import Thumb, { ThumbnailProps } from "../atoms/thumbnail/Thumbnail";
import EditIcon from "@/assets/icon_food_edit.svg";
import DeleteIcon from "@/assets/icon_food_delete.svg";
import Modal from "./Modal";
import Input from "../atoms/inputs/Input";
import TinyButton from "../atoms/buttons/TinyButton";
import BasicButton from "../atoms/buttons/BasicButton";
import { useState } from "react";
import { FoodsTypes } from "@/types/feeds/feedsResponseTypes";

interface FoodCardProps extends ThumbnailProps {
	index: number;
	foodId: number;
	name: string;
	weight: number;
	handleEditModal: (id: number) => void;
	handleDeleteModal: () => void;
	handleSearchModal: () => void;
	editModalState?: number | null;
	deleteModalState?: boolean;
	foodCards: FoodsTypes[];
	handleFoodCards: (foodCards: FoodsTypes[]) => void;
}

interface FoodCardButtonProps {
	role?: "edit" | "delete";
	onClick?: () => void;
}

export const FoodCardButton = ({ role, onClick }: FoodCardButtonProps) => {
	return (
		<button className="p-2 border border-solid border-gray-7 rounded-lg hover:bg-gray-9" onClick={onClick}>
			<img src={role === "edit" ? EditIcon : DeleteIcon} />
		</button>
	);
};

const FoodCard = ({
	index,
	foodId,
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
	foodCards,
	handleFoodCards,
}: FoodCardProps) => {
	// const [modalName, setModalName] = useState(foodCards.filter((f) => f.food_id == editModalState)[0]?.food_name);
	// const modalName = foodCards.filter((f) => f.food_id == editModalState)[0]?.food_name;
	// const weight = foodCards.filter((f) => f.food_id == editModalState)[0]?.weight;

	// useEffect(() => {
	// 	setModalName(foodCards.filter((f) => f.food_id == editModalState)[0]?.food_name);
	// }, [foodCards]);

	const [newName, setNewName] = useState(name);
	const [newWeight, setNewWeight] = useState(weight);

	const handleChangeWeight = (e: number) => {
		setNewWeight(e);
	};

	const confirmEdit = (newName: string, newWeight: number) => {
		const currentCards = [...foodCards];
		currentCards[index - 1].food_name = newName;
		currentCards[index - 1].weight = newWeight;
		handleFoodCards(currentCards);
	};

	return (
		<>
			<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
				<Thumb src={src} size={size} type={type} />
				<p className="mt-4 mb-2 font-semibold text-gray-2">{name}</p>
				<div className="flex justify-end gap-1">
					<FoodCardButton role="edit" onClick={() => handleEditModal(foodId)} />
					<FoodCardButton role="delete" onClick={() => handleEditModal(foodId)} />
				</div>
			</div>

			{editModalState === index && (
				<Modal
					onClose={() => {
						handleChangeWeight(weight);
						handleEditModal(index);
					}}
					title="수정"
				>
					<div className="mb-6 flex gap-4">
						<Thumb src={src} size="sm" type="none" />
						<div className="w-60 flex flex-col gap-3">
							<div onClick={handleSearchModal}>
								<Input type="text" name="name" id="name" value={newName} placeholder="음식명" onChange={() => {}} />
							</div>
							<div>
								<Input
									type="number"
									name="weight"
									id="weight"
									value={newWeight}
									placeholder="중량"
									onChange={(e) => {
										handleChangeWeight(Number(e.target.value));
									}}
								/>
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
						<BasicButton
							type="button"
							onClick={() => {
								handleChangeWeight(weight);
								handleEditModal(index);
							}}
							width={false}
							style="bg"
						>
							취소
						</BasicButton>
						<BasicButton
							type="button"
							onClick={() => {
								confirmEdit(newName, newWeight);
							}}
							width={false}
							style="primary"
						>
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
