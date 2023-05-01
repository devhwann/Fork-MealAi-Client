import BalanceIcon from "@/assets/icon_balance.svg";
import DietIcon from "@/assets/icon_diet.svg";
import MuscleIcon from "@/assets/icon_muscle.svg";
import LchfIcon from "@/assets/icon_lchf.svg";

const GoalButton = () => {
	return (
		<>
			<input type="radio" id="balance" name="hosting" value="balance" className="hidden peer" required />
			<label
				htmlFor="balance"
				className="inline-flex items-center justify-center text-center w-full p-8 bg-white border-solid border border-gray-7 rounded-lg cursor-pointer  peer-checked:border-primary-1 peer-checked:text-primary-1 peer-checked:bg-bg-1 hover:bg-bg-1 "
			>
				<div>
					<img src={BalanceIcon} className="mx-auto mb-3" />
					<div className="text-xl font-semibold peer-checked:text-primary-1">균형잡힌 식단</div>
					<div className="text-base text-gray-6">(탄·단·지 밸런스)</div>
				</div>
			</label>
		</>
	);
};

export default GoalButton;
