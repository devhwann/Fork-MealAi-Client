import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface TagContentProps {
	locale: string;
	title: string;
	description: string;
	keywords: string;
	url: string;
}

const MetaTag = (props: TagContentProps) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{props.title}</title>

				<meta name="description" content={props.description} />
				<meta name="keywords" content={props.keywords} />

				<meta property="og:type" content="website" />
				<meta property="og:title" content={props.title} />
				<meta property="og:site_name" content={props.title} />
				<meta property="og:description" content={props.description} />
				{/* <meta property="og:image" content={props.imgsrc} /> */}
				<meta property="og:url" content={props.url} />
				<meta property="og:locale" content={props.locale} />

				<meta name="twitter:title" content={props.title} />
				<meta name="twitter:description" content={props.description} />
				{/* <meta name="twitter:image" content={props.imgsrc} /> */}

				<link rel="canonical" href={props.url} />
			</Helmet>
		</HelmetProvider>
	);
};

export default MetaTag;
