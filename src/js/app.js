// let activeDiv = document.querySelector("#active-div");

// activeDiv.addEventListener("click", function () {
// 	activeDiv.classList.toggle("active");
// });

// const navToggle = document.querySelector(".hamburger__icon");
// const navToggleLists = document.querySelectorAll(".with-arrow");

// navToggle.addEventListener("click", () => {
// 	navToggle.classList.toggle("active");
// });

// navToggleLists.forEach((navToggleList) => {
// 	navToggleList.addEventListener("click", () => {
// 		navToggleList.classList.toggle("active");
// 	});
// });

// document.querySelectorAll(".form-group.flex.active").forEach((activeRadio) => {
// 	activeRadio.classList.remove("active");
// });

// document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
// 	if (dropdown === currentDropdown) return;
// 	dropdown.classList.remove("active");
// });

let activeRadios = document.querySelectorAll(".form-group.flex");

activeRadios.forEach((activeRadio) => {
	activeRadio.addEventListener("click", () => {
		activeRadio.classList.add("active");
	});
});

// document.querySelectorAll(".form-group.flex.active").forEach((activeRadio) => {
// 	activeRadio.addEventListener("click", () => {
// 		activeRadio.classList.remove("active");
// 	});
// });
