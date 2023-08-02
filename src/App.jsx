import "./App.css";
import Column from "./components/Column";
import { useStore } from "./store";

function App() {
	const columns = useStore((state) => state.columns);
	return (
		<div className="flex gap-4 justify-center items-start">
			{columns.map((column) => {
				return <Column state={column} key={column} />;
			})}
		</div>
	);
}

export default App;
