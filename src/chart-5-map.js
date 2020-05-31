import {event, select, selectAll} from 'd3-selection';
import {csv} from 'd3-fetch';
import {scaleQuantize} from 'd3-scale';
import {hexbin} from "d3-hexbin";

export default function Chart5Map() {
  Promise.all([
    fetch('./data/obesity.json').then(d => d.json()),
    csv('./data/hexmap.csv').then(data =>
      data.map(d => ({
        ...d,
        HexCol: Number(d.HexCol),
        HexRow: Number(d.HexRow),
      })),
    ),
  ]).then(d => map(d[0], d[1]));
}

const hexWidth = 65;
// some hexagon utilities
function prepareHexagons(hexLocations) {
  return hexLocations.map(loc => {
    const {HexRow, HexCol} = loc;
    const pos = [
      hexWidth * (-2 + HexCol + 0.5 * HexRow),
      1 + hexWidth * (-0.3 + 0.5 * Math.sqrt(3) * HexRow),
    ];
    return {...loc, pos};
  });
}

// constants
const height = 700;
const width = 740;

const colors = scaleQuantize()
  .domain([0,0.201])
  .range(["#87CEEB", "#00BFFF", "#1E90FF", "#0000FF",
    "#0000CD", "#00008B"]);

const emojiScale = scaleQuantize()
  .domain([0, 0.201])
  .range(["🤩", "😁", "😀", "🙂", "😐", "😔"]);

// the function where the state will be held, and will decide which of the maps to render
function map(obesityData, hexLocations) {
  let useHex = false;
  // 1. construct a button container and a map container
  const button= select("#chart-container")
    .append("svg")
    .attr("width",width)
    .attr("height",height)


  const main = select('#chart-container')
    .append('svg')
    .attr("width",width)
    .attr("height",height)
    .attr('transform', `translate(-400,100)`);

  const div = select('#chart-container').append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

  main.append('text')
    .attr('x', 160)
    .attr('y', 580)
    .attr('class', 'title')
    .style('font-size', '30px')
    .style('text-decoration', 'underline')
    .text("Hover over a state to find out more:");



  // 2. create functions drawContents and renderButtons.
  // draw contents will simply call drawMap with appropriate arguments (1 line)

  function drawContents() {
    drawMap(main, obesityData, hexLocations, useHex, div);
    drawText(main, obesityData, hexLocations, useHex);
  }
  // while renderButtons will conditionally added a selected-view view class to the selected button
  // in order to communicate to the user the current state (see main.css)
  // it will also modify the useHex depend on what's been clicked (17 lines)

  function renderButtons() {
    const allButtons= button.append("g")
      .attr("id","allButtons");

    const labels= ['use hex','use emoji'];

    const buttonGroups= allButtons.selectAll("g.button")
      .data(labels)
      .enter()
      .append("g")
      .attr("class","button")
      .style("cursor","pointer")
      .on("click", (d) => {
        selectAll("#hex").remove();
        selectAll("#text").remove();
        if (d === "use hex") {
          useHex = true;
          drawContents();
        } else {
          useHex = false;
          drawContents();
        }
      })
    const bWidth= 100;
    const bHeight= 25;
    const bSpace= 10;
    const x0= 20;
    const y0= 10;

    buttonGroups.append("rect")
      .attr("class","buttonRect")
      .attr("width",bWidth)
      .attr("height",bHeight)
      .attr("x", (d,i) => {
        return x0+(bWidth+bSpace)*i;
      })
      .attr("y",y0)
      .attr("rx",5)
      .attr("ry",5)
      .attr("fill","steelblue")

    buttonGroups.append("text")
      .attr("class","buttonText")
      .attr("font-family","Geneva")
      .attr("x", (d,i) => {
        return x0 + (bWidth+bSpace)*i + bWidth/2;
      })
      .attr("y",y0+bHeight/2)
      .attr("text-anchor","middle")
      .attr("dominant-baseline","central")
      .attr("fill","white")
      .text((d) => {return d;})


  }

  renderButtons()

  drawContents()


  // 3. call renderButtons, drawContents, and also insert a tooltip container - 8 lines
}

function drawText(mapContainer, obesityData,hexLocations, useHex) {
  const obesityMappings = Object.entries(obesityData).map(row => {
    return {stateAbbr: row[1].state, rate: row[1].rate}});

  const positions = prepareHexagons(hexLocations);

  const text = mapContainer.selectAll("g")
    .attr("id", "text")
    .data(positions)

  if (useHex) {
    text
      .enter()
      .append("g")
      .append("text")
      .attr("x", (d) => d.pos[0] - 14)
      .attr("y", (d) => d.pos[1] + 7)
      .style('font-size', '22px')
      .style('fill', 'white')
      .text((d) => `${d.StateAbbr}`);
  }

  if (!useHex) {
    text
      .enter()
      .append("g")
      .append("text")
      .attr("x", (d) => d.pos[0] - 20)
      .attr("y", (d) => d.pos[1] + 12)
      .style('font-size', '38px')
      .style('fill', 'white')
      .text((d) => `${emojiScale(obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate)}`);
  }


}

function drawMap(mapContainer, obesityData, hexLocations, useHex, tooltip) {
  // 1. create mappings between state name and rate, as well as StateAbbr and StateName
  // in the obesityData and hexLocations respectively
  // YOUR WORK - approx 7 lines

  // 3. create a selection of hex containers containing g elements that have been translated as approrpiate
  // don't forget to include mouseover interactions, such that when the mouseenter event is called on a state
  // it sets the tooltip as appropriate and when it leaves it un-sets it!
  // YOUR WORK - approx 10 lines
  const obesityMappings = Object.entries(obesityData).map(row => {
    return {stateAbbr: row[1].state, rate: row[1].rate}});

  const positions = prepareHexagons(hexLocations);

  const hex = mapContainer.selectAll(".hexagon")
    .attr("id", "hex")
    .data(positions);

  const text = mapContainer.selectAll("g")
    .attr("id", "text")
    .data(positions)

  const hexDraw = hexbin().radius(37);

  if (useHex) {
    hex
      .enter().append("path")
      .attr("d", (d) => {
        return `M${d.pos[0]},${d.pos[1]}${hexDraw.hexagon()}`;
      })
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .style("fill", (d) => colors(obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate))
      .on('mouseover', (d) => {
        tooltip.transition()
          .duration(50)
          .style("opacity", 1);
        const num = `${d.StateName}: ${obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate}`;
        tooltip.html(num)
          .style("left", `${event.pageX + 5  }px`)
          .style("top", `${event.pageY - 10  }px`);
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration('50')
          .style("opacity", 0);

      });
    text
      .enter()
      .append("g")
      .append("text")
      .attr("x", (d) => d.pos[0] - 14)
      .attr("y", (d) => d.pos[1] + 7)
      .style('font-size', '22px')
      .style('fill', 'white')
      .text((d) => `${d.StateAbbr}`)
      .on('mouseover', (d) => {
        tooltip.transition()
          .duration(50)
          .style("opacity", 1);
        const num = `${d.StateName}: ${obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate}`;
        tooltip.html(num)
          .style("left", `${event.pageX + 5  }px`)
          .style("top", `${event.pageY - 10  }px`);
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration('50')
          .style("opacity", 0);
      });

  }

  if (!useHex) {
    hex
      .enter().append("path")
      .attr("d", (d) => {
        return `M${d.pos[0]},${d.pos[1]}${hexDraw.hexagon()}`;
      })
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .style("fill", "white")
      .on('mouseover', (d) => {
        tooltip.transition()
          .duration(50)
          .style("opacity", 1);
        const num = `${d.StateName}: ${obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate}`;
        tooltip.html(num)
          .style("left", `${event.pageX + 5  }px`)
          .style("top", `${event.pageY - 10  }px`);
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration('50')
          .style("opacity", 0);
      });

    text
      .enter()
      .append("g")
      .append("text")
      .attr("x", (d) => d.pos[0] - 20)
      .attr("y", (d) => d.pos[1] + 12)
      .style('font-size', '38px')
      .style('fill', 'white')
      .text((d) => `${emojiScale(obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate)}`)
      .on('mouseover', (d) => {
        tooltip.transition()
          .duration(50)
          .style("opacity", 1);
        const num = `${d.StateName}: ${obesityMappings.find(o => o.stateAbbr === d.StateAbbr).rate}`;
        tooltip.html(num)
          .style("left", `${event.pageX + 5  }px`)
          .style("top", `${event.pageY - 10  }px`);
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration('50')
          .style("opacity", 0);
      });
  }
}
