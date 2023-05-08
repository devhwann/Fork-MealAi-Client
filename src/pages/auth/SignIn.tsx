import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosHandler } from "@/utils/axios.utils";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { authApi } from "@/api/auth";

import InputLabel from "@/components/atoms/inputs/InputLabel";
import Input from "@/components/atoms/inputs/Input";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import SocialButtons from "@/components/atoms/buttons/SocialButton";

const SignIn = () => {
	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedInState] = useRecoilState(isLoggedInState);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

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

	const handleLoginRequest = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (!email || !password) {
			alert("이메일과 비밀번호를 입력해주세요.");
			return;
		}

		const data = await authApi.authLoginRequest("/api/auth/login", {
			email,
			password,
		});

		if (data.status) {
			const accessToken: string = data.data.access_token;
			const refreshToken: string = data.data.refresh_token;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			axiosHandler.defaults.headers.common["authorization-"] = `Bearer ${accessToken}`;
			setIsLoggedInState(true);
			navigate("/");
		} else {
			alert(data.response.data.message);
		}
	};

	return (
		<div className="grid justify-items-center mt-20">
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
					/>
				</div>
				<div className="mb-9">
					<BasicButton
						type="submit"
						onClick={(e) => {
							handleLoginRequest(e);
						}}
						width={true}
						style="primary"
					>
						로그인
					</BasicButton>
				</div>
			</div>
			<div className="mb-14">
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
