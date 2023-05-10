import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Modal from "@/components/organisms/Modal";
import { userApi } from "@/api/user";
import { GoalType } from "@/components/organisms/GoalText";

const EditInfo = () => {
	const navigate = useNavigate();

	// TODO : 유저 데이터 받아온 후 로직 구현
	// 유저 기존 정보
	// const nickname = "황금늑대";
	// const ageGroup = "1";
	// const userGender = "F";
	// const goal = "diet";

	// 유저 변경 정보
	const [gender, setGender] = useState("M");
	const [ageGroup, setAgeGroup] = useState<number>();
	const [nickname, setNickname] = useState("");
	const [goal, setGoal] = useState<GoalType>("balance");

	// useEffect(() => {
	// 	setGender(userGender);
	// 	setNewGoal(goal);
	// }, []);

	useEffect(() => {
		async function fetchData() {
			let data;
			try {
				data = await userApi.userInfoRequest("/api/users");
				setGender(data.data.gender);
				setAgeGroup(data.data.age_group);
				setNickname(data.data.nickname);
				setGoal(data.data.goal);
			} catch (err) {
				navigate("/");
				alert("다시 로그인 해주세요.");
			}
		}
		fetchData();
	}, []);

	function handleNickname(e: ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}
	function handleAgeGroup(e: ChangeEvent<HTMLSelectElement>) {
		setAgeGroup(parseInt(e.target.value));
	}
	function handleGender(e: ChangeEvent<HTMLInputElement>) {
		setGender(e.target.value);
	}
	function handleNewGoal(goal: GoalType) {
		setGoal(goal);
	}

	// 탈퇴 모달
	const [withdrawalModal, setWithdrawalModal] = useState(false);
	const handleWithdrawalModal = () => setWithdrawalModal(!withdrawalModal);

	// 회원 탈퇴시 비밀번호 확인
	const [checkPassword, setCheckPassword] = useState("");

	function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
		setCheckPassword(e.target.value);
	}

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
						value={nickname}
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
						{Array.from({ length: 9 }, (_, i) => ({
							value: i + 1,
							label: `${(i + 1) * 10}대`,
						})).map(({ label, value }) => (
							<option key={label} value={value}>
								{label}
							</option>
						))}
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
					<GoalButtons handleGoal={handleNewGoal} currentGoal={goal} />
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
