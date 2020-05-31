// Don't worry about modifying this file
// it builds up the app scaffold so that you don't need to mess around with it
// just do your work in the chart-x files
// although perhaps reading this file might give you some hints about one of the charts....

const domReady = require('domready');
import {select, selectAll} from 'd3-selection';
import './main.css';

import Chart1Rug from './chart-1-rug';
import Chart2Waffle from './chart-2-waffle';
import Chart3BarChart from './chart-3-bar-chart';
import Chart4Hops from './chart-4-hops';
import Chart5Map from './chart-5-map';
import Chart6Ross from './chart-6-ross';

domReady(buildApp);

const charts = {
  home: homePage,
  rug: Chart1Rug,
  waffle: Chart2Waffle,
  bars: Chart3BarChart,
  hops: Chart4Hops,
  map: Chart5Map,
  ross: Chart6Ross,
};
const getPage = () => (location.hash.slice(1).length ? location.hash.slice(1) : 'home');
function buildApp() {
  // state
  let currentPage = getPage();

  const container = select('#button-container');
  // buttons
  const buildButtons = () =>
    container
      .selectAll('.view-select')
      .data(Object.keys(charts))
      .join('a')
      .classed('view-select', true)
      .text(d => d)
      .attr('href', d => `/#${d}`)
      .classed('selected-view', d => d === currentPage);

  // render with reset
  function renderCurrentView() {
    selectAll('#chart-container *').remove();
    charts[currentPage]();
  }
  window.onhashchange = () => {
    currentPage = getPage();
    buildButtons();
    renderCurrentView();
  };

  // render the buttons
  buildButtons();
  renderCurrentView();
}

function homePage() {
  const container = select('#chart-container')
    .append('div')
    .attr('id', 'home-page');
  container.append('h3').text('HW5 - 7 Charts');
  container.append('p').text(
    `
      In this this assignment you will develop a sequence of 7 charts. 
      See the readme for additional instructions. 
      You can access each of these charts vis the buttons above.`,
  );
}
