import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import Input from "@/components/atoms/inputs/Input";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import SocialButtons from "@/components/atoms/buttons/SocialButton";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}
	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">로그인</h1>
			<div className="w-96">
				<div className="mb-4">
					<InputLabel label="이메일" htmlFor="email" />
					<Input type="text" name="email" id="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
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
					/>
				</div>
				<div className="mb-9">
					<BasicButton type="submit" onClick={() => {}} width={true} style="primary">
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
