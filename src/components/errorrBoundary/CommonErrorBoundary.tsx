import React from "react";
import { FallbackProps, useErrorBoundary } from "react-error-boundary";
import BasicButton from "../atoms/buttons/BasicButton";

const Fallback: React.FC<FallbackProps> = ({ error }) => {
	const { resetBoundary } = useErrorBoundary();

	return (
		<section>
			<div className="mt-40 text-center">
				<p className="text-8xl font-bold text-primary-1 mb-4">Oops!</p>
				<p className="text-6xl font-bold text-gray-1">
					Something went wrong
					<span className="text-primary-1">.</span>
				</p>
				<p className="text-xl font-bold text-system-error mt-10 mb-3">{error.toString()}</p>
				<p className="text-lg font-medium text-gray-3 mb-10">
					서비스 이용이 원활하지 않습니다.
					<br />
					페이지를 새로고침 하거나 이전으로 돌아가 다시 시도해보세요.
				</p>
				<BasicButton type="button" onClick={resetBoundary} width={false} style="primary">
					다시 시도 →
				</BasicButton>
			</div>
		</section>
	);
};

export default Fallback;
