import { ChangeEvent, useState } from "react";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import InputWithLabel from "@/components/organisms/InputWithLabel";

const FindPassword = () => {
	const [email, setEmail] = useState("");

	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-8">비밀번호 찾기</h1>
			<p>가입시 사용한 이메일 주소를 입력해주세요.</p>
			<p>소셜 회원은 비밀번호 재발급을 할 수 없습니다.</p>
			<div className="w-96 mt-14">
				<div className="mb-6">
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
				<div>
					<BasicButton type="submit" onClick={() => {}} width={true} style="primary">
						비밀번호 재발급
					</BasicButton>
				</div>
			</div>
		</div>
	);
};

export default FindPassword;
