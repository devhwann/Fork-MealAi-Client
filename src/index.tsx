import React, { lazy, Suspense } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/global-styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const SignUp = lazy(() => import("@/pages/SignUp"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/signUp",
		element: <SignUp />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<Suspense fallback={<div>로딩중.. (나중에 만들어야함) </div>}>
			<RouterProvider router={router} />
		</Suspense>
	</React.StrictMode>
);

reportWebVitals();
