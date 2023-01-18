let activeRadios = document.querySelectorAll(".form-group.flex");

activeRadios.forEach((activeRadio) => {
	activeRadio.addEventListener("click", () => {
		activeRadio.classList.add("active");
	});
});

let yearlyLabels = document.querySelectorAll(".form-group-label__yearly");
let yearlySwitch = document.querySelector("#yearly");

yearlySwitch.addEventListener("click", () => {
	yearlySwitch.toggleAttribute("checked");
});

yearlyLabels.forEach((yearlyLabel) => {
	if (yearlySwitch.hasAttribute("checked")) {
		yearlyLabel.style.display = "block";
	} else {
		yearlyLabel.style.display = "none";
	}
});
