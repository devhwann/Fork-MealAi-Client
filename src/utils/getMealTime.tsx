export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | string;

export default function getMealTime(time: MealType) {
	switch (time) {
		case "breakfast":
			return "아침";
		case "lunch":
			return "점심";
		case "dinner":
			return "저녁";
		case "snack":
			return "간식";
	}
}
