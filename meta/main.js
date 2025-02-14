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

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
});