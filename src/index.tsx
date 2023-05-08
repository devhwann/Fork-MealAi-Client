import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { hydrate, render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<HelmetProvider>
		<App />
	</HelmetProvider>
);
