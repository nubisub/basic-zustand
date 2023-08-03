import PropTypes from "prop-types";
import { useStore } from "../../store";

const colors = [
	"bg-rose-500",
	"bg-pink-500",
	"bg-fuchsia-500",
	"bg-purple-500",
	"bg-violet-500",
	"bg-indigo-500",
	"bg-blue-500",
	"bg-cyan-500",
	"bg-teal-500",
	"bg-emerald-500",
	"bg-green-500",
	"bg-lime-500",
];

export default function ModalAddBoard({ isOpen, onClose, children, board }) {
	const editBoard = useStore((state) => state.editBoard);
	const deleteBoard = useStore((state) => state.deleteBoard);

	const handleAddBoard = (e) => {
		e.preventDefault();
		if (e.target.title.value === "" || e.target.color.value === "") {
			alert("Please fill out all fields");
			return;
		}
		const title = e.target.title.value;
		let color = e.target.color.value;
		let description = e.target.description.value;
		// addboard waits for id, title, color
		editBoard(board.id, title, description, color);

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed items-start inset-0 bg-opacity-50 bg-black flex sm:m-0 m-2  sm:items-center justify-center">
			<div className="bg-[#161B22] p-6 w-[600px] border border-[#1d232b] rounded-md shadow-lg">
				{children}
				<form onSubmit={handleAddBoard} className="flex flex-col gap-1">
					<label htmlFor="title" className="text-slate-200 text-base">
						Board Title
					</label>
					<input
						className="p-2 px-3 focus:outline-none focus:border-sky-500 bg-[#010409] border-[#42474e] border rounded-md text-sm text-slate-300"
						type="text"
						name="title"
						id="title"
						placeholder="Title"
						defaultValue={board.title}
					/>
					{/* desc */}
					<label htmlFor="description" className="text-slate-200 text-base">
						Board Description
					</label>
					<input
						className="p-2 px-3 focus:outline-none focus:border-sky-500 bg-[#010409] border-[#42474e] border rounded-md text-sm text-slate-300"
						type="text"
						name="description"
						id="description"
						placeholder="Description"
						defaultValue={board.description}
					/>

					{/* color */}
					<label htmlFor="color" className="text-slate-200 text-base mt-1">
						Choose a color
					</label>
					<div className="flex flex-wrap gap-1 justify-between">
						{colors.map((color) =>
							color === board.color ? (
								<div key={color} className="flex items-center">
									<label
										htmlFor={color}
										className={`w-10 h-10 rounded-md ${color} cursor-pointer flex items-center justify-center`}
									>
										<input
											type="radio"
											name="color"
											id={color}
											value={color}
											className="z-20 focus:ring-sky-500  h-4 w-4 cursor-pointer"
											defaultChecked
										/>
									</label>
								</div>
							) : (
								<div key={color} className="flex items-center">
									<label
										htmlFor={color}
										className={`w-10 h-10 rounded-md ${color} cursor-pointer flex items-center justify-center`}
									>
										<input
											type="radio"
											name="color"
											id={color}
											value={color}
											className="z-20 focus:ring-sky-500  h-4 w-4 cursor-pointer"
										/>
									</label>
								</div>
							)
						)}
					</div>

					<div className="flex mt-6 justify-between flex-row-reverse">
						<div className="flex justify-end">
							<button
								type="button"
								className="mr-4 py-2 px-4 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition-colors duration-100 ease-in-out"
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="py-2 px-6 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition-colors duration-100 ease-in-out"
							>
								Save
							</button>
						</div>
						<button
							type="button"
							className="py-2 px-4 bg-red-700 text-white rounded font-semibold hover:bg-red-800 transition-colors duration-100 ease-in-out"
							onClick={() => {
								deleteBoard(board.id);
								onClose();
							}}
						>
							Delete Board
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
ModalAddBoard.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	board: PropTypes.object,
};
