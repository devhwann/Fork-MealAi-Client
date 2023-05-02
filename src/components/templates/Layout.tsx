import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopButton from "../atoms/buttons/TopButton";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense } from "react";
import Loader from "../atoms/loader/Loader";

// styled
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const Page = styled.div`
	margin: 90px auto 120px auto;
	width: 100%;
	flex: 1;
`;

// TODO : 요 위치에 오는 게 맞나?
const Layout = () => {
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
