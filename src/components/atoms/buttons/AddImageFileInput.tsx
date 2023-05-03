import AddIcon from "@/assets/icon_add_image.svg";
import { ChangeEvent } from "react";

interface AddImageFileInputProps {
	imageUrl?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// TODO : 업로드한 이미지 보이게 처리
const AddImageFileInput = ({ imageUrl, onChange }: AddImageFileInputProps) => {
	return (
		<div className="relative">
			<input type="file" onChange={onChange} accept="image/*" className="w-96 h-96 absolute cursor-pointer" />
			<div className="w-96 h-96 bg-white border border-solid border-primary-2 rounded-lg flex justify-center items-center cursor-pointer">
				<div className="flex flex-col gap-6">
					<div className="flex justify-center">
						<img src={AddIcon} />
					</div>
					<p className="text-sm text-gray-6">식단 사진을 업로드 해주세요.</p>
				</div>
			</div>
			{/* <img src={imageUrl}} /> */}
		</div>
	);
};

export default AddImageFileInput;
