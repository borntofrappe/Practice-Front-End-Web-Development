// target all anchor link elements and the container in which to describe the hovered element
const socialLinks = document.querySelectorAll('.container__icons a');
const socialCopy = document.querySelector('.container__copy');

// describe each icon and the matching text
const social = [
  {
    link: 'twitter',
    url: 'https://twitter.com',
    copy: 'Follow somebody',
    color: '#3fb0fe'
  },
  {
    link: 'freecodecamp',
    url: 'https://www.freecodecamp.org',
    copy: 'Check out',
    color: '#109121'
  },
  {
    link: 'codepen',
    url: 'https://codepen.io',
    copy: 'Code freely',
    color: '#545454'
  },
  {
    link: 'github',
    url: 'https://github.com',
    copy: 'Open source everything',
    color: '#242424'
  }
];

// create a function which takes as argument the mouseenter event
// in turns this triggers the expansion of the pseudo element, "painting the background"
// this includes also a text matching the hovered anchor link element
function paint(event) {
  // select the hovered element
  const { target } = event;

  // continue unless the element has already been hovered
  if (!target.classList.contains('hovered')) {
    // remove the .hovered class from all elements
    socialLinks.forEach(socialLink => socialLink.classList.remove('hovered'));
    // retrieve the data attribute to match the platform in the defined object
    const { link } = target.dataset;

    // retrieve the object matching the link
    const match = social.find(socialLink => socialLink.link === link);

    // add the class of hovered
    target.classList.add('hovered');
    // include a text with the information retrieved from the matching object
    socialCopy.innerHTML = `
      <h2 style="animation: anchorLinkHover 0.2s 0.18s linear both;">
        ${match.copy} on <a href="${match.url}" style="color: ${match.color}; text-decoration:none;">${match.link}</a>
      </h2>
    `;
  }
}

// trigger the function whenever hovering on one of the selected anchor links
socialLinks.forEach(socialLink => socialLink.addEventListener('mouseenter', paint));
