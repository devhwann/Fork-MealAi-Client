import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reportApi } from "@/api/report";
import { ReportWeekHistory, ReportWeekHistoryData } from "@/types/report/reportResponseType";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import ArrowButton from "@/components/atoms/buttons/ArrowButton";
import TinyButton from "@/components/atoms/buttons/TinyButton";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import axios from "axios";

const MyLog = () => {
	const navigate = useNavigate();
	const { week } = useParams();
	const [period, setPeriod] = useState<number[]>([]);

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

	const [nutry, setNutry] = useState<ReportWeekHistory[]>([
		{
			kcal: 0,
			carbohydrate: 0,
			protein: 0,
			fat: 0,
		},
	]);
	const [goalNutry, setGoalNutry] = useState<ReportWeekHistory>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});

	const [feedData, setFeedData] = useState<ReportWeekHistoryData[][]>();

	useEffect(() => {
		async function fetchReport() {
			const reportWeek = await reportApi.getMylogsRequest(`/api/reports/history/${week}`);

			if (reportWeek.status === 200) {
				setNutry(reportWeek.data.nutrient);
				setGoalNutry(reportWeek.data.goal);

				setFeedData(reportWeek.data.data);
			}
		}
		fetchReport();
	}, [week]);

	useEffect(() => {
		async function getWeeklyReportData() {
			const weeklyReport = await reportApi.getReportWeekRequest(`/api/reports/report/${week}`);

			if (weeklyReport.status === 200) {
				if (weeklyReport.data === null) {
					<></>;
				} else {
					setPeriod([weeklyReport.data.start_of_week, weeklyReport.data.end_of_week]);
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
				}
			}
		}
		getWeeklyReportData();
	}, [week]);

	const prevClick = () => {
		navigate(`/mylog/${parseInt(week!) + 1}`);
	};
	const nextClick = () => {
		if (week && Number(week) <= 1) {
			alert("가장 최근 주 입니다.");
			return;
		}
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
							<p className="text-lg font-bold text-gray-4 mb-6">
								{period[0]} ~ {period[1]}
							</p>
							<BasicButton
								type="button"
								onClick={() => {
									navigate(`/mylog/weekly-report/${week}`);
								}}
								width={false}
								style="primary"
							>
								주간 AI 리포트 확인
							</BasicButton>
						</div>
						<div className="my-auto w-80 max-h-fit items-center">
							<HorizontalProgressBars nutry={weeklyNutry} usersNutry={weeklyNutryGoal} />
						</div>
					</div>
					<ArrowButton direction="next" onClick={nextClick} />
				</div>

				<div>
					{feedData &&
						feedData.map((targetDataArr, index) => {
							return (
								<div key={index}>
									<div className="flex justify-between items-center mt-16">
										<h4 className="">{targetDataArr[0].date}</h4>
										<TinyButton
											type="button"
											onClick={() => {
												navigate("/meal-ai");
											}}
											style="bg"
										>
											+ 사진 AI 분석
										</TinyButton>
									</div>
									<div className="flex flex-wrap w-1200 mt-6 gap-6">
										<div className="w-220 h-220 px-6 py-5 border-solid border border-gray-7 rounded-lg">
											<div className="scale-90">
												<HorizontalProgressBars nutry={nutry[index]} usersNutry={goalNutry} />
											</div>
										</div>
										{targetDataArr.map((value) => {
											return (
												<>
													{value.feed_id ? (
														<Thumb
															src={value.image_url}
															id={value.feed_id}
															size="md"
															type="log"
															mealTime={value.meal_time}
															open={value.open}
															key={value.user_id}
														/>
													) : null}
												</>
											);
										})}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default MyLog;
