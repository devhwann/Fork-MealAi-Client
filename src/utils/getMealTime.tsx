import { ThumbnailProps } from "@/components/atoms/thumbnail/Thumbnail";

export default function getMealTime(time: ThumbnailProps["mealTime"]) {
	switch (time) {
		case "B":
			return "아침";
		case "L":
			return "점심";
		case "D":
			return "저녁";
		case "S":
			return "간식";
	}
}
