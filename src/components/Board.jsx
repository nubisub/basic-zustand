import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";
import { Draggable } from "react-beautiful-dnd";
import ModalEditBoard from "./Modal/ModalEditBoard";
export default function Board({ board, index }) {
	const tasks = useStore((state) => state.tasks);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);

	const openModalEdit = () => {
		setIsModalEditOpen(true);
	};
	const closeModalEdit = () => {
		setIsModalEditOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Draggable draggableId={board.id} index={index}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="border mx-3 rounded-md flex flex-col bg-mainBlack min-w-[350px] border-borderMain xl:w-[33%] max-w-[300px]  min-h-[400px] "
					>
						{/* circle div */}
						<div className="flex justify-between items-center p-3 px-4">
							<div className="flex gap-2 items-center mx-1 mb-1">
								<div className={`w-3 h-3 rounded-full ${board.color}`}></div>
								<h1 className="text-white text-md">{board.title}</h1>
							</div>
							<button onClick={openModalEdit} className="hover:text-blue-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
							</button>
						</div>

						<div className="grow">
							<Droppable key={board.id} droppableId={board.id}>
								{(provided) => (
									<ul
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col px-4 min-h-[300px] scroll max-h-[450px] overflow-hidden overflow-y-auto"
									>
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
								)}
							</Droppable>
							<div className="w-full flex p-4 pt-4 pr-5">
								<button
									onClick={openModal}
									className="text-left rounded-lg flex items-center gap-x-1 p-3 px-4 hover:bg-gray-900 hover:text-slate-300 transition-colors duration-100 ease-in-out"
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
							</div>
						</div>
					</div>
				)}
			</Draggable>
			<Modal isOpen={isModalOpen} onClose={closeModal} boardId={board.id}>
				<h2 className="text-2xl font-bold text-slate-100 mb-3">{`Add ${board.title} Task`}</h2>
			</Modal>
			<ModalEditBoard
				isOpen={isModalEditOpen}
				onClose={closeModalEdit}
				board={board}
			>
				<h2 className="text-2xl font-bold text-slate-100 mb-3">{`Edit ${board.title} Board`}</h2>
			</ModalEditBoard>
		</>
	);
}
Board.propTypes = {
	board: PropTypes.object,
	index: PropTypes.number,
};
