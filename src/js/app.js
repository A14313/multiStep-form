let activeRadios = document.querySelectorAll(".form-group.flex");
let optionInputs = document.querySelectorAll(".optionInput");

activeRadios.forEach((activeRadio) => {
	activeRadio.addEventListener("click", () => {
		activeRadio.classList.add("active");
	});
});

const yearlyLabels = document.querySelectorAll(".form-group-label__yearly");
const yearlySwitch = document.querySelector("#yearly");

//add input eventhandler which calls the handleYearlyInput function
yearlySwitch.addEventListener("input", handleYearlyInput);

function handleYearlyInput(e) {
	//for each label, set data atrribute 'show' with the value (true/false) of the switch input
	yearlyLabels.forEach((yearlyLabel) => {
		yearlyLabel.dataset.show = e.target.checked;
	});
}
