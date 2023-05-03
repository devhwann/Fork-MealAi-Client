import { ChangeEvent } from "react";
import SearchInput from "../atoms/inputs/SearchInput";

interface SearchResultProps {
	data?: string[];
	onClick?: () => void;
}

// TODO : 검색 기능 구현
// ^ type 1. 항목 클릭 > 하단에 검색 keyword가 쌓임. 중복선택 가능. X 눌르면 삭제
// ^ type 2. (모달) 항목 클릭 > 모달 꺼지며 선택한 항목 데이터가 담김

// 클릭하면 리스트에 추가되는거
// function handleCheck(value: string) {
//   const old = [...checkedCategoryNames];
//   if (!old.includes(value)) {
//     old.push(value);
//   } else {
//     old.splice(old.indexOf(value), 1);
//   }
//   setCheckedCategoryNames(old);
// }

const SearchResult = ({ data, onClick }: SearchResultProps) => {
	return (
		<div className="w-full h-64 p-6 mt-4 border-solid border border-gray-7 rounded-lg overflow-auto">
			{!data && <p className="text-center text-gray-6 mt-24">검색 결과가 없습니다.</p>}
			{data &&
				data.map((v, i) => {
					return (
						<p key={i} className="max-w-fit mb-4 text-sm text-gray-4 hover:underline cursor-pointer">
							{v}
						</p>
					);
				})}
		</div>
	);
};

export default SearchResult;
