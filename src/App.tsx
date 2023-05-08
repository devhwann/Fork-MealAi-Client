import AppRouter from "@/router/AppRouter";
import { GlobalStyle } from "@/styles/GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errorrBoundary/CommonErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import MetaTag from "./utils/getMetaTag";

const App = () => {
	return (
		<HelmetProvider>
			<MetaTag
				title={"MealAi"}
				description={"식단 관리 서비스"}
				keywords={"다이어트"}
				// imgsrc={"@/assets/icon_food_add.svg"}
				url={"https://github.com"}
				locale={"ko_KR"}
			/>
			<GlobalStyle />
			<ErrorBoundary FallbackComponent={Fallback}>
				<AppRouter />
			</ErrorBoundary>
		</HelmetProvider>
	);
};

export default App;
