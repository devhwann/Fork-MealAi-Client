import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/user";
import { validateConfirmPassword, validatePassword } from "@/utils/validation";
import { feedsApi } from "@/api/feeds";
import { GetFeedsResponseTypes } from "@/types/feeds/feedsResponseTypes";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import GoalText, { GoalType } from "@/components/organisms/GoalText";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import Input from "@/components/atoms/inputs/Input";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기
import { axios, axiosHandler } from "@/utils/axios.utils";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "@/recoil/state";

const MyPage = () => {
	const navigate = useNavigate();

	const [nickname, setNickname] = useState("");
	const [goal, setGoal] = useState<GoalType>("balance");
	const [myLikesFeeds, setMyLikesFeeds] = useState<GetFeedsResponseTypes[]>();

	useEffect(() => {
		axios
			.all([userApi.userInfoRequest("/api/users"), feedsApi.getMyLikesRequest("/api/feeds/likes")])
			.then(
				axios.spread((userInfoData, myLikesFeedsData) => {
					setNickname(userInfoData.data.nickname);
					setGoal(userInfoData.data.goal);
					setMyLikesFeeds(myLikesFeedsData.data);
				})
			)
			.catch((err) => {
				// console.log(err);
				navigate("/auth/sign-in");
				alert("다시 로그인 해주세요.");
				localStorage.clear();
			});

		// TODO : axios 개별 코드 (디버깅 후 삭제 예정; 지영)
		// async function fetchData() {
		// 	let data;
		// 	try {
		// 		data = await userApi.userInfoRequest("/api/users");
		// 		setNickname(data.data.nickname);
		// 		setGoal(data.data.goal);
		// 	} catch (err) {
		// 		navigate("/auth/sign-in");
		// 		alert("다시 로그인 해주세요.");
		// 		localStorage.clear();
		// 	}
		// }
		// fetchData();

		// // test
		// async function test() {
		// 	let data;
		// 	try {
		// 		data = await feedsApi.getMyLikesRequest("/api/feeds/likes");
		// 		console.log("좋아요 피드", data.data);
		// 	} catch (err) {
		// 		console.log("err!!", err);
		// 	}
		// }
		// test();
	}, []);

	// TODO : 소셜 기능 추가시 > 소셜 회원 여부도 받아서 비밀번호 변경 버튼 숨김처리 해야 함
	// 소셜 회원 여부
	const isSocialUser = false;

	// state
	const [currentPassword, setCurrentPassword] = useState("");
	const currentPasswordInputRef = useRef<HTMLInputElement>(null);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// 모달
	const [newPasswordModal, setNewPasswordModal] = useState(false);
	const [editInfodModal, setEditInfoModal] = useState(false);
	const handleNewPasswordModal = () => {
		setNewPasswordModal(!newPasswordModal);
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	};
	const handleEditInfoModal = () => {
		setEditInfoModal(!editInfodModal);
		setCurrentPassword("");
	};

	// 비밀번호 확인
	function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
		if (currentPasswordInputRef.current) {
			setCurrentPassword(currentPasswordInputRef.current.value);
		}
	}

	const handleNextPage = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!currentPassword) {
			alert("비밀번호를 입력해주세요.");
			return;
		}

		const data = await userApi.checkPasswordRequest("/api/users/check_password", { password: currentPassword });
		if (data.status === 200) {
			navigate("/mypage/edit-info");
		} else {
			alert(data.response.data.message);
		}
	};

	// 비밀번호 변경
	const handleChangePassword = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!currentPassword || !newPassword || !confirmPassword) {
			alert("모든 항목을 잘 입력해주세요.");
			return;
		}
		if (currentPassword === newPassword) {
			alert("현재 비밀번호와 변경할 비밀번호가 같습니다.");
			return;
		}

		const data = await userApi.changePasswordRequest("/api/users/change_password", {
			current_password: currentPassword,
			change_password: newPassword,
		});

		if (data.status === 200) {
			alert("비밀번호가 변경되었습니다.");
			handleNewPasswordModal();
		} else {
			alert(data.response.data.message);
		}
	};

	// 비밀번호 검증
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [isPasswordError, setIsPasswordError] = useState(false);

	function handlePasswordError() {
		const isValidate = validatePassword(newPassword);
		if (isValidate) {
			setPasswordErrorMessage("올바른 비밀번호입니다.");
			setIsPasswordError(false);
		} else {
			setPasswordErrorMessage("6자리 이상 입력해주세요");
			setIsPasswordError(true);
		}
	}

	// 비밀번호 확인 검증
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
	const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

	function handleConfirmPasswordError() {
		const isValidate = validateConfirmPassword(newPassword, confirmPassword);
		if (isValidate) {
			setConfirmPasswordErrorMessage("비밀번호가 일치합니다.");
			setIsConfirmPasswordError(false);
		} else {
			setConfirmPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
			setIsConfirmPasswordError(true);
		}
	}

	// 상태 업데이트함수 비동기적 동작 해결
	useEffect(() => {
		if (newPassword !== "") {
			handlePasswordError();
		}
		if (confirmPassword !== "") {
			handleConfirmPasswordError();
		}
	}, [newPassword, confirmPassword]);

	// 좋아요버튼
	const toggleLike = async (i: number, feedId: number) => {
		const copyFeeds = [...myLikesFeeds!];
		copyFeeds[i].my_like = !myLikesFeeds![i].my_like;
		setMyLikesFeeds(copyFeeds);

		const patchLikes = await feedsApi.patchLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			localStorage.clear();
		}
	};

	return (
		<div className="flex flex-col items-center mt-20">
			<h1 className="mb-14">마이페이지</h1>
			<div className="w-1200 h-180 border border-solid border-gray-7 rounded-lg flex items-center ">
				<div className="flex items-center gap-4 ml-16">
					<h3>{nickname} 님</h3>
					<GoalText goal={goal} />
				</div>
				<div className="flex flex-wrap w-32 gap-2 ml-auto mr-16">
					<BasicButton type="button" onClick={handleEditInfoModal} width={false} style="bg">
						회원정보 수정
					</BasicButton>
					{/* 소셜 서비스로 가입한 회원이 아닌 경우에만 비밀번호 변경 가능 */}
					{!isSocialUser && (
						<BasicButton type="button" onClick={handleNewPasswordModal} width={false} style="bg">
							비밀번호 변경
						</BasicButton>
					)}
				</div>
			</div>
			<div className="flex flex-col w-1200 mt-16">
				<h4>내가 좋아한 식단</h4>
				{myLikesFeeds && myLikesFeeds.length === 0 && (
					<div className="text-center my-8">
						<p className="mb-4 font-bold text-gray-3">좋아요💛를 누른 피드가 없어요.</p>
						<BasicButton type="button" onClick={() => navigate("/feeds")} width={false} style="primary">
							식단 구경하러 가기
						</BasicButton>
					</div>
				)}
				<div className="flex flex-wrap mt-6 gap-6">
					{myLikesFeeds &&
						myLikesFeeds.map((v, i) => {
							return (
								<Thumb
									src={v.image_url}
									id={v.feed_id}
									size="md"
									type="like"
									isLike={v.my_like}
									onClick={() => toggleLike(i, v.feed_id)}
									key={i}
								/>
							);
						})}
				</div>
			</div>
			{/* 회원정보 수정 버튼 클릭하면 뜨는 비밀번호 확인 모달 */}
			{editInfodModal && (
				<Modal onClose={handleEditInfoModal} title="비밀번호 확인">
					<div className="mb-6">
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="비밀번호"
							value={currentPassword}
							onChange={handleCheckPassword}
							ref={currentPasswordInputRef}
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleEditInfoModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={(e) => handleNextPage(e)} width={false} style="primary">
							확인
						</BasicButton>
					</div>
				</Modal>
			)}
			{/* 비밀번호 변경 모달 */}
			{newPasswordModal && (
				<Modal onClose={handleNewPasswordModal} title="비밀번호 변경">
					<div className="mb-6 flex flex-col gap-2">
						<div className="mb-4">
							<InputLabel label="현재 비밀번호" htmlFor="currentPassword" />
							<Input
								type="password"
								name="currentPassword"
								id="currentPassword"
								placeholder="현재 비밀번호"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								ref={currentPasswordInputRef}
							/>
						</div>
						<InputWithLabel
							type="password"
							name="newPassword"
							id="newPassword"
							value={newPassword}
							placeholder="변경할 비밀번호"
							isError={isPasswordError}
							errorMessage={passwordErrorMessage}
							onChange={(e) => setNewPassword(e.target.value)}
							label="변경할 비밀번호"
							htmlFor="newPassword"
						/>
						<InputWithLabel
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							placeholder="비밀번호 확인"
							isError={isConfirmPasswordError}
							errorMessage={confirmPasswordErrorMessage}
							onChange={(e) => setConfirmPassword(e.target.value)}
							label="비밀번호 확인"
							htmlFor="confirmPassword"
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleNewPasswordModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={(e) => handleChangePassword(e)} width={false} style="primary">
							수정
						</BasicButton>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default MyPage;
