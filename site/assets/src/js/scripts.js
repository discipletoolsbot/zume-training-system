/* Nav Button*/

const navButton = document.querySelector('.nav-toggle')
const nav = document.querySelector('#nav')

if ( navButton ) {
    navButton.addEventListener('click', (e) => {
        nav.classList.toggle('nav--visible')
    })
}
