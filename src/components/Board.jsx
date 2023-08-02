import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";
import { useEffect } from "react";
export default function Board({ state }) {
	const setTasks = useStore((state) => state.setTasks);
	// before unload save tasks to local storage
	window.addEventListener("beforeunload", () => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});

	// get tasks from local storage if exists
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks"));
		if (tasks) {
			setTasks(tasks);
		}
	}, []);

	const tasks = useStore((state) => state.tasks);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<Droppable key={state} droppableId={state}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className="border rounded-md p-3 px-4 bg-[#010409] border-[#30363D] xl:w-[33%] max-w-[350px] min-h-[400px]"
				>
					{/* circle div */}
					<div className="flex gap-2 items-center mx-1 mb-1">
						<div
							className={
								state === "To Do"
									? "w-3 h-3 rounded-full bg-rose-500"
									: state === "In Progress"
									? "w-3 h-3 rounded-full bg-yellow-500"
									: "w-3 h-3 rounded-full bg-green-500"
							}
						></div>
						<h1 className="text-[#ffffff] text-md">{state}</h1>
					</div>

					<ul className="flex flex-col ">
						{tasks.map((task, index) => {
							if (task.status === state)
								return (
									<Task
										key={index + 1}
										index={tasks
											.filter((task) => task.status === state)
											.indexOf(task)}
										state={task}
										status={state}
									/>
								);
						})}
						{provided.placeholder}
					</ul>

					<div className="w-full">
						<button
							onClick={openModal}
							className=" text-left rounded-lg w-full flex items-center px-2 gap-x-2 p-2 mt-2 hover:bg-gray-800 hover:text-slate-300 transition-colors duration-100 ease-in-out"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
							Add Task
						</button>
						<Modal isOpen={isModalOpen} onClose={closeModal} state={state}>
							<h2 className="text-2xl font-bold text-slate-100 mb-3">{`Add ${state} Task`}</h2>
						</Modal>
					</div>
				</div>
			)}
		</Droppable>
	);
}
Board.propTypes = {
	state: PropTypes.string,
};
