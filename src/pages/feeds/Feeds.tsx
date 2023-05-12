import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { feedsApi } from "@/api/feeds";
import { FilterType, GetFeedsTypes } from "@/types/feeds/feedsRequestTypes";
import { GetFeedsResponseTypes } from "@/types/feeds/feedsResponseTypes";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";

const Feeds = () => {
	const navigate = useNavigate();

	// 로그인 여부 확인
	const isLoggedIn = useRecoilValue(isLoggedInState);

	const [feeds, setFeeds] = useState<GetFeedsResponseTypes[]>([]);
	const [popularFeeds, setPopularFeeds] = useState<GetFeedsResponseTypes[]>([]);
	const [page, setPage] = useState(1);
	const [hashNextPage, setHashNextPage] = useState<boolean>(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	// 최신순 인기순 필터 & 목표 검색 카테고리
	const [filter, setFilter] = useState<FilterType>("newest");
	const [filterGoal, setFilterGoal] = useState("all");

	function handleFilterChange(targetFilterName: FilterType) {
		setFilter(targetFilterName);
		setPage(1);
	}

	function handleGoal(e: ChangeEvent<HTMLSelectElement>) {
		setFilterGoal(e.target.value);
		setPage(1);
	}

	// 인기랭킹 조회 api
	const getPopularFeeds = async () => {
		let data: any;
		try {
			const params: GetFeedsTypes = { page: page, per_page: 3, filter: "popularity", goal: "all" };
			data = await feedsApi.getFeedsRequest("api/feeds", params);
			console.log(data);
			setPopularFeeds(data.data.feeds);
		} catch (err) {
			alert("인기 랭킹을 불러올 수 없습니다!");
		}
	};

	// 식단피드 조회 api
	const getFeeds = async () => {
		let data: any;
		try {
			const params: GetFeedsTypes = { page: page, per_page: 10, filter: filter, goal: filterGoal };
			data = await feedsApi.getFeedsRequest("/api/feeds", params);
			// TODO : 해결해야 함!
			/**
			 * 스크롤을 내려서 옵저버가 다음 데이터를 인식하면 새로 api 요청을 해서 데이터를 받아와서 기존꺼에 붙임. -> OK
			 * 필터 클릭하면 피드를 아예 새로 setFeeds에 넣어줘야하는데 기존꺼 뒤에 붙이고 있음... -> BAD
			 */
			setFeeds((prev) => [...prev, ...data.data.feeds]);
			// setFeeds(data.data.feeds);
			// 서버에서 다음 페이지가 있는지 boolean 받음.
			setHashNextPage(data.data.next_page);
			// console.log(data.data.next_page);
			// console.log(hashNextPage);
			console.log("피드 불러오기 성공!");
		} catch (err) {
			alert("피드를 불러올 수 없습니다!");
		}
	};

	// 최초 진입시 인기랭킹 피드 실행 (실시간 변동 반영 안함)
	useEffect(() => {
		getPopularFeeds();
	}, []);

	// 최초 진입시 getFeeds 실행
	useEffect(() => {
		getFeeds();
	}, [page, filter, filterGoal]);

	// Infinite Scroll - Intersection Observer 구현
	useEffect(() => {
		// observerTarget.current와 hashNextPage가 모두 truthy일 때만 실행
		if (!observerTarget.current || !hashNextPage) return;

		const io = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				setPage((page) => page + 1);
			}
		});
		io.observe(observerTarget.current);

		return () => io.disconnect();
	}, [hashNextPage]);

	// 좋아요버튼
	const toggleLike = async (i: number, feedId: number) => {
		if (!isLoggedIn) {
			navigate("../auth/sign-in");
			return;
		}

		const copyFeeds = [...feeds!];
		copyFeeds[i].my_like = !feeds![i].my_like;
		setFeeds(copyFeeds);

		const patchLikes = await feedsApi.patchLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			localStorage.clear();
		}
	};

	return (
		<div className="flex flex-col items-center mt-20">
			<h1 className="mb-14">식단톡</h1>
			<div className="w-1200 h-80 mb-14 bg-bg-1 rounded-2xl flex justify-center items-center">
				<div className="flex items-center gap-67">
					<div>
						<div className="flex gap-3 mb-4">
							<h2 className="text-gray-1">인기 랭킹</h2>
							<h2 className="text-primary-1">TOP 3</h2>
						</div>
						<p className="text-gray-1 text-xl">가장 많은 💛를 받은 인기 식단이에요!</p>
					</div>
					{/* TODO : API 명세 받은 후 map함수 돌려서 상위 3개 적용 */}
					<div className="flex gap-6">
						{popularFeeds &&
							popularFeeds?.map((v, i) => {
								return (
									<Thumb
										src={v.image_url}
										id={v.feed_id}
										size="md"
										type="like"
										isLike={v.my_like}
										onClick={() => toggleLike(i, v.feed_id)}
										key={i}
									/>
								);
							})}
					</div>
				</div>
			</div>
			<div className="flex justify-between w-1200 items-center">
				<h4 className="mr-771">식단 피드</h4>
				<div className="flex gap-6">
					<button
						className={`text-gray-5 font-bold ${filter === "newest" && "text-primary-1"}`}
						onClick={() => handleFilterChange("newest")}
					>
						최신순
					</button>
					<p>|</p>
					<button
						className={`text-gray-5 font-bold ${filter === "popularity" && "text-primary-1"}`}
						onClick={() => handleFilterChange("popularity")}
					>
						인기순
					</button>
				</div>
				<>
					<select className="select select-bordered max-w-xs ml-9" onChange={handleGoal} defaultValue="all">
						<option value="all">모두 보기</option>
						<option value="balance">균형잡힌 식단</option>
						<option value="diet">다이어트</option>
						<option value="muscle">근력보강</option>
						<option value="lchf">키토제닉</option>
					</select>
				</>
			</div>
			<div className="flex flex-wrap w-1200 mt-8 gap-6 feedBox">
				{feeds &&
					feeds?.map((v, i) => {
						return (
							<Thumb
								src={v.image_url}
								id={v.feed_id}
								size="md"
								type="like"
								isLike={v.my_like}
								onClick={() => toggleLike(i, v.feed_id)}
								key={i}
							/>
						);
					})}
			</div>
			{/* {hashNextPage && <div ref={observerTarget}></div>} */}
			<div ref={observerTarget}></div>
		</div>
	);
};

export default Feeds;
