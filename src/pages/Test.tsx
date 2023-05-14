import { ChangeEvent, useState } from "react";
import Input from "@/components/atoms/inputs/Input";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import ValidationInput from "@/components/atoms/inputs/ValidationInput";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import SearchInput from "@/components/atoms/inputs/SearchInput";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import TinyButton from "@/components/atoms/buttons/TinyButton";
import LikeButton from "@/components/atoms/buttons/LikeButton";
import LikeWithCount from "@/components/organisms/LikeWithCount";
import Badge from "@/components/atoms/badges/Badge";
import GoalText from "@/components/organisms/GoalText";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import ToggleButton from "@/components/atoms/buttons/ToggleButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import VerticalProgressBars from "@/components/atoms/progressBars/VerticalProgressBars";
import GoalButtons from "@/components/organisms/GoalButtons";
import Modal from "@/components/organisms/Modal";
import MyGoalText from "@/components/organisms/MyGoalText";
import SearchResult from "@/components/organisms/SearchResult";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import ReportInfoCards from "@/components/atoms/cards/ReportInfoCards";
import SocialButtons from "@/components/atoms/buttons/SocialButton";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기
import FoodCardViewOnly from "@/components/organisms/FoodCardViewOnly";

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

const Test = () => {
	// 토글버튼
	const [isChecked, setIsChecked] = useState(true);

	// 좋아요버튼
	const [isLike, setIsLike] = useState(false);

	// input validation 테스트
	const [inputTest, setInputTest] = useState("");
	const [errorTest, setErrorTest] = useState(false);
	function onChangeEmailTest(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setInputTest(e.target.value);
		setErrorTest(true); //test
		if (e.target.value.length >= 5) {
			setErrorTest(false);
		}
	}

	// 목표 설정
	const [goal, setGoal] = useState("");
	function handleGoal(goal: string) {
		setGoal(goal);
	}

	// 모달창 on&off
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const onModal = () => {
		setModalIsOpen(true);
	};
	const offModal = () => {
		setModalIsOpen(false);
	};

	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
	const onDeleteModal = () => {
		setDeleteModalIsOpen(true);
	};
	const offDeleteModal = () => {
		setDeleteModalIsOpen(false);
	};

	return (
		<>
			<br />
			<br />
			소셜 로그인/ 회원가입 (간격이 살짝 다른 것은 텍스트 길이 때문이니 신경쓰지 마세용)
			<SocialButtons
				role="로그인"
				googleApi={() => {
					console.log("구글");
				}}
				naverApi={() => {
					console.log("네이버");
				}}
				kakaoApi={() => {
					console.log("카카오");
				}}
			/>
			<br />
			<br />
			<SocialButtons
				role="회원가입"
				googleApi={() => {
					console.log("구글");
				}}
				naverApi={() => {
					console.log("네이버");
				}}
				kakaoApi={() => {
					console.log("카카오");
				}}
			/>
			<br />
			<br />
			<p>basic button</p>
			<BasicButton type="button" onClick={() => {}} width={true} style="primary">
				primary button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={true} style="bg">
				bg button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={false} style="deactivated" deactivated={true}>
				deactivated button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={false} style="gray">
				gray button
			</BasicButton>
			<br />
			<br />
			<p>tiny button</p>
			<TinyButton type="button" onClick={() => {}} style="primary">
				tiny
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="bg">
				tiny button
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="deactivated" deactivated={true}>
				deactivated
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="gray" deactivated={false}>
				gray
			</TinyButton>
			<br />
			<br />
			<p>basic input</p>
			<Input type="text" name="test" id="1" value="" placeholder="test" onChange={() => {}} />
			<br />
			<br />
			<p>search input</p>
			<SearchInput name="search" id="search" value="" onClick={() => {}} />
			<br />
			{/* <SearchResult data={temp} onClick={() => {}} /> */}
			<br />
			<br />
			<p>validation input</p>
			<ValidationInput
				type="text"
				name="test"
				id="1"
				value={inputTest}
				placeholder="test"
				isError={errorTest}
				errorMessage="message test"
				onChange={onChangeEmailTest}
			/>
			<br />
			<br />
			<p>validation input + label</p>
			<InputWithLabel
				type="text"
				name="test"
				id="label1"
				value="입력이 안되도 놀라지 마세용"
				placeholder="test"
				isError={false}
				errorMessage="message test"
				onChange={() => {}}
				label="label test"
				htmlFor="label1"
			/>
			<br />
			<br />
			<p>select box</p>
			<select className="select select-bordered max-w-xs">
				<option disabled selected>
					선택
				</option>
				<option>test option 1</option>
				<option>test option 2</option>
			</select>
			<br />
			<br />
			<p>select box + label</p>
			<SelectWithLabel
				name="test"
				id="label2"
				defaultValue="선택"
				label="select label"
				htmlFor="label2"
				onChange={() => {}}
			>
				<option disabled>선택</option>
				<option>test option 1</option>
				<option>test option 2</option>
			</SelectWithLabel>
			<LikeButton
				isLike={isLike}
				onClick={() => {
					setIsLike(!isLike);
				}}
			/>
			<LikeWithCount
				isLike={isLike}
				onClick={() => {
					setIsLike(!isLike);
				}}
				count={13}
			/>
			<Badge text="쌀국수" color="gray" />
			<Badge text="목표" color="primary2" />
			<Badge text="부족" color="systemError" />
			<Badge text="충분" color="systemSuccess" />
			<br />
			<div className="flex flex-row gap-8">
				<RadioButton type="radio" id="gender-m" name="gender" gender="M" onChange={() => {}} />
				<RadioButton type="radio" id="gender-f" name="gender" gender="F" onChange={() => {}} />
			</div>
			<br />
			<h1>서브페이지 타이틀</h1>
			<h2>36px 타이틀</h2>
			<h3>30px 타이틀</h3>
			<h4>24px 타이틀</h4>
			<ToggleButton
				isChecked={isChecked}
				onChange={() => {
					setIsChecked(!isChecked);
				}}
			/>
			<br />
			<br />
			<div className="w-96 p-10 border-solid border border-gray-7 rounded-lg">
				{/* <HorizontalProgressBars
					kcalValue={982}
					kcalMax={2200}
					carboValue={8}
					carboMax={113}
					proteinValue={25}
					proteinMax={20}
					fatValue={12}
					fatMax={16}
				/> */}
			</div>
			<br />
			<br />
			<div className="flex gap-10">
				{/* <VerticalProgressBars
					kcalValue={982}
					kcalMax={2200}
					carboValue={8}
					carboMax={113}
					proteinValue={25}
					proteinMax={20}
					fatValue={12}
					fatMax={16}
					day="월"
				/>
				<VerticalProgressBars
					kcalValue={982}
					kcalMax={2200}
					carboValue={8}
					carboMax={113}
					proteinValue={25}
					proteinMax={20}
					fatValue={12}
					fatMax={16}
					day="화"
				/>
				<VerticalProgressBars
					kcalValue={982}
					kcalMax={2200}
					carboValue={8}
					carboMax={113}
					proteinValue={25}
					proteinMax={20}
					fatValue={12}
					fatMax={16}
					day="수"
				/> */}
			</div>
			<br />
			<br />
			{/* <GoalButtons handleGoal={handleGoal} /> */}
			<GoalText goal="balance" />
			<GoalText goal="diet" />
			<MyGoalText goal="balance" />
			<br />
			<br />
			<Thumb src={TempImage} size="lg" type="none" />
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
			<Thumb src={TempImage} id={1} size="md" type="log" mealTime="breakfast" open={true} onClick={() => {}} />
			<Thumb src={null} size="sm" type="none" />
			<br />
			<br />
			<div className="flex gap-6 items-start">
				<FoodCardViewOnly src={TempImage} size="sm" type="none" name={"치킨"} weight={200} />
			</div>
			<br />
			<br />
			<div>
				<BasicButton type="button" onClick={onModal} width={false} style="primary">
					모달테스트
				</BasicButton>
				{modalIsOpen && (
					<Modal onClose={offModal} title="모달타이틀">
						<div className="mb-6">
							모달컨텐츠모달컨텐츠모달컨텐츠모달컨텐츠
							<br />
							모달컨텐츠모달컨텐츠모달컨텐츠
							<br />
							모달컨텐츠모달컨텐츠
							<br />
							모달컨텐츠
						</div>
						<div className="flex justify-center">
							<BasicButton type="button" onClick={() => {}} width={false} style="bg">
								모달창 내부 버튼
							</BasicButton>
						</div>
					</Modal>
				)}
				{deleteModalIsOpen && (
					<Modal onClose={offDeleteModal} title="삭제">
						<div className="mb-6">정말 삭제하시겠어요?</div>
						<div className="flex justify-center">
							<BasicButton type="button" onClick={() => {}} width={false} style="bg">
								모달창 내부 버튼
							</BasicButton>
						</div>
					</Modal>
				)}
			</div>
			<br />
			<br />
			{/* <ReportInfoCards
				kcalValue={2200}
				kcalMax={2200}
				carboValue={8}
				carboMax={113}
				proteinValue={18}
				proteinMax={20}
				fatValue={80}
				fatMax={16}
			/> */}
		</>
	);
};

export default Test;
