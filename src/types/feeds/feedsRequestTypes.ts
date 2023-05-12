import { MealType } from "@/utils/getMealTime";

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
