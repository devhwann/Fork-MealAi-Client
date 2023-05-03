import Thumb, { ThumbnailProps } from "../atoms/thumbnail/Thumbnail";

interface FoodCardProps extends ThumbnailProps {
	name: string;
	weight?: number;
}

const FoodCardViewOnly = ({ src, size, type, name, weight }: FoodCardProps) => {
	return (
		<>
			<div className="max-w-fit p-4 border border-solid border-gray-7 rounded-lg">
				<Thumb src={src} size={size} type={type} />
				<p className="mt-4 mb-2 font-semibold text-gray-2">{name}</p>
			</div>
		</>
	);
};

export default FoodCardViewOnly;
