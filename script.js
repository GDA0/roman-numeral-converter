const formElement = document.querySelector("form");
const inputElement = formElement.querySelector("input");
const resultElement = document.querySelector("#output");

const arabicNumbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const romanSymbols = [
	"M",
	"CM",
	"D",
	"CD",
	"C",
	"XC",
	"L",
	"XL",
	"X",
	"IX",
	"V",
	"IV",
	"I",
];

// Add event listener to handle form submission
formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	handleConversion();
});

// Function to handle input validation, conversion, and result update
function handleConversion() {
	const inputValue = parseInt(inputElement.value, 10);

	// Validate input
	if (!Number.isInteger(inputValue) || inputValue < 1 || inputValue > 3999) {
		let errorMessage = document.createElement("p");
		if (inputElement.value === "") {
			errorMessage.textContent = "Please enter a number";
		} else if (inputValue < 1) {
			errorMessage.textContent =
				"Please enter a number greater than or equal to 1";
		} else if (inputValue > 3999) {
			errorMessage.textContent =
				"Please enter a number less than or equal to 3999";
		}
		updateResult(errorMessage, false);
		return;
	}

	// Convert to Roman numeral
	const romanNumeral = getRomanNumeral(inputValue);

	// Clear input field and update result
	inputElement.value = "";
	
	const successMessage = document.createElement("p");
	successMessage.textContent = `Roman Numeral: ${romanNumeral}`;
	updateResult(successMessage, true);
}

// Recursive function to convert Arabic number to Roman numeral
function getRomanNumeral(number) {
	let result = "";
	// Iterate over each Arabic number and corresponding Roman symbol
	for (let i = 0; i < arabicNumbers.length; i++) {
		// Append the Roman symbol while the number is greater than or equal to the Arabic number
		while (number >= arabicNumbers[i]) {
			result += romanSymbols[i];
			number -= arabicNumbers[i];
		}
	}
	return result;
}

// Function to update the result display
function updateResult(messageElement, isSuccess) {
	// Clear previous result or error message
	resultElement.innerHTML = "";

	// Set the appropriate class for the result element
	resultElement.className = isSuccess
		? "fs-4 mb-3 text-success"
		: "fs-4 mb-3 text-danger";

	// Append the message element
	resultElement.appendChild(messageElement);
}
