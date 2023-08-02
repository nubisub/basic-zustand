import { create } from "zustand";

const store = (set) => ({
	columns: ["To Do", "In Progress", "Done"],
	tasks: [
		{
			id: 1,
			title: "Task 1",
			status: "In Progress",
		},
	],
	addTask: (id, title, status) => {
		set((state) => ({
			// add uuid

			tasks: [...state.tasks, { id, title, status }],
		}));
	},
	deleteTask: (id) => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	}
	
});

export const useStore = create(store);
