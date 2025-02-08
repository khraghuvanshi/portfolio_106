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

// let arc = arcGenerator({
//     startAngle: 0,
//     endAngle: 2 * Math.PI,
//   });

// const svg = d3.select('svg')//.append('path').attr('d', arc).attr('fill', 'red');

let data = [1, 2, 3, 4, 5, 5];
let sliceGenerator = d3.pie();
let total = data.reduce((sum, d) => sum + d, 0);

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

let colors = ['gold', 'purple'];

arcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors[idx % colors.length]) // Fill in the attribute for fill color via indexing the colors variable
})