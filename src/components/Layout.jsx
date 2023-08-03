import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useStore } from "../store";
import Board from "./Board";
import ModalAddBoard from "./Modal/ModalAddBoard";
import { useState } from "react";

export default function Layout() {
	const setBoards = useStore((state) => state.setBoards);
	const boards = useStore((state) => state.boards);
	const tasks = useStore((state) => state.tasks);
	const setTasks = useStore((state) => state.setTasks);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const filterTasks = (boardId) => {
		return tasks.filter((task) => task.boardId === boardId);
	};
	const filterTasks2 = (boardId) => {
		return tasks.filter((task) => task.boardId !== boardId);
	};

	const onDragTask = (result) => {
		const { source, destination } = result;
		console.log(boards);

		if (!result.destination) {
			return;
		}
		if (source.droppableId !== destination.droppableId) {
			const column = filterTasks(source.droppableId);
			const column3 = filterTasks(destination.droppableId);
			const [removed] = column.splice(source.index, 1);
			removed.boardId = destination.droppableId;
			column3.splice(destination.index, 0, removed);
			const column4 = filterTasks2(destination.droppableId);

			setTasks([...column3, ...column4]);
		} else {
			const column = filterTasks(source.droppableId);
			const [removed] = column.splice(source.index, 1);
			column.splice(destination.index, 0, removed);
			const column2 = filterTasks2(source.droppableId);
			setTasks([...column, ...column2]);
		}
	};
	const onDragBoard = (result) => {
		const { source, destination } = result;
		if (!result.destination) {
			return;
		}
		const [removed] = boards.splice(source.index, 1);
		boards.splice(destination.index, 0, removed);
		setBoards([...boards]);
	};
	const onDragEnd = (result) => {
		const { type } = result;
		if (type !== "drop-task") {
			onDragTask(result);
		} else {
			onDragBoard(result);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId="all-columns"
				direction="horizontal"
				type="drop-task"
			>
				{(provided) => (
					<div className="flex flex-row justify-center gap-2 items-start  bg-secBlack">
						<div
							className="flex text-[#8B949E] justify-center items-start  bg-secBlack"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{boards.map((column, index) => {
								return <Board board={column} key={column.id} index={index} />;
							})}

							{provided.placeholder}
						</div>
						<button
							onClick={openModal}
							className="text-left rounded-lg flex items-center px-3 gap-x-1 p-3 bg-secBlack text-sm hover:bg-[#23272f] hover:text-slate-200  border-borderMain hover:border-[#3f454b] border text-slate-300 min-w-[130px] transition-colors duration-100 ease-in-out"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
							Add Board
						</button>
						<ModalAddBoard isOpen={isModalOpen} onClose={closeModal}>
							<h2 className="text-2xl font-bold text-slate-100 mb-3">{`Add Board`}</h2>
						</ModalAddBoard>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
