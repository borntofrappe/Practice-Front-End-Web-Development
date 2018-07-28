// target the table cells responsible for the books
const books = document.querySelectorAll(".container__table td");
// target the div in which to display the snippet connected to the book
const snippet = document.querySelector(".container__snippet");

// define an object which details the different snippet to showcase, according to the book which is clicked
const snippets = {
  grid: 'div.container { \n  display: grid; \n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); \n  grid-auto-rows: 100px; \n  grid-gap: 10px; \n}',
  flex: 'div.container { \n  display: flex; \n  flex-direction: column; \n  align-items: center; \n  justify-content: space-around; \n}',
  float: 'float.element { \n  float: left; \n}',
  table: 'table.container { \n  table-layout: fixed; \n  width: 100%; \n}'
} 

// add an event listener for a click event on all books
books.forEach(book => book.addEventListener("click", handleClick));

// define a function which appends to the selected div the tags required to showcase a snippet
function handleClick(e) {
  let id = e.target.getAttribute("id");
  console.log(id);
  snippet.innerHTML = `<pre><code>${snippets[id]}</code></pre>`
}
