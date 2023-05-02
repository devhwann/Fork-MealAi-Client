import { goalTypes } from "@/utils/getGoalData";
import Badge from "../atoms/badge/Badge";

export interface GoalTextProps {
	goal: string;
}

const GoalText = ({ goal }: GoalTextProps) => {
	const title = goalTypes.filter((f) => f.name === goal)[0].items.title;
	return (
		<div className="max-w-max">
			<Badge text="목표" color="primary2" />
			<span className="text-base font-semibold text-gray-4 ml-2">{title}</span>
		</div>
	);
};

export default GoalText;
