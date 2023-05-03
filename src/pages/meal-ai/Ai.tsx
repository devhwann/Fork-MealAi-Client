import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GradientWrapper } from "@/components/templates/GradientWrapper";
import AddImageFileButton from "@/components/atoms/buttons/AddImageFileInput";
import InfoIcon from "@/assets/icon_info.svg";
import AiRule from "@/components/atoms/aiRule/AiRule";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import TinyButton from "@/components/atoms/buttons/TinyButton";

// TODO : 1. 이미지 첨부 후 화면에 띄우기
// TODO : 2. 날짜, 식사시간, 이미지 -> 서버로 post & 분석

const Ai = () => {
	const navigate = useNavigate();

	const [date, setDate] = useState("");
	const [mealTime, setMealTime] = useState("");
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	// const encodeFileToBase64 = (fileBlob: any) => {
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(fileBlob);

	// 	return new Promise((resolve) => {
	// 		reader.onload = () => {
	// 			setImageUrl(reader!.result!.toString());
	// 			resolve(null);
	// 		};
	// 	});
	// };

	return (
		<GradientWrapper>
			<h1 className="text-primary-1 text-center pt-20 mb-10">식단 AI 분석을 시작합니다.</h1>
			<div className="flex item-center justify-center">
				<div>
					<div className="w-96 flex gap-2 mb-4">
						<input
							type="date"
							className="input input-bordered w-1/2 max-w-xs"
							onChange={(e) => {
								setDate(e.target.value);
							}}
						/>
						<select
							id="date"
							name="date"
							onChange={(e) => {
								setMealTime(e.target.value);
							}}
							className="select select-bordered w-1/2"
						>
							<option disabled selected>
								식사 시간 선택
							</option>
							<option value="B">아침</option>
							<option value="L">점심</option>
							<option value="D">저녁</option>
							<option value="S">간식</option>
						</select>
					</div>
					<AddImageFileButton imageUrl={imageUrl} onChange={() => {}} />
				</div>
				<div className="ml-6 pt-4">
					<div className="flex justify-end gap-2 h-8 mb-4 ">
						<img src={InfoIcon} width={24} height={24} />
						<p className="text-xl text-gray-1 font-bold text-right mb-4">분석 전 꼭 확인해주세요.</p>
					</div>
					<AiRule />
				</div>
			</div>
			<div className="flex flex-col items-center mt-10">
				<div className="w-96">
					<BasicButton
						type="button"
						onClick={() => {
							// post 함수
							// 성공, 실패 로직 처리
							navigate("/meal-ai/result");
							// navigate("/meal-ai/fail");
						}}
						width={true}
						style="primary"
					>
						분석 시작
					</BasicButton>
					<div className="flex items-center gap-1 mt-6">
						<p className="text-sm text-gray-4">비회원은 분석기록 저장과 커뮤니티 공유를 할 수 없습니다.</p>
						<TinyButton
							type="button"
							onClick={() => {
								navigate("/auth/sign-up");
							}}
							style="gray"
							deactivated={false}
						>
							회원가입
						</TinyButton>
					</div>
				</div>
			</div>
		</GradientWrapper>
	);
};

export default Ai;
