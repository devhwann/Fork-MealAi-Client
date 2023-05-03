import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import RadioButton from "@/components/atoms/buttons/RadioButton";
import Input from "@/components/atoms/inputs/Input";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import SelectWithLabel from "@/components/organisms/SelectWithLabel";

const Info = () => {
	const navigate = useNavigate();

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
			<h1 className="mb-14">추가정보 입력</h1>
			<div className="mb-4">
				<div className="w-96 mb-4">
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
						<RadioButton
							type="radio"
							id="gender-m"
							name="gender"
							gender="M"
							onChange={() => {
								console.log("남자");
							}}
						/>
						<RadioButton
							type="radio"
							id="gender-f"
							name="gender"
							gender="F"
							onChange={() => {
								console.log("여자");
							}}
						/>
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

export default Info;
