/*
target the HTML elements required for the effect to take place
  - anchor links, triggering the change in the CSS property
  - icon ì, to implement the change in its CSS property

*/
const textLink = document.querySelector("#text-link");
const callLink = document.querySelector("#call-link");
const mailLink = document.querySelector("#mail-link");

const icon = document.querySelector("#icon");

// listen for the mouseenter event on each anchor link; at which point trigger a function used to alter the CSS property
textLink.addEventListener("mouseenter", changeIconText);
callLink.addEventListener("mouseenter", changeIconCall);
mailLink.addEventListener("mouseenter", changeIconMail);

// listen for the mouseleave event on each anchor link; at which point revert to the original CSS property value
textLink.addEventListener("mouseleave", changeIconBack);
callLink.addEventListener("mouseleave", changeIconBack);
mailLink.addEventListener("mouseleave", changeIconBack);

/*
in each function alter the property of background through the **element.style.background** expression
expression which equates the SVG elements designed for each match
*/

function changeIconText() {
  icon.style.background = 'url(\'data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 9.5249 9.5249" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.36 0 0 .36 -28.271 -71.125)"><path d="m91.76 197.57a13.229 13.229 0 0 0-13.229 13.229 13.229 13.229 0 0 0 13.229 13.229 13.229 13.229 0 0 0 13.229-13.229 13.229 13.229 0 0 0-13.229-13.229zm0 2.455a10.774 10.774 0 0 1 10.774 10.774 10.774 10.774 0 0 1-10.774 10.774 10.774 10.774 0 0 1-10.775-10.774 10.774 10.774 0 0 1 10.775-10.774z" fill="#fef0ff"/><g transform="matrix(1.35 .26111 -.26111 1.35 23.991 -99.046)"><path d="m93.577 208.63-4.6552 3.8242 0.70152 3.5564 1.8709-2.1382z" fill="#f4e5ed"/><path d="m94.261 207.38 0.25896 0.17955-1.0224 8.5692-3.0499-3.3218 3.1289-4.1751-4.6552 3.8242-2.77-0.959z" fill="#f9ebfa"/><path d="m90.448 212.8-0.82474 3.2055 1.8709-2.1382z" fill="#ecded5"/></g></g></svg>\')';
}
function changeIconCall() {
  icon.style.background = 'url(\'data:image/svg+xml;utf8,<svg  version="1.1" viewBox="0 0 9.5249 9.5249" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.36 0 0 .36 -28.271 -71.125)"><path d="m91.76 197.57a13.229 13.229 0 0 0-13.229 13.229 13.229 13.229 0 0 0 13.229 13.229 13.229 13.229 0 0 0 13.229-13.229 13.229 13.229 0 0 0-13.229-13.229zm0 2.455a10.774 10.774 0 0 1 10.774 10.774 10.774 10.774 0 0 1-10.774 10.774 10.774 10.774 0 0 1-10.775-10.774 10.774 10.774 0 0 1 10.775-10.774z" fill="#fef0ff"/><path d="m88.135 208.85s2.0045-1.8709 1.6036-2.4054c-0.4009-0.53454-0.4009-1.0691-0.93544-1.2027-0.53454-0.13363-2.6727-0.26727-2.6727-0.26727s-3.6081 2.5391-0.80181 5.479c2.8063 2.94 8.2854 7.6172 11.359 5.7463 0.7684-0.46772 1.3152-0.83868 1.7031-1.132s0.61702-0.50906 0.75006-0.66632c0.26608-0.31452 0 0 0 0l-2.7042-2.0771-2.5553 1.6036s-5.6127-2.4054-5.7463-5.0781z" fill="#f9ebfa"/></g></svg>\')';
}
function changeIconMail() {
  icon.style.background = 'url(\'data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 9.5249 9.5249" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.36 0 0 .36 -28.271 -71.125)"><path d="m91.76 197.57a13.229 13.229 0 0 0-13.229 13.229 13.229 13.229 0 0 0 13.229 13.229 13.229 13.229 0 0 0 13.229-13.229 13.229 13.229 0 0 0-13.229-13.229zm0 2.455a10.774 10.774 0 0 1 10.774 10.774 10.774 10.774 0 0 1-10.774 10.774 10.774 10.774 0 0 1-10.775-10.774 10.774 10.774 0 0 1 10.775-10.774z" fill="#fef0ff"/><g transform="translate(-.19619 .80274)" stroke-width=".26458"><path d="m85.37 207.13 6.5865-3.7042 6.5865 3.7042v7.8477h-13.173z" fill="#e9e6e2"/><path d="m85.37 207.66h13.173v7.8477h-13.173z" fill="#e1dad8"/><path d="m85.37 207.66 6.5865 3.5628 6.5865-3.5628v7.8477h-13.173z" fill="#fef0ff"/><path d="m85.37 207.66 6.5865 3.5628 1e-6 0.0515-6.5865 4.2333z" fill="#f1e4f1"/><path d="m98.543 207.66-6.5865 3.5628-1e-6 0.0515 6.5865 4.2333z" fill="#f3e8f7"/></g></g></svg>\')';
}
function changeIconSmile() {
  icon.style.background = 'url(\'data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 9.5249 9.5249" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.36 0 0 .36 -28.574 -71.125)"><path d="m92.601 197.57a13.229 13.229 0 0 0-13.229 13.229 13.229 13.229 0 0 0 13.229 13.229 13.229 13.229 0 0 0 13.229-13.229 13.229 13.229 0 0 0-13.229-13.229zm0 2.455a10.774 10.774 0 0 1 10.774 10.774 10.774 10.774 0 0 1-10.774 10.774 10.774 10.774 0 0 1-10.775-10.774 10.774 10.774 0 0 1 10.775-10.774z" fill="#fef0ff"/><g stroke-width=".73495"><rect x="88.16" y="204.74" width="2.3543" height="5.8297" fill="#f4e8f5"/><rect x="94.799" y="204.74" width="2.3543" height="5.8297" fill="#f4e8f5"/><path d="m95.652 214.19-0.17628 2.3477c-3.8984 1.2518-4.3874 0.0737-5.8134-0.43652l0.17629-2.3477c1.8231 1.6041 3.7672 1.6692 5.8134 0.4365z" fill="#f4e6f5"/></g></g></svg>\')';
}

/*
in the final function alter the property of background back to its original value
*/
function changeIconBack() {
  icon.style.background = 'url(\'data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 9.5249 9.5249" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.36 0 0 .36 -28.271 -71.125)" fill="#fef0ff"><path d="m91.76 197.57a13.229 13.229 0 0 0-13.229 13.229 13.229 13.229 0 0 0 13.229 13.229 13.229 13.229 0 0 0 13.229-13.229 13.229 13.229 0 0 0-13.229-13.229zm0 2.455a10.774 10.774 0 0 1 10.774 10.774 10.774 10.774 0 0 1-10.774 10.774 10.774 10.774 0 0 1-10.775-10.774 10.774 10.774 0 0 1 10.775-10.774z" fill="#fef0ff"/></g></svg>\')';
}
