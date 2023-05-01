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
import Badge from "@/components/atoms/badge/Badge";
import GoalText from "@/components/organisms/GoalText";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import ToggleButton from "@/components/atoms/buttons/ToggleButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import VerticalProgressBars from "@/components/atoms/progressBars/VerticalProgressBars";
import GoalButtons from "@/components/organisms/GoalButtons";
import Modal from "@/components/organisms/Modal";

const Home = () => {
	// 토글버튼
	const [isChecked, setIsChecked] = useState(true);

	const [isLike, setIsLike] = useState(false);

	const [inputTest, setInputTest] = useState("");
	const [errorTest, setErrorTest] = useState(false);


	const [goal, setGoal] = useState("");
	console.log(goal);
  
  // 모달창 on&off
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const onModal = () => {
		setModalIsOpen(true);
	};
	const offModal = () => {
		setModalIsOpen(false);
	};

	function onChangeEmailTest(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setInputTest(e.target.value);
		setErrorTest(true); //test
		if (e.target.value.length >= 5) {
			setErrorTest(false);
		}
	}

	return (
		<>
			<div className="card shadow bg-bg-1">
				<div className="card-body">
					<h2 className="card-title">no border with shadow</h2>
					<p>Rerum reiciendis beatae tenetur excepturi</p>
				</div>
			</div>
			<div className="card shadow-lg">
				<div className="card-body">
					<h2 className="card-title">no border with shadow</h2>
					<p>Rerum reiciendis beatae tenetur excepturi</p>
				</div>
			</div>
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
			<SearchInput
				name="search"
				id="search"
				value=""
				onChange={() => {}}
				onClick={() => {
					console.log("hello");
				}}
			/>
			<br />
			<br />
			<p>validation input</p>
			{/* // ********************** */}
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
				<HorizontalProgressBars
					kcalValue={982}
					kcalMax={2200}
					carboValue={8}
					carboMax={113}
					proteinValue={25}
					proteinMax={20}
					fatValue={12}
					fatMax={16}
				/>
			</div>
			<br />
			<br />
			<div className="flex gap-10">
				<VerticalProgressBars
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
				/>
			</div>

			<br />
			<br />
			<GoalButtons setGoal={setGoal} />
			<GoalText goal="balance" />
			<GoalText goal="diet" />
      
      <div>
				<BasicButton type="button" onClick={onModal} width={false} style="primary">
					모달테스트
				</BasicButton>
				{modalIsOpen && (
					<Modal onClose={offModal} title="모달타이틀">
						모달컨텐츠모달컨텐츠모달컨텐츠모달컨텐츠
						<br />
						모달컨텐츠모달컨텐츠모달컨텐츠
						<br />
						모달컨텐츠모달컨텐츠
						<br />
						모달컨텐츠
						<br />
						<br />
						<div className="flex justify-center">
							<BasicButton type="button" onClick={() => {}} width={false} style="bg">
								모달창 내부 버튼
							</BasicButton>
						</div>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Home;
