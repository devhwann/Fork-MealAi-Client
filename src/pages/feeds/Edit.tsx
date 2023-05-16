import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { feedsApi } from "@/api/feeds";
import getMealTime from "@/utils/getMealTime";
import {
	FoodsTypes,
	GetFeedsTypes,
	GetSearchFoodTypes,
	UserDailyNutrientTypes,
} from "@/types/feeds/feedsResponseTypes";
import { EditFeedTypes } from "@/types/feeds/feedsRequestTypes";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import FoodCard from "@/components/organisms/FoodCard";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Modal from "@/components/organisms/Modal";
import SearchInput from "@/components/atoms/inputs/SearchInput";
import SearchResult from "@/components/organisms/SearchResult";
import ToggleButton from "@/components/atoms/buttons/ToggleButton";
import AddFoodButton from "@/components/atoms/buttons/AddFoodButton";

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// data set
	const [feedDetail, setFeedDetail] = useState<GetFeedsTypes>();
	const [foodCards, setFoodCards] = useState<FoodsTypes[]>([]);
	const [isOpen, setIsOpen] = useState(true);
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
	useEffect(() => {
		if (!isMine) {
			alert("올바르지 않은 접근입니다!");
			navigate("/");
		}
	}, [isMine]);

	// 데이터 불러오기
	useEffect(() => {
		const getFeed = async () => {
			const data = await feedsApi.getFeedRequest(`/api/feeds/${id}`);

			if (data.status === 200) {
				setFeedDetail(data.data);
				setFoodCards(data.data.foods);
				setIsMine(data.data.is_mine);
				setIsOpen(data.data.open);
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

	// 검색
	const [searchKeyWord, setSearchKeyWord] = useState<string>("");
	const [keyWordResults, setKeyWordResults] = useState<GetSearchFoodTypes[]>([]);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const handleInputKeyword = (e: ChangeEvent<HTMLInputElement>) => {
		const keyWord = e.target.value;
		setSearchKeyWord(keyWord);
	};

	const handleSearch = async () => {
		if (searchKeyWord.length === 0) {
			alert("검색어를 입력해주세요.");
			return;
		}

		const data = await feedsApi.getSearchFoodRequest(`/api/feeds/food/${searchKeyWord}`);

		if (data.status === 200) {
			setKeyWordResults(data.data);
		} else {
			alert("음식을 검색할 수 없습니다.");
		}
	};

	const handleFoodCards = (newFoodCards: FoodsTypes[]) => {
		setFoodCards(newFoodCards);
	};

	// enter키로 검색
	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// 모달
	const [editModal, setEditModal] = useState<number | null>(null);
	const handleEditModal = (id: number) => {
		if (!editModal) {
			setEditModal(id);
		} else {
			setEditModal(null);
		}
	};

	const [deleteModal, setDeleteModal] = useState<number | null>(null);
	const handleDeleteModal = (id: number) => {
		if (!deleteModal) {
			setDeleteModal(id);
		} else {
			setDeleteModal(null);
		}
	};

	const [editSearchModal, setEditSearchModal] = useState<number | null>(null);
	const handleEditSearchModal = (id: number) => {
		if (!editSearchModal) {
			setEditSearchModal(id);
		} else {
			setEditSearchModal(null);
			setSearchKeyWord("");
			setKeyWordResults([]);
		}
	};

	const [searchModal, setSearchModal] = useState(false);
	const handleSearchModal = () => {
		setSearchModal(!searchModal);
		setKeyWordResults([]);
	};

	// foodCards 배열의 변경이 감지될 때마다 바 그래프 업데이트
	useEffect(() => {
		async function getNutryData() {
			let data;
			try {
				data = await feedsApi.createSearchFoodRequst("/api/feeds/food", foodCards);

				if (data.status === 200) {
					setNutry(data.data);
				} else {
					alert(data.response.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getNutryData();
	}, [foodCards]);

	// 피드 수정
	const handleEditFeed = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!feedDetail) {
			alert("식단을 입력해주세요.");
			return;
		}
		const params: EditFeedTypes = {
			foods: foodCards,
			open: isOpen,
		};

		const data = await feedsApi.updateFeedRequest(`/api/feeds/${id}`, params);

		if (data.status === 200) {
			alert("식단 피드가 수정되었습니다.");
			navigate(`/feeds/${id}`);
		} else {
			alert("식단 수정을 할 수 없습니다.");
		}
	};

	// 새로운 식단 추가
	const handleSearchForNewFood = async (v: GetSearchFoodTypes) => {
		handleSearchModal();

		const newFoodCards = [...foodCards];
		newFoodCards.push({
			food_id: v.food_id,
			food_name: v.name,
			weight: v.weight,
			image_url: null,
		});
		handleFoodCards(newFoodCards);

		setSearchKeyWord("");
	};

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
					<div className="flex flex-wrap w-792 gap-5 items-start">
						{foodCards &&
							foodCards.map((v, i) => {
								return (
									<FoodCard
										key={i + 1}
										index={i + 1}
										foodId={v.food_id}
										src={v.image_url}
										size="sm"
										type="none"
										name={v.food_name}
										weight={v.weight}
										handleEditModal={() => handleEditModal(i + 1)}
										handleDeleteModal={() => handleDeleteModal(i + 1)}
										handleEditSearchModal={() => handleEditSearchModal(i + 1)}
										editModalState={editModal}
										deleteModalState={deleteModal}
										editSearchModalState={editSearchModal}
										foodCards={foodCards}
										searchKeyWord={searchKeyWord}
										searchInputRef={searchInputRef}
										keyWordResults={keyWordResults}
										handleFoodCards={handleFoodCards}
										handleInputKeyword={handleInputKeyword}
										handleSearch={handleSearch}
										onKeyPress={handleKeyPress}
									/>
								);
							})}
						<AddFoodButton onClick={handleSearchModal} />
					</div>
					<div className="flex justify-center mt-14 ">
						<div className="w-96 flex flex-col items-center gap-4">
							<ToggleButton
								isChecked={isOpen}
								onChange={() => {
									setIsOpen(!isOpen);
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
					<SearchInput
						name="search"
						id="search"
						value={searchKeyWord}
						onClick={handleSearch}
						onKeyPress={handleKeyPress}
						ref={searchInputRef}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setSearchKeyWord(e.target.value);
						}}
					/>
					<SearchResult data={keyWordResults} onClick={(v) => handleSearchForNewFood(v)} />
				</Modal>
			)}
		</>
	);
};

export default Edit;
