import { ReactNode } from "react";
import styled from "styled-components";
import TopButton from "../atoms/buttons/TopButton";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
	children: ReactNode;
}

// styled
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const Page = styled.div`
	margin: 90px auto 120px auto;
	flex: 1;
`;

// TODO : app.tsx, index.tsx 구조 확인 후 작업
const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			<TopButton />
			<Wrapper>
				<Page>{children}</Page>
				<Footer />
			</Wrapper>
		</>
	);
};

export default Layout;
