import GoogleIcon from "@/assets/icon_social_google.svg";
import NaverIcon from "@/assets/icon_social_naver.svg";
import KakaoIcon from "@/assets/icon_social_kakao.svg";

interface SocialButtonsProps {
	role: "로그인" | "회원가입";
	googleApi: () => void;
	naverApi: () => void;
	kakaoApi: () => void;
}

interface SocialButtonProps {
	role: "로그인" | "회원가입";
	social: "구글" | "네이버" | "카카오";
	onClick: () => void;
}

function getIcon(social: SocialButtonProps["social"]) {
	switch (social) {
		case "구글":
			return GoogleIcon;
		case "네이버":
			return NaverIcon;
		case "카카오":
			return KakaoIcon;
	}
}

const SocialButton = ({ role, social, onClick }: SocialButtonProps) => {
	return (
		<div className="text-center ">
			<button onClick={onClick}>
				<img src={getIcon(social)} />
			</button>
			<p className="text-sm text-gray-6 tracking-tighter mt-2">
				{social} {role}
			</p>
		</div>
	);
};

const SocialButtons = ({ role, googleApi, naverApi, kakaoApi }: SocialButtonsProps) => {
	return (
		<div className="flex justify-center">
			<div className=" w-72 flex justify-between">
				<SocialButton role={role} social="구글" onClick={googleApi} />
				<SocialButton role={role} social="네이버" onClick={naverApi} />
				<SocialButton role={role} social="카카오" onClick={kakaoApi} />
			</div>
		</div>
	);
};

export default SocialButtons;
