import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import FoodCard from "@/components/organisms/FoodCard";
import AddFoodButton from "@/components/atoms/buttons/AddFoodButton";
import Modal from "@/components/organisms/Modal";
import SearchInput from "@/components/atoms/inputs/SearchInput";
import SearchResult from "@/components/organisms/SearchResult";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import ToggleButton from "@/components/atoms/buttons/ToggleButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";

import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기

// 검색 결과 임시 데이터
const temp = [
	"리조또",
	"크림 리조또",
	"해물 리조또",
	"투움바 리조또",
	"어쩌구 리조또",
	"리조또",
	"크림 리조또",
	"해물 리조또",
	"투움바 리조또",
	"어쩌구 리조또",
	"리조또",
	"크림 리조또",
	"해물 리조또",
	"투움바 리조또",
	"어쩌구 리조또",
];

const Result = () => {
	const navigate = useNavigate();

	// 토글버튼
	const [isChecked, setIsChecked] = useState(true);

	// 모달
	const [editModal, setEditModal] = useState(false);
	const handleEditModal = () => setEditModal(!editModal);

	const [deleteModal, setDeleteModal] = useState(false);
	const handleDeleteModal = () => setDeleteModal(!deleteModal);

	const [searchModal, setSearchModal] = useState(false);
	const handleSearchModal = () => setSearchModal(!searchModal);

	const [registerModal, setRegisterModal] = useState(false);
	const onRegisterModal = () => setRegisterModal(!registerModal);
	const offRegisterModal = () => setRegisterModal(!registerModal);

	return (
		<>
			<div className="flex justify-center">
				<div className="w-fit">
					<h1 className="pt-20 mb-10">분석 결과</h1>
					<div className="flex gap-6 mb-10">
						<Thumb src={TempImage} size="lg" type="none" />
						<div>
							<p className="text-lg font-bold text-gray-4 mb-6">2023.04.27 아침</p>
							<h4 className="mb-4">영양소 정보</h4>
							<div className="w-96 p-8 border-solid border border-gray-7 rounded-lg">
								<p className="text-sm text-gray-5 mb-6 text-right">일일 영양 섭취량 대비</p>
								<HorizontalProgressBars
									kcalValue={982}
									kcalMax={2200}
									carboValue={8}
									carboMax={113}
									proteinValue={25}
									proteinMax={20}
									fatValue={12}
									fatMax={16}
								/>
							</div>
						</div>
					</div>
					<h4 className="mb-4">상세 식단</h4>
					<div className="flex gap-6 items-start">
						<FoodCard
							src={TempImage}
							size="sm"
							type="none"
							name={"치킨"}
							weight={200}
							handleEditModal={handleEditModal}
							handleDeleteModal={handleDeleteModal}
							handleSearchModal={handleSearchModal}
							editModalState={editModal}
							deleteModalState={deleteModal}
						/>

						<AddFoodButton onClick={onRegisterModal} />
					</div>
					<div className="flex justify-center">
						<div className="mt-14 w-96 flex flex-col items-center gap-4">
							<ToggleButton
								isChecked={isChecked}
								onChange={() => {
									setIsChecked(!isChecked);
								}}
							/>
							<BasicButton
								type="button"
								onClick={() => {
									navigate("/mylog");
								}}
								width={true}
								style="primary"
							>
								분석 완료
							</BasicButton>
						</div>
					</div>
				</div>
			</div>

			{registerModal && (
				<Modal onClose={offRegisterModal} title="추가">
					<div className="mb-6">추가하는 모달</div>
				</Modal>
			)}

			{searchModal && (
				<Modal onClose={handleSearchModal} title="검색">
					<SearchInput name="search" id="search" value="" onChange={() => {}} onClick={() => {}} />
					<SearchResult data={temp} onClick={() => {}} />
				</Modal>
			)}
		</>
	);
};

export default Result;
