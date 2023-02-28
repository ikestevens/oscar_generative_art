const width = 1280;
const height = 720;
const bend = 30;

const movie_num = [10,10,8,9,8,9,9,8,8,9,9,9,10,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,10,10,10,10,10,12,12,10,8,5,5,5,3];
movie_num.reverse();
const year_length = movie_num.length;

import {movie_dict} from './movie_dict.js';

// block dimensions
let block_horiz = width/year_length;


let block_vert_array = [];
let gender_array = [];
let ratings_array = [];
let best_array = [];

let best_picture_runtime = null; // default value
for (let i = 1928; i < 2023; i++) {
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

let female_color = [94, 106, 106];
let normal_color = [197, 151, 127];

function get_color(rating, gender) {
  norm = 255 - ((rating/100) * 255);
  let r;
  let b;
  let g;
  let depth;
  let final_color;
  if (gender) {
    final_color = [200, 191, 182] // light beige
  } else if (rating > 96 && rating <= 100) {
    final_color = [64, 64, 72] // black
  } else if (rating > 93 && rating <= 96) {
    final_color = [137, 121, 105] // brown
  } else if (rating > 90 && rating <= 93) {
    final_color = [158, 81, 39] // orange
  } else if (rating > 86 && rating <= 90) {
    final_color = [156, 120, 180] // red
  } else if (rating > 79 && rating <= 86) {
    final_color = [166, 155, 125] // tan
  } else {
    final_color = [101, 112, 108] // teal
  }
  return final_color
}

function draw_rect(j, k, horiz, vertical, block_horiz) {
  color = get_color(ratings_array[j][k], gender_array[j][k]);
  fill(color);
  strokeWeight(6)
  stroke(10, 15, 80)
  rect(horiz, vertical, block_horiz, block_vert_array[j][k], bend);

  if (best_array[j][k]) {
    stroke(10, 15, 80)
    strokeWeight(6)
    let half = vertical + block_vert_array[j][k]/2
    line(horiz, half, horiz+block_horiz, half)
  }
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(255);

  fill(normal_color);
  stroke(255)
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
