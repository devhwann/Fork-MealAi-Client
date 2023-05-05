import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import SocialButtons from "@/components/atoms/buttons/SocialButton";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import RadioButton from "@/components/atoms/buttons/RadioButton";

const SignUp = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [authCode, setAuthCode] = useState("");
	const [nickname, setNickname] = useState("");
	const [ageGroup, setAgeGroup] = useState("");

	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}
	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}
	function handlePasswordConfirmChange(e: ChangeEvent<HTMLInputElement>) {
		setPasswordConfirm(e.target.value);
	}
	function handleAuthCode(e: ChangeEvent<HTMLInputElement>) {
		setAuthCode(e.target.value);
	}
	function handleNickname(e: ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}
	function handleAgeGroup(e: ChangeEvent<HTMLSelectElement>) {
		setAgeGroup(e.target.value);
	}

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">회원가입</h1>
			<p className="text-gray-5 mb-4">SNS 계정으로 간편 회원가입</p>
			<div className="mb-14">
				<SocialButtons
					role="회원가입"
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
			<div className="w-96 border border-solid border-gray-7 mb-74" />
			<div className="w-96">
				<div className="mb-4 flex items-center justify-between gap-2">
					<div className="grow">
						<InputWithLabel
							type="text"
							name="email"
							id="email"
							value={email}
							placeholder="이메일"
							isError={false}
							errorMessage="message test"
							onChange={handleEmailChange}
							label="이메일"
							htmlFor="email"
						/>
					</div>
					<div className="pt-3">
						<BasicButton type="submit" onClick={() => {}} width={false} style="bg">
							인증
						</BasicButton>
					</div>
				</div>
				<div className="mb-4">
					<InputLabel label="인증번호" htmlFor="authCode" />
					<Input
						type="text"
						name="authCode"
						id="authCode"
						placeholder="인증번호"
						value={authCode}
						onChange={handleAuthCode}
					/>
				</div>
				<div className="mb-4">
					<InputWithLabel
						type="password"
						name="password"
						id="password"
						value={password}
						placeholder="비밀번호"
						isError={false}
						errorMessage="message test"
						onChange={handlePasswordChange}
						label="비밀번호"
						htmlFor="password"
					/>
				</div>
				<div className="mb-4">
					<InputWithLabel
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						value={passwordConfirm}
						placeholder="비밀번호 확인"
						isError={false}
						errorMessage="message test"
						onChange={handlePasswordConfirmChange}
						label="비밀번호 확인"
						htmlFor="passwordConfirm"
					/>
				</div>
				<div className="mb-4">
					<InputLabel label="닉네임" htmlFor="nickname" />
					<Input
						type="text"
						name="nickname"
						id="nickName"
						placeholder="닉네임"
						value={nickname}
						onChange={handleNickname}
					/>
				</div>
				<div className="mb-4">
					<SelectWithLabel
						name="ageGroup"
						id="ageGroup"
						defaultValue="연령대 선택"
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
				<div className="mb-9">
					<InputLabel label="성별" htmlFor="gender" />
					<div className="flex gap-8">
						<RadioButton type="radio" id="gender-m" name="gender" gender="M" onChange={() => {}} />
						<RadioButton type="radio" id="gender-f" name="gender" gender="F" onChange={() => {}} />
					</div>
				</div>
				<BasicButton
					type="button"
					onClick={() => {
						navigate("/auth/sign-up/goal");
					}}
					width={true}
					style="primary"
				>
					다음 단계
				</BasicButton>
			</div>
		</div>
	);
};

export default SignUp;
