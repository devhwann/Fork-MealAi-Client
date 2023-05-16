import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "../atoms/loader/Loader";
import TopButton from "../atoms/buttons/TopButton";
import styled from "styled-components";

// styled
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: white;
`;

const Page = styled.div`
	margin: 90px auto 120px auto;
	width: 100%;
	flex: 1;
`;

const Layout = () => {
	useScrollRestoration();

	return (
		<>
			<Header />
			<TopButton />
			<Wrapper>
				<Page>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</Page>
				<Footer />
			</Wrapper>
		</>
	);
};

export default Layout;
