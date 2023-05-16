import { MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { authApi } from "@/api/auth";
import { axiosHandler } from "@/utils/axios.utils";
import { AuthFormTypes, LoginParams } from "@/types/auth/authTypes";
import GoalButtons from "@/components/organisms/GoalButtons";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import { GoalType } from "@/components/organisms/GoalText";

const Goal = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const setisLoggedInState = useSetRecoilState(isLoggedInState);
	// 목표 설정
	const [goal, setGoal] = useState("");

	function handleGoal(goal: GoalType) {
		setGoal(goal);
	}

	// 유저 정보 받아와서 최종 회원가입
	const handleRegisterSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { state } = location;
		const form: AuthFormTypes = {
			email: state.form.email,
			password: state.form.password,
			gender: state.form.gender,
			age_group: state.form.ageGroup,
			nickname: state.form.nickname,
			goal,
		};

		const userData: LoginParams = {
			email: form.email,
			password: form.password,
		};

		// 회원가입 api호출
		const data = await authApi.authRegisterRequest("/api/users", form);

		if (data.status === 201) {
			// 로그인 api  호출
			const res = await authApi.authLoginRequest("/api/auth/login", userData);
			const accessToken: string = res.data.access_token;
			const refreshToken: string = res.data.refresh_token;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			axiosHandler.defaults.headers.common["authorization-"] = `Bearer ${accessToken}`;
			setisLoggedInState(true);
			navigate("/");
		} else {
			alert("회원가입에 실패했습니다!");
		}
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
					deactivated={!goal}
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
