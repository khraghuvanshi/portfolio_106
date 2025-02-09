import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');
const searchInput = document.querySelector('.searchBar');
const legend = d3.select('.legend');
const svg = d3.select('svg');

let query = ''; // Stores the current search query
let selectedIndex = -1; // Stores selected wedge index (-1 means none)

// Function to render pie chart based on visible projects
function renderPieChart(projectsGiven) {
  // Clear previous pie chart and legend
  svg.selectAll('path').remove();
  legend.selectAll('li').remove();

  // Rollup data by year
  let rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  // Convert data for pie chart
  let data = rolledData.map(([year, count]) => ({
    value: count,
    label: year
  }));

  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcData = sliceGenerator(data);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  // Append wedges to SVG
  let arcs = svg.selectAll('path')
    .data(arcData)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', (d, i) => colors(i))
    .attr('class', (d, i) => selectedIndex === i ? 'selected' : '')
    .on('click', (event, d) => {
      selectedIndex = selectedIndex === arcData.indexOf(d) ? -1 : arcData.indexOf(d);
      updateFilteredProjects(); // Apply filtering on selection
    });

  // Append legend
  let legendItems = legend.selectAll('li')
    .data(data)
    .enter()
    .append('li')
    .attr('class', (d, i) => selectedIndex === i ? 'selected legend-item' : 'legend-item')
    .attr('style', (d, i) => `--color:${colors(i)}`)
    .html(d => `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
}

// Function to update filtered projects considering both search and pie chart filters
function updateFilteredProjects() {
  let filteredProjects = projects;

  // Apply search filter
  if (query) {
    filteredProjects = filteredProjects.filter((project) => {
      let values = Object.values(project).join('\n').toLowerCase();
      return values.includes(query);
    });
  }

  // Apply year filter (only if a slice is selected)
  if (selectedIndex !== -1) {
    let selectedYear = arcData[selectedIndex].data.label;//d3.pie().value(d => d.value)(projects)[selectedIndex].data.label;
    filteredProjects = filteredProjects.filter((project) => project.year === selectedYear);
  }

  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
}

// Initial render
renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects);

// Event listener for search bar
searchInput.addEventListener('change', (event) => {
  query = event.target.value.toLowerCase();
  updateFilteredProjects();
});



// import { fetchJSON, renderProjects } from '../global.js';

// const projects = await fetchJSON('../lib/projects.json');

// const projectsContainer = document.querySelector('.projects');
// const projectsTitle = document.querySelector('.projects-title');

// renderProjects(projects, projectsContainer, 'h2');
// projectsTitle.innerHTML = `Here are my <span>${projects.length}</span> projects`;

// // projectsTitle.textContent = `Here are my ${projects.length} projects`;

// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// const svg = d3.select('svg')

// let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// let rolledData = d3.rollups(
//     projects,
//     (v) => v.length,
//     (d) => d.year,
//   );

// let sliceGenerator = d3.pie().value((d) => d.value);
// let total = 0;//data.reduce((sum, d) => sum + d, 0);

// let data = rolledData.map(([year, count]) => {
//   return { value: count, label: year };
// });

// for (let d of data) {
//   total += d;
// }

// let angle = 0;
// let arcData = sliceGenerator(data);//[];

// for (let d of data) {
//   let endAngle = angle + (d / total) * 2 * Math.PI;
//   arcData.push({ startAngle: angle, endAngle });
//   angle = endAngle;
// }

// let arcs = arcData.map((d) => arcGenerator(d));

// let colors = d3.scaleOrdinal(d3.schemeTableau10);

// arcs.forEach((arc, idx) => {
//     d3.select('svg')
//       .append('path')
//       .attr('d', arc)
//       .attr('fill', colors(idx)) // Fill in the attribute for fill color via indexing the colors variable
// })

// let legend = d3.select('.legend');
// data.forEach((d, idx) => {
//     legend.append('li')
//         .attr('class', 'legend-item')
//         .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
//         .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
// })

// let query = '';
// let searchInput = document.querySelector('.searchBar');
// searchInput.addEventListener('change', (event) => {
//   // update query value
//   query = event.target.value;
//   // filter projects
//   let filteredProjects = projects.filter((project) => {
//     let values = Object.values(project).join('\n').toLowerCase();
//     return values.includes(query.toLowerCase());
//   });
//   // render filtered projects
//   renderProjects(filteredProjects, projectsContainer, 'h2');
// });

