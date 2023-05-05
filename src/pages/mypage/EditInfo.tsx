import { ChangeEvent, useState } from "react";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";

const EditInfo = () => {
	// TODO : 유저 데이터 받아온 후 로직 구현
	const [nickname, setNickname] = useState("");
	const [ageGroup, setAgeGroup] = useState("");

	function handleNickname(e: ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}
	function handleAgeGroup(e: ChangeEvent<HTMLSelectElement>) {
		setAgeGroup(e.target.value);
	}

	return (
		<div className="grid justify-items-center mt-20">
			<h1 className="mb-14">회원정보 수정</h1>
			<div className="w-96 bg-bg-1">
				<h4 className="mb-6">추가정보</h4>
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
		</div>
	);
};

export default EditInfo;
