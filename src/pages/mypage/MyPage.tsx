import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import GoalText from "@/components/organisms/GoalText";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import Input from "@/components/atoms/inputs/Input";
import InputWithLabel from "@/components/organisms/InputWithLabel";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기

const MyPage = () => {
	const navigate = useNavigate();

	// TODO : 유저 데이터 받아온 후 로직 구현
	// 유저 정보
	const nickname = "황금늑대";
	// 소셜 서비스로 가입한 회원
	const isSocialUser = false;

	// 좋아요버튼
	const [isLike, setIsLike] = useState(false);

	// 모달
	const [newPasswordModal, setNewPasswordModal] = useState(false);
	const [editInfodModal, setEditInfoModal] = useState(false);
	const handleNewPasswordModal = () => setNewPasswordModal(!newPasswordModal);
	const handleEditInfoModal = () => setEditInfoModal(!editInfodModal);

	// 회원정보 수정 > 비밀번호 확인
	const [checkPassword, setCheckPassword] = useState("");

	function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
		setCheckPassword(e.target.value);
	}

	// 비밀번호 변경
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleCurrentPassword(e: ChangeEvent<HTMLInputElement>) {
		setCurrentPassword(e.target.value);
	}
	function handleNewPassword(e: ChangeEvent<HTMLInputElement>) {
		setNewPassword(e.target.value);
	}
	function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
		setConfirmPassword(e.target.value);
	}

	return (
		<div className="flex flex-col items-center mt-20">
			<h1 className="mb-14">마이페이지</h1>
			<div className="w-1200 h-180 border border-solid border-gray-7 rounded-lg flex items-center ">
				<div className="flex items-center gap-4 ml-16">
					<h3>{nickname} 님</h3>
					<GoalText goal="balance" />
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
				<div className="flex flex-wrap mt-6 gap-6">
					{/* TODO : API 명세 받은 후 map함수 적용 */}
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>{" "}
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
					<Thumb
						src={TempImage}
						id={1}
						size="md"
						type="like"
						isLike={isLike}
						onClick={() => {
							setIsLike(!isLike);
						}}
					/>
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
							value={checkPassword}
							placeholder="비밀번호"
							onChange={handleCheckPassword}
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleEditInfoModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton
							type="button"
							onClick={() => {
								navigate("/mypage/edit-info");
							}}
							width={false}
							style="primary"
						>
							확인
						</BasicButton>
					</div>
				</Modal>
			)}
			{/* 비밀번호 변경 모달 */}
			{newPasswordModal && (
				<Modal onClose={handleNewPasswordModal} title="비밀번호 변경">
					<div className="mb-6">
						<InputWithLabel
							type="password"
							name="currentPassword"
							id="currentPassword"
							value={currentPassword}
							placeholder="현재 비밀번호"
							isError={false}
							errorMessage="message test"
							onChange={handleCurrentPassword}
							label="현재 비밀번호"
							htmlFor="currentPassword"
						/>
						<InputWithLabel
							type="password"
							name="newPassword"
							id="newPassword"
							value={newPassword}
							placeholder="변경할 비밀번호"
							isError={false}
							errorMessage="message test"
							onChange={handleNewPassword}
							label="변경할 비밀번호"
							htmlFor="newPassword"
						/>
						<InputWithLabel
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							placeholder="비밀번호 확인"
							isError={false}
							errorMessage="message test"
							onChange={handleConfirmPassword}
							label="비밀번호 확인"
							htmlFor="confirmPassword"
						/>
					</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleNewPasswordModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={() => {}} width={false} style="primary">
							수정
						</BasicButton>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default MyPage;
