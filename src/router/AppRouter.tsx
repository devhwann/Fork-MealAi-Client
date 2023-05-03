import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/templates/Layout";
import Loader from "@/components/atoms/loader/Loader";

const Home = lazy(() => import("@/pages/Home"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Goal = lazy(() => import("@/pages/auth/Goal"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const FindPassword = lazy(() => import("@/pages/auth/FindPassword"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Info = lazy(() => import("@/pages/auth/Info"));

const routes = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
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
