import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { feedsApi } from "@/api/feeds";
import { GetFeedsTypes } from "@/types/feeds/feedsRequestTypes";
import { GetFeedsResponseTypes } from "@/types/feeds/feedsResponseTypes";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";

const Feeds = () => {
	const navigate = useNavigate();

	// 로그인 여부 확인
	const isLoggedin = useRecoilValue(isLoggedInState);

	const [currentPage, setCurrentPage] = useState(1);
	const [feeds, setFeeds] = useState<GetFeedsResponseTypes[]>([]);

	// // 인피니트 스크롤 설정
	// const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
	// 	console.log(`감지결과 : ${isIntersecting}`);
	// 	// setCurrentPage((page) => page + 1);
	// };
	// const { setRef } = useIntersectionObserver({ onIntersect });

	// 최신순 인기순 필터 & 목표 검색 카테고리
	const [filter, setFilter] = useState("newest");
	const [filterGoal, setFilterGoal] = useState("all");

	// api request params
	const params: GetFeedsTypes = { page: currentPage, per_page: 10, filter: filter, goal: filterGoal };

	function handleGoal(e: ChangeEvent<HTMLSelectElement>) {
		setFilterGoal(e.target.value);
	}

	// 처음 진입시 전체 피드 불러오기(최신순&모든 목표)
	useEffect(() => {
		const getAllFeeds = async () => {
			let data;
			try {
				data = await feedsApi.getFeedsRequest("/api/feeds", params);
				setFeeds(data.data);
				console.log("전체 피드(최신순&모든 목표) 불러오기 성공!");
			} catch (err) {
				alert(data.response.data.message);
			}
		};
		getAllFeeds();
	}, []);

	// 피드 불러오기
	useEffect(() => {
		const getFeeds = async () => {
			let data;
			try {
				data = await feedsApi.getFeedsRequest("/api/feeds", params);
				setFeeds(data.data);
				console.log("필터별 피드 불러오기 성공!");
			} catch (err) {
				alert(data.response.data.message);
			}
		};
		getFeeds();
	}, [params.filter, params.goal]);

	// 좋아요버튼
	const toggleLike = async (i: number, feedId: number) => {
		if (!isLoggedin) {
			navigate("../auth/sign-in");
			return;
		}

		const copyFeeds = [...feeds!];
		copyFeeds[i].my_like = !feeds![i].my_like;
		setFeeds(copyFeeds);

		await feedsApi.patchLikesRequest(`/api/feeds/likes/${feedId}`);
		return;
	};

	// 최신순, 인기순 클릭시 색상 변경
	const [clickNewest, setClickNewest] = useState(true);
	const [clickPopularity, setClickPopularity] = useState(false);

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
						<Thumb
							src={null}
							id={1}
							size="md"
							type="like"
							isLike={false}
							onClick={() => {}}
							// TODO : map 돌릴 때 밑에 두 개로 대체하세요
							// isLike={v.my_like}
							// onClick={() => toggleLike(i, v.feed_id)}
						/>
						<Thumb
							src={null}
							id={1}
							size="md"
							type="like"
							isLike={false}
							onClick={() => {}}
							// TODO : map 돌릴 때 밑에 두 개로 대체하세요
							// isLike={v.my_like}
							// onClick={() => toggleLike(i, v.feed_id)}
						/>
						<Thumb
							src={null}
							id={1}
							size="md"
							type="like"
							isLike={false}
							onClick={() => {}}
							// TODO : map 돌릴 때 밑에 두 개로 대체하세요
							// isLike={v.my_like}
							// onClick={() => toggleLike(i, v.feed_id)}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-between w-1200 items-center">
				<h4 className="mr-771">식단 피드</h4>
				<div className="flex gap-6">
					<button
						className={`text-gray-5 font-bold ${clickNewest ? "text-primary-1" : ""}`}
						onClick={() => {
							setFilter("newest");
							setClickNewest(true);
							setClickPopularity(false);
						}}
					>
						최신순
					</button>
					<p>|</p>
					<button
						className={`text-gray-5 font-bold ${clickPopularity ? "text-primary-1" : ""}`}
						onClick={() => {
							setFilter("popularity");
							setClickPopularity(true);
							setClickNewest(false);
						}}
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
			{/* ref={setRef} */}
			<div className="flex flex-wrap w-1200 mt-8 gap-6">
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
								key={i}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Feeds;
