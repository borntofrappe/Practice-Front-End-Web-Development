// target button triggering the first animation

const buttonContainerTextFirst = document.querySelector(".container__text--first button");
buttonContainerTextFirst.addEventListener("click", animationGridCellFall);

// in the first animation target all grid cells, target the first container__text and animate the elements out of sight
// target also the second container__text and animate it into view

// all this by adding classes with the manufactured animations
function animationGridCellFall() {
  const gridCells = document.querySelectorAll(".grid__cell--fall");
  gridCells.forEach(function(gridCell) {
    gridCell.classList.add("animation-grid-cell-fall");
  });
  const containerTextFirst = document.querySelector(".container__text--first");
  containerTextFirst.classList.add("animation-grid-cell-fall");

  const containerTextSecond = document.querySelector(".container__text--second");
  containerTextSecond.classList.add("animation-container-text-second");
}

// target button triggering the second animation
const buttonContainerTextSecond = document.querySelector(".container__text--second button");
buttonContainerTextSecond.addEventListener("click", animationGridCellAppear);

// in the second animation target all grid cells, target the first container__text and animate the elements back into view
// target also the second container__text and animate it out of sight

// all this by removing the classes with the manufactured animations (as per the now missing **forward** properties, the elements revert back to their original values)
function animationGridCellAppear() {
  const gridCells = document.querySelectorAll(".grid__cell--fall");
  gridCells.forEach(function(gridCell) {
    gridCell.classList.remove("animation-grid-cell-fall");
  });
  const containerTextFirst = document.querySelector(".container__text--first");
  containerTextFirst.classList.remove("animation-grid-cell-fall");

  const containerTextSecond = document.querySelector(".container__text--second");
  containerTextSecond.classList.remove("animation-container-text-second");
}
