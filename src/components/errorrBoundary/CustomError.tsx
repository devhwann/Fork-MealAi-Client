import React, { ErrorInfo, ReactNode } from "react";
// TODO 커스텀 에러 바운더리 컴포넌트 입니다. 현재는 사용 x
// TODO 나중에 커스텀 하게 된다면 react-error-boundary 모듈제거 후 직접 바운딩 할 에러들을 커스텀 해나가면 됩니다.

interface Props {
	children?: ReactNode;
	fallback: React.ElementType;
}

interface State {
	hasError: boolean;
	info: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			info: null,
		};
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, info: error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log("error: ", error);
		console.log("errorInfo: ", errorInfo);
	}

	render() {
		const { hasError, info } = this.state;
		const { children } = this.props;
		if (hasError) {
			return <this.props.fallback error={info} />;
		}
		return children;
	}
}

export default ErrorBoundary;
