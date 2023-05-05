import AppRouter from "@/router/AppRouter";
import { GlobalStyle } from "@/styles/GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errorrBoundary/CommonErrorBoundary";
import ThrowCounter from "@/components/errorrBoundary/TestError";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<ErrorBoundary FallbackComponent={Fallback}>
				<AppRouter />
				{/* <ThrowCounter /> */}
			</ErrorBoundary>
		</>
	);
};

export default App;
