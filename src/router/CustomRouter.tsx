import React, { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const SignUp = lazy(() => import("@/pages/SignUp"));

const router = createBrowserRouter([
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
]);

// TODO 로딩중 컴포넌트 (나중에 만들어야함)
const CustomRouter = () => {
	return (
		<React.Fragment>
			<Suspense fallback={<div>로딩중 </div>}>
				<RouterProvider router={router} />
			</Suspense>
		</React.Fragment>
	);
};

export default CustomRouter;
