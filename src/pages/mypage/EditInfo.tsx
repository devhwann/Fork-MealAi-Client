import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Modal from "@/components/organisms/Modal";

const EditInfo = () => {
	const navigate = useNavigate();

	// TODO : 유저 데이터 받아온 후 로직 구현
	// 유저 기존 정보
	const nickname = "황금늑대";
	const ageGroup = "1";
	const userGender = "F";
	const goal = "diet";

	// 유저 변경 정보
	const [NewNickname, setNewNickname] = useState("");
	const [NewAgeGroup, setNewAgeGroup] = useState("");
	const [gender, setGender] = useState("M");
	const [newGoal, setNewGoal] = useState("balance");

	useEffect(() => {
		setGender(userGender);
		setNewGoal(goal);
	}, []);

	function handleNickname(e: ChangeEvent<HTMLInputElement>) {
		setNewNickname(e.target.value);
	}
	function handleAgeGroup(e: ChangeEvent<HTMLSelectElement>) {
		setNewAgeGroup(e.target.value);
	}
	function handleGender(e: ChangeEvent<HTMLInputElement>) {
		setGender(e.target.value);
	}
	function handleNewGoal(goal: "balance" | "diet" | "muscle" | "lchf") {
		setNewGoal(goal);
	}

	// 탈퇴 모달
	const [withdrawalModal, setWithdrawalModal] = useState(false);
	const handleWithdrawalModal = () => setWithdrawalModal(!withdrawalModal);

	// 회원 탈퇴시 비밀번호 확인
	const [checkPassword, setCheckPassword] = useState("");

	function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
		setCheckPassword(e.target.value);
	}

	// console.log(ageGroup);
	// console.log(NewAgeGroup);
	// console.log(nickname);
	// console.log(NewNickname);
	// console.log("gender", gender);
	console.log(newGoal);
	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">회원정보 수정</h1>
			<div className="w-96">
				<h4 className="mb-6">추가정보</h4>
				<div className="mb-4">
					<InputLabel label="닉네임" htmlFor="nickname" />
					<Input
						type="text"
						name="nickname"
						id="nickName"
						placeholder={nickname}
						value={NewNickname}
						onChange={handleNickname}
					/>
				</div>
				<div className="mb-4">
					<SelectWithLabel
						name="ageGroup"
						id="ageGroup"
						defaultValue={ageGroup}
						label="연령대"
						htmlFor="ageGroup"
						onChange={handleAgeGroup}
					>
						<option disabled>연령대 선택</option>
						<option value="1">10대</option>
						<option value="2">20대</option>
						<option value="3">30대</option>
						<option value="4">40대</option>
						<option value="5">50대</option>
						<option value="6">60대</option>
						<option value="7">70대</option>
						<option value="8">80대</option>
						<option value="9">90대</option>
					</SelectWithLabel>
				</div>
				<div className="mb-14">
					<InputLabel label="성별" htmlFor="gender" />
					<div className="flex gap-8">
						<RadioButton
							type="radio"
							id="gender-m"
							name="gender"
							gender="M"
							onChange={handleGender}
							checked={gender === "M" ? true : false}
						/>
						<RadioButton
							type="radio"
							id="gender-f"
							name="gender"
							gender="F"
							onChange={handleGender}
							checked={gender === "F" ? true : false}
						/>
					</div>
				</div>
				<h4 className="mb-6">목표설정</h4>
				<div className="mb-6">
					<GoalButtons handleGoal={handleNewGoal} currentGoal={newGoal} />
				</div>
				<div className="flex justify-center gap-2">
					<BasicButton
						type="button"
						onClick={() => {
							navigate(-1);
						}}
						width={false}
						style="bg"
					>
						취소
					</BasicButton>
					<BasicButton type="submit" onClick={() => {}} width={false} style="primary">
						정보수정
					</BasicButton>
				</div>
				<div className="w-96 border border-solid border-gray-7 mt-116 mb-14" />
				<div>
					<h4 className="mb-4">회원탈퇴</h4>
					<p className="mb-6 text-gray-3 text-lg font-medium">탈퇴 후 복구할 수 없습니다. 신중히 결정해 주세요.</p>
					<div className="flex justify-center">
						<BasicButton type="submit" onClick={handleWithdrawalModal} width={false} style="gray">
							탈퇴
						</BasicButton>
					</div>
				</div>
			</div>
			{/* 회원 탈퇴 모달 */}
			{withdrawalModal && (
				<Modal onClose={handleWithdrawalModal} title="비밀번호 확인">
					<div className="mb-6">
						<div className="w-fit flex flex-wrap mb-6">
							<p className="text-lg">
								정말 탈퇴하시겠습니까? <br />
								그동안의 식단일지 기록이 모두 지워지고, <br />
								해당 이메일로 재가입이 불가능 합니다.
							</p>
						</div>
						<Input
							type="password"
							name="password"
							id="password"
							value={checkPassword}
							placeholder="비밀번호"
							onChange={handleCheckPassword}
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleWithdrawalModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={() => {}} width={false} style="gray">
							탈퇴
						</BasicButton>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default EditInfo;
