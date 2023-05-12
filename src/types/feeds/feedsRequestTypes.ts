export interface GetFeedsTypes {
	goal?: string;
	filter?: string;
	page?: number;
	per_page?: number;
}

export type FilterType = "newest" | "popularity";
