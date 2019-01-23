const svgCanvas = document.querySelector('svg.maker__canvas');
const buttonTools = document.querySelectorAll('button.tool');
const buttonGlobals = document.querySelectorAll('button.global');
const inputColor = document.querySelector('input[type="color"]');

let startingX = 0;
let startingY = 0;
let startingColor = '#8be8dd';
let isDrawing = false;
let tool = 'line';

function getSVGPoint(x, y, svg) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function handleTool(e) {
  buttonTools.forEach(buttonTool => (buttonTool === this ? buttonTool.classList.add('active') : buttonTool.classList.remove('active')));
  tool = this.getAttribute('data-tool');
}

buttonTools.forEach(buttonTool => buttonTool.addEventListener('click', handleTool));


function prepareCanvas(e) {
  e.preventDefault();
  isDrawing = true;
  const { clientX, clientY } = e;
  const { x, y } = getSVGPoint(clientX, clientY, svgCanvas);
  startingX = x;
  startingY = y;

  switch (tool) {
    case 'line':
      svgCanvas.innerHTML += `<line x1=${startingX} y1=${startingY} />`;
      break;
    case 'rect':
      svgCanvas.innerHTML += '<rect />';
      break;
    case 'circle':
      svgCanvas.innerHTML += `<circle cx=${startingX} cy=${startingY} />`;
      break;
    default:
      console.log('nope');
  }
}
function drawLine(x, y) {
  const lines = svgCanvas.querySelectorAll('line');
  const line = lines[lines.length - 1];
  line.setAttribute('x2', x);
  line.setAttribute('y2', y);
  line.setAttribute('stroke', startingColor);
  line.setAttribute('stroke-width', 2);
}

function drawRect(x, y) {
  const [minX, maxX] = [x, startingX].sort((a, b) => (a > b ? 1 : -1));
  const [minY, maxY] = [y, startingY].sort((a, b) => (a > b ? 1 : -1));

  const rects = svgCanvas.querySelectorAll('rect');
  const rect = rects[rects.length - 1];
  rect.setAttribute('x', minX);
  rect.setAttribute('y', minY);
  rect.setAttribute('width', maxX - minX);
  rect.setAttribute('height', maxY - minY);
  rect.setAttribute('fill', startingColor);
}

function drawCircle(x, y) {
  const [minX, maxX] = [x, startingX].sort((a, b) => (a > b ? 1 : -1));
  const [minY, maxY] = [y, startingY].sort((a, b) => (a > b ? 1 : -1));

  const circles = svgCanvas.querySelectorAll('circle');
  const circle = circles[circles.length - 1];
  circle.setAttribute('r', maxX - minX);
  circle.setAttribute('fill', startingColor);
}
function drawCanvas(e) {
  if (isDrawing) {
    const { clientX, clientY } = e;
    const { x, y } = getSVGPoint(clientX, clientY, svgCanvas);
    switch (tool) {
      case 'line':
        drawLine(x, y);
        break;
      case 'rect':
        drawRect(x, y);
        break;
      case 'circle':
        drawCircle(x, y);
        break;
      default:
        console.log('nope');
    }
  }
}

svgCanvas.addEventListener('mousemove', drawCanvas);
svgCanvas.addEventListener('mousedown', prepareCanvas);
svgCanvas.addEventListener('mouseup', () => { isDrawing = false; });
svgCanvas.addEventListener('mouseout', () => { isDrawing = false; });


function handleInput() {
  const { value } = this;
  document.documentElement.style.setProperty('--accent', value);
  startingColor = value;
}

function handleGlobal() {
  const global = this.getAttribute('data-global');
  switch (global) {
    case 'clear':
      svgCanvas.innerHTML = '';
      break;
    default:
      console.log('nope');
  }
}

inputColor.addEventListener('input', handleInput);
buttonGlobals.forEach(buttonGlobal => buttonGlobal.addEventListener('click', handleGlobal));
