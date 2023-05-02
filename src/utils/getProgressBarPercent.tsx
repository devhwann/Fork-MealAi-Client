import { DataProps } from "@/components/atoms/progressBars/HorizontalProgressBars";

// HorizontalProgressBars, VerticalProgressBars 그래프의 % 값 추출
export default function getProgressBarPercent({ value, max }: DataProps): number {
	const x = Math.round((value / max) * 100);
	return x;
}
