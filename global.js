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
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume', title: 'Resume' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'https://github.com/khraghuvanshi', title: 'GitHub' },
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);

//   nav.insertAdjacentHTML('beforeend', `<a href="${url}" target="${url.startsWith('http') ? '_blank' : '_self'}">${title}</a>`);
}
