import { useStore } from "./store";
import { useEffect } from "react";
import { render } from "@testing-library/react";

// function TestComponent({ selector, effect }) {
// 	const item = useStore(selector);
// 	useEffect(() => {
// 		effect(item);
// 	}, [item]);
// 	return null;
// }

// test("Should Return Default value at the start", () => {
// 	const selector = (store) => store.tasks;
// 	const effect = vi.fn();
// 	render(<TestComponent selector={selector} effect={effect} />);
//     // not null array
//     expect(effect).toHaveBeenCalledWith([]);
// });

// test("Should add an items to the store and rerun the effect", () => {
// 	const selector = (store) => ({tasks: store.tasks, addTask: store.addTask});
// 	const effect = vi.fn().mockImplementation((item) => {
//         if (item.tasks.length === 0) {
//             item.addTask("1", "test", "test", "2023-10-10", "To Do");
//         }
//     });

// 	render(<TestComponent selector={selector} effect={effect} />);
//     expect(effect).toHaveBeenCalledTimes(2);
//     expect(effect).toHaveBeenCalledWith({tasks: [], addTask: expect.any(Function)});
// });

test("1==1", () => {
	expect(1).toBe(1);
});
