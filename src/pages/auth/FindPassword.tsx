import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isPasswordToastState } from "@/recoil/state";
import { authApi } from "@/api/auth";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import Input from "@/components/atoms/inputs/Input";

const FindPassword = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const setIsPasswordToast = useSetRecoilState(isPasswordToastState);

	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		if (emailInputRef.current) {
			setEmail(emailInputRef.current.value);
		}
	}

	const handleFindPasswordRequest = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (!email) {
			alert("이메일을 입력해주세요.");
			return;
		}

		const data = await authApi.createFindRequest("/api/auth/reset_password", { email });

		if (data.status === 200) {
			setIsPasswordToast(true);
			navigate("/auth/sign-in");
		} else {
			alert(data.response.data.message);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")) {
			alert("로그아웃 후 이용해주세요.");
			navigate("/");
		}
	}, []);

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-8">비밀번호 찾기</h1>
			<p className="text-base text-gray-3 text-center">
				가입시 사용한 이메일 주소를 입력해주세요.
				<br />
				소셜 회원은 비밀번호 재발급을 할 수 없습니다.
			</p>
			<div className="w-96 mt-14">
				<div className="mb-6">
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
				<div>
					<BasicButton
						type="submit"
						onClick={(e) => {
							handleFindPasswordRequest(e);
						}}
						width={true}
						style="primary"
					>
						비밀번호 재발급
					</BasicButton>
				</div>
			</div>
		</div>
	);
};

export default FindPassword;
