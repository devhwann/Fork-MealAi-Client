import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadContainer, IntroContainer } from "./Home.style";
import WhiteLogo from "@/assets/logo_white.svg";
import Logo from "@/assets/logo.svg";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";

import PeopleImage from "@/assets/image_intro_people.svg";
import Food1Image from "@/assets/image_intro_food1.svg";
import Food2Image from "@/assets/image_intro_food2.svg";
import Food3Image from "@/assets/image_intro_food3.svg";
import Food4Image from "@/assets/image_intro_food4.svg";

import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기

const Home = () => {
	const navigate = useNavigate();
	// 애니메이션
	const [currentScroll, setCurrentScroll] = useState<number>(0);
	window.onscroll = () => {
		const parentDiv = document.querySelector(".scroll_info");
		const viewportHeight = window.innerHeight;
		if (!parentDiv) return;
		const fromViewportToParentHeight = parentDiv.getBoundingClientRect().top;
		const scroll = viewportHeight - fromViewportToParentHeight;
		const divHeight = parentDiv.clientHeight;
		let scrollRate = (scroll / divHeight) * 100;
		if ((scroll / divHeight) * 100 < 0) {
			scrollRate = 0;
		} else if ((scroll / divHeight) * 100 > 100) {
			scrollRate = 100;
		}
		console.log(scrollRate);
		setCurrentScroll(scrollRate);
	};

	// 좋아요버튼
	const [isLike, setIsLike] = useState(false);

	return (
		<div>
			<HeadContainer>
				<div className="ml-96 select-none">
					<h1 className="text-white mb-3">나만의 맞춤 AI 영양사,</h1>
					<img src={WhiteLogo} width="214" height="50" />
					<button
						className="mt-10 bg-primary-1 rounded-full py-6 px-16 text-6 text-white font-bold duration-1000 ease-out hover:scale-105 hover:brightness-125 hover:drop-shadow-2xl"
						onClick={() => {
							navigate("/meal-ai");
						}}
					>
						식단 분석하러 가기
					</button>
				</div>
			</HeadContainer>
			<div className="scroll_info">
				<IntroContainer currentScroll={currentScroll}>
					<div className="w-3/5 h-full">
						<div className="intro_illust">
							<img src={PeopleImage} className="people_image" />
							<img src={Food1Image} className="food1_image" />
							<img src={Food2Image} className="food2_image" />
							<img src={Food3Image} className="food3_image" />
							<img src={Food4Image} className="food4_image" />
						</div>
					</div>
					<div className="text_anima">
						<h2 className="mb-6">
							매일 매일 하는 식사,
							<br />
							<span className="text-primary-1">‘잘’</span> 하고 계신가요?
						</h2>
						<div className="flex items-center gap-2 text_anima">
							<img src={Logo} width="94" height="22" />
							<p className="text-2xl text-gray-1 font-semibold">와 함께 식단 분석하고</p>
						</div>
						<p className="text-2xl text-gray-1 font-semibold text_anima">오늘보다 내일 더 건강하게 먹어봐요!</p>
					</div>
				</IntroContainer>
			</div>
			<div className="bg-wite text-center mt-40 flex flex-col items-center">
				<h2>
					다른 사람들은 뭐 먹지?
					<br />
					궁금할 땐 식단톡!
				</h2>
				<div className="flex flex-wrap w-1200 pt-16 gap-6">
					{/* TODO : API 명세 받은 후 map함수 적용 */}
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>{" "}
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
				</div>
				<button
					className="mt-16 bg-wite border border-solid border-primary-1 rounded-full py-6 px-16 text-6 text-primary-1 font-bold duration-1000 ease-out hover:scale-105 hover:drop-shadow-2xl hover:bg-bg-1"
					onClick={() => {
						navigate("/feeds");
					}}
				>
					더 많은 식단 구경하기
				</button>
			</div>
		</div>
	);
};

export default Home;
