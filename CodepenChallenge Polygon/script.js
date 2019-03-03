// target the container and the overlay
const container = document.querySelector('.container');
const overlay = container.querySelector('.overlay');
// retrieve the width and height of the container
// these are used for three.js, but also the overlay
const { offsetWidth: width, offsetHeight: height } = container;

// describe the colors of the crystals
const colors = [
  {
    h: 225,
    s: 51,
    l: 48
  },
  {
    h: 45,
    s: 99,
    l: 49
  },
  {
    h: 13,
    s: 80,
    l: 43
  },
  {
    h: 323,
    s: 58,
    l: 53
  }
];

// repeat the logic to create the colored variants of the crystals
// the idea is to include 4 canvas elements
for (let i = 0; i < 4; i += 1) {
  /* set up the canvas
  - scene
  - camera
  - renderer

  ! be sure to use a fourth of the width
  */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, (width / 4) / height, 0.1, 1000);
  // transparent background
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize((width / 4), height);
  container.appendChild(renderer.domElement);

  // CRYSTAL
  // include a material susceptible to light
  const material = new THREE.MeshLambertMaterial({ color: `hsl(${colors[i].h}, ${colors[i].s}%, ${colors[i].l}%)` });
  // create the cones making up the shape
  const crystalGeometry1 = new THREE.ConeGeometry(5, 15, 6);
  // the second one is used atop the first one, with a smaller height
  const crystalGeometry2 = new THREE.ConeGeometry(5, 5, 6);
  // create the geometry into which the two geometries are merged
  const crystalGeometry = new THREE.Geometry();
  /* to have the cones effectively merged you need to
    1. create the mesh of each geometry
    1. merge the geometry of each mesh with the matching matrix
    1. use the finally updated single geometry to create the final mesh
  */
  // individual meshes
  const crystalMesh1 = new THREE.Mesh(crystalGeometry1, material);
  const crystalMesh2 = new THREE.Mesh(crystalGeometry2, material);
  // rotate the first cone to have it pointing downwards
  crystalMesh1.rotation.set(3.14, 0, 0);
  // position the second cone atop the first one
  crystalMesh2.position.set(0, 10, 0);

  // update the matrix of each individual shape
  crystalMesh1.updateMatrix();
  crystalMesh2.updateMatrix();
  // merge the updated matrix to the single geometry
  crystalGeometry.merge(crystalMesh1.geometry, crystalMesh1.matrix);
  crystalGeometry.merge(crystalMesh2.geometry, crystalMesh2.matrix);

  // create the single mesh out of the updated, merged geometry
  const crystalMesh = new THREE.Mesh(crystalGeometry, material);
  // update the position of the mesh to have it centered in the first fourth
  crystalMesh.position.set(0, -3, 0);
  // rotate the crystals according to their indexes
  crystalMesh.rotation.set(0.2, 0.5, `${0.1 * (i - 1)}`);

  // add the single mesh to the scene
  scene.add(crystalMesh);

  // LIGHT
  // ambient light
  // include a darker variant of each color
  const ambientLight = new THREE.AmbientLight(`hsl(${colors[i].h}, ${colors[i].s * 0.7}%, ${colors[i].l * 0.5}%)`, 0.2);
  scene.add(ambientLight);
  // directional light positioned according to the index of the crystal
  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  // top down, but moving incrementally from starting in the top-right to top-left corner
  directionalLight.position.set(width - (width / 3 * i), 0, 200);
  directionalLight.target.position.set(width / 3 * i, height, 0);
  scene.add(directionalLight);

  // pan out to highlight the shapes
  camera.position.z = 20;

  // render the shape in the renderer
  renderer.render(scene, camera);
}

// OVERLAY
// initialize a variable to track the position of the overlay in the container
// the idea is to have the container split in 4, and have the overlay move alternatively over each fourth
let choice = 0;

// function called to update the position of the overlay
// receiving as argument an integer in the [0-3] range and positioning the overlay in the container, accordingly
function handleSelection(selection) {
  // ! a fourth of the paragraph as to have the container split in 4, figuratively
  overlay.style.transform = `translate(${selection * (width / 4)}px, 0)`;
}

// immediately call the function to select the first item
handleSelection(choice);


// function called in response to a key being pressed
function handleKeyPress(e) {
  // react only if the keycode matches the left or right arrow keys
  const { keyCode } = e;
  // left key, decrement choice, or have it refer to the last element if the current choice cannot be decremented
  if (keyCode === 37) {
    choice = choice > 0 ? choice -= 1 : choice = 3;
    handleSelection(choice);
    // right key, mirroring the left key's behavior
  } else if (keyCode === 39) {
    choice = choice < 3 ? choice += 1 : choice = 0;
    handleSelection(choice);
  }
}
// listen for a key being pressed on the entire window
window.addEventListener('keydown', handleKeyPress);

// function called in response to a mousemove event being registered on the container
function handleMouseMove(e) {
  // consider the position of the cursor vis-a-vis the width of the container
  const { layerX: fromLeft } = e;
  // call the handle choice function for the fourth identified by the cursor, but only if this one is different from the current selection
  const newChoice = Math.floor(fromLeft / width * 4);
  if (newChoice !== choice) {
    choice = newChoice;
    handleSelection(choice);
  }
}

// listen for the mousemove event on the container
container.addEventListener('mousemove', handleMouseMove);
