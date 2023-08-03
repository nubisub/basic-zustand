import { DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../store";
import Board from "./Board";

export default function Layout() {
	const boards = useStore((state) => state.boards);
	const tasks = useStore((state) => state.tasks);
	const setTasks = useStore((state) => state.setTasks);

	const filterTasks = (boardId) => {
		return tasks.filter((task) => task.boardId === boardId);
	};
	const filterTasks2 = (boardId) => {
		return tasks.filter((task) => task.boardId !== boardId);
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const { source, destination } = result;
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{boards.map((column) => {
				return <Board board={column} key={column.id} />;
			})}
			<button className="text-left rounded-lg flex items-center px-3 gap-x-1 p-3 bg-secBlack text-sm hover:bg-[#23272f] hover:text-slate-200  border-borderMain hover:border-[#3f454b] border text-slate-300">
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
		</DragDropContext>
	);
}
