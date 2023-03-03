const width = 500;
const height = 720;
const bend = 30;

const movie_num = [7];
movie_num.reverse();
const year_length = movie_num.length;

let movie_dict = {"2022":
{"All Quiet on the Western Front_2":
{"female_director": true, "best_picture": false, "runtime": 50, "rating": 90},
"Avatar: The Way of Water": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 100},
"The Banshees of Inisherin": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 96},
"Elvis": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 93},
"Everything Everywhere All at Once": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 87},
"The Fabelmans": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 81},
"T\u00e1r": {"female_director": false, "best_picture": false, "runtime": 50, "rating": 70}}}

// block dimensions
let block_horiz = width/year_length;

let block_vert_array = [];
let gender_array = [];
let ratings_array = [];
let best_array = [];

let best_picture_runtime = null; // default value
for (let i = 2022; i < 2023; i++) {
  let runtimes = [];
  let genders = [];
  let ratings = [];
  let best = [];
  for (let amovie in movie_dict[i.toString()]) {
    runtimes.push(movie_dict[i.toString()][amovie]['runtime']);
    genders.push(movie_dict[i.toString()][amovie]['female_director']);
    ratings.push(movie_dict[i.toString()][amovie]['rating']);
    best.push(movie_dict[i.toString()][amovie]['best_picture']);
  }

  let sum = runtimes.reduce((total, current) => total + current, 0);
  let ordered_runtimes = runtimes.map(function(num) {
    return (num / sum) * height;
  })
  block_vert_array.push(ordered_runtimes);
  gender_array.push(genders);
  ratings_array.push(ratings);
  best_array.push(best);
}

function get_color(rating, gender) {
  let final_color;
  if (gender) {
    final_color = [200, 201, 202] // light beige
  } else if (rating > 96 && rating <= 100) {
    final_color = [64, 64, 72] // black
  } else if (rating > 93 && rating <= 96) {
    final_color = [137, 121, 105] // brown
  } else if (rating > 88 && rating <= 93) {
    final_color = [11, 87, 90] // dark green
  } else if (rating > 82 && rating <= 88) {
    final_color = [91, 152, 191] // [101, 112, 108] // camo
  } else if (rating > 75 && rating <= 82) {
    final_color = [158, 81, 130] // pink
  } else {
    final_color = [156, 120, 180] // purple
  }
  return final_color
}

function draw_lines(j, k, horiz, vertical, block_horiz) {
  fill(10, 15, 80)
  strokeWeight(5)
  let line_height = vertical + (block_vert_array[j][k]/2)
  line(horiz, line_height, horiz+block_horiz, line_height);
}

function draw_rect(j, k, horiz, vertical, block_horiz) {
  color = get_color(ratings_array[j][k], gender_array[j][k]);
  fill(color);
  strokeWeight(6)
  stroke(10, 15, 80)
  rect(horiz, vertical, block_horiz, block_vert_array[j][k], bend);

  if (best_array[j][k]) {
    stroke(10, 15, 80)
    strokeWeight(4)
    draw_lines(j, k, horiz, vertical, block_horiz);
  }
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(255);

  let horiz = 0
  for (let j = 0; j < year_length; j++) {
    let vertical = 0
    for (let k = 0; k < movie_num[j]; k++) {

      draw_rect(j, k, horiz, vertical, block_horiz);

      vertical += block_vert_array[j][k];
    }
    horiz += block_horiz
  }
}

window.setup = setup;
window.draw = draw;
