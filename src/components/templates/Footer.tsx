import Logo from "@/assets/logo_white.svg";

// TODO : 로고 svg 교체
const Footer = () => {
	return (
		<div className="w-full h-36 bg-gray-2 text-center py-10">
			<div>
				<img src={Logo} width="115" height="27" className="ml-20" />
			</div>
			<p className="text-white text-sm font-medium mt-3.5">ⓒ 2023 MealAi all rights reserved.</p>
		</div>
	);
};

export default Footer;
