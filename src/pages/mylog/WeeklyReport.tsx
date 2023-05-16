import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportApi } from "@/api/report";
import { ReportWeekHistory } from "@/types/report/reportResponseType";
import { UserDailyNutrientTypes } from "@/types/feeds/feedsResponseTypes";
import { GoalType } from "@/components/organisms/GoalText";
import MyGoalText from "@/components/organisms/MyGoalText";
import VerticalProgressBars from "@/components/atoms/progressBars/VerticalProgressBars";
import ReportInfoCards from "@/components/atoms/cards/ReportInfoCards";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";

const WeeklyReport = () => {
	const { week } = useParams();

	// data set
	const [goal, setGoal] = useState<GoalType>("balance");
	const [period, setPeriod] = useState<number[]>([]);
	const [dailyData, setDailyData] = useState<UserDailyNutrientTypes[]>([]);

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
	const [goalNutry, setGoalNutry] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});

	const dayOfTheWeek = ["월", "화", "수", "목", "금", "토", "일"];

	useEffect(() => {
		async function getWeeklyReportData() {
			const weeklyReport = await reportApi.getMylogsRequest(`/api/reports/report/${week}`);

			if (weeklyReport.status === 200) {
				if (weeklyReport.data === null) {
					<></>;
				} else {
					setGoal(weeklyReport.data.goal);
					setPeriod([weeklyReport.data.start_of_week, weeklyReport.data.end_of_week]);
					setDailyData(weeklyReport.data.daily_nutrient);

					setWeeklyNutry({
						kcal: weeklyReport.data.weekly_nutrient.kcal,
						carbohydrate: weeklyReport.data.weekly_nutrient.carbohydrate,
						protein: weeklyReport.data.weekly_nutrient.protein,
						fat: weeklyReport.data.weekly_nutrient.fat,
					});
					setWeeklyNutryGoal({
						kcal: weeklyReport.data.weekly_goal.kcal,
						carbohydrate: weeklyReport.data.weekly_goal.carbohydrate,
						protein: weeklyReport.data.weekly_goal.protein,
						fat: weeklyReport.data.weekly_goal.fat,
					});
					setGoalNutry({
						kcal: weeklyReport.data.daily_goal.kcal,
						carbohydrate: weeklyReport.data.daily_goal.carbohydrate,
						protein: weeklyReport.data.daily_goal.protein,
						fat: weeklyReport.data.daily_goal.fat,
					});
				}
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
							<h4 className="mb-6">
								{period[0]} ~ {period[1]}
							</h4>
							<p className="mb-2 text-gray-4">한 주동안 목표에 맞게 열심히 식단관리 하셨나요?</p>
							<p className="text-gray-4">리포트를 확인해보세요.</p>
						</div>
						{goal ? <MyGoalText goal={goal} /> : null}
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
						{dailyData &&
							dailyData.map((v, i) => {
								return (
									<VerticalProgressBars nutry={dailyData[i]} usersNutry={goalNutry} day={dayOfTheWeek[i]} key={i} />
								);
							})}
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
