import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import SocialButtons from "@/components/atoms/buttons/SocialButton";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import RadioButton from "@/components/atoms/buttons/RadioButton";

const SignUp = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState<{
		email: string;
		password: string;
		confirmPassword: string;
		gender: string;
		nickname: string;
		ageGroup: number | undefined;
	}>({
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
		nickname: "",
		ageGroup: undefined,
	});

	function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
		const { name, value } = e.target;
		if (name === "ageGroup") {
			setForm((current) => {
				return {
					...current,
					[name]: parseInt(value),
				};
			});
		} else {
			setForm((current) => {
				return {
					...current,
					[name]: value,
				};
			});
		}
	}

	// 이메일 인증코드
	const [authCode, setAuthCode] = useState<number>();
	const [inputAuthCode, setInputAuthCode] = useState<number>();

	function handleInputAuthCode(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		setInputAuthCode(value);
	}

	// 이메일 인증 및 중복체크 api
	const handleCheckEmail = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!form.email) {
			alert("이메일을 입력해주세요.");
			return;
		}

		const data = await authApi.authCheckEmailRequest("/api/auth/check_email", form.email);

		if (data.status === 200) {
			setAuthCode(data.data.authentication_number);
		} else {
			alert(data.response.data.message);
		}
	};

	function handleCheckCode(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (authCode === inputAuthCode) {
			alert("이메일이 확인 되었습니다.");
		} else {
			alert("올바르지 않은 인증코드입니다. 다시 입력해주세요.");
		}
	}

	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	// const [gender, setGender] = useState("");
	// const [nickname, setNickname] = useState("");
	// const [ageGroup, setAgeGroup] = useState<number>();

	// function handleEmail(e: ChangeEvent<HTMLInputElement>) {
	// 	setEmail(e.target.value);
	// }
	// function handlePassword(e: ChangeEvent<HTMLInputElement>) {
	// 	setPassword(e.target.value);
	// }
	// function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
	// 	setConfirmPassword(e.target.value);
	// }
	// function handleGender(e: ChangeEvent<HTMLInputElement>) {
	// 	setGender(e.target.value);
	// }
	// function handleNickname(e: ChangeEvent<HTMLInputElement>) {
	// 	setNickname(e.target.value);
	// }
	// function handleAgeGroup(e: ChangeEvent<HTMLSelectElement>) {
	// 	const value = parseInt(e.target.value);
	// 	setAgeGroup(value);
	// }

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
							value={form.email}
							placeholder="이메일"
							isError={false}
							errorMessage="message test"
							onChange={handleChange}
							label="이메일"
							htmlFor="email"
						/>
					</div>
					<div className="pt-3">
						<BasicButton type="submit" onClick={handleCheckEmail} width={false} style="bg">
							인증
						</BasicButton>
					</div>
				</div>
				<div className="mb-4 flex items-center justify-between gap-2">
					<div className="grow">
						<InputLabel label="인증번호" htmlFor="authCode" />
						<Input
							type="text"
							name="inputAuthCode"
							id="inputAuthCode"
							placeholder="인증번호"
							value={inputAuthCode || ""}
							onChange={handleInputAuthCode}
						/>
					</div>
					<div className="pt-8">
						<BasicButton type="submit" onClick={handleCheckCode} width={false} style="bg">
							확인
						</BasicButton>
					</div>
				</div>
				<div className="mb-4">
					<InputWithLabel
						type="password"
						name="password"
						id="password"
						value={form.password}
						placeholder="비밀번호"
						isError={false}
						errorMessage="message test"
						onChange={handleChange}
						label="비밀번호"
						htmlFor="password"
					/>
				</div>
				<div className="mb-4">
					<InputWithLabel
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						value={form.confirmPassword || ""}
						placeholder="비밀번호 확인"
						isError={false}
						errorMessage="message test"
						onChange={handleChange}
						label="비밀번호 확인"
						htmlFor="confirmPassword"
					/>
				</div>
				<div className="mb-4">
					<InputLabel label="닉네임" htmlFor="nickname" />
					<Input
						type="text"
						name="nickname"
						id="nickName"
						placeholder="닉네임"
						value={form.nickname}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<SelectWithLabel
						name="ageGroup"
						id="ageGroup"
						defaultValue="연령대 선택"
						label="연령대"
						htmlFor="ageGroup"
						onChange={handleChange}
						value={form.ageGroup}
					>
						<option disabled>연령대 선택</option>
						{Array.from({ length: 9 }, (_, i) => ({
							value: i + 1,
							label: `${(i + 1) * 10}대`,
						})).map(({ label, value }) => (
							<option key={label} value={value}>
								{label}
							</option>
						))}
						{/* <option value="1">10대</option>
						<option value="2">20대</option>
						<option value="3">30대</option>
						<option value="4">40대</option>
						<option value="5">50대</option>
						<option value="6">60대</option>
						<option value="7">70대</option>
						<option value="8">80대</option>
						<option value="9">90대</option> */}
					</SelectWithLabel>
				</div>
				<div className="mb-9">
					<InputLabel label="성별" htmlFor="gender" />
					<div className="flex gap-8">
						<RadioButton type="radio" id="gender-m" name="gender" gender="M" onChange={handleChange} />
						<RadioButton type="radio" id="gender-f" name="gender" gender="F" onChange={handleChange} />
					</div>
				</div>
				<BasicButton
					type="button"
					onClick={() => {
						navigate("/auth/sign-up/goal", {
							state: { form },
						});
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
