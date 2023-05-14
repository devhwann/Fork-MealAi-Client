import { MealType } from "@/utils/getMealTime";
import { FoodsTypes } from "./feedsResponseTypes";

export interface GetFeedsParamsTypes {
	goal?: string;
	filter?: string;
	page?: number;
	per_page?: number;
}

export interface PostAiTypes {
	date: string;
	meal_time: MealType | string;
	file: ArrayLike<File>;
}

export type FilterType = "newest" | "popularity";

export interface EditFeedTypes {
	foods: FoodsTypes[];
	open: boolean;
}

export type PostSearchFoodTypes = Pick<FoodsTypes, "food_id" | "weight">;
