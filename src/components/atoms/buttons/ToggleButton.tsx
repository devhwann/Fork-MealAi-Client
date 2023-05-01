export interface ToggleButtonProps {
	isChecked: boolean;
	onChange?: () => void;
}

const ToggleButton = ({ isChecked, onChange }: ToggleButtonProps) => {
	return (
		<div className="form-control w-48 ">
			<label className="label cursor-pointer">
				<span className="label-text text-sm text-gray-4">식단톡 공개 여부</span>
				<input type="checkbox" className="toggle" checked={isChecked} onChange={onChange} />
			</label>
		</div>
	);
};

export default ToggleButton;
