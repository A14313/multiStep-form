// **********************************************************
//Variables
const form = document.querySelector('[multiStepForm]');
const formSteps = [...form.querySelectorAll('[data-step]')];
const pageIndicatorItems = [...document.querySelectorAll('.page-indicator .page-indicator__item')]; //<<-- <li> to ng Page indicator
const yearlySwitch = document.querySelector('#yearly');
const yearlyLabels = document.querySelectorAll('.form-group-label__yearly');
let finalBasePlanStep4 = document.querySelector('#finalBasePlanStep4');
let finalBasePlanFrequencyTitleStep4 = document.querySelector('#finalBasePlanFrequencyTitleStep4');
let finalBasePlanPriceStep4 = document.querySelector('#finalBasePlanPriceStep4');
let planFrequencies = document.querySelectorAll('.plan-frequency');
const planCardsContainerStep2 = document.querySelector('[data-plan-cards-container-step2]'); //<-- Ito yung div ng mga card plans sa step 2, dito nakalagay yung mga maliliit na card plans
// planCardsContainerStep2.style.border = '1px solid red';

// Ito yung mga radioButtons sa bawat isang card plan
const radioButtonsHiddenStep2 = [...document.querySelectorAll('[data-plan-card-input-step2]')];

// Ito yung mismong container ng maliliit na plan card. ito yung form group
const planCardDivsStep2 = [...document.querySelectorAll('[data-individual-plan-card-div-step2]')];

// Ito yung parang UL natin. Ito yung pinag lalagayan ng addons sa step4
const finalAddonsDivStep4 = document.querySelector('#finalAddonsDivStep4');

// Ito yung price ng mga plan, naka array
let prices = [...document.querySelectorAll('.plan-price')];
const checkboxesStep3 = [...document.querySelectorAll('[data-addon-card-input-step3]')];
const addonsCardDivsStep3 = [...document.querySelectorAll('[data-individual-addon-card-div-step3]')];
const finalTotalFrequencyStep4 = document.querySelector('#finalTotalFrequencyStep4');
const finalTotalStep4 = document.querySelector('#finalTotalStep4');
const submitButton = document.querySelector('#submitButton');

// **********************************************************
// Para kahit mapindot ang enter hindi mag susubmit ang form
// Sa loob lang ito ng form
form.addEventListener('keydown', (e) => {
	if (e.code === 'Enter' || e.code === 'NumpadEnter') {
		e.preventDefault();
		console.log('Enter is prevented');
	}
});

let plansObj = [
	{
		plan: undefined,
		frequency: undefined,
		totalFrequencyStep4: undefined,
		price: undefined,
		addons: [],
	},
];

const totalFunc = () => {
	let total = plansObj[0].price;

	for (let i = 0; i < plansObj[0].addons.length; i++) {
		total += plansObj[0].addons[i].price;
	}

	return total;
};

function multiplyByTen(num) {
	return num * 10;
}

function divideByTen(num) {
	return num / 10;
}
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
// Ganun din sa indicator
if (currentStep < 0 && currentIndicator < 0) {
	currentStep = 0;
	currentIndicator = 0;
	pageIndicatorItems[currentIndicator].classList.add('active');
	formSteps[currentStep].classList.add('active');
}

const nextFn = (e) => {
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

	// Kunin mo lahat ng input sa forms step na current step halimbawa
	// formstep[0] tapos kunin mo lahat ng inputs tapos every input
	// check mo at ireport mo ang validity pag, true na, procede sa incrementor
	const currentFormStepInputs = [...formSteps[currentStep].querySelectorAll('input')];
	const isAllValid = currentFormStepInputs.every((input) => {
		// Basically lahat ng inputs sa current form step, kunin mo at every
		// input check mo kung valid na ba, if hindi, report ang error
		// ang report validity nagrereturn ng true or false, dahil naka 'every' tayo
		// meaning dapat lahat ng input ay valid, else false ang irereturn nya
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
};

form.addEventListener('click', nextFn);

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
		finalBasePlanFrequencyTitleStep4.textContent = 'Yearly';
		finalTotalFrequencyStep4.textContent = 'per year';
		planFrequencies.forEach((el) => {
			el.textContent = 'yr';
		});

		// Update mo yung kada isa ng prices into yearly prices
		prices.forEach((el, index) => {
			el.textContent = yearlyPrices[index];
		});

		let activeRadioStep2 = radioButtonsHiddenStep2.find((el) => {
			return el.checked;
			// Index rereturn neto yung mismong element
		});

		let activeRadioIndexStep2 = radioButtonsHiddenStep2.findIndex((el) => {
			return el.checked;
			// Index rereturn neto 0 - 2 or kung ilan man ang dulo
		});

		let selectedPlan = parseInt(prices[activeRadioIndexStep2].textContent);
		finalBasePlanPriceStep4.textContent = selectedPlan;

		// Updating plansObj
		plansObj[0].plan = activeRadioStep2.labels[0].textContent;
		plansObj[0].frequency = activeRadioStep2.labels[2].textContent;
		plansObj[0].totalFrequencyStep4 = finalTotalFrequencyStep4.textContent;
		plansObj[0].price = selectedPlan;

		// Ito yung pag may laman na yung addons tapos na click ulit yung yearly switch
		// Dahil naka true ang yearly, meaning dapat times 10 ang addons
		// Pero gagawin mo lang yun pag may laman na yung addons array,
		// Mangyayari lang yun pag yung user ganito ginawa, step2 > step3> tapos bumalik ng step 2 ulit tapos pinalitan yung yearlyswitch
		if (plansObj[0].addons.length !== 0) {
			// May laman
			let newPrices = plansObj[0].addons.map((el) => {
				// Yearly ito
				// Gawa ng bagong array na naka times 10
				return (el.price = multiplyByTen(el.price));
			});

			plansObj[0].addons.forEach((el, index) => {
				// Dun sa addons array kunin mo ang each element at index nun
				// set mo yung price sa newPrices pero yung index ng addons element ang gamitin mo para tugma
				el.price = newPrices[index];
			});

			// Itong nasa taas hindi ko ginagamit pero pinag aaupdate ko lang yun plansObj
			// Keep ko lang to para next time na mag refactor ako pwede pa

			// Ito yun ginagamit ko para maupdate talaga yung nasa step 4
			// Kasi kaya ganito ang pag update ko kasi yung mga elemen na ito wala pa agad pag nag load ang page
			// Kumabaga magkakaron lang kasi ng laman ang addons pag nag check ang user
			// Ito yung para sa addonsPrices lang ng step 4, para ma update ko yung nasa step 4
			let addonsPricesStep4 = [...document.querySelectorAll('#finalAddonsDivStep4 .plan-price')];
			let addonsFrequenciesStep4 = [...document.querySelectorAll('#finalAddonsDivStep4 .plan-frequency')];
			addonsFrequenciesStep4.forEach((el) => {
				el.textContent = 'yr';
			});

			addonsPricesStep4.forEach((el) => {
				let individualPrice = parseInt(el.textContent);
				individualPrice = multiplyByTen(individualPrice);
				el.textContent = individualPrice;
				console.log(individualPrice);
			});
		}

		console.log(totalFunc());
		finalTotalStep4.textContent = totalFunc();

		console.log(plansObj);
	} else {
		finalBasePlanFrequencyTitleStep4.textContent = 'Monthly';
		finalTotalFrequencyStep4.textContent = 'per month';
		planFrequencies.forEach((el) => {
			el.textContent = 'mo';
		});
		prices.forEach((el, index) => {
			el.textContent = monthlyPrices[index];
		});

		let activeRadioStep2 = radioButtonsHiddenStep2.find((el) => {
			return el.checked;
			// Index rereturn neto yung mismong element
		});

		let activeRadioIndexStep2 = radioButtonsHiddenStep2.findIndex((el) => {
			return el.checked;
		});

		let selectedPlan = parseInt(prices[activeRadioIndexStep2].textContent);
		finalBasePlanPriceStep4.textContent = selectedPlan;

		// Updating plansObj
		plansObj[0].plan = activeRadioStep2.labels[0].textContent;
		plansObj[0].frequency = activeRadioStep2.labels[2].textContent;
		plansObj[0].totalFrequencyStep4 = finalTotalFrequencyStep4.textContent;
		plansObj[0].price = selectedPlan;

		// Ito yung pag may laman na yung addons tapos na click ulit yung yearly switch
		// Dahil naka false ang yearly, meaning dapat divide 10 ang addons
		// Pero gagawin mo lang yun pag may laman na yung addons array,
		// Mangyayari lang yun pag yung user ganito ginawa, step2 > step3> tapos bumalik ng step 2 ulit tapos pinalitan yung yearlyswitch
		// didivide mo lang yung prices KUNG nag click na sya ng yearly atleast ONCE
		// kasi pag hindi nya ginalaw yun, by default monthly lang ang prices

		if (plansObj[0].addons.length !== 0) {
			// May laman
			let newPrices = plansObj[0].addons.map((el) => {
				// Monthly ito
				// Gawa ng bagong array na naka divide 10
				// Kasi na multiply by 10 na natin to kung na click nya at least once ang yearly, pag hindi nya na click yun
				// ng at least once, hindi na mangyayari to kasi monthly naman ang original na prices
				return (el.price = divideByTen(el.price));
			});

			plansObj[0].addons.forEach((el, index) => {
				// Dun sa addons array kunin mo ang each element at index nun
				// set mo yung price sa newPrices pero yung index ng addons element ang gamitin mo para tugma
				el.price = newPrices[index];
			});

			// Itong nasa taas hindi ko ginagamit pero pinag aaupdate ko lang yun plansObj
			// Keep ko lang to para next time na mag refactor ako pwede pa

			// Ito yun ginagamit ko para maupdate talaga yung nasa step 4
			// Kasi kaya ganito ang pag update ko kasi yung mga elemen na ito wala pa agad pag nag load ang page
			// Kumabaga magkakaron lang kasi ng laman ang addons pag nag check ang user
			// Ito yung para sa addonsPrices lang ng step 4, para ma update ko yung nasa step 4
			let addonsPricesStep4 = [...document.querySelectorAll('#finalAddonsDivStep4 .plan-price')];
			let addonsFrequenciesStep4 = [...document.querySelectorAll('#finalAddonsDivStep4 .plan-frequency')];
			addonsFrequenciesStep4.forEach((el) => {
				el.textContent = 'mo';
			});

			addonsPricesStep4.forEach((el) => {
				let individualPrice = parseInt(el.textContent);
				individualPrice = divideByTen(individualPrice);
				el.textContent = individualPrice;
				console.log(individualPrice);
			});
		}

		console.log(totalFunc());
		finalTotalStep4.textContent = totalFunc();
		console.log(plansObj);
	}
});

// **********************************************************
// Ito yung sa step 2 para kada click or tap ng user sa plan nag a update ang frequency at plans
planCardsContainerStep2.addEventListener('click', (e) => {
	// Add ng event listener sa Div ng mga card plans, at pag na click mo yung
	// may attribute na data-plan-card-input-step2 gawin mo yung nasa loob
	if (e.target.matches('[data-plan-card-input-step2]')) {
		let activeRadioStep2 = radioButtonsHiddenStep2.find((el) => {
			return el.checked;
			// I return mo yung element mismo na radiobutton na naka check
		});

		let activeRadioIndexStep2 = radioButtonsHiddenStep2.findIndex((el) => {
			return el.checked;
			// I return mo yung index ng radiobutton na naka check
		});

		planCardDivsStep2.forEach((el, index) => {
			el.classList.toggle('active', index === activeRadioIndexStep2);
		});

		let selectedPlan = parseInt(prices[activeRadioIndexStep2].textContent);

		finalBasePlanPriceStep4.textContent = selectedPlan;
		// Para to sa final step. yung final plan
		finalBasePlanStep4.textContent = activeRadioStep2.labels[0].textContent;

		// Updating the plansObj
		plansObj[0].plan = activeRadioStep2.labels[0].textContent;
		plansObj[0].frequency = activeRadioStep2.labels[2].textContent;
		plansObj[0].price = selectedPlan;
		console.log(plansObj);
		console.log(totalFunc());
		finalTotalStep4.textContent = totalFunc();
	}
});

// **********************************************************
// Step 3
// Blank array muna dito natin lalagay yung mga plans at prices
let listArray = [];

const addToDOM = (arr) => {
	finalAddonsDivStep4.innerHTML = '';

	arr.forEach((item, index) => {
		// Gawa ng bagong DIV
		// const priceHtml = `+$<span class="plan-price">${item.price}</span>/<span class="plan-frequency">mo</span>`;
		const priceHtml = `+$<span class="plan-price">${plansObj[0].addons[index].price}</span>/<span class="plan-frequency">${plansObj[0].frequency}</span>`;
		const newDiv = document.createElement('DIV');
		newDiv.classList.add('form-group__summary--addons');

		// Gawa ng bagong P para sa addon title
		const newParagraphTitle = document.createElement('p');
		newParagraphTitle.classList.add('form-group__summary--addons--title');
		newParagraphTitle.innerText = item.addon;

		const newParagraphPrice = document.createElement('p');
		newParagraphPrice.classList.add('form-group__summary--addons--price');
		// newParagraphPrice.innerText = plansObj[0].addons[index].price;
		newParagraphPrice.innerHTML = priceHtml;

		newDiv.append(newParagraphTitle);
		newDiv.append(newParagraphPrice);
		finalAddonsDivStep4.append(newDiv);
	});
};

checkboxesStep3.forEach((el) => {
	el.addEventListener('click', (e) => {
		if (e.target.checked) {
			listArray.push({
				addon: e.target.labels[0].innerText,
				price: parseInt(e.target.labels[1].innerText),
			});

			plansObj[0].addons.push({
				addon: e.target.labels[0].innerText,
				price: parseInt(e.target.labels[1].innerText),
			});

			console.log(plansObj);

			addToDOM(listArray);

			console.log(totalFunc());
			finalTotalStep4.textContent = totalFunc();
		} else {
			listArray = listArray.filter((el) => {
				return el.addon !== e.target.labels[0].innerText;
			});

			plansObj[0].addons = plansObj[0].addons.filter((el) => {
				return el.addon !== e.target.labels[0].innerText;
			});
			console.log(plansObj);
			addToDOM(listArray);

			console.log(totalFunc());
			finalTotalStep4.textContent = totalFunc();
		}
	});
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
