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
				<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<link
					rel="stylesheet"
					as="style"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css"
				/>
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
