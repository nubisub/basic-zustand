import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";
import { useEffect } from "react";
export default function Board({ board }) {
	const setTasks = useStore((state) => state.setTasks);
	// before unload save tasks to local storage
	window.addEventListener("beforeunload", () => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});

	// get tasks from local storage if exists
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks"));
		if (tasks) {
			// setTasks(tasks);
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
		<Droppable key={board.id} droppableId={board.id}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className="border rounded-md p-3 px-4 bg-mainBlack min-w-[350px] border-borderMain xl:w-[33%] max-w-[350px] min-h-[400px]"
				>
					{/* circle div */}
					<div className="flex gap-2 items-center mx-1 mb-1">
						<div
							className={`w-3 h-3 rounded-full ${board.color}`}
						></div>
						<h1 className="text-white text-md">{board.title}</h1>
					</div>

					<ul className="flex flex-col ">
						{tasks.map((task, index) => {
							if (task.boardId === board.id)
								return (
									<Task
										key={index + 1}
										index={tasks
											.filter((task) => task.boardId === board.id)
											.indexOf(task)}
										state={task}
									/>
								);
						})}
						{provided.placeholder}
					</ul>

					<div className="w-full">
						<button
							onClick={openModal}
							className=" text-left rounded-lg w-full flex items-center px-3 gap-x-2 p-2 mt-2 hover:bg-gray-900 hover:text-slate-300 transition-colors duration-100 ease-in-out"
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
						<Modal isOpen={isModalOpen} onClose={closeModal} boardId={board.id}>
							<h2 className="text-2xl font-bold text-slate-100 mb-3">{`Add ${board.title} Task`}</h2>
						</Modal>
					</div>
				</div>
			)}
		</Droppable>
	);
}
Board.propTypes = {
	board: PropTypes.object,
};
