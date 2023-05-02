import BalanceIcon from "@/assets/icon_balance.svg";
import DietIcon from "@/assets/icon_diet.svg";
import MuscleIcon from "@/assets/icon_muscle.svg";
import LchfIcon from "@/assets/icon_lchf.svg";

// 서버로부터 받은 goal 데이터와 프론트에서 실제 사용할 데이터 매칭
interface GoalTypesInterface {
	name: string;
	items: {
		[key: string]: string;
	};
}

export const goalTypes: Array<GoalTypesInterface> = [
	{
		name: "balance",
		items: {
			icon: "balance",
			title: "균형잡힌 식단",
			desc: "탄·단·지 밸런스",
		},
	},
	{
		name: "diet",
		items: {
			icon: "diet",
			title: "다이어트",
			desc: "저열량/저지방",
		},
	},
	{
		name: "protein",
		items: {
			icon: "muscle",
			title: "근력보강",
			desc: "고단백",
		},
	},
	{
		name: "lchf",
		items: {
			icon: "lchf",
			title: "키토제닉",
			desc: "저탄수/고지방",
		},
	},
];

export function getIcon(icon: string) {
	switch (icon) {
		case "balance":
			return BalanceIcon;
		case "diet":
			return DietIcon;
		case "muscle":
			return MuscleIcon;
		case "lchf":
			return LchfIcon;
	}
}
