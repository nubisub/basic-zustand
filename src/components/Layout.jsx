import { DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../store";
import Board from "./Board";

export default function Layout() {
	const boards = useStore((state) => state.boards);
	const tasks = useStore((state) => state.tasks);
	const setTasks = useStore((state) => state.setTasks);

	const filterTasks = (status) => {
		return tasks.filter((task) => task.status === status);
	};
	const filterTasks2 = (status) => {
		return tasks.filter((task) => task.status !== status);
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
			console.log(removed);
			removed.status = destination.droppableId;
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
				return <Board state={column} key={column} />;
			})}
		</DragDropContext>
	);
}
