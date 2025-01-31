import { fetchJSON, renderProjects, fetchGithubData } from 'global.js';
const projects = await fetchJSON('projects/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');