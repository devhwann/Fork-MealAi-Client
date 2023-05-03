import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	return <>edit</>;
};

export default Edit;
