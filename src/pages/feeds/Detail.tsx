import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { feedsApi } from "@/api/feeds";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import FoodCardViewOnly from "@/components/organisms/FoodCardViewOnly";
import getMealTime, { MealType } from "@/utils/getMealTime";
import LikeWithCount from "@/components/organisms/LikeWithCount";
import GoalText, { GoalType } from "@/components/organisms/GoalText";
import ArrowButton from "@/components/atoms/buttons/ArrowButton";

import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState } from "@/recoil/state";

// TODO : 유저 여부에 따라 하단 버튼 구성 다르게 하기
// TODO : 나의 피드 -> 목록/수정/삭제 , 타인의 피드 -> 목록

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// 로그인 여부 확인
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

	// data set
	const [nickname, setNickname] = useState("");
	const [mealTime, setMealTime] = useState<MealType>("breakfast");
	const [date, setDate] = useState("");
	const [goal, setGoal] = useState<GoalType>("balance");
	const [isLike, setIsLike] = useState(false);
	const [likeCount, setLikeCount] = useState<number>();

	// TODO : graph data set, 상세식단 카드 set
	const [nutry, setNutry] = useState({
		kcal: 0,
		carbohydrate: 0,
		protien: 0,
		fat: 0,
	});
	const [usersNutry, setUsersNutry] = useState({
		kcal: 0,
		carbohydrate: 0,
		protien: 0,
		fat: 0,
	});

	// 데이터 불러오기
	useEffect(() => {
		const getFeed = async () => {
			const data = await feedsApi.getFeedRequest(`/api/feeds/${id}`);

			if (data.status === 200) {
				console.log("data", data.data);
				setNickname(data.data.user_name);
				setMealTime(data.data.meal_time);
				setDate(data.data.date);
				setGoal(data.data.goal);
				setIsLike(data.data.my_like);
				setLikeCount(data.data.likes);
			} else {
				console.log("err", data);
				alert(data.response.data.message);
				navigate(-1);
			}
		};
		getFeed();
	}, []);

	// 좋아요버튼
	const toggleLike = async (feedId: number) => {
		if (!isLoggedIn) {
			navigate("../auth/sign-in");
			return;
		}

		if (isLike) {
			setLikeCount(likeCount! - 1);
			setIsLike(false);
		} else {
			setLikeCount(likeCount! + 1);
			setIsLike(true);
		}
		const patchLikes = await feedsApi.patchLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			setIsLoggedIn(false);
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			localStorage.clear();
		}
	};

	// 삭제 모달
	const [deleteModal, setDeleteModal] = useState(false);
	const handleDeleteModal = () => setDeleteModal(!deleteModal);

	return (
		<>
			<div className="flex justify-center gap-36">
				<ArrowButton direction="prev" onClick={() => {}} />
				<div className="w-fit">
					<div className="pt-20 mb-10 flex justify-between items-center">
						<h1>
							{nickname} 님의 {getMealTime(mealTime)}
						</h1>
						<LikeWithCount isLike={isLike} onClick={() => toggleLike(Number(id))} count={likeCount ? likeCount : 0} />
					</div>
					<div className="flex gap-6 mb-10">
						<Thumb src={TempImage} size="lg" type="none" />
						<div>
							<div className="flex gap-4 items-center mb-6">
								<p className="text-lg font-bold text-gray-4">{date}</p>
								<GoalText goal={goal} />
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
