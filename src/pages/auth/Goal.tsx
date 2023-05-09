import { MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { AuthFormType } from "@/types/auth/authTypes";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const Goal = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// 목표 설정
	const [goal, setGoal] = useState("");

	function handleGoal(goal: string) {
		setGoal(goal);
	}

	// 유저 정보 받아와서 최종 회원가입
	const handleRegisterSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { state } = location;
		const form: AuthFormType = {
			email: state.form.email,
			password: state.form.password,
			gender: state.form.gender,
			age_group: state.form.ageGroup,
			nickname: state.form.nickname,
			goal,
		};
		console.log("SignUp에서 넘어온 form state :", form);
		const data = await authApi.authRegisterRequest("/api/users", form);
		console.log("회원가입 완료!", data);
		navigate("/");
	};

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">목표설정</h1>
			<div className="mb-6">
				<GoalButtons handleGoal={handleGoal} currentGoal={goal} />
			</div>
			<div className="w-96 grid gap-3">
				<BasicButton
					type="submit"
					onClick={(e) => {
						handleRegisterSubmit(e);
					}}
					width={true}
					style="primary"
				>
					회원가입 완료
				</BasicButton>
				<BasicButton
					type="button"
					onClick={() => {
						navigate(-1);
					}}
					width={true}
					style="bg"
				>
					이전 단계
				</BasicButton>
			</div>
		</div>
	);
};

export default Goal;
