import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');

renderProjects(projects, projectsContainer, 'h2');
projectsTitle.innerHTML = `Here are my <span>${projects.length}</span> projects`;

// projectsTitle.textContent = `Here are my ${projects.length} projects`;

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let arc = arcGenerator({
    startAngle: 0,
    endAngle: 2 * Math.PI,
  });

d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');