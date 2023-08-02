import PropTypes from "prop-types";
import { useStore } from "../store";

export default function Task({ state }) {
	const deleteTask = useStore((state) => state.deleteTask);
	const handleDeleteTask = () => {
		deleteTask(state.id);
	};
	return (
		<>
			<div className="bg-rose-500">
				<div>{state.title}</div>
				<button onClick={handleDeleteTask}>Delete</button>
			</div>
		</>
	);
}

Task.propTypes = {
	state: PropTypes.object,
};
