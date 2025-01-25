console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
//   );

// if (currentLink) {
//     // or if (currentLink !== undefined)
// currentLink.classList.add('current');
// }

let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume' },
    { url: 'contact/', title: 'Contact' },
    { url: 'https://github.com/khraghuvanshi', title: 'GitHub' },
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  
  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);

}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark" selected>Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
);

let select = document.querySelector(".color-scheme select");

if ("colorScheme" in localStorage) {
  let savedTheme = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', savedTheme);
  select.value = savedTheme; // Update the dropdown to match
}

select.addEventListener('input', function (event) {
  let theme = event.target.value;
  console.log('color scheme changed to', theme);
  document.documentElement.style.setProperty('color-scheme', theme);
  localStorage.colorScheme = theme;
});



