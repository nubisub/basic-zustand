import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const store = (set) => ({
	boards: ["To Do", "In Progress", "Done"],
	tasks: [
		{
			id: uuidv4(),
			title: "Migration to Cloud",
			description:
				"Next month, we will migrate our servers to the cloud. Please prepare accordingly and complete all the tasks by the end of the month.",
			dueDate: "2023-5-24",
			status: "In Progress",
		},
		{
			id: uuidv4(),
			title: "Security Audit",
			description:
				"We will conduct a security audit next week, to ensure that our systems are secure.",
			dueDate: "2023-2-1",
			status: "In Progress",
		},
		{
			id: uuidv4(),
			title: "Sales Pitch",
			description:
				"I will be pitching our product to a potential client next week. Please prepare accordingly.",
			dueDate: "2023-7-13",
			status: "To Do",
		},
		{
			id: uuidv4(),
			title: "Forum Group Discussion",
			description:
				"We will be having a group discussion on the forum next week. The topic is 'How to improve our product'.",
			dueDate: "2023-12-10",
			status: "Done",
		},
		{
			id: uuidv4(),
			title: "Investor Meeting",
			description:
				"There will be an investor meeting next week. This is a very important meeting, so please prepare nicely.",
			dueDate: "2023-10-10",
			status: "To Do",
		},
		{
			id: uuidv4(),
			title: "Code Refactoring",
			description:
				"Our code is getting messy. We need to refactor our code to make it more readable and maintainable.",
			dueDate: "2023-10-10",
			status: "In Progress",
		},
	],
	addTask: (id, title, description, dueDate, status) => {
		set((state) => ({
			tasks: [...state.tasks, { id, title, description, dueDate, status }],
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
