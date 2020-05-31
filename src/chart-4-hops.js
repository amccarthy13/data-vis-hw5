import {select} from 'd3-selection';
import {scaleLinear, scaleBand} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {csv} from 'd3-fetch';
// don't disable any lints, we'll check! only this one is allowed
// it's to enable the animation
// eslint-disable-next-line no-unused-vars
import transition from 'd3-transition';

// we provided a bootstrap function for you!
const bootstrap = data => data.map(() => data[Math.floor(Math.random() * data.length)]);

/**
 * Compute the mean of the data for each of the categories.
 * Make sure you sort them by the name of the drug
 * @param {*} data
 */
function aggregateData(data) {
    let ATotal = 0;
    let ACount = 0;
    let BTotal = 0;
    let BCount = 0;
    let CTotal = 0;
    let CCount = 0;

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].Drug === 'A') {
        ATotal += Number(data[i].Effectiveness);
        ACount += 1;
      }
      else if (data[i].Drug === 'B') {
        BTotal += Number(data[i].Effectiveness);
        BCount += 1;
      }
      else {
        CTotal += Number(data[i].Effectiveness);
        CCount += 1;
      }
    }

    return {'A': ATotal/ACount, 'B': BTotal/BCount, 'C': CTotal/CCount};
}

export default function Chart4HOPS() {
  csv('./data/gaussian-random.csv').then(d => hopVis(d));
}

// constants
const height = 800;
const width = 900;
const margin = {left: 50, top: 50, right: 50, bottom: 50};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;
function hopVis(data) {
  // 1. set up container
  // YOUR WORK HERE - approx 6 lines
  const container = select('#chart-container')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 4500)
    .append('g')
    .attr('transform', `translate(50,50)`);

  // 2. specify a transition  - 1 line
  select("#chart-container").transition().duration(10000);

  // 3. scales (linear and a band)
  // YOUR WORK HERE - approx 7 lines

  const xScale = scaleBand()
    .domain(['A', 'B', 'C'])
    .range([0, plotWidth]);

  const yScale = scaleLinear()
    .domain([0, 11])
    .range([plotHeight, 0]);

  // 4. axes
  // YOUR WORK HERE - approx 5 lines

  container
    .selectAll('g.x-axis')
    .data(data)
    .join('g')
    .attr('class','x-axis')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${plotHeight})`);
  container
    .selectAll('g.y-axis')
    .data(data)
    .join('g')
    .attr('class','y-axis')
    .call(axisLeft(yScale));

  // the recursive hopping function
  // could also do it with a set interval
  function drawHop() {
    select("#idA").remove();
    select("#idB").remove();
    select("#idC").remove();
    const boot = bootstrap(data);
    const aggregate = aggregateData(boot);

    container
      .append('line')
      .attr("id","idA")
      .style("stroke", "steelblue")
      .style("stroke-width", 15)
      .attr("x1", 10)
      .attr("y1", yScale(aggregate.A))
      .attr("x2", 256)
      .attr("y2", yScale(aggregate.A));

    container
      .append('line')
      .attr("id","idB")
      .style("stroke", "steelblue")
      .style("stroke-width", 15)
      .attr("x1", 276)
      .attr("y1", yScale(aggregate.B))
      .attr("x2", 522)
      .attr("y2", yScale(aggregate.B));

    container
      .append('line')
      .attr("id","idC")
      .style("stroke", "steelblue")
      .style("stroke-width", 15)
      .attr("x1", 542)
      .attr("y1", yScale(aggregate.C))
      .attr("x2", 788)
      .attr("y2", yScale(aggregate.C));

    setTimeout(() => drawHop(), 1000);
  }
  drawHop();
}
