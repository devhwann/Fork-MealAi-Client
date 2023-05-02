import getMealTime from "@/utils/getMealTime";
import LikeButton, { LikeButtonProps } from "../buttons/LikeButton";
import LockIcon from "@/assets/icon_lock.svg";
import Badge from "../badges/Badge";
import { useNavigate } from "react-router-dom";

export interface ThumbnailProps extends LikeButtonProps {
	src: string; // 이미지 주소
	id?: number; // params
	size: "lg" | "md" | "sm"; // 이미지 사이즈
	type: "like" | "log" | "none"; // 이미지에 얹어지는 요소 타입
	mealTime?: "B" | "L" | "D" | "S"; // 아침,점심,저녁,간식
	open?: boolean; // 공개 여부
}

function getSize(size: ThumbnailProps["size"]) {
	switch (size) {
		case "lg":
			return 384;
		case "md":
			return 220;
		case "sm":
			return 148;
	}
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
		<div className="max-w-fit overflow-hidden border border-solid border-gray-7 rounded-lg relative">
			{type === "like" && (
				<p className="absolute right-4 bottom-4 z-10">
					<LikeButton isLike={isLike} onClick={onClick} />
				</p>
			)}
			{type === "log" && (
				<>
					<p className="absolute top-3 left-3 z-10">
						<Badge text={getMealTime(mealTime)} color="gray" />
					</p>
					{open === true && (
						<p className="absolute top-3 right-3 z-10">
							<img src={LockIcon} />
						</p>
					)}
				</>
			)}
			<img
				src={src}
				width={getSize(size)}
				height={getSize(size)}
				className={`${isClick(size)}`}
				onClick={() => {
					if (size === "md") {
						navigate(`/${id}`);
					}
				}}
			/>
		</div>
	);
};

export default Thumb;
