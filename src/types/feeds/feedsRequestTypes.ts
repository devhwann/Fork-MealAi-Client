import { MealType } from "@/utils/getMealTime";

export interface GetFeedsTypes {
	goal?: string;
	filter?: string;
	page?: number;
	per_page?: number;
}

// export interface PostAiType {
// 	date: string;
// 	meal_time: MealType;
// 	file: File | undefined;
// }

export interface PostAiType {
	// file: File | undefined;
	file: FormData;
}
export type FilterType = "newest" | "popularity";
