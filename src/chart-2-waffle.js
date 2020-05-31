import {scaleOrdinal, scaleLinear} from 'd3-scale';
import {schemePaired} from 'd3-scale-chromatic';
import {select} from 'd3-selection';
import {format} from 'd3-format';
import {getMax} from './utils';
export default function Chart2Waffle() {
  fetch('./data/movies.json')
    .then(d => d.json())
    .then(d => waffle(d));
}
// do your work here
const NUM_VERTICAL_BOXES = 8;
// this is just an estimate
const NUM_HORIZONTAL_BOXES = 60;
const height = 100;
const width = 600;
const margin = {left: 10, top: 10, right: 10, bottom: 10};
const plotWidth = width - margin.left - margin.right;
function waffle(data) {
  // 1. group by genre and aggregate by sum, e.g. {Horror: 12930238901, ....}
  // YOUR WORK HERE - approx 7 lines
  // 2. convert to box counts, e.g. [{genre: "XXXX", boxes: 123}, ....]
  // Don't forget to sort them!
  // YOUR WORK HERE - approx 8 lines
  // 3. Create a color scale mapping genre to color
  // YOUR WORK HERE - approx 3 lines
  // 4. convert boxes to layout boxes
  // YOUR WORK HERE - approx 3 lines
  // 5. apply layout positions (i.e. specify the x and y positions)
  // YOUR WORK HERE - approx 5 lines
  // 6. set up a single scale (should it be based off of x or y?)
  // YOUR WORK HERE - approx 3 lines
  // 7. get an svg container for
  // YOUR WORK HERE - approx 6 lines
  // 8. now actually render the waffle rects
  // hint: our x and y and position use the same scale,
  // and we compute the boxSize ahead of time (what should the be? maybe the differene between two positions?)
  // YOUR WORK HERE - approx 13 lines
  // 9. draw the legend
  // yours doesn't have to look like ours, it just has to have the same information
  // hint: our legend uses d3 but doesn't use any svg, just html elements
  // YOUR WORK HERE - approx 14 lines
}
