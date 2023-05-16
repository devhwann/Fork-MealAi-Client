import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopButton from "../atoms/buttons/TopButton";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense } from "react";
import Loader from "../atoms/loader/Loader";
import useScrollRestoration from "@/hooks/useScrollRestoration";

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
	min-width: 1200px;
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
