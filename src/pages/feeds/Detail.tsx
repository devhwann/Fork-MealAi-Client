import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import FoodCardViewOnly from "@/components/organisms/FoodCardViewOnly";
import getMealTime from "@/utils/getMealTime";
import LikeWithCount from "@/components/organisms/LikeWithCount";
import GoalText from "@/components/organisms/GoalText";

import PrevIcon from "@/assets/icon_prev.svg";
import NextIcon from "@/assets/icon_next.svg";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기
import ArrowButton from "@/components/atoms/buttons/ArrowButton";

// TODO : 유저 여부에 따라 하단 버튼 구성 다르게 하기
// TODO : 나의 피드 -> 목록/수정/삭제 , 타인의 피드 -> 목록

// 임시 데이터, 임시 interface
interface TempProps {
	nickname: string;
	date: string;
	goal: string;
	mealTime?: "B" | "L" | "D" | "S";
}
const temp: TempProps = {
	nickname: "황금늑대",
	date: "2023-04-27",
	goal: "balance",
	mealTime: "B",
};

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [isLike, setIsLike] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);
	const handleDeleteModal = () => setDeleteModal(!deleteModal);

	return (
		<>
			<div className="flex justify-center gap-36">
				<ArrowButton direction="prev" onClick={() => {}} />
				<div className="w-fit">
					<div className="pt-20 mb-10 flex justify-between items-center">
						<h1>
							{temp.nickname}님의 {getMealTime(temp.mealTime)}
						</h1>
						<LikeWithCount
							isLike={isLike}
							onClick={() => {
								setIsLike(!isLike);
							}}
							count={13}
						/>
					</div>
					<div className="flex gap-6 mb-10">
						<Thumb src={TempImage} size="lg" type="none" />
						<div>
							<div className="flex gap-4 items-center mb-6">
								<p className="text-lg font-bold text-gray-4">{temp.date}</p>
								<GoalText goal="balance" />
							</div>
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
						<FoodCardViewOnly src={TempImage} size="sm" type="none" name={"치킨"} weight={200} />
					</div>
					<div className="flex justify-center gap-2 mt-14">
						<BasicButton
							type="button"
							onClick={() => {
								navigate(-1);
							}}
							width={false}
							style="primary"
						>
							목록
						</BasicButton>
						<BasicButton
							type="button"
							onClick={() => {
								navigate(`/feeds/${id}/edit`);
							}}
							width={false}
							style="bg"
						>
							수정
						</BasicButton>
						<BasicButton type="button" onClick={handleDeleteModal} width={false} style="bg">
							삭제
						</BasicButton>
					</div>
				</div>
				<ArrowButton direction="next" onClick={() => {}} />
			</div>

			{deleteModal && (
				<Modal onClose={handleDeleteModal} title="피드 삭제">
					<div className="mb-6">정말 삭제하시겠어요? 삭제 후 되돌릴 수 없습니다.</div>
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

export default Detail;
