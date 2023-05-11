import { UserDailyNutrientTypes } from "@/types/feeds/feedsResponseTypes";
import getProgressBarColor from "@/utils/getProgressBarColor";
import getProgressBarPercent from "@/utils/getProgressBarPercent";

export interface ProgressBarsProps {
	nutry: UserDailyNutrientTypes;
	usersNutry: UserDailyNutrientTypes;
	// kcalValue: number;
	// kcalMax: number;
	// carboValue: number;
	// carboMax: number;
	// proteinValue: number;
	// proteinMax: number;
	// fatValue: number;
	// fatMax: number;
}

export interface ProgressBarProps extends DataProps {
	type: "칼로리" | "탄수화물" | "단백질" | "지방";
}

export interface DataProps {
	value: number;
	max: number;
}

// 개별 바
const ProgressBar = ({ type, value, max }: ProgressBarProps) => {
	return (
		<div>
			<div className="flex justify-between text-base font-semibold text-gray-3">
				<p>{type} </p>
				<p>
					{value}
					<span className="text-gray-6">
						{" "}
						/ {max} {type === "칼로리" ? "kcal" : "g"}
					</span>
				</p>
			</div>
			<div className="w-full h-2 bg-gray-9 rounded-full">
				<div
					className={`${getProgressBarColor(type)} h-2 rounded-full`}
					style={{
						width: `${getProgressBarPercent({ value, max }) > 100 ? 100 : getProgressBarPercent({ value, max })}%`,
					}}
				></div>
			</div>
		</div>
	);
};

// 모음 구성
const HorizontalProgressBars = ({ nutry, usersNutry }: ProgressBarsProps) => {
	return (
		<div className="flex flex-col gap-4">
			<ProgressBar type="칼로리" value={nutry.kcal} max={usersNutry.kcal} />
			<ProgressBar type="탄수화물" value={nutry.carbohydrate} max={usersNutry.carbohydrate} />
			<ProgressBar type="단백질" value={nutry.protein} max={usersNutry.protein} />
			<ProgressBar type="지방" value={nutry.fat} max={usersNutry.fat} />
		</div>
	);
};

export default HorizontalProgressBars;
