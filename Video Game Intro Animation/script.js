// listen for a click event on the entire window, at which point refresh the page
window.addEventListener("click", refreshPage);

function refreshPage() {
    location.reload(true)
}