// target the single button to refresh the page
const button = document.querySelector("button");

// refresh the page through the reload method, on window.location, after 0.25s
button.addEventListener("click", () => {
    let timeoutID = setTimeout(() => {
        window.location.reload(true);
        clearTimeout(timeoutID);
    }, 250)
});