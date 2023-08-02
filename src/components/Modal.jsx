import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import { useStore } from "../store";
const Modal = ({ isOpen, onClose, children, state }) => {
	const addTask = useStore((state) => state.addTask);
	if (!isOpen) return null;
	const handleAddTask = (e) => {
		e.preventDefault();
		if (
			e.target.title.value === "" ||
			e.target.description.value === "" ||
			e.target.dueDate.value === ""
		) {
			alert("Please fill out all fields");
			return;
		}
		const title = e.target.title.value;
		const description = e.target.description.value;
		const dueDate = e.target.dueDate.value;
		addTask(uuidv4(), title, description, dueDate, state);
		onClose();
	};

	return (
		<div className="fixed items-start inset-0 bg-opacity-50 bg-black flex sm:m-0 m-2  sm:items-center justify-center">
			<div className="bg-[#161B22] p-6 w-[600px] border border-[#1d232b] rounded-md shadow-lg">
				{children}
				<form onSubmit={handleAddTask} className="flex flex-col gap-1">
					<label htmlFor="title" className="text-slate-200 text-base">
						Title
					</label>
					<input
						className="p-2 px-3 focus:outline-none focus:border-sky-500 bg-[#010409] border-[#42474e] border rounded-md text-sm text-slate-300"
						type="text"
						name="title"
						id="title"
						placeholder="Title"
					/>
					<label htmlFor="description" className="text-slate-200 text-base">
						Description
					</label>
					<textarea
						className="p-2 px-3 min-h-[50px] focus:outline-none bg-[#010409] focus:border-sky-500 border-[#30363D] border rounded-md text-sm text-slate-300"
						name="description"
						id="description"
						cols="10"
						rows="5"
						placeholder="Description"
					></textarea>
					<label htmlFor="dueDate" className="text-slate-200 text-base">
						Due Date
					</label>
					<input
						className="p-2 px-3 focus:outline-none focus:border-sky-500 bg-[#010409] border-[#30363D] border rounded-md text-sm text-slate-300"
						type="date"
						name="dueDate"
						id="dueDate"
					/>
					<div className="flex justify-end mt-6">
						<button
							type="button"
							className="mr-4 py-2 px-4 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition-colors duration-100 ease-in-out"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="py-2 px-4 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition-colors duration-100 ease-in-out"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	state: PropTypes.string.isRequired,
};

export default Modal;
