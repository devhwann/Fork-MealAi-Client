import { getIcon, goalTypes } from "@/utils/getGoalData";

interface GoalButtonsProps {
	handleGoal: (goal: "balance" | "diet" | "muscle" | "lchf") => void;
	// checked?: boolean;
	currentGoal?: string;
}

interface GoalButtonProps extends GoalButtonsProps {
	goal: "balance" | "diet" | "muscle" | "lchf";
}

const GoalButton = ({ goal, handleGoal, currentGoal }: GoalButtonProps) => {
	const data = goalTypes.filter((f) => f.name === goal)[0].items;
	const [icon, title, desc] = [data.icon, data.title, data.desc];

	return (
		<li>
			<input
				type="radio"
				id={goal}
				value={goal}
				name="goal"
				onChange={() => handleGoal(goal)}
				className="hidden peer"
				checked={currentGoal === goal ? true : false}
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

const GoalButtons = ({ handleGoal, currentGoal }: GoalButtonsProps) => {
	return (
		<div>
			<ul className="grid w-96 gap-6 md:grid-cols-2">
				<GoalButton goal="balance" handleGoal={handleGoal} currentGoal={currentGoal} />
				<GoalButton goal="diet" handleGoal={handleGoal} currentGoal={currentGoal} />
				<GoalButton goal="muscle" handleGoal={handleGoal} currentGoal={currentGoal} />
				<GoalButton goal="lchf" handleGoal={handleGoal} currentGoal={currentGoal} />
			</ul>
		</div>
	);
};

export default GoalButtons;
