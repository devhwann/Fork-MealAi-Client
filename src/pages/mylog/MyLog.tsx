import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BasicButton from "@/components/atoms/buttons/BasicButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import ArrowButton from "@/components/atoms/buttons/ArrowButton";
import TinyButton from "@/components/atoms/buttons/TinyButton";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";

import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기
import { reportApi } from "@/api/report";

// TODO : 페이지 처음 진입할 때 params ?
const MyLog = () => {
	const navigate = useNavigate();

	const { week } = useParams();

	// 좋아요버튼
	const [isLike, setIsLike] = useState(false);

	useEffect(() => {
		// async function fetchReport() {
		// 	let reportWeek;
		// 	try {
		// 		reportWeek = await reportApi.getMylogsRequest(`/api/reports/history/${week}`);
		// 		console.log(reportWeek);
		// 	} catch (err) {
		// 		console.log("error", err);
		// 	}
		// }
		// fetchReport();
	}, [week]);

	const prevClick = () => {
		navigate(`/mylog/${parseInt(week!) + 1}`);
	};
	const nextClick = () => {
		navigate(`/mylog/${parseInt(week!) - 1}`);
	};
	return (
		<>
			<div className="flex flex-col items-center mt-20">
				<h1 className="mb-14">식단일지</h1>
				<div className="w-1200 h-64 px-8 border-solid border border-gray-7 rounded-lg flex justify-between gap-20">
					<ArrowButton direction="prev" onClick={prevClick} />
					<div className="flex justify-between items-center w-full">
						<div>
							<h3 className="text-gray-1 mb-2">주간 영양 섭취량</h3>
							<p className="text-lg font-bold text-gray-4 mb-6">2023.04.21 - 2023.04.27</p>
							<BasicButton
								type="button"
								onClick={() => {
									navigate("/mylog/weekly-report/:week");
								}}
								width={false}
								style="primary"
							>
								주간 AI 리포트 확인
							</BasicButton>
						</div>
						<div className="my-auto w-80 max-h-fit items-center">
							<HorizontalProgressBars
								kcalValue={982}
								kcalMax={2200}
								carboValue={8}
								carboMax={113}
								proteinValue={25}
								proteinMax={20}
								fatValue={12}
								fatMax={16}
							/>
						</div>
					</div>
					<ArrowButton direction="next" onClick={nextClick} />
				</div>

				{/* // TODO : API 명세 받은 후 map함수 적용 */}
				<div>
					<div className="flex justify-between items-center mt-16">
						<h4 className="">2023.04.24(월)</h4>
						<TinyButton type="button" onClick={() => {}} style="bg">
							+ 사진 AI 분석
						</TinyButton>
					</div>
					<div className="flex flex-wrap w-1200 mt-6 gap-6">
						<div className="w-220 h-220 px-6 py-5 border-solid border border-gray-7 rounded-lg">
							<div className="scale-90">
								<HorizontalProgressBars
									kcalValue={982}
									kcalMax={2200}
									carboValue={8}
									carboMax={113}
									proteinValue={25}
									proteinMax={20}
									fatValue={12}
									fatMax={16}
								/>
							</div>
						</div>
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="B" open={true} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="L" open={true} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="S" open={false} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="D" open={true} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="S" open={false} />
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center mt-16">
						<h4 className="">2023.04.25(화)</h4>
						<TinyButton type="button" onClick={() => {}} style="bg">
							+ 사진 AI 분석
						</TinyButton>
					</div>
					<div className="flex flex-wrap w-1200 mt-6 gap-6">
						<div className="w-220 h-220 px-6 py-5 border-solid border border-gray-7 rounded-lg">
							<div className="scale-90">
								<HorizontalProgressBars
									kcalValue={982}
									kcalMax={2200}
									carboValue={8}
									carboMax={113}
									proteinValue={25}
									proteinMax={20}
									fatValue={12}
									fatMax={16}
								/>
							</div>
						</div>
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="L" open={true} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="D" open={true} />
						<Thumb src={TempImage} id={1} size="md" type="log" mealTime="S" open={false} />
					</div>
				</div>
			</div>
		</>
	);
};

export default MyLog;
