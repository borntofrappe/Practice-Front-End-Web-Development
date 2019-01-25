// silly feat: as a click event is registered on one of the main options (the li of the first ul), find the text of the target anchor link (and possibly the anchor link connected to this target) and show the m in the centered section
const items = document.querySelectorAll('.list--item');

// prevent the default behavior of the anchor link element, and detail the text of the anchor link in the prescribed span
function handleClick(e) {
	e.preventDefault();
  const { textContent: textTarget } = e.target;
  const { textContent: textMain } = this.querySelector('a');

  const textSpan = textTarget === textMain ? textTarget : `${textTarget} ${textMain}`;
  document.querySelector('span').textContent = textSpan.toLowerCase();
}

items.forEach(item => item.addEventListener('click', handleClick));


// for the actual FOLLOW ALONG FEATURE
// target the div used as background
const dropdownBackground = document.querySelector('#navigation--dropdown');

// listen for a mouseenter event on the list items, at which point position the dropdownBackground right behind the nested unordered list, according to its location and size

function handleEnter(e) {
	// find the nested ul
	const ul = this.querySelector('ul');
	// retrieve the size and position of the ul
	const { offsetWidth: width, offsetHeight: height } = ul;

	const rectangle = ul.getBoundingClientRect();
	const { top , left } = rectangle;

	// add the class showing the dropdown background
	dropdownBackground.classList.add('active');

	// resize the dropdown accordingly
	dropdownBackground.style.width = `${width}px`;
	dropdownBackground.style.height = `${height}px`;
	dropdownBackground.style.top = `${top}px`;
	dropdownBackground.style.left = `${left}px`;

}

items.forEach(item => item.addEventListener('mouseenter', handleEnter));

