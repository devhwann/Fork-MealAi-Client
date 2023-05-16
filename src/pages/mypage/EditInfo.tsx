import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { userApi } from "@/api/user";
import { GoalType } from "@/components/organisms/GoalText";
import Modal from "@/components/organisms/Modal";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const EditInfo = () => {
	const navigate = useNavigate();

	const setisLoggedInState = useSetRecoilState(isLoggedInState);

	const [gender, setGender] = useState("M");
	const [ageGroup, setAgeGroup] = useState<number>();
	const [nickname, setNickname] = useState("");
	const [goal, setGoal] = useState<GoalType>("balance");

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
				navigate("/auth/sign-in");
				alert("다시 로그인 해주세요.");
				localStorage.clear();
			}
		}
		fetchData();
	}, []);

	const handleNickname = (e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
	const handleAgeGroup = (e: ChangeEvent<HTMLSelectElement>) => setAgeGroup(parseInt(e.target.value));
	const handleGender = (e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value);
	const handleNewGoal = (goal: GoalType) => setGoal(goal);

	// 회원정보 수정
	const handleChangeUserInfo = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (!nickname) {
			alert("닉네임을 입력해주세요.");
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		await userApi.editUserInfoRequest("/api/users", { gender, age_group: ageGroup, nickname, goal });
		alert("회원정보가 수정되었습니다.");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// 탈퇴 모달
	const [withdrawalModal, setWithdrawalModal] = useState(false);
	const handleWithdrawalModal = () => setWithdrawalModal(!withdrawalModal);

	// 회원 탈퇴
	const [currentPassword, setCurrentPassword] = useState("");
	const currentPasswordInputRef = useRef<HTMLInputElement>(null);

	function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
		if (currentPasswordInputRef.current) {
			setCurrentPassword(currentPasswordInputRef.current.value);
		}
	}

	const handleDeleteUserInfo = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!currentPassword) {
			alert("비밀번호를 입력해주세요.");
			return;
		}

		const data = await userApi.checkPasswordRequest("/api/users/check_password", { password: currentPassword });

		if (data.status === 200) {
			const result = await userApi.deleteUserRequest("/api/users");

			if (result.status === 200) {
				alert("탈퇴되셨습니다. 다음에 또 만나요. 👋");
				localStorage.clear();
				setisLoggedInState(false);
				navigate("/");
			}
		} else {
			alert(data.response.data.message);
		}
	};

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
					<BasicButton type="submit" onClick={handleChangeUserInfo} width={false} style="primary">
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
							value={currentPassword}
							placeholder="비밀번호"
							onChange={handleCheckPassword}
							ref={currentPasswordInputRef}
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleWithdrawalModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={handleDeleteUserInfo} width={false} style="gray">
							탈퇴
						</BasicButton>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default EditInfo;
