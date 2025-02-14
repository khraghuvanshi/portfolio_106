let data = [];

async function loadData() {
    data = await d3.csv('loc.csv', (row) => ({
        ...row,
        line: Number(row.line), // or just +row.line
        depth: Number(row.depth),
        length: Number(row.length),
        date: new Date(row.date + 'T00:00' + row.timezone),
        datetime: new Date(row.datetime),
      }));

    displayStats();
}

function processCommits() {
    commits = d3
      .groups(data, (d) => d.commit) // Group data by commit
      .map(([commit, lines]) => {
        let first = lines[0];
        let { author, date, time, timezone, datetime } = first;
  
        // Construct the commit object with basic and derived information
        let ret = {
          id: commit,
          url: 'https://github.com/YOUR_REPO/commit/' + commit,
          author,
          date,
          time,
          timezone,
          datetime,
          hourFrac: datetime.getHours() + datetime.getMinutes() / 60,  // Calculate fractional hour
          totalLines: lines.length,  // Number of lines modified in this commit
        };
  
        // Optionally hide the lines array
        Object.defineProperty(ret, 'lines', {
          value: lines,
          writable: false, // Prevent changes
          enumerable: false, // Hide in normal printing
          configurable: false, // Can't redefine or delete this property
        });
  
        return ret;
      });
    }

function displayStats() {
  processCommits(); // Process commit data

  const dl = d3.select('#stats').append('dl').attr('class', 'stats');

  // Total Lines of Code
  dl.append('dt').html('Total <abbr title="Lines of code">LOC</abbr>');
  dl.append('dd').text(data.length);

  // Total Commits
  dl.append('dt').text('Total commits');
  dl.append('dd').text(commits.length);

  // Number of Files
  const numFiles = d3.group(data, (d) => d.file).size;
  dl.append('dt').text('Total files');
  dl.append('dd').text(numFiles);

  // Maximum File Length
  const maxFileLength = d3.max(data, (d) => d.line);
  dl.append('dt').text('Longest file (in lines)');
  dl.append('dd').text(maxFileLength);

  // Average File Length
  const fileLengths = d3.rollups(
    data,
    (v) => d3.max(v, (d) => d.line),
    (d) => d.file
  );
  const avgFileLength = d3.mean(fileLengths, (d) => d[1]);
  dl.append('dt').text('Average file length (in lines)');
  dl.append('dd').text(avgFileLength.toFixed(2));

  // Deepest Line
  const maxDepth = d3.max(data, (d) => d.depth);
  dl.append('dt').text('Maximum depth');
  dl.append('dd').text(maxDepth);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
});