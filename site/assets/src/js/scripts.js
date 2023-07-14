/* Nav Button*/

const navButton = document.querySelector('.nav-toggle')
const nav = document.querySelector('#nav')

navButton.addEventListener('click', (e) => {
    nav.classList.toggle('nav--visible')
})