import getProgressBarColor from "@/utils/getProgressBarColor";
import { ProgressBarsProps, ProgressBarProps } from "./HorizontalProgressBars";
import getProgressBarPercent from "@/utils/getProgressBarPercent";

interface VerticalProgressBarsProps extends ProgressBarsProps {
	day: string;
}

// 개별 바
const ProgressBar = ({ type, value, max }: ProgressBarProps) => {
	return (
		<div>
			<div className="w-2 h-32 bg-gray-9 rounded-full relative">
				<div
					className={`${getProgressBarColor(type)} w-2 rounded-full absolute bottom-0`}
					style={{ height: `${getProgressBarPercent({ value, max })}%` }}
				></div>
			</div>
		</div>
	);
};

// 모음 구성
const VerticalProgressBars = ({
	kcalValue,
	kcalMax,
	carboValue,
	carboMax,
	proteinValue,
	proteinMax,
	fatValue,
	fatMax,
	day,
}: VerticalProgressBarsProps) => {
	return (
		<div className="w-14">
			<div className="flex gap-2">
				<ProgressBar type="칼로리" value={kcalValue} max={kcalMax} />
				<ProgressBar type="탄수화물" value={carboValue} max={carboMax} />
				<ProgressBar type="단백질" value={proteinValue} max={proteinMax} />
				<ProgressBar type="지방" value={fatValue} max={fatMax} />
			</div>

			<div className="h-px mt-4 mb-2 bg-gray-8"></div>
			<p className="text-center font-semibold text-gray-3">{day}</p>
		</div>
	);
};

export default VerticalProgressBars;
