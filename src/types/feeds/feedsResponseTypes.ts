import { GoalType } from "@/components/organisms/GoalText";
import { MealType } from "@/utils/getMealTime";

export interface FoodsTypes {
	food_id: number;
	image_url: string | null;
	weight: number;
}

export interface UserDailyNutrientTypes {
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
}

export interface GetFeedsResponseTypes {
	feed_id: number;
	user_id: number;
	image_url: string | null;
	user_name: string;
	meal_time: MealType;
	date: string;
	user_daily_nutrient: UserDailyNutrientTypes;
	likes: number;
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
	foods: FoodsTypes[];
	created_at: string;
	update_at: string;
	open: boolean;
	goal: GoalType;
	my_like: boolean;
	is_mine: boolean;
}

export interface GetPagesTypes {
	prev_page: boolean;
	next_page: boolean;
}
