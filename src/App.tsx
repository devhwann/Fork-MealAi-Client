import AppRouter from "@/router/AppRouter";
import { GlobalStyle } from "@/styles/GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errorrBoundary/CommonErrorBoundary";
import { Helmet } from "react-helmet-async";
import MetaTag from "./utils/getMetaTag";

const App = () => {
	return (
		<>
			<Helmet>
				<title>app title</title>
			</Helmet>
			<GlobalStyle />
			<ErrorBoundary FallbackComponent={Fallback}>
				<AppRouter />
			</ErrorBoundary>
		</>
	);
};

export default App;
// <HelmetProvider>
// 	<MetaTag
// 		title={"MealAi"}
// 		description={"식단 관리 서비스"}
// 		keywords={"다이어트"}
// 		// imgsrc={"@/assets/icon_food_add.svg"}
// 		url={"https://github.com"}
// 		locale={"ko_KR"}
// 	/>
