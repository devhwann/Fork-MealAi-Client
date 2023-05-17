import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { feedsApi } from "@/api/feeds";
import { authApi } from "@/api/auth";
import { FilterType, GetFeedsParamsTypes } from "@/types/feeds/feedsRequestTypes";
import { GetFeedsResponseTypes, GetFeedsTypes } from "@/types/feeds/feedsResponseTypes";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";

const Feeds = () => {
	const navigate = useNavigate();

	// 로그인 여부 확인
	const isLoggedIn = useRecoilValue(isLoggedInState);

	const [feeds, setFeeds] = useState<GetFeedsTypes[]>([]);
	const [popularFeeds, setPopularFeeds] = useState<GetFeedsTypes[]>([]);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
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
		let data: AxiosResponse<GetFeedsResponseTypes>;
		try {
			const params: GetFeedsParamsTypes = { page: page, per_page: 3, filter: "popularity", goal: "all" };
			data = await feedsApi.getFeedsRequest("api/feeds", params);
			setPopularFeeds(data.data.feeds);
		} catch (err) {
			alert("인기 랭킹을 불러올 수 없습니다!");
		}
	};

	// 식단피드 조회 api
	const getFeeds = async () => {
		let data: AxiosResponse<GetFeedsResponseTypes>;
		try {
			const params: GetFeedsParamsTypes = { page: page, per_page: 10, filter: filter, goal: filterGoal };
			data = await feedsApi.getFeedsRequest("/api/feeds", params);

			// handleFilterChange, handleGoal이 실행되어 page가 1이 되면 새롭게 피드를 불러옴
			if (page === 1) {
				setFeeds(data.data.feeds);
			} else {
				setFeeds((prev) => [...prev, ...data.data.feeds]);
			}

			// 서버에서 다음 페이지가 있는지 확인.
			setHasNextPage(data.data.next_page);
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
		// 감지 대상이나 다음 페이지가 없으면 return
		if (!observerTarget.current || !hasNextPage) return;

		const io = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				setPage((page) => page + 1);
			}
		});
		io.observe(observerTarget.current);

		return () => io.disconnect();
	}, [hasNextPage]);

	// 전체 피드 좋아요버튼
	const toggleLike = async (i: number, feedId: number) => {
		if (!isLoggedIn) {
			navigate("../auth/sign-in");
			return;
		}

		const copyFeeds = [...feeds!];
		copyFeeds[i].my_like = !feeds![i].my_like;
		setFeeds(copyFeeds);

		const patchLikes = await feedsApi.updateLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			await authApi.createLogoutRequest("/api/auth/logout");
			localStorage.clear();
		}
	};

	// 인기 피드 좋아요버튼
	const popularToggleLike = async (i: number, feedId: number) => {
		if (!isLoggedIn) {
			navigate("../auth/sign-in");
			return;
		}

		const copyFeeds = [...popularFeeds!];
		copyFeeds[i].my_like = !popularFeeds![i].my_like;
		setPopularFeeds(copyFeeds);

		const patchLikes = await feedsApi.updateLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			await authApi.createLogoutRequest("/api/auth/logout");
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
					<div className="flex gap-6">
						{popularFeeds &&
							popularFeeds.map((v, i) => {
								return (
									<Thumb
										src={v.image_url}
										id={v.feed_id}
										size="md"
										type="like"
										isLike={v.my_like}
										onClick={() => popularToggleLike(i, v.feed_id)}
										key={v.feed_id}
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
			{feeds && feeds.length === 0 && (
				<div className="text-center mt-12">
					<p className="mb-4 font-bold text-gray-3">해당 목표로 설정된 피드가 없습니다😥</p>
				</div>
			)}
			<div className="flex flex-wrap w-1200 mt-8 gap-6 feedBox">
				{feeds &&
					feeds.map((v, i) => {
						return (
							<Thumb
								src={v.image_url}
								id={v.feed_id}
								size="md"
								type="like"
								isLike={v.my_like}
								onClick={() => toggleLike(i, v.feed_id)}
								key={v.feed_id}
							/>
						);
					})}
			</div>
			{hasNextPage && <div ref={observerTarget}></div>}
		</div>
	);
};

export default Feeds;
