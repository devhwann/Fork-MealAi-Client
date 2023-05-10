interface FoodsTypes {
	food_id: number;
	image_url: string;
	weight: number;
}

export interface GetFeedsResponseTypes {
	feed_id: number;
	user_id: number;
	image_url: string;
	user_name: string;
	mealtime: string;
	date: string;
	likes: number;
	kcal: number;
	carbohydrate: number;
	protein: number;
	fat: number;
	foods: FoodsTypes;
	created_at: string;
	update_at: string;
	open: boolean;
	goal: string;
	my_like: boolean;
}
