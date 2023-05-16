import { useNavigate } from "react-router";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="mt-40 text-center">
			<p className="text-8xl font-bold text-primary-1 mb-4">404</p>
			<p className="text-6xl font-bold text-gray-1">
				Page not found
				<span className="text-primary-1">.</span>
			</p>
			<p className="text-lg font-medium text-gray-3 my-10">
				존재하지 않는 주소를 입력하셨거나,
				<br />
				요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
			</p>
			<BasicButton
				type="button"
				onClick={() => {
					navigate("/");
				}}
				width={false}
				style="primary"
			>
				메인으로 이동 →
			</BasicButton>
		</div>
	);
};

export default PageNotFound;
