import { GetSearchFoodTypes } from "@/types/feeds/feedsResponseTypes";

interface SearchResultProps {
	data: GetSearchFoodTypes[];
	onClick: (v: GetSearchFoodTypes) => void;
}

const SearchResult = ({ data, onClick }: SearchResultProps) => {
	return (
		<div className="w-full h-64 p-6 mt-4 border-solid border border-gray-7 rounded-lg overflow-auto">
			{data && data.length === 0 && <p className="text-center text-gray-6 mt-24">검색 결과가 없습니다.</p>}
			{data &&
				data.map((v, i) => {
					return (
						<p
							key={v.food_id}
							className="max-w-fit mb-4 text-sm text-gray-4 hover:underline cursor-pointer"
							onClick={() => onClick(v)}
						>
							{v.name}
						</p>
					);
				})}
		</div>
	);
};

export default SearchResult;
