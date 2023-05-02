import { goalTypes } from "@/utils/getGoalData";
import BalanceIcon from "@/assets/icon_balance.svg";
import DietIcon from "@/assets/icon_diet.svg";
import MuscleIcon from "@/assets/icon_muscle.svg";
import LchfIcon from "@/assets/icon_lchf.svg";
import GoalText, { GoalTextProps } from "./GoalText";

// TODO : getIcon 코드 리팩토링
function getIcon(icon: string) {
	switch (icon) {
		case "BalanceIcon":
			return BalanceIcon;
		case "DietIcon":
			return DietIcon;
		case "MuscleIcon":
			return MuscleIcon;
		case "LchfIcon":
			return LchfIcon;
	}
}

const MyGoalText = ({ goal }: GoalTextProps) => {
	const data = goalTypes.filter((f) => f.name === goal)[0].items;
	const [icon, desc] = [data.icon, data.desc];
	return (
		<div className="bg-white p-3 pl-6 w-96 rounded-t-lg flex justify-between items-center">
			<div className="flex items-center gap-2">
				<GoalText goal={goal} />
				<span className="text-gray-6">({desc})</span>
			</div>
			<div className="max-w-fit p-3 rounded-lg bg-gray-9 ">
				<img src={getIcon(icon)} width="32" />
			</div>
		</div>
	);
};

export default MyGoalText;
