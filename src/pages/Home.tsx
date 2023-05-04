import { ChangeEvent, useState } from "react";
import { HeadContainer, IntroContainer } from "./Home.style";
import WhiteLogo from "@/assets/logo_white.svg";
import Logo from "@/assets/logo.svg";

const Home = () => {
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
					<button className="mt-10 bg-primary-1 rounded-full py-6 px-16 text-6 text-white font-bold duration-1000 ease-out hover:scale-105 hover:brightness-125 hover:drop-shadow-2xl">
						식단 분석하러 가기
					</button>
				</div>
			</HeadContainer>
			<div className="scroll_info">
				<IntroContainer currentScroll={currentScroll}>
					<div className="w-1/2">여기 그림</div>
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
			<div className="bg-wite h-screen"></div>
		</div>
	);
};

export default Home;
