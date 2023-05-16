import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { imagePreviewState } from "@/recoil/state";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const Fail = () => {
	const navigate = useNavigate();
	const imagePreview = useRecoilValue(imagePreviewState);

	return (
		<div className="flex flex-col items-center text-center gap-1">
			<h1 className="pt-20 mb-6">분석 실패</h1>
			<p className="text-base font-medium text-gray-3 mb-6">
				식단 AI가 사진 속 음식을 인식하지 못했습니다.
				<br />
				다시 분석해 보시겠습니까?
			</p>
			<div className={"w-96 h-96 overflow-hidden border border-solid border-gray-7 rounded-lg relative"}>
				<img src={imagePreview} className="object-cover" />
			</div>
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
