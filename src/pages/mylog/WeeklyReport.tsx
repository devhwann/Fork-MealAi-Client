import { useNavigate, useParams } from "react-router-dom";
import MyGoalText from "@/components/organisms/MyGoalText";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import VerticalProgressBars from "@/components/atoms/progressBars/VerticalProgressBars";
import ReportInfoCards from "@/components/atoms/cards/ReportInfoCards";

const WeeklyReport = () => {
	const { week } = useParams();
	const navigate = useNavigate();
	// TODO : 주별 날짜 구해야 함 -> h4자리에 넣기
	const weeklyDates = () => {};

	return (
		<>
			<div className="h-96 bg-bg-1 flex justify-center">
				<div className="w-1200 flex justify-between">
					<div className="pt-20 grid content-between">
						<div>
							<h1 className="text-primary-1 mb-2">주간 AI 리포트</h1>
							<h4 className="mb-6">2023.04.21 - 2023.04.27</h4>
							<p className="mb-2 text-gray-4">한 주동안 목표에 맞게 열심히 식단관리 하셨나요?</p>
							<p className="text-gray-4">리포트를 확인해보세요.</p>
						</div>
						<MyGoalText goal="balance" />
					</div>
					<div className="w-96 h-64 p-10 mt-20 bg-white border-solid border border-gray-7 rounded-lg">
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
			</div>
			<div className="flex justify-center mt-16">
				<div className="w-1200 h-64 border border-solid border-gray-7 rounded-lg flex justify-between">
					<div className="mt-16 ml-20 mb-16 grid content-between">
						<div>
							<h4>일일 영양 섭취량</h4>
							<p className="text-gray-3 mt-2">매일의 영양소 섭취를 한눈에 확인해보세요.</p>
						</div>
						<div className="flex gap-4">
							<div className="flex gap-2 items-center">
								<div className="rounded-full w-3 h-3 bg-primary-1"></div>
								<span className="text-gray-5">칼로리</span>
							</div>
							<div className="flex gap-2 items-center">
								<div className="rounded-full w-3 h-3 bg-graph-carbo"></div>
								<span className="text-gray-5">탄수화물</span>
							</div>
							<div className="flex gap-2 items-center">
								<div className="rounded-full w-3 h-3 bg-graph-protein"></div>
								<span className="text-gray-5">단백질</span>
							</div>
							<div className="flex gap-2 items-center ">
								<div className="rounded-full w-3 h-3 bg-secondary-1"></div>
								<span className="text-gray-5">지방</span>
							</div>
						</div>
					</div>
					<div className="flex gap-10 items-center mr-20">
						{/* TODO : 데이터 받아서 map함수 적용 */}
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="월"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="화"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="수"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="목"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="금"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="토"
						/>
						<VerticalProgressBars
							kcalValue={982}
							kcalMax={2200}
							carboValue={8}
							carboMax={113}
							proteinValue={25}
							proteinMax={20}
							fatValue={12}
							fatMax={16}
							day="일"
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center mt-16">
				<div className="w-1200">
					<h4 className="mb-6">영양소별 섭취 평가</h4>
					<ReportInfoCards
						kcalValue={2200}
						kcalMax={2200}
						carboValue={8}
						carboMax={113}
						proteinValue={18}
						proteinMax={20}
						fatValue={80}
						fatMax={16}
					/>
				</div>
			</div>
		</>
	);
};

export default WeeklyReport;
