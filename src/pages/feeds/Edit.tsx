import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { feedsApi } from "@/api/feeds";
import { GetFeedsTypes, UserDailyNutrientTypes } from "@/types/feeds/feedsResponseTypes";
import getMealTime from "@/utils/getMealTime";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import FoodCard from "@/components/organisms/FoodCard";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Modal from "@/components/organisms/Modal";
import SearchInput from "@/components/atoms/inputs/SearchInput";
import SearchResult from "@/components/organisms/SearchResult";
import ToggleButton from "@/components/atoms/buttons/ToggleButton";
import AddFoodButton from "@/components/atoms/buttons/AddFoodButton";
import { EditFeedTypes } from "@/types/feeds/feedsRequestTypes";

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

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// data set
	const [feedDetail, setFeedDetail] = useState<GetFeedsTypes>();
	const [foodCardArray, setFoodCardArray] = useState([]);
	const [isMine, setIsMine] = useState(true);
	const [nutry, setNutry] = useState<UserDailyNutrientTypes>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});
	const usersNutry = {
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	};

	// 작성자가 아니나 url을 입력하여 접근하는 경우를 방지
	// useEffect(() => {
	// 	if (!isMine) {
	// 		alert("올바르지 않은 접근입니다!");
	// 		navigate("/");
	// 	}
	// }, [isMine]);

	// 데이터 불러오기
	useEffect(() => {
		const getFeed = async () => {
			const data = await feedsApi.getFeedRequest(`/api/feeds/${id}`);

			if (data.status === 200) {
				console.log(data.data);
				setFeedDetail(data.data);
				setFoodCardArray(data.data.foods);
				setIsMine(data.data.is_mine);
				setNutry({
					kcal: data.data.kcal,
					carbohydrate: data.data.carbohydrate,
					protein: data.data.protein,
					fat: data.data.fat,
				}); // 피드영양정보
			} else {
				alert(data.response.data.message);
				navigate(-1);
			}
		};
		getFeed();
	}, []);

	// 카드 어레이 수정
	// get api 없음...
	// const newFoodArray = [...foodCardArray]
	// 수정 | 추가 | 삭제 작업 -> newFoodArray
	// setFoodCardArray(newFoodArray);

	// 피드 수정
	const handleEditFeed = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!feedDetail) {
			alert("식단을 입력해주세요.");
			return;
		}
		const params: EditFeedTypes = {
			// TODO : foods 배열 보내는 더 좋은 방법이 있을거야...
			// foods: [
			// 	{
			// 		food_id: feedDetail.foods[0].food_id,
			// 		food_name: feedDetail.foods[0].food_name,
			// 		image_url: feedDetail.foods[0].image_url,
			// 		weight: feedDetail.foods[0].weight,
			// 	},
			// ],
			foods: foodCardArray,
			open: feedDetail.open,
		};

		const data = await feedsApi.editFeedRequest(`/api/feeds/${id}`, params);

		if (data.status === 200) {
			alert("식단 피드가 수정되었습니다.");
			navigate(`/feeds/${id}`);
		} else {
			alert("식단 수정을 할 수 없습니다.");
		}
		console.log("상세 식단", foodCardArray);
	};

	// 토글버튼
	const [isChecked, setIsChecked] = useState(true);

	// 모달
	const [editModal, setEditModal] = useState(false);
	const handleEditModal = () => setEditModal(!editModal);

	const [deleteModal, setDeleteModal] = useState(false);
	const handleDeleteModal = () => setDeleteModal(!deleteModal);

	const [searchModal, setSearchModal] = useState(false);
	const handleSearchModal = () => setSearchModal(!searchModal);

	// 검색
	const [searchKeyWord, setSearchKeyWord] = useState<string>();
	const searchInputRef = useRef<HTMLInputElement>(null);

	function handleSearch() {
		const searchTextValue = searchInputRef?.current?.value as string;
		if (searchTextValue.length === 0) {
			alert("검색어를 입력해주세요.");
			return;
		}
		setSearchKeyWord(searchTextValue);
	}

	function handleSearchForFoodToModify() {
		console.log("선택한 음식으로 데이터 수정");
		handleSearchModal();
		setSearchKeyWord("");
	}

	function handleSearchForNewFood() {
		console.log("선택한 음식 추가");
		handleSearchModal();
		setSearchKeyWord("");
	}

	console.log("searchKeyWord", searchKeyWord);

	return (
		<>
			<div className="flex justify-center gap-36">
				<div className="w-fit">
					<div className="pt-20 mb-10 flex justify-between items-center">
						<h1>식단 수정</h1>
					</div>
					<div className="flex gap-6 mb-10">
						<Thumb src={feedDetail ? feedDetail.image_url : null} size="lg" type="none" />
						<div>
							<div className="flex gap-4 items-center mb-6">
								<p className="text-lg font-bold text-gray-4">{feedDetail?.date} </p>
								<p className="text-lg font-bold text-gray-4">
									{getMealTime(feedDetail ? feedDetail.meal_time : "breakfast")}
								</p>
							</div>
							<h4 className="mb-4">영양소 정보</h4>
							<div className="w-96 p-8 border-solid border border-gray-7 rounded-lg">
								<p className="text-sm text-gray-5 mb-6 text-right">일일 영양 섭취량 대비</p>
								<HorizontalProgressBars
									nutry={nutry}
									usersNutry={feedDetail ? feedDetail?.user_daily_nutrient : usersNutry}
								/>
							</div>
						</div>
					</div>
					{feedDetail && feedDetail.foods.length >= 1 && <h4 className="mb-4">상세 식단</h4>}
					<div className="flex flex-wrap justify-between w-792 gap-5 items-start">
						{feedDetail &&
							feedDetail.foods.map((v, i) => {
								return (
									<FoodCard
										key={v.food_id}
										src={v.image_url}
										size="sm"
										type="none"
										name={v.food_name}
										weight={v.weight}
										handleEditModal={handleEditModal}
										handleDeleteModal={handleDeleteModal}
										handleSearchModal={handleSearchModal}
										editModalState={editModal}
										deleteModalState={deleteModal}
									/>
								);
							})}
						<AddFoodButton onClick={handleSearchModal} />
					</div>
					<div className="flex justify-center mt-14 ">
						<div className="w-96 flex flex-col items-center gap-4">
							<ToggleButton
								isChecked={isChecked}
								onChange={() => {
									setIsChecked(!isChecked);
								}}
							/>
							<BasicButton type="button" onClick={handleEditFeed} width={true} style="primary">
								수정 완료
							</BasicButton>
						</div>
					</div>
				</div>
			</div>
			{searchModal && (
				<Modal
					onClose={() => {
						handleSearchModal();
						setSearchKeyWord("");
					}}
					title="음식 검색"
				>
					<SearchInput name="search" id="search" value={searchKeyWord} onClick={handleSearch} ref={searchInputRef} />
					<SearchResult
						data={temp}
						onClick={() => {
							if (editModal) {
								handleSearchForFoodToModify();
								return;
							}
							handleSearchForNewFood();
						}}
					/>
				</Modal>
			)}
		</>
	);
};

export default Edit;
