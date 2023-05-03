import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/templates/Layout";
import Loader from "@/components/atoms/loader/Loader";

const Home = lazy(() => import("@/pages/Home"));
const Ai = lazy(() => import("@/pages/meal-ai/Ai"));
const Result = lazy(() => import("@/pages/meal-ai/Result"));
const Fail = lazy(() => import("@/pages/meal-ai/Fail"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));

const routes = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/meal-ai",
				element: <Ai />,
			},
			{
				path: "/meal-ai/result",
				element: <Result />,
			},
			{
				path: "/meal-ai/fail",
				element: <Fail />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
]);

// TODO : Suspense가 두 개 중복으로 못쓰는 건지?
const AppRouter = () => {
	return (
		<React.Fragment>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={routes} />
			</Suspense>
		</React.Fragment>
	);
};

export default AppRouter;
