// silly feat: as a click event is registered on one of the main options (the li of the first ul), find the text of the target anchor link (and possibly the anchor link connected to this target) and show the m in the centered section
const items = document.querySelectorAll('.list--item');
// prevent the default behavior of the anchor link element, and detail the text of the anchor link in the prescribed span
// show the text of all the anchor link elements preceding the clicked one, if any
function handleClick(e) {
	e.preventDefault();
	// first anchor link in the list item
	const { textContent: textMain } = this.querySelector('a');

	// anchor link being clicked
	const { textContent: textTarget } = e.target;

	let textSpan = 'navigation bar';
	// as the click might be registered on the ul, but not on the anchor link elements, change the default value only when the target is an anchor link
	if (e.target.tagName === 'A' && textTarget === textMain) {
		textSpan = textTarget;
	}
	if (e.target.tagName === 'A' && textTarget !== textMain) {
		textSpan = `${textTarget} ${textMain}`;
	}

	document.querySelector('span').textContent = textSpan.toLowerCase();
}
items.forEach(item => item.addEventListener('click', handleClick));


// for the actual FOLLOW ALONG FEATURE
// target the div used as background
const dropdownBackground = document.querySelector('#navigation--dropdown');

// function called in response to the mouseenter event on the list items
// position the dropdown background right behind the nested unordered list, according to its location and size
function handleEnter() {
	// find the nested ul
	const dropdown = this.querySelector('.item--dropdown');
	// retrieve the size and position of the ul
	const { offsetWidth: width, offsetHeight: height } = dropdown;

	const rectangle = dropdown.getBoundingClientRect();
	const { top, left } = rectangle;

	// add the class showing the dropdown background for the selected div
	dropdownBackground.classList.add('active');
	// add the class showing the dropdown's content in the unordered list itself
	dropdown.classList.add('active');

	// resize the dropdown accordingly
	dropdownBackground.style.width = `${width}px`;
	dropdownBackground.style.height = `${height}px`;
	dropdownBackground.style.top = `${top}px`;
	dropdownBackground.style.left = `${left}px`;
}

// function fired in response to the mouseleave event
// remove the classes of active from the departing list item
function handleExit() {
	// find the nested ul
	const dropdown = this.querySelector('.item--dropdown');
	// remove the class showing the dropdown's content in the unordered list itself
	dropdown.classList.remove('active');
	// remove the class showing the dropdown background for the selected div
	dropdownBackground.classList.remove('active');
}

// ! use the mouseleave event instead of the mouseout one, to avoid event bubbling
items.forEach(item => item.addEventListener('mouseenter', handleEnter));
items.forEach(item => item.addEventListener('mouseleave', handleExit));
