/* d3 global */
// these are the imports used in the solutions
// you can use others if you wish
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {axisBottom} from 'd3-axis';

export default function Chart1Rug() {
  fetch('./data/cars.json')
    .then(d => d.json())
    .then(d => rug(d));
}

// constants
const height = 600;
const width = 1000;
const margin = {left: 40, top: 100, right: 10, bottom: 10};
const plotWidth = width - margin.left - margin.right;
const field = 'Displacement';
const lineHeight = 20;
const lineWidth = 2;


function rug(data) {
  // 1. construct a container and appropriate scale

  data.forEach((d) => {
    d.Displacement = Number(d.Displacement);
  });

  const svg = select('#chart-container')
    .append('svg')
    .attr('width', plotWidth)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = scaleLinear()
    .domain([0,455])
    .range([0, 700]);

  svg
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', d => xScale(d.Displacement))
    .attr('y', 0)
    .attr('height', lineHeight)
    .attr('width', lineWidth)
    .attr('fill', 'steelblue')


  svg.append('g')
    .data(data)
    .attr("transform", `translate(0,10)`)
    .call(axisBottom(xScale));

  svg.append('text')
    .attr('x', 0)
    .attr('y', -5)
    .attr('class', 'title')
    .style('font-size', '14px')
    .text(`${field}`);

}

