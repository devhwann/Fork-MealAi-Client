import { ReactNode } from "react";
import CloseButton from "../atoms/buttons/CloseButton";
import styled from "styled-components";

interface ModalProps {
	title: string;
	children: ReactNode;
	onClose: () => void;
}

// styled
const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.2);
	z-index: 9999;
`;

const ModalWrap = styled.div`
	width: fit-content;
	height: fit-content;
	padding: 32px;
	border-radius: 15px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

/** 모달창 on&off 설정하려면 아래의 내용을 모달 컴포넌트를 불러오는 페이지에 작성해주어야 한다.
const [modalIsOpen, setModalIsOpen] = useState(false);
const onModal = () => {
    setModalIsOpen(true);
};
const offModal = () => {
    setModalIsOpen(false);
}; 
*/

const Modal = ({ title, children, onClose }: ModalProps) => {
	const handleClose = () => {
		onClose?.();
	};
	return (
		<Overlay>
			<ModalWrap>
				<div className="flex flex-row justify-between mb-6">
					<h4>{title}</h4>
					<CloseButton onClick={handleClose} />
				</div>
				{children}
			</ModalWrap>
		</Overlay>
	);
};

export default Modal;
