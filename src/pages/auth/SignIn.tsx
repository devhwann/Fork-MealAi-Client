import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, isPasswordToastState } from "@/recoil/state";
import { authApi } from "@/api/auth";
import { axiosHandler } from "@/utils/axios.utils";

import InputLabel from "@/components/atoms/inputs/InputLabel";
import Input from "@/components/atoms/inputs/Input";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Toast from "@/components/atoms/toast/Toast";

const SignIn = () => {
	const navigate = useNavigate();

	const setisLoggedInState = useSetRecoilState(isLoggedInState);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	// 비밀번호 재발급을 통해 페이지 진입한 경우 뜨는 toast 알림
	const [isPasswordToast, setIsPasswordToast] = useRecoilState(isPasswordToastState);

	useEffect(() => {
		if (localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")) {
			alert("로그아웃 후 이용해주세요.");
			navigate("/");
		}
		if (isPasswordToast) {
			setTimeout(() => {
				setIsPasswordToast(false);
			}, 5000);
		}
	}, []);

	// input value 추적
	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		if (emailInputRef.current) {
			setEmail(emailInputRef.current.value);
		}
	}
	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
		if (passwordInputRef.current) {
			setPassword(passwordInputRef.current.value);
		}
	}

	// 로그인 함수
	const handleLoginRequest = async () => {
		if (!email || !password) {
			alert("이메일과 비밀번호를 입력해주세요.");
			return;
		}

		let data;
		try {
			data = await authApi.createLoginRequest("/api/auth/login", {
				email,
				password,
			});
			const accessToken: string = data.data.access_token;
			const refreshToken: string = data.data.refresh_token;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			axiosHandler.defaults.headers.common["authorization-"] = `Bearer ${accessToken}`;
			setisLoggedInState(true);
			navigate("/");
		} catch (err) {
			alert(data.response.data.message);
		}
	};

	// enter키로 로그인
	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleLoginRequest();
		}
	};

	return (
		<div className="grid justify-items-center mt-20">
			{isPasswordToast && <Toast />}
			<h1 className="mb-14">로그인</h1>
			<div className="w-96">
				<div className="mb-4">
					<InputLabel label="이메일" htmlFor="email" />
					<Input
						type="text"
						name="email"
						id="email"
						placeholder="이메일"
						value={email}
						onChange={handleEmailChange}
						ref={emailInputRef}
					/>
				</div>
				<div className="mb-6">
					<InputLabel label="비밀번호" htmlFor="password" />
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="비밀번호"
						value={password}
						onChange={handlePasswordChange}
						ref={passwordInputRef}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div className="mb-16">
					<BasicButton type="submit" onClick={handleLoginRequest} width={true} style="primary">
						로그인
					</BasicButton>
				</div>
			</div>
			<div className="flex text-gray-5 gap-6">
				<Link to="/auth/find-password">
					<p>비밀번호 찾기</p>
				</Link>
				<p>|</p>
				<Link to="/auth/sign-up">
					<p>회원가입</p>
				</Link>
			</div>
		</div>
	);
};

export default SignIn;
