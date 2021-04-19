var fireWidth = 50;
var fireHeight = 40;
var debugMode = false;
var decaimento = 3;
var intervalo

const numberOfPixels = fireHeight * fireWidth;

const btnMoreDecay = document.getElementById('btn_moreDecay');
const btnLessDecay = document.getElementById('btn_lessDecay');

const btnMoreWidth = document.getElementById('btn_moreWidth');
const btnLessWidth = document.getElementById('btn_lessWidth');

const btnDebug = document.getElementById('btn_debug');

btnMoreDecay.onclick = function() {
  decaimento++;
  console.log(decaimento);
}
btnLessDecay.onclick = function() {
  clearInterval(intervalo);
  decaimento--;
  console.log(decaimento);
}

/*
btnMoreWidth.onclick = function() {
  clearInterval(intervalo);
  fireWidth++;
  start();
}
btnLessWidth.onclick = function() {
  fireWidth--;
  start();
}
*/

btnDebug.onclick = function() {
  debugMode = !debugMode
}

const firePixelsArray = [];
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start() {
  createFireDataStructure();
  createFireSource();
  setInterval(calculateFirePropagation, 50);
  renderFire();  
  
}

function createFireDataStructure() {
  for(let i=0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function createFireSource() {
  for(let column = 0; column <= fireWidth; column++) {
    const hotPixelIndex = numberOfPixels - fireWidth + column

    firePixelsArray[hotPixelIndex] = 36;

  }
}

function calculateFirePropagation() {
  for(let column = 0; column < fireWidth; column++) {
    for(let row = 0; row < fireHeight; row++) {
      const pixelFireIndex = column + (row * fireWidth);

      updateFireIntesitity(pixelFireIndex);

    }
  }
  renderFire();
}

function updateFireIntesitity(pixel) {
  let downPixel = pixel + fireWidth;
  if(downPixel >= numberOfPixels) {
    return
  }

  let decay = Math.floor(Math.random() * decaimento);
  if(firePixelsArray[downPixel] - decay < 0) {
    firePixelsArray[pixel - decay] = 0;
    return
  }
  firePixelsArray[pixel - decay] = firePixelsArray[downPixel] - decay;
}

function renderFire() {
  let html = '';

  for(let row = 0; row < fireHeight; row++) {
    html += '<tr>';

    for(let column = 0; column < fireWidth; column++) {
      const pixelIndex = row*fireWidth + column;
      const fireIntensitity = firePixelsArray[pixelIndex];

      const color = fireColorsPalette[fireIntensitity]
      const colorString = `${color.r}, ${color.g}, ${color.b}`

      if(debugMode) {
        html += '<td class="debug">';
        html += `<div class="fire_intesitity" style="color: rgb(${colorString})">${fireIntensitity}</div>`;
      } else {
        html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
      }
        html += '</td>';
      
    }

    html += '</tr>';
    
  }
  document.querySelector('#tabela').innerHTML = html;
}

start();


/*
function calculateFirePropagation() {
  let fireIndex = numberOfPixels - fireWidth-1;
  for(fireIndex; fireIndex >= 0; fireIndex -= fireWidth) {
    downPixel = fireIndex + fireWidth;
    downPixelIntesistity = firePixelsArray[downPixel]
    
    let decay = 1
    firePixelsArray[fireIndex] = downPixelIntesistity-decay;
  }
}
*/  