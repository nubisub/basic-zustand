import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { v4 as uuidv4 } from "uuid";
export default function Column({ state }) {
	const tasks = useStore((state) => state.tasks);
	const addTask = useStore((state) => state.addTask);

	function handleAddTask() {
		let id = uuidv4();
		addTask(id,"Title Task", state);
	}
	return (
		<div className="border-2 border-black w-[33%] max-w-[300px] min-h-[400px]-">
			<h1>{state}</h1>
			{tasks.map((task, index) => {
				if (task.status === state)
					return <Task key={index + 1} state={task} />;
			})}
			<div>
				<button onClick={handleAddTask} className="bg-sky-400">
					Add Task
				</button>
			</div>
		</div>
	);
}
Column.propTypes = {
	state: PropTypes.string,
};
