import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
const idTODO = uuidv4();
const idInProgress = uuidv4();
const idDone = uuidv4();

const store = (set) => ({
	boards: [
		{
			id: idTODO,
			title: "To Do",
			description: "Tasks that need to be done",
			color: "bg-rose-500",
		},
		{
			id: idInProgress,
			title: "In Progress",
			description: "Tasks that are in progress",
			color: "bg-yellow-500",
		},
		{
			id: idDone,
			title: "Done",
			description: "Tasks that are done",
			color: "bg-green-500",
		},
	],
	tasks: [
		{
			id: uuidv4(),
			boardId: idInProgress,
			title: "Migration to Cloud",
			description:
				"Next month, we will migrate our servers to the cloud. Please prepare accordingly and complete all the tasks by the end of the month.",
			dueDate: "2023-5-24",
		},
		{
			id: uuidv4(),
			boardId: idInProgress,
			title: "Security Audit",
			description:
				"We will conduct a security audit next week, to ensure that our systems are secure.",
			dueDate: "2023-2-1",
		},
		{
			id: uuidv4(),
			boardId: idTODO,
			title: "Sales Pitch",
			description:
				"I will be pitching our product to a potential client next week. Please prepare accordingly.",
			dueDate: "2023-7-13",
		},
		{
			id: uuidv4(),
			boardId: idDone,
			title: "Forum Group Discussion",
			description:
				"We will be having a group discussion on the forum next week. The topic is 'How to improve our product'.",
			dueDate: "2023-12-10",
		},
		{
			id: uuidv4(),
			boardId: idTODO,
			title: "Investor Meeting",
			description:
				"There will be an investor meeting next week. This is a very important meeting, so please prepare nicely.",
			dueDate: "2023-10-10",
		},
		{
			id: uuidv4(),
			boardId: idInProgress,
			title: "Code Refactoring",
			description:
				"Our code is getting messy. We need to refactor our code to make it more readable and maintainable.",
			dueDate: "2023-10-10",
		},
	],
	addTask: (id, boardId, title, description, dueDate) => {
		set((state) => ({
			tasks: [
				...state.tasks,
				{ id, boardId, title, description, dueDate},
			],
		}));
	},
	deleteTask: (id) => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	},
	setTaskStatus: (id, status) => {
		set((state) => ({
			tasks: state.tasks.map((task) => {
				if (task.id === id) {
					return { ...task, status };
				} else {
					return task;
				}
			}),
		}));
	},
	spliceTask: (index, task) => {
		set((state) => ({
			tasks: state.tasks.splice(index, 1, task),
		}));
	},
	setTasks: (tasks) => {
		set((state) => ({
			tasks: tasks,
		}));
	},
});

export const useStore = create(store);
