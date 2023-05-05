import { goalTypes } from "@/utils/getGoalData";
import Badge from "../atoms/badges/Badge";

export interface GoalTextProps {
	goal: string;
}

const GoalText = ({ goal }: GoalTextProps) => {
	const data = goalTypes.filter((f) => f.name === goal)[0].items;
	const [title, desc] = [data.title, data.desc];
	return (
		<div className="max-w-max">
			<Badge text="목표" color="primary2" />
			<span className="text-base font-semibold text-gray-4 ml-2">{title}</span>
			<span className="text-gray-6">({desc})</span>
		</div>
	);
};

export default GoalText;
