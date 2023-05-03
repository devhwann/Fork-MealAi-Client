import { useNavigate } from "react-router-dom";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기

const Fail = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center text-center gap-1">
			<h1 className="pt-20 mb-6">분석 실패</h1>
			<p className="text-base font-medium text-gray-3 mb-6">
				식단 AI가 사진 속 음식을 인식하지 못했습니다.
				<br />
				다시 분석해 보시겠습니까?
			</p>
			<Thumb src={TempImage} size="lg" type="none" />
			<div className="mt-6 w-96">
				<BasicButton
					type="button"
					onClick={() => {
						navigate("/meal-ai");
					}}
					width={true}
					style="primary"
				>
					다시 분석하기
				</BasicButton>
			</div>
		</div>
	);
};

export default Fail;
