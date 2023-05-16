import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "@/utils/axios.utils";
import { userApi } from "@/api/user";
import { feedsApi } from "@/api/feeds";
import { validateConfirmPassword, validatePassword } from "@/utils/validation";
import { GetFeedsTypes } from "@/types/feeds/feedsResponseTypes";
import GoalText, { GoalType } from "@/components/organisms/GoalText";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import Input from "@/components/atoms/inputs/Input";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import InputLabel from "@/components/atoms/inputs/InputLabel";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const MyPage = () => {
	const navigate = useNavigate();

	const [nickname, setNickname] = useState("");
	const [goal, setGoal] = useState<GoalType>("balance");
	const [myLikesFeeds, setMyLikesFeeds] = useState<GetFeedsTypes[]>([]);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	// 내가 좋아한 식단 피드 인피니티 스크롤
	useEffect(() => {
		// 감지 대상이나 다음 페이지가 없으면 return
		if (!observerTarget.current || !hasNextPage) return;

		const io = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				setPage((page) => page + 1);
			}
		});
		io.observe(observerTarget.current);

		return () => io.disconnect();
	}, [hasNextPage]);

	useEffect(() => {
		axios
			.all([userApi.getUserInfoRequest("/api/users"), feedsApi.getMyLikesRequest("/api/feeds/likes", { page })])
			.then(
				axios.spread((userInfoData, myLikesFeedsData) => {
					setNickname(userInfoData.data.nickname);
					setGoal(userInfoData.data.goal);
					setMyLikesFeeds((prev) => [...prev, ...myLikesFeedsData.data.feeds]);
					setHasNextPage(myLikesFeedsData.data.next_page);
				})
			)
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

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

	const handleNextPage = async () => {
		if (!currentPassword) {
			alert("비밀번호를 입력해주세요.");
			return;
		}

		const data = await userApi.createCheckPasswordRequest("/api/users/check_password", { password: currentPassword });
		if (data.status === 200) {
			navigate("/mypage/edit-info");
		} else {
			alert(data.response.data.message);
		}
	};

	// 비밀번호 검사시 enter키로 수정페이지 이동
	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleNextPage();
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

		const data = await userApi.updatePasswordRequest("/api/users/change_password", {
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

		const patchLikes = await feedsApi.updateLikesRequest(`/api/feeds/likes/${feedId}`);

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

					<BasicButton type="button" onClick={handleNewPasswordModal} width={false} style="bg">
						비밀번호 변경
					</BasicButton>
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
									key={v.feed_id}
								/>
							);
						})}
				</div>
				{hasNextPage && <div ref={observerTarget}></div>}
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
							onKeyPress={handleKeyPress}
							ref={currentPasswordInputRef}
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleEditInfoModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={handleNextPage} width={false} style="primary">
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
