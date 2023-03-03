let img;
let matrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];

function preload() {
  img = loadImage('new_colors_image.png');
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let oldR = pixels[index];
      let oldG = pixels[index + 1];
      let oldB = pixels[index + 2];
      let newR = round(oldR / 255 * 15) * 255 / 15;
      let newG = round(oldG / 255 * 15) * 255 / 15;
      let newB = round(oldB / 255 * 15) * 255 / 15;
      pixels[index] = newR;
      pixels[index + 1] = newG;
      pixels[index + 2] = newB;
      let threshold = matrix[x % 4][y % 4] / 16.0;
      threshold /= 4.0; // increase the threshold value by a factor of 2
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;
      distributeError(x + 1, y, errR, errG, errB, threshold * 7);
      distributeError(x + 2, y, errR, errG, errB, threshold * 5);
      distributeError(x - 2, y + 1, errR, errG, errB, threshold * 3);
      distributeError(x - 1, y + 1, errR, errG, errB, threshold * 5);
      distributeError(x, y + 1, errR, errG, errB, threshold * 7);
      distributeError(x + 1, y + 1, errR, errG, errB, threshold * 5);
      distributeError(x + 2, y + 1, errR, errG, errB, threshold * 3);
      distributeError(x - 1, y + 2, errR, errG, errB, threshold * 1);
      distributeError(x, y + 2, errR, errG, errB, threshold * 3);
      distributeError(x + 1, y + 2, errR, errG, errB, threshold * 1);
    }
  }

  updatePixels();
}

function distributeError(x, y, errR, errG, errB, factor) {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return;
  }
  let index = (x + y * width) * 4;
  pixels[index] += errR * factor;
  pixels[index + 1] += errG * factor;
  pixels[index + 2] += errB * factor;
}
