import {csv} from 'd3-fetch';
import {scaleLinear} from 'd3-scale';
import {select, selectAll} from 'd3-selection';
import {axisBottom, axisRight} from 'd3-axis';
import {line, curveBundle} from 'd3-shape';
import {format} from 'd3-format';

// the input data has columns for mountain and mountains
// for our purposes they are the same, so here's a little map you can use
const columnsByThing = {
  mountains: ['MOUNTAIN', 'MOUNTAINS'],
  clouds: ['CLOUDS', 'CUMULUS'],
};

/**
 * Here you will transform the 538 data into aggregates by season.
 * This will involve counting the number of episodes that mountain and cloud appearances by season
 * After which you should convert those numbers into fractions, such that you can say in season 13 X% of episodes had mountains
 * @param {*} data
 */
function pivot(data) {
  // YOUR WORK HERE  - approx 19 lines
}

const getMax = (data, key) => Math.max(...data.map(d => d[key]));

// constants
const height = 400;
const width = 1000;
const margin = {top: 50, bottom: 50, right: 50, left: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
export default function Chart5Ross() {
  csv('./data/elements-by-episode.csv').then(data => ross(data));
}

function ross(data) {
  // 1. create a container
  // YOUR WORK HERE - approx 6 lines

  // 2. pivot the data - 1 line;

  // 3. create a season scale
  // YOUR WORK HERE - approx 3 lines

  // 4. draw the background, the color is #bfc3e2
  // YOUR WORK HERE - approx 7 lines

  // CLOUDS
  clouds(container, xScale, pivotedData, {plotHeight, plotWidth, margin});
  // MOUNTAINS
  mountains(container, xScale, pivotedData, {plotHeight, plotWidth, margin});

  // 5. draw the season axis
  // YOUR WORK HERE - approx 7 lines
}

/**
 *
 * @param {svg container} container
 * @param {scaleLinear} xScale
 * @param {array of object, output of pivotData} pivotedData
 * @param {{number, number, {margin}}} {plotHeight,plotWidth}
 */
function clouds(container, xScale, pivotedData, {plotHeight, plotWidth}) {
  // A.1 construct cloud scale
  // YOUR WORK HERE - approx 4 lines

  // A.2 construct cloud container
  // YOUR WORK HERE - approx 1 lines

  // A.3 construct cloud line operator (this is where you specify the curve type)
  // YOUR WORK HERE - approx 4 lines

  // A.4 actually create the cloud line
  // hint: in our solution we didn't actually use a data bind, its just an append
  // hint: when you are feeding the data into your line operator, you make need to add some extra data
  // in order to get the end caps to work right
  // YOUR WORK HERE - approx 12 lines

  // A.5 cloud axes
  // YOUR WORK HERE - approx 8 lines
}

function mountains(container, xScale, pivotedData, {plotHeight, plotWidth, margin}) {
  // B.1 construct mountain scale and mountain line operator
  // YOUR WORK HERE - approx 7 lines

  // B.2 construct mountain container
  // YOUR WORK HERE - approx 4 lines

  // B.3 construct your set of background polygons.
  // YOUR WORK HERE - approx 5 lines

  // B.4 draw the background polygons, they are #423a33 colored
  // YOUR WORK HERE - approx 7 lines

  // B.5 construct your set of foreground polygons.
  // YOUR WORK HERE - approx 4 lines

  // B.6 draw the foreground polygons, they are #63503f colored
  // YOUR WORK HERE - approx 7 lines

  // B.7 catch the overhanging mountains by drawing white boxes on the end
  // YOUR WORK HERE - approx 10 lines

  // B.8 draw the mountain axis
  // YOUR WORK HERE - approx 10 lines
}
