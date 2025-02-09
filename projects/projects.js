import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');

renderProjects(projects, projectsContainer, 'h2');
projectsTitle.innerHTML = `Here are my <span>${projects.length}</span> projects`;

// projectsTitle.textContent = `Here are my ${projects.length} projects`;

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const svg = d3.select('svg')

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let rolledData = d3.rollups(
    projects,
    (v) => v.length,
    (d) => d.year,
  );

let sliceGenerator = d3.pie().value((d) => d.value);
let total = 0;//data.reduce((sum, d) => sum + d, 0);

let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

for (let d of data) {
  total += d;
}

let angle = 0;
let arcData = sliceGenerator(data);//[];

for (let d of data) {
  let endAngle = angle + (d / total) * 2 * Math.PI;
  arcData.push({ startAngle: angle, endAngle });
  angle = endAngle;
}

let arcs = arcData.map((d) => arcGenerator(d));

let colors = d3.scaleOrdinal(d3.schemeTableau10);

arcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx)) // Fill in the attribute for fill color via indexing the colors variable
})

let legend = d3.select('.legend');
data.forEach((d, idx) => {
    legend.append('li')
        .attr('class', 'legend-item')
        .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
        .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
})