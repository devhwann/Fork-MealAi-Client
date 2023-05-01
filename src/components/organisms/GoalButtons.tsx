import { Dispatch, SetStateAction } from "react";
import { goalTypes } from "@/utils/getGoalData";
import BalanceIcon from "@/assets/icon_balance.svg";
import DietIcon from "@/assets/icon_diet.svg";
import MuscleIcon from "@/assets/icon_muscle.svg";
import LchfIcon from "@/assets/icon_lchf.svg";

// TODO : getIcon 코드 리팩토링, setGoal 메소드의 전달이 올바른건지?

interface GoalButtonsProps {
	setGoal: Dispatch<SetStateAction<string>>;
}

interface GoalButtonProps extends GoalButtonsProps {
	goal: string;
}

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

const GoalButton = ({ goal, setGoal }: GoalButtonProps) => {
	const data = goalTypes.filter((f) => f.name === goal)[0].items;
	const [icon, title, desc] = [data.icon, data.title, data.desc];

	return (
		<li>
			<input
				type="radio"
				id={goal}
				value={goal}
				name="goal"
				onChange={() => {
					setGoal(goal);
				}}
				className="hidden peer"
			/>
			<label
				htmlFor={goal}
				className="inline-flex items-center justify-center text-center w-full p-8 bg-white border-solid border border-gray-7 rounded-lg cursor-pointer  peer-checked:border-primary-1 peer-checked:text-primary-1 peer-checked:bg-bg-1 hover:bg-bg-1 "
			>
				<div>
					<img src={getIcon(icon)} className="mx-auto mb-3" />
					<div className="text-xl font-semibold peer-checked:text-primary-1">{title}</div>
					<div className="text-base text-gray-6">({desc})</div>
				</div>
			</label>
		</li>
	);
};

const GoalButtons = ({ setGoal }: GoalButtonsProps) => {
	return (
		<div>
			<ul className="grid w-96 gap-6 md:grid-cols-2">
				<GoalButton goal="balance" setGoal={setGoal} />
				<GoalButton goal="diet" setGoal={setGoal} />
				<GoalButton goal="protein" setGoal={setGoal} />
				<GoalButton goal="lchf" setGoal={setGoal} />
			</ul>
		</div>
	);
};

export default GoalButtons;
