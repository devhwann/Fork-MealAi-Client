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
			icon: "BalanceIcon",
			title: "균형잡힌 식단",
			desc: "탄·단·지 밸런스",
		},
	},
	{
		name: "diet",
		items: {
			icon: "DietIcon",
			title: "다이어트",
			desc: "저열량/저지방",
		},
	},
	{
		name: "protein",
		items: {
			icon: "MuscleIcon",
			title: "근력보강",
			desc: "고단백",
		},
	},
	{
		name: "lchf",
		items: {
			icon: "LchfIcon",
			title: "키토제닉",
			desc: "저탄수/고지방",
		},
	},
];
