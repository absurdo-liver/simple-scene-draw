var output1 = document.getElementById('output1');
var drawpointInX = document.getElementById('commandDrawPointX');
var drawpointInY = document.getElementById('commandDrawPointY');
var autosaveText = document.getElementById('autosaveText');

let whitespace = '\n';
// empty = ◎
// filled = ◉
let layer1 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer2 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer3 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer4 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer5 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer6 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer7 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer8 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let layer9 = ['◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎', '◎'];
let scene = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9];

// Define local storage keys
const layer1Local = 'layer1';
const layer2Local = 'layer2';
const layer3Local = 'layer3';
const layer4Local = 'layer4';
const layer5Local = 'layer5';
const layer6Local = 'layer6';
const layer7Local = 'layer7';
const layer8Local = 'layer8';
const layer9Local = 'layer9';
const layerLocals = [layer1Local, layer2Local, layer3Local, layer4Local, layer5Local, layer6Local, layer7Local, layer8Local, layer9Local];

function drawPoint(x, y, isFilling) {
  if (y < 1 || y > 9) { return; }
  if (x < 1 || x > 15) { return; }
  let fill;
  if (isFilling) { fill = '◉'; } else { fill = '◎'; }
  // Locate & draw point
  scene[y - 1][x - 1] = fill;
}

function getInForDrawPoint(fill) {
  let x = parseInt(drawpointInX.value);
  let y = parseInt(drawpointInY.value);
  drawpointInX.value = parseInt(drawpointInX.value);
  drawpointInY.value = parseInt(drawpointInY.value);
  drawPoint(x, y, fill);
  renderer();
}

function renderer() {
  const sceneOut = scene.map(layer => layer.join(''));
  output1.textContent = sceneOut.join(whitespace);
}

function autosave() {
  localStorage.setItem(layer1Local, JSON.stringify(layer1));
  localStorage.setItem(layer2Local, JSON.stringify(layer2));
  localStorage.setItem(layer3Local, JSON.stringify(layer3));
  localStorage.setItem(layer4Local, JSON.stringify(layer4));
  localStorage.setItem(layer5Local, JSON.stringify(layer5));
  localStorage.setItem(layer6Local, JSON.stringify(layer6));
  localStorage.setItem(layer7Local, JSON.stringify(layer7));
  localStorage.setItem(layer8Local, JSON.stringify(layer8));
  localStorage.setItem(layer9Local, JSON.stringify(layer9));
  autosaveText.classList.replace('hidden', 'visible');
  setTimeout(() => {
    autosaveText.classList.replace('visible','hidden');
  }, 1000);
}

function load() {
  for (let i = 0; i < scene.length; i++) {
    const storedLayer = localStorage.getItem(layerLocals[i]);
    if (storedLayer) {
      scene[i] = JSON.parse(storedLayer);
    }
  }
}

function autosaveTimerInit() {
  setInterval(() => {
    autosave();
  }, 30000);
}


window.addEventListener('DOMContentLoaded', () => {
  load();
  renderer();
  autosaveTimerInit();
  autosave();
});
