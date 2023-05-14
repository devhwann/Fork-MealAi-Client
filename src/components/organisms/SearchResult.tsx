import { GetSearchFoodTypes } from "@/types/feeds/feedsResponseTypes";

interface SearchResultProps {
	data?: GetSearchFoodTypes[];
	onClick?: () => void;
}

// TODO : 검색 기능 구현
// ^ type 1. (수정)항목 클릭 > 수정 모달의 인풋에 선택한 음식이 담김 > 수정버튼 눌러 최종 데이터 반영
// ^ type 2. (추가) 항목 클릭 > 모달 꺼지며 선택한 음식이 데이터에 바로 1인분 중량으로 반영

const SearchResult = ({ data, onClick }: SearchResultProps) => {
	return (
		<div className="w-full h-64 p-6 mt-4 border-solid border border-gray-7 rounded-lg overflow-auto">
			{!data && <p className="text-center text-gray-6 mt-24">검색 결과가 없습니다.</p>}
			{data &&
				data.map((v, i) => {
					return (
						<p
							key={v.food_id}
							className="max-w-fit mb-4 text-sm text-gray-4 hover:underline cursor-pointer"
							onClick={onClick}
						>
							{v.name}
						</p>
					);
				})}
		</div>
	);
};

export default SearchResult;
