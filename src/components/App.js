import styles from "../css/App.module.css";
import Counting from "./Counting";

function App() {
	return (
		<div className={styles.app}>
			<Counting />
		</div>
	);
}

export default App;
