import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/templates/Layout";

const Home = lazy(() => import("@/pages/Home"));
const Ai = lazy(() => import("@/pages/meal-ai/Ai"));
const Result = lazy(() => import("@/pages/meal-ai/Result"));
const Fail = lazy(() => import("@/pages/meal-ai/Fail"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Goal = lazy(() => import("@/pages/auth/Goal"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const FindPassword = lazy(() => import("@/pages/auth/FindPassword"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Info = lazy(() => import("@/pages/auth/Info"));
const Feeds = lazy(() => import("@/pages/feeds/Feeds"));
const Detail = lazy(() => import("@/pages/feeds/Detail"));
const Edit = lazy(() => import("@/pages/feeds/Edit"));
const MyLog = lazy(() => import("@/pages/mylog/MyLog"));
const WeeklyReport = lazy(() => import("@/pages/mylog/WeeklyReport"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const EditInfo = lazy(() => import("@/pages/mypage/EditInfo"));

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
				path: "/auth/sign-in",
				element: <SignIn />,
			},
			{
				path: "/auth/sign-up",
				element: <SignUp />,
			},
			{
				path: "/auth/sign-up/info",
				element: <Info />,
			},
			{
				path: "/auth/sign-up/goal",
				element: <Goal />,
			},
			{
				path: "/auth/find-password",
				element: <FindPassword />,
			},
			{
				path: "/feeds",
				element: <Feeds />,
			},
			{
				path: "/feeds/:id",
				element: <Detail />,
			},
			{
				path: "/feeds/:id/edit",
				element: <Edit />,
			},
			{
				path: "/mylog/:week",
				element: <MyLog />,
			},
			{
				path: "/mylog/weekly-report/:week",
				element: <WeeklyReport />,
			},
			{
				path: "/mypage",
				element: <MyPage />,
			},
			{
				path: "/mypage/edit-info",
				element: <EditInfo />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
]);

const AppRouter = () => {
	return (
		<React.Fragment>
			<RouterProvider router={routes} />
		</React.Fragment>
	);
};

export default AppRouter;
