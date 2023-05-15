import Thumb, { ThumbnailProps } from "../atoms/thumbnail/Thumbnail";
import EditIcon from "@/assets/icon_food_edit.svg";
import DeleteIcon from "@/assets/icon_food_delete.svg";
import Modal from "./Modal";
import Input from "../atoms/inputs/Input";
import TinyButton from "../atoms/buttons/TinyButton";
import BasicButton from "../atoms/buttons/BasicButton";
import { ChangeEvent, Ref, useEffect, useState } from "react";
import { FoodsTypes, GetSearchFoodTypes } from "@/types/feeds/feedsResponseTypes";
import SearchInput from "../atoms/inputs/SearchInput";
import SearchResult from "./SearchResult";

interface FoodCardProps extends ThumbnailProps {
	index: number;
	foodId: number;
	name: string;
	weight: number;
	handleEditModal: (id: number) => void;
	handleDeleteModal: (id: number) => void;
	handleEditSearchModal: (id: number) => void;
	editModalState?: number | null;
	deleteModalState?: number | null;
	editSearchModalState?: number | null;
	foodCards: FoodsTypes[];
	searchKeyWord: string;
	searchInputRef: Ref<HTMLInputElement>;
	keyWordResults: GetSearchFoodTypes[];
	handleFoodCards: (foodCards: FoodsTypes[]) => void;
	handleInputKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
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
	handleEditSearchModal,
	editModalState,
	deleteModalState,
	editSearchModalState,
	foodCards,
	searchKeyWord,
	searchInputRef,
	keyWordResults,
	handleFoodCards,
	handleInputKeyword,
	handleSearch,
}: FoodCardProps) => {
	const [newFoodId, setNewFoodId] = useState(foodId);
	const [newName, setNewName] = useState(name);
	const [newWeight, setNewWeight] = useState(weight);

	useEffect(() => {
		setNewFoodId(foodId);
		setNewName(name);
		setNewWeight(weight);
	}, [foodCards]);

	const handleSearchForFoodToModify = (v: GetSearchFoodTypes) => {
		setNewFoodId(v.food_id);
		setNewName(v.name);
		handleEditSearchModal(index);
	};

	const handleChangeWeight = (e: number) => {
		setNewWeight(e);
	};

	const confirmEdit = (newName: string, newWeight: number) => {
		const currentCards = [...foodCards];
		currentCards[index - 1].food_id = newFoodId;
		currentCards[index - 1].food_name = newName;
		currentCards[index - 1].weight = newWeight;
		handleFoodCards(currentCards);
		handleEditModal(index);
	};

	const confirmDelete = () => {
		const currentCards = [...foodCards];
		currentCards.splice(index - 1, 1);
		handleFoodCards(currentCards);
		handleDeleteModal(index);
	};

	return (
		<>
			<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
				<Thumb src={src} size={size} type={type} />
				<p className="mt-4 mb-2 font-semibold text-gray-2">{name}</p>
				<div className="flex justify-end gap-1">
					<FoodCardButton role="edit" onClick={() => handleEditModal(foodId)} />
					<FoodCardButton role="delete" onClick={() => handleDeleteModal(foodId)} />
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
							<div onClick={() => handleEditSearchModal(index)}>
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
								<TinyButton type="button" onClick={() => handleEditSearchModal(index)} style="gray" deactivated={false}>
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
			{deleteModalState === index && (
				<Modal onClose={() => handleDeleteModal(index)} title="삭제">
					<div className="mb-6">정말 삭제하시겠어요?</div>
					<div className="flex justify-center gap-2">
						<BasicButton
							type="button"
							onClick={() => {
								handleDeleteModal(index);
							}}
							width={false}
							style="bg"
						>
							취소
						</BasicButton>
						<BasicButton
							type="button"
							onClick={() => {
								confirmDelete();
								handleDeleteModal(index);
							}}
							width={false}
							style="gray"
						>
							삭제
						</BasicButton>
					</div>
				</Modal>
			)}
			{editSearchModalState === index && (
				<Modal
					onClose={() => {
						handleEditSearchModal(index);
					}}
					title="음식 검색"
				>
					<SearchInput
						name="search"
						id="search"
						value={searchKeyWord}
						onClick={handleSearch}
						ref={searchInputRef}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							handleInputKeyword(e);
						}}
					/>
					<SearchResult
						data={keyWordResults}
						onClick={(v) => {
							handleSearchForFoodToModify(v);
						}}
					/>
				</Modal>
			)}
		</>
	);
};

export default FoodCard;
