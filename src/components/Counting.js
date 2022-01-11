import React, { useState } from "react";

export default function Counting() {
	const [count, setCount] = useState(0);

	function increase() {
		setCount(count + 1);
	}
	function decrease() {
		setCount(count - 1);
	}

	return (
		<>
			<div className="count">{count}</div>
			<button onClick={increase} className="button-increase">
				+
			</button>
			<button onClick={decrease} className="button-decrease">
				-
			</button>
		</>
	);
}
