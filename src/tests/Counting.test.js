import { render, screen } from "@testing-library/react";
import Counter from "../components/Counting";
import userEvent from "@testing-library/user-event";

describe("Counting Component testing", () => {
	test("Increase Count when Press + Button", () => {
		render(<Counter />);
		const increaseButton = screen.getByText("+");
		const count = document.querySelector(".count");

		userEvent.click(increaseButton);
		expect(count.textContent).toBe("1");
	});

	test("Decrease Count when Press - Button", () => {
		render(<Counter />);
		const decreaseButton = screen.getByText("-");
		const count = document.querySelector(".count");

		userEvent.click(decreaseButton);
		expect(count.textContent).toBe("-1");
	});
});
