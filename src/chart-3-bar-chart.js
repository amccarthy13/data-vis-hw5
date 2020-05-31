import {scaleBand, scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
import {axisLeft, axisRight, axisTop} from 'd3-axis';
import {schemeSet1} from 'd3-scale-chromatic';
// you are welcome to pick what colors you want, i fiddled around with my colors a bit via:
const COLORS = schemeSet1.filter((_, idx) => idx !== 4).reverse();
export default function Chart3BarChart() {
  fetch('./data/american-executions.json')
    .then(d => d.json())
    .then(d => barChart(d));
}

// we found these utility functions to be helpful....
// use your implementation of group by here!
const groupBy = (data, key) => [];
function recursiveGroupBy(data, keys) {
  if (!keys.length) {
    return data;
  }
  return Object.entries(groupBy(data, keys[0])).map(([name, group]) => {
    return {
      name,
      children: keys.length ? recursiveGroupBy(group, keys.slice(1)) : data,
      childrenSize: group.reduce((acc, row) => acc + row.childrenSize, 0) || group.length,
    };
  });
}

function getUniques(data, key) {
  return Array.from(data.reduce((acc, row) => acc.add(row[key]), new Set()));
}
function getNestedDomainMax(data, keys) {
  return data.reduce((acc, row) => {
    if (keys.length) {
      return Math.max(acc, getNestedDomainMax(row.children, keys.slice(1)));
    }
    return Math.max(acc, row.childrenSize);
  }, -Infinity);
}

// constants
const height = 2800;
const width = 600;
const margin = {left: 100, top: 50, right: 50, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
function barChart(data) {
  // build a container
  const container = select('body')
    .append('svg')
    .attr('width', plotWidth)
    .attr('height', plotHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  // you shouldn't need to modify the following lines, they are broken up to force the various parts to work
  const {raceScale, horizontalScale, raceColorMap, stateScale, groupedData} = buildScales(data);
  drawBoxes(container, groupedData, stateScale, raceScale, horizontalScale, raceColorMap);
  drawAxes(container, horizontalScale, stateScale, raceScale, states);
}

/**
 * Construct the four scales necessary to run this chart
 * as well as the grouped data!
 * @param {array of object} data - the input data
 */
function buildScales(data) {
  // 1. recursively map the data
  // YOUR WORK HERE -  (1 line call above util functions)

  // 2. compute a state size map
  // YOUR WORK HERE -  approx 4 lines

  // 3. use the getUniques function and the state size map to sort it
  // YOUR WORK HERE -  approx 1 lines

  // 4. create a state scale mapping states to plotheight
  // YOUR WORK HERE -  approx 4 lines

  // 5.create a race scale mapping races with the bandwidth of the states
  // ...might need to use getUniques
  // YOUR WORK HERE -  approx 4 lines

  // 6. construct a horizontal scale mapping the domain to the plot width
  // YOUR WORK HERE -  approx 3 lines

  // 7. map races to colors for drawing the bars. don't pick a racist mapping.
  // YOUR WORK HERE -  approx 3 lines

  return {
    // band scale
    raceScale,
    // linear scale
    horizontalScale,
    // can be whatever, ours is just a mapping like {white: 'COLOR',...}
    raceColorMap,
    // band scale
    stateScale,
    // recursively grouped data
    groupedData,
  };
}

/**
 * create the actual rects!
 * @param {svg container} container
 * @param {array of object of array of objects....} groupedData
 * @param {BandScale} stateScale
 * @param {BandScale} raceScale
 * @param {LinearScale} horizontalScale
 * @param {*} raceColorMap
 */
function drawBoxes(container, groupedData, stateScale, raceScale, horizontalScale, raceColorMap) {
  // YOUR WORK HERE - approx 20 lines
}

/**
 * Draw the axes
 * @param {svg container} container
 * @param {LinearScale} horizontalScale
 * @param {BandScale} stateScale
 * @param {BandScale} raceScale
 * @param {Array of Strings} listOfStates - a
 */
function drawAxes(container, horizontalScale, stateScale, raceScale, listOfStates) {
  // YOUR WORK HERE - approx 18 lines
}
