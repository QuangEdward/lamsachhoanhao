window.onscroll = function() {
    stickyNavbar()
}
let getHeader = document.querySelector('#header')
let stick = getHeader.offsetTop
function stickyNavbar() {
    if (window.pageYOffset >=stick) {
        getHeader.classList.add("sticky")
    }
    else {
        getHeader.classList.remove("sticky")
    }
}

function displayTopNav() {
    let getTopNav = document.querySelector('.menu')
    getTopNav.classList.toggle('res-menu')
}

