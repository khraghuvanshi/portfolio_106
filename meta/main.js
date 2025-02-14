<script src="https://d3js.org/d3.v7.min.js"></script>

let data = [];

async function loadData() {
  data = await d3.csv('loc.csv');
  console.log(data);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
});