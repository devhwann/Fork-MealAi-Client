import deleteIcon from "@/assets/icon_keyword_delete.svg";

interface SearchBadgeProps {
	text: string;
	color: "gray" | "primary2" | "systemError" | "systemSuccess";
}

// TODO : X 버튼 누르면 배열에서 삭제하기
const SearchBadge = () => {
	return (
		<p className="max-w-fit h-8 p-2 pt-1 flex gap-1 bg-white border border-solid border-primary-1 rounded-full text-primary-1 text-sm font-bold">
			<span>리조또</span>
			<button className="mt-0.5">
				<img src={deleteIcon} />
			</button>
		</p>
	);
};

export default SearchBadge;
