import getProgressBarColor from "@/utils/getProgressBarColor";
import getProgressBarPercent from "@/utils/getProgressBarPercent";

export interface ProgressBarsProps {
	kcalValue: number;
	kcalMax: number;
	carboValue: number;
	carboMax: number;
	proteinValue: number;
	proteinMax: number;
	fatValue: number;
	fatMax: number;
}

export interface ProgressBarProps extends DataProps {
	type: "열량" | "탄수화물" | "단백질" | "지방";
}

export interface DataProps {
	value: number;
	max: number;
}

// 개별 바
const ProgressBar = ({ type, value, max }: ProgressBarProps) => {
	return (
		<div>
			<div className="flex justify-between font-semibold text-gray-3">
				<p>{type} </p>
				<p>
					{value}
					<span className="text-gray-6">
						{" "}
						/ {max} {type === "열량" ? "kcal" : "g"}
					</span>
				</p>
			</div>
			<div className="w-full h-2 bg-gray-9 rounded-full">
				<div
					className={`${getProgressBarColor(type)} h-2 rounded-full`}
					style={{ width: `${getProgressBarPercent({ value, max })}%` }}
				></div>
			</div>
		</div>
	);
};

// 모음 구성
const HorizontalProgressBars = ({
	kcalValue,
	kcalMax,
	carboValue,
	carboMax,
	proteinValue,
	proteinMax,
	fatValue,
	fatMax,
}: ProgressBarsProps) => {
	return (
		<div className="flex flex-col gap-4">
			<ProgressBar type="열량" value={kcalValue} max={kcalMax} />
			<ProgressBar type="탄수화물" value={carboValue} max={carboMax} />
			<ProgressBar type="단백질" value={proteinValue} max={proteinMax} />
			<ProgressBar type="지방" value={fatValue} max={fatMax} />
		</div>
	);
};

export default HorizontalProgressBars;
