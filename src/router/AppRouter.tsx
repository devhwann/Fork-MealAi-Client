import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/templates/Layout";
import Loader from "@/components/atoms/loader/Loader";

const Home = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Goal = lazy(() => import("@/pages/auth/Goal"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));

const routes = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/auth/sign-in",
				element: <SignIn />,
			},
			{
				path: "/auth/sign-up/goal",
				element: <Goal />,
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
