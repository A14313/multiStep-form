// **********************************************************
//Variables
const form = document.querySelector('[multiStepForm]');
const formSteps = [...form.querySelectorAll('[data-step]')];
const pageIndicatorItems = [
	...document.querySelectorAll('.page-indicator .page-indicator__item'),
];

const yearlySwitch = document.querySelector('#yearly');
const yearlyLabels = document.querySelectorAll('.form-group-label__yearly');

let finalPlan = document.querySelector('#final-plan');
let finalBasePlan = document.querySelector('#final-base-plan');
let basePlanFrequency = document.querySelectorAll('.base-plan--frequency');
let finalFrequencyTitle = document.querySelector('#final-frequency-title');

// Ito yung div ng mga card plans, dito nakalagay yung mga maliliit na card plans
const radioPlanContainer = document.querySelector('[data-plan-container]');
// radioPlanContainer.style.border = '1px solid red';

// Ito yung mga radioButtons sa bawat isang card plan
const radioButtons = [...document.querySelectorAll('[data-plan-input]')];

// Ito yung container ng maliliit na card. ito yung form group
const planOptionsDiv = [...document.querySelectorAll('[data-plan-options]')];

const submitButton = document.querySelector('#submitButton');

// Ito yung price ng base plan, naka array
let prices = [...document.querySelectorAll('.baseplan-price')];
// **********************************************************

// For switching the steps
// Note 1
let currentIndicator = pageIndicatorItems.findIndex((el) => {
	return el.classList.contains('active');
});

let currentStep = formSteps.findIndex((el) => {
	return el.classList.contains('active');
});
// Note 2

// Ito yung pang default lang kung wlang naka set sa markup na active step
// lalagay nya sa 0 yung current step at lalagyan nya ng active class
if (currentStep < 0 && currentIndicator < 0) {
	currentStep = 0;
	currentIndicator = 0;
	pageIndicatorItems[currentIndicator].classList.add('active');
	formSteps[currentStep].classList.add('active');
}

form.addEventListener('click', (e) => {
	// Note 3
	let incrementor;
	if (e.target.matches('[data-next]')) {
		incrementor = 1;
	} else if (e.target.matches('[data-previous]')) {
		incrementor = -1;
	} else {
		return;
	}
	// Pag hindi yung button ang pinindot mo, mag eexit lang sya

	const inputs = [...formSteps[currentStep].querySelectorAll('input')];
	const isAllValid = inputs.every((input) => {
		return input.reportValidity();
	});

	if (isAllValid) {
		currentStep += incrementor;
		currentIndicator += incrementor;

		formSteps.forEach((el, index) => {
			el.classList.toggle('active', index === currentStep);
		});

		pageIndicatorItems.forEach((el, index) => {
			el.classList.toggle('active', index === currentIndicator);
		});

		//Note 4
	}
});

// **********************************************************

// For adding yearly or monthly labels in step 2
// This is to set the checkbox to always false after the page loads
yearlySwitch.checked = false;

if (yearlySwitch) {
	yearlySwitch.addEventListener('click', (e) => {
		yearlyLabels.forEach((el) => {
			el.dataset.show = e.target.checked;
			//for each label or element, set data atrribute 'show' with the value (true/false) of the switch input
		});
	});
} else {
	return;
}

let yearlyPrices = prices.map((el) => {
	return parseInt(el.textContent) * 10;
});

let monthlyPrices = prices.map((el) => {
	return parseInt(el.textContent) * 1;
});

yearlySwitch.addEventListener('change', (e) => {
	if (e.target.checked === true) {
		finalFrequencyTitle.textContent = 'Yearly';
		basePlanFrequency.forEach((el) => {
			el.textContent = 'yr';
		});

		prices.forEach((el, index) => {
			el.textContent = yearlyPrices[index];
		});

		let activeInputIndex = radioButtons.findIndex((el) => {
			return el.checked;
		});

		let selectedPlan = parseInt(prices[activeInputIndex].textContent);
		finalBasePlan.textContent = selectedPlan;
	} else {
		finalFrequencyTitle.textContent = 'Monthly';
		basePlanFrequency.forEach((el) => {
			el.textContent = 'mo';
		});
		prices.forEach((el, index) => {
			el.textContent = monthlyPrices[index];
		});

		let activeInputIndex = radioButtons.findIndex((el) => {
			return el.checked;
		});

		let selectedPlan = parseInt(prices[activeInputIndex].textContent);
		finalBasePlan.textContent = selectedPlan;
	}
});

// **********************************************************

// For adding border in the selected plan and
// For updating the number of prices
// let activePlan = planOptionsDiv.findIndex((el) => {
// 	return el.classList.contains('active');
// 	// Hahanapin nya yung card na may active class
// 	// Pero dahil wala akong sinet sa markup na active doon by default
// 	// -1 ang result neto
// });

// // So pag -1 ang result gawin mong zero 0. Tapos lagyan mo active para
// // May border
// if (activePlan < 0) {
// 	activePlan = 0;
// 	planOptionsDiv[activePlan].classList.add('active');
// }

// console.log(planOptionsDiv);

radioPlanContainer.addEventListener('click', (e) => {
	// Add ng event listener sa Div ng mga card plans, at pag na click mo yung
	// may attribute na data-plan-input gawin mo yung nasa loob
	if (e.target.matches('[data-plan-input]')) {
		let activeInputIndex = radioButtons.findIndex((el) => {
			return el.checked;
			// I return mo yung index ng radiobutton na naka check
		});

		let activeInput = radioButtons.find((el) => {
			return el.checked;
			// I return mo yung element mismo na radiobutton na naka check
		});

		planOptionsDiv.forEach((el, index) => {
			el.classList.toggle('active', index === activeInputIndex);
		});

		let selectedPlan = parseInt(prices[activeInputIndex].textContent);

		finalBasePlan.textContent = selectedPlan;
		finalPlan.textContent = activeInput.labels[0].textContent;
	}
});

form.addEventListener('keydown', (e) => {
	if (e.code === 'Enter' || e.code === 'NumpadEnter') {
		e.preventDefault();
	}
});

// **********************************************************

// Notes:
// 1. The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
// findIndex ay array prototype, meaning sa array lang sya magagamit.
// Kaya yung formSteps kinonvert ko sa array tapos naka spread, para ang paglabas nya ay
// [sample,sample,sample]

// 2. Ilalabas nya yung index ng div na may class na active

// 3. // console.log(e.target);
// itong element.matches dapat ang itetest mo dyan kung may CSS selector ba na nakalagay dun na magmamatch sa sinabi mo
// The matches() method of the Element interface tests whether the element would be selected by the specified CSS selector.
// sa ginawa ko, hinanap ko yung may attribute na ganyan
// same lang din sya sa document.querySelector()
// Single or double quote muna, then yung CSS Selector mo

// 4. toggle the active class if the index is equal to currentStep.
// if the index is equal to currentstep, it returns true.
// and it will toggle the active class for not in the current step

// Basically parang nag evaluate ka lang ng condition
// halimbawa 1 > 2 => False yan
// Parang ganun din dun sa 2nd parameter
// yung index ba ay equal to currentPage? true ba? kung true make sure na naka toggle ang active

// **********************************************************
// Sample lang ito ng findIndex
// 1. Ito yung array kung saan sya mag checheck
// const nums = [1, 2323, 7, 12, 100, 88, 99, 23, 16, 13, 14, 10, 23, 22];

// // 2. Ito yung findIndex sinave lang sa variable na firstEvenNum
// // yung findIndex method ay mag rurun for each element dun sa array
// // hanggang mahanap nya yung first match dun sa condition sa loob ng ginawa mong fn
// const firstEvenNum = nums.findIndex((num) => {
// 	return num % 2 === 0;
// 	// Ito yung condition
// });

// // 3. Ilalabas natin yung result
// console.log(firstEvenNum);
// **********************************************************
