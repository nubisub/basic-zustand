import PropTypes from "prop-types";
import { useStore } from "../store";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ index, state }) {
	const deleteTask = useStore((state) => state.deleteTask);
	const handleDeleteTask = () => {
		deleteTask(state.id);
	};
	const parseDate = (date) => {
		const dateObj = new Date(date);
		const month = dateObj.toLocaleString("default", { month: "short" });
		const day = dateObj.getDate();
		const year = dateObj.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	return (
		<Draggable key={state.id} draggableId={state.id} index={index}>
			{(provided) => (
				<li
					className="bg-[#161B22] text-slate-300 my-2 rounded border border-[#30363D] border-opacity-50  p-3 flex flex-col gap-2 "
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className="flex justify-between items-center">
						<h1 className="font-semibold">{state.title}</h1>
						<button
							onClick={handleDeleteTask}
							className="text-rose-500 hover:text-rose-600  hover:bg-gray-700 rounded-full p-1"
						>
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
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
					</div>
					<div>
						<p className="text-xs text-slate-400 ">{state.description}</p>
					</div>
					<div>
						{/* add date with month name */}
						<time className="text-xs text-slate-300 bg-gray-800 px-2 border-[0.5px] py-[0.7px] border-gray-700 rounded-xl">
							{parseDate(state.dueDate)}
						</time>
					</div>
				</li>
			)}
		</Draggable>
	);
}

Task.propTypes = {
	state: PropTypes.object,
	index: PropTypes.number,
	status: PropTypes.string,
};
