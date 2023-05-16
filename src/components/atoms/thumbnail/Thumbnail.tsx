import { useNavigate } from "react-router-dom";
import { S3_URL } from "@/config/constants";
import getMealTime from "@/utils/getMealTime";
import Badge from "../badges/Badge";
import LockIcon from "@/assets/icon_lock.svg";
import NoneImage from "@/assets/image_default_thumbs.svg";
import LikeButton, { LikeButtonProps } from "../buttons/LikeButton";

export interface ThumbnailProps extends LikeButtonProps {
	src: string | null; // 이미지 주소
	id?: number; // params
	size: "lg" | "md" | "sm"; // 이미지 사이즈
	type: "like" | "log" | "none"; // 이미지에 얹어지는 요소 타입
	mealTime?: "breakfast" | "lunch" | "dinner" | "snack" | string; // 아침,점심,저녁,간식
	open?: boolean; // 공개 여부
}

function getSize(size: ThumbnailProps["size"]) {
	switch (size) {
		case "lg":
			return "w-96 h-96";
		case "md":
			return "w-220 h-220";
		case "sm":
			return "w-148 h-148";
	}
}

function getImageSrc(src: ThumbnailProps["src"]) {
	if (src !== null) {
		return S3_URL + src;
	}
	return NoneImage;
}

const Thumb = ({ src, id, size, type, mealTime, open, isLike, onClick }: ThumbnailProps) => {
	const navigate = useNavigate();

	function isClick(size: ThumbnailProps["size"]) {
		if (size === "md") {
			return "cursor-pointer transition duration-300 ease-out hover:scale-110";
		}
		return;
	}

	return (
		<>
			<div className={`${getSize(size)} overflow-hidden border border-solid border-gray-7 rounded-lg relative`}>
				{type === "like" && (
					<p className="absolute right-4 bottom-4 z-10">
						<LikeButton isLike={isLike} onClick={onClick} />
					</p>
				)}
				{type === "log" && (
					<>
						<p className="absolute top-3 left-3 z-10">
							<Badge text={getMealTime(mealTime!)} color="gray" />
						</p>
						{open === false && (
							<p className="absolute top-3 right-3 z-10">
								<img src={LockIcon} />
							</p>
						)}
					</>
				)}
				<img
					src={getImageSrc(src)}
					className={`${isClick(size)} ${getSize(size)} object-cover`}
					onClick={() => {
						if (size === "md") {
							navigate(`/feeds/${id}`);
						}
					}}
				/>
			</div>
		</>
	);
};

export default Thumb;
