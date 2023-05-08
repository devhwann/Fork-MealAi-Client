import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import { authApi } from "@/api/auth";

const Goal = () => {
	const navigate = useNavigate();
	// 목표 설정
	const [goal, setGoal] = useState("");

	function handleGoal(goal: string) {
		setGoal(goal);
	}

	// 회원가입
	// const handleRegisterSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
	// 	e.preventDefault();

	// 	// const { email, password, nickname, gender, ageGroup, goal } = data;
	// 	// const gender = "F";
	// 	const goal = "balance";
	// 	// const ageGroup = 1;

	// 	const data = await authApi.authRegisterRequest("/api/users", {
	// 		email,
	// 		password,
	// 		gender,
	// 		age_group: ageGroup,
	// 		nickname,
	// 		goal,
	// 	});
	// 	console.log(data);
	// };

	console.log(goal);
	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">목표설정</h1>
			<div className="mb-6">
				<GoalButtons handleGoal={handleGoal} currentGoal={goal} />
			</div>
			<div className="w-96 grid gap-3">
				<BasicButton type="submit" onClick={() => {}} width={true} style="primary">
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
