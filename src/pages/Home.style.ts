import Bg1 from "@/assets/image_main_bg1.png";
import Bg2 from "@/assets/image_main_bg2.png";
import styled from "styled-components";

export const HeadContainer = styled.div<{ currentScroll: number }>`
	height: 90vh;
	background-image: url(${Bg1});
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;

	@keyframes titleFadeInUp {
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
		animation: titleFadeInUp 1s;
	}

	.head-title {
		margin-left: 15%;
	}
`;

export const IntroContainer = styled.div<{ currentScroll: number }>`
	height: 720px;
	background-image: url(${Bg2});
	background-position: center;
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;

	img {
		user-select: none;
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}
		to {
			opacity: 1;
			transform: translateZ();
		}
	}

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

	@keyframes shake {
		from {
			transform: rotate(2deg);
		}
		to {
			transform: rotate(-2deg);
		}
	}

	.text_anima {
		position: relative;
		display: ${({ currentScroll }) => {
			if (currentScroll < 40) return "none";
		}};
		animation: ${({ currentScroll }) => {
			if (currentScroll >= 40) return "fadeInRight 1s";
		}};
	}

	.intro_illust {
		position: relative;

		.people_image,
		.food1_image,
		.food2_image,
		.food3_image,
		.food4_image {
			position: absolute;
		}

		.people_image {
			animation: shake 1s infinite ease-in-out alternate;
			margin-top: 260px;
			margin-left: 30%;
			z-index: 1;
		}

		.food1_image {
			margin-top: 200px;
			margin-left: 20%;
			display: ${({ currentScroll }) => {
				if (currentScroll < 35) return "none";
			}};
			animation: ${({ currentScroll }) => {
				if (currentScroll >= 35) return "fadeInUp 2.5s";
			}};
		}
		.food2_image {
			margin-top: 100px;
			margin-left: 38%;
			display: ${({ currentScroll }) => {
				if (currentScroll < 20) return "none";
			}};
			animation: ${({ currentScroll }) => {
				if (currentScroll >= 20) return "fadeInUp 2s";
			}};
		}
		.food3_image {
			margin-top: 120px;
			margin-left: 63%;
			display: ${({ currentScroll }) => {
				if (currentScroll < 25) return "none";
			}};
			animation: ${({ currentScroll }) => {
				if (currentScroll >= 25) return "fadeInUp 2s";
			}};
		}
		.food4_image {
			margin-top: 230px;
			margin-left: 73%;
			display: ${({ currentScroll }) => {
				if (currentScroll < 45) return "none";
			}};
			animation: ${({ currentScroll }) => {
				if (currentScroll >= 45) return "fadeInUp 3s";
			}};
		}

		@media all and (max-width: 1200px) {
			.people_image {
				margin-left: 10%;
			}
			.food1_image {
				margin-left: 0%;
			}
			.food2_image {
				margin-left: 21%;
			}
			.food3_image {
				margin-left: 53%;
			}
			.food4_image {
				margin-left: 63%;
			}
		}
	}
`;
