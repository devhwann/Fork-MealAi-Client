import { useNavigate, useParams } from "react-router-dom";
import MyGoalText from "@/components/organisms/MyGoalText";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import VerticalProgressBars from "@/components/atoms/progressBars/VerticalProgressBars";
import ReportInfoCards from "@/components/atoms/cards/ReportInfoCards";
import { useEffect, useState } from "react";
import { UserDailyNutrientTypes } from "@/types/feeds/feedsResponseTypes";
import { ReportWeekHistory } from "@/types/report/reportResponseType";
import { reportApi } from "@/api/report";

const WeeklyReport = () => {
	const { week } = useParams();
	const navigate = useNavigate();
	// TODO : 주별 날짜 구해야 함 -> h4자리에 넣기
	const weeklyDates = () => {};

	// data set
	const [weeklyNutry, setWeeklyNutry] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});
	const [weeklyNutryGoal, setWeeklyNutryGoal] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});

	const [nutry, setNutry] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});
	const [goalNutry, setGoalNutry] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});

	useEffect(() => {
		async function getWeeklyReportData() {
			const weeklyReport = await reportApi.getMylogsRequest(`/api/reports/report/${week}`);

			if (weeklyReport.status === 200) {
				console.log("WeeklyReport", weeklyReport);

				//수정 : 곱하기가 아니라 요일 별로 더하기여야 할 듯
				setWeeklyNutry({
					kcal: weeklyReport.data.weekly_nutrient.kcal,
					carbohydrate: weeklyReport.data.weekly_nutrient.carbohydrate * 7,
					protein: weeklyReport.data.weekly_nutrient.protein,
					fat: weeklyReport.data.weekly_nutrient.fat,
				});
				setWeeklyNutryGoal({
					kcal: weeklyReport.data.weekly_goal.kcal,
					carbohydrate: weeklyReport.data.weekly_goal.carbohydrate,
					protein: weeklyReport.data.weekly_goal.protein,
					fat: weeklyReport.data.weekly_goal.fat,
				});
				setNutry({
					kcal: weeklyReport.data.daily_nutrient.kcal,
					carbohydrate: weeklyReport.data.daily_nutrient.carbohydrate * 7,
					protein: weeklyReport.data.daily_nutrient.protein,
					fat: weeklyReport.data.daily_nutrient.fat,
				});
				setGoalNutry({
					kcal: weeklyReport.data.daily_goal.kcal,
					carbohydrate: weeklyReport.data.daily_goal.carbohydrate,
					protein: weeklyReport.data.daily_goal.protein,
					fat: weeklyReport.data.daily_goal.fat,
				});
			}
		}
		getWeeklyReportData();
	}, [week]);

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
						<HorizontalProgressBars nutry={weeklyNutry} usersNutry={weeklyNutryGoal} />
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
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="월" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="화" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="수" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="목" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="금" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="토" />
						<VerticalProgressBars nutry={nutry} usersNutry={goalNutry} day="일" />
					</div>
				</div>
			</div>
			<div className="flex justify-center mt-16">
				<div className="w-1200">
					<h4 className="mb-6">영양소별 섭취 평가</h4>
					<ReportInfoCards nutry={weeklyNutry} usersNutry={weeklyNutryGoal} />
				</div>
			</div>
		</>
	);
};

export default WeeklyReport;
