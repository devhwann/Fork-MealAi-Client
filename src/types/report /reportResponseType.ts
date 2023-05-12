export interface ReportGoal {
	goal: string;
}
export interface ReportWeekHistory {
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
}
export interface ReportWeekHistoryData {
	feed_id: number;
	user_id: number;
	image_url: string;
	user_name: string;
	meal_time: string;
	date: string;
	likes: number;
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
	created_at: string;
	updated_at: string;
	open: boolean;
	goal: string;
	my_like: boolean;
}
