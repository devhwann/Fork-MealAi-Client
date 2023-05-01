import { ProgressBarProps } from "@/components/atoms/progressBars/HorizontalProgressBars";

// HorizontalProgressBars, VerticalProgressBars 컬러 적용 함수
export default function getProgressBarColor(type: ProgressBarProps["type"]) {
	switch (type) {
		case "열량":
			return "bg-primary-1";
		case "탄수화물":
			return "bg-graph-carbo";
		case "단백질":
			return "bg-graph-protein";
		case "지방":
			return "bg-secondary-1";
	}
}
