import { MealType } from "@/utils/getMealTime";

interface FoodsTypes {
	food_id: number;
	image_url: string;
	weight: number;
}

interface UserDailyNutrientTypes {
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
}

export interface GetFeedsResponseTypes {
	feed_id: number;
	user_id: number;
	image_url: string;
	user_name: string;
	mealtime: MealType;
	date: string;
	user_daily_nutrient: UserDailyNutrientTypes | null;
	likes: number;
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
	foods: FoodsTypes[];
	created_at: string;
	update_at: string;
	open: boolean;
	goal: string;
	my_like: boolean;
	is_mine: boolean;
}
