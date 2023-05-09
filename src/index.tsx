import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<HelmetProvider>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</HelmetProvider>
);
