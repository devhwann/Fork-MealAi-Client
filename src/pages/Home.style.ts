import styled from "styled-components";

import Bg1 from "@/assets/image_main_bg1.png";
import Bg2 from "@/assets/image_main_bg2.png";

interface IntroContainerProps {
	currentScroll: number;
}

export const HeadContainer = styled.div`
	height: 90vh;
	background-image: url(${Bg1});
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 30%, 0);
		}
		to {
			opacity: 1;
			transform: translateZ();
		}
	}

	div {
		position: relative;
		animation: fadeInUp 1s;
	}
`;

export const IntroContainer = styled.div<IntroContainerProps>`
	height: 720px;
	background-image: url(${Bg2});
	display: flex;
	align-items: center;

	@keyframes fadeInRight {
		0% {
			opacity: 0;
			transform: translate3d(30%, 0, 0);
		}
		to {
			opacity: 1;
			transform: translateZ(0);
		}
	}

	.text_anima {
		position: relative;
		display: ${({ currentScroll }) => {
			if (currentScroll < 45) return "none";
		}};
		animation: ${({ currentScroll }) => {
			if (currentScroll >= 45) return "fadeInRight 1s";
		}};
	}
`;
