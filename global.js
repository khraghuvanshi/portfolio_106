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
    { url: 'resume.html', title: 'Resume' },
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
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = '../' + url;
  }


  // let a = document.createElement('a');
  // a.href = url;
  // a.textContent = title;
  // nav.append(a);

//   nav.insertAdjacentHTML('beforeend', `<a href="${url}" target="${url.startsWith('http') ? '_blank' : '_self'}">${title}</a>`);
}


