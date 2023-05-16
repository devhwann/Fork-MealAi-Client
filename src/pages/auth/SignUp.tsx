import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/utils/validation";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import RadioButton from "@/components/atoms/buttons/RadioButton";

const SignUp = () => {
	const navigate = useNavigate();

	// 사용자로부터 입력받은 정보 저장
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
		// 입력값의 이름이 ageGroup인 경우에 value를 숫자형으로 변환함.
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

	// 이메일 검증
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [isEmailError, setIsEmailError] = useState(false);

	function handleEmailError() {
		const isValidate = validateEmail(form.email);
		if (isValidate) {
			setEmailErrorMessage("인증 버튼을 클릭해주세요.");
			setIsEmailError(false);
		} else {
			setEmailErrorMessage("올바른 이메일 형식을 입력해주세요.");
			setIsEmailError(true);
		}
	}

	// 이메일 인증코드
	const [authCode, setAuthCode] = useState<number>(); // 백엔드 서버에서 전송받는 인증코드
	const [inputAuthCode, setInputAuthCode] = useState(""); // 사용자가 입력하는 인증코드
	const [validateAuthCode, SetValidateAuthCode] = useState(true); // 인증번호 검증

	// 사용자가 입력한 인증코드 state값으로 저장(string to integer)
	function handleInputAuthCode(e: ChangeEvent<HTMLInputElement>) {
		setInputAuthCode(e.target.value.replace(/\D/g, "")); // 입력된 값이 숫자가 아니면 제거하도록 정규표현식 적용
	}

	// 이메일 인증 및 중복체크 api
	const handleCheckEmail = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!form.email) {
			alert("이메일을 입력해주세요.");
			return;
		}

		const data = await authApi.createCheckEmailRequest("/api/auth/check_email", form.email);

		if (data.status === 200) {
			setAuthCode(data.data.authentication_number);
			alert("인증번호가 전송되었습니다.");
		} else {
			alert(data.response.data.message);
		}
	};

	function handleCheckCode(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (authCode === parseInt(inputAuthCode)) {
			alert("이메일이 확인 되었습니다.");
			SetValidateAuthCode(false);
		} else {
			alert("올바르지 않은 인증코드입니다. 다시 입력해주세요.");
			SetValidateAuthCode(true);
		}
	}

	// 비밀번호 검증
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [isPasswordError, setIsPasswordError] = useState(false);

	function handlePasswordError() {
		const isValidate = validatePassword(form.password);
		if (isValidate) {
			setPasswordErrorMessage("올바른 비밀번호입니다.");
			setIsPasswordError(false);
		} else {
			setPasswordErrorMessage("6자리 이상 입력해주세요");
			setIsPasswordError(true);
		}
	}

	// 비밀번호 확인 검증
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
	const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

	function handleConfirmPasswordError() {
		const isValidate = validateConfirmPassword(form.password, form.confirmPassword);
		if (isValidate) {
			setConfirmPasswordErrorMessage("비밀번호가 일치합니다.");
			setIsConfirmPasswordError(false);
		} else {
			setConfirmPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
			setIsConfirmPasswordError(true);
		}
	}

	// 상태 업데이트함수 비동기적 동작 해결
	useEffect(() => {
		if (localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")) {
			alert("로그아웃 후 이용해주세요.");
			navigate("/");
		}
		if (form.email !== "") {
			handleEmailError();
		}
		if (form.password !== "") {
			handlePasswordError();
		}
		if (form.confirmPassword !== "") {
			handleConfirmPasswordError();
		}
	}, [form.email, form.password, form.confirmPassword]);

	// 모든 값이 올바르게 입력되어야 버튼 활성화 되도록 제어
	function hadleButtonActivated() {
		if (
			validateAuthCode ||
			isEmailError ||
			isPasswordError ||
			isConfirmPasswordError ||
			!form.ageGroup ||
			!form.nickname ||
			!form.gender
		) {
			return true;
		}
		return false;
	}

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">회원가입</h1>

			<div className="w-96">
				<div className="mb-4 flex items-center justify-between gap-2">
					<div className="grow">
						<InputWithLabel
							type="text"
							name="email"
							id="email"
							value={form.email}
							placeholder="이메일"
							isError={isEmailError}
							errorMessage={emailErrorMessage}
							onChange={(e) => {
								handleChange(e);
							}}
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
							value={inputAuthCode}
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
						isError={isPasswordError}
						errorMessage={passwordErrorMessage}
						onChange={(e) => {
							handleChange(e);
						}}
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
						isError={isConfirmPasswordError}
						errorMessage={confirmPasswordErrorMessage}
						onChange={(e) => {
							handleChange(e);
						}}
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
					deactivated={hadleButtonActivated()}
				>
					다음 단계
				</BasicButton>
			</div>
		</div>
	);
};

export default SignUp;
