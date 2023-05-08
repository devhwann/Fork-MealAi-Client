import AppRouter from "@/router/AppRouter";
import { GlobalStyle } from "@/styles/GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errorrBoundary/CommonErrorBoundary";
import { HelmetProvider, Helmet } from "react-helmet-async";
import MetaTag from "./utils/getMetaTag";

const helmetContext = {};

const App = () => {
	return (
		// <HelmetProvider>
		// 	<MetaTag
		// 		title={"MealAi"}
		// 		description={"식단 관리 서비스"}
		// 		keywords={"다이어트"}
		// 		// imgsrc={"@/assets/icon_food_add.svg"}
		// 		url={"https://github.com"}
		// 		locale={"ko_KR"}
		// 	/>
		<HelmetProvider context={helmetContext}>
			<Helmet prioritizeSeoTags>
				<title>Hello World</title>
				<link rel="canonical" href="https://www.tacobell.com/" />
			</Helmet>
			<h1>Hello World</h1>
			<GlobalStyle />
			<ErrorBoundary FallbackComponent={Fallback}>
				<AppRouter />
			</ErrorBoundary>
		</HelmetProvider>

		// </HelmetProvider>
	);
};

export default App;
