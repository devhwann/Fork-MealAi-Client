import Badge from "@atoms/badges/Badge";
import { ProgressBarProps, ProgressBarsProps } from "@atoms/progressBars/HorizontalProgressBars";
import getProgressBarPercent from "@/utils/getProgressBarPercent";
import KcalIcon from "@/assets/icon_kcal.svg";
import CarboIcon from "@/assets/icon_carbo.svg";
import ProteinIcon from "@/assets/icon_protein.svg";
import FatIcon from "@/assets/icon_fat.svg";

// 영양소별 카드 컴포넌트
const ReportInfoCard = ({ type, value, max }: ProgressBarProps) => {
	// 충분, 부족, 과잉 상태 확인
	const result = getProgressBarPercent({ value, max });

	// result 값으로 상태별 뱃지와 설명글 나타내는 함수
	function nutrientBadgeAndDescription(result: number) {
		if (result > 115) {
			return {
				BadgeComponent: <Badge text="과잉" color="systemError" />,
				desc1: "섭취량이 기준치에 비해 많았어요.",
				desc2: "다음 주에는 보완해서 식사해보세요.",
			};
		} else if (result < 85) {
			return {
				BadgeComponent: <Badge text="부족" color="systemError" />,
				desc1: "섭취량이 기준치에 비해 적었어요.",
				desc2: "다음주에는 보완해서 식사해보세요.",
			};
		}
		return {
			BadgeComponent: <Badge text="충분" color="systemSuccess" />,
			desc1: "한 주간 목표치에",
			desc2: "맞게 잘 섭취하셨어요.",
		};
	}

	// 타입별 아이콘
	function nutrientIcon(type: ProgressBarProps["type"]) {
		switch (type) {
			case "칼로리":
				return KcalIcon;
			case "탄수화물":
				return CarboIcon;
			case "단백질":
				return ProteinIcon;
			case "지방":
				return FatIcon;
		}
	}

	const { BadgeComponent, desc1, desc2 } = nutrientBadgeAndDescription(result);
	const icon = nutrientIcon(type);

	return (
		<div className="w-282 h-80 p-8 bg-white border border-solid border-gray-7 rounded-lg">
			<div className="flex flex-row justify-between mb-12">
				<h4>{type}</h4>
				{BadgeComponent}
			</div>
			<p className="text-gray-3 font-semibold mb-4">
				{value}
				<span className="text-gray-6 font-semibold">
					{" "}
					/ {max} {type === "칼로리" ? "kcal" : "g"}
				</span>
			</p>
			<p className="text-sm text-gray-5 font-medium">{desc1}</p>
			<p className="text-sm text-gray-5 font-medium">{desc2}</p>
			<div className="mt-12 flex justify-end">
				<img src={icon} />
			</div>
		</div>
	);
};

// 전체 카드 모음
const ReportInfoCards = ({
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
		<div className="flex flex-row gap-6">
			<ReportInfoCard type="칼로리" value={kcalValue} max={kcalMax} />
			<ReportInfoCard type="탄수화물" value={carboValue} max={carboMax} />
			<ReportInfoCard type="단백질" value={proteinValue} max={proteinMax} />
			<ReportInfoCard type="지방" value={fatValue} max={fatMax} />
		</div>
	);
};

export default ReportInfoCards;
