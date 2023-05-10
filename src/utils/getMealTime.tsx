import { ThumbnailProps } from "@/components/atoms/thumbnail/Thumbnail";

export default function getMealTime(time: ThumbnailProps["mealTime"]) {
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
