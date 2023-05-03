import { ChangeEvent, useState } from "react";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import BasicButton from "@/components/atoms/buttons/BasicButton";

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
					<InputLabel label="이메일" htmlFor="email" />
					<Input type="text" name="email" id="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
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
