let getMenuService = document.querySelector('.menu-service')
fetch('http://localhost:3000/api/v1/services', {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        for (let i = 0; i < 7; i++ ) {
            getMenuService.innerHTML +=
            `
            <li>
            <a href="./servicedetail.html?id=${data[i].id}">${data[i].name}</a>
            </li>
            `
        }
    })

    let menuNews = document.querySelector('.menu-news')
    fetch('http://localhost:3000/api/v1/news', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(news) {
            for (let i = 0; i < 6; i++) {
                menuNews.innerHTML +=
                `
                     <li>
                        <a href="./newsdetail.html?id=${news.data[i].id}">
                            <img class="img-news" src="${news.data[i].images[0].image0}" alt="">
                            <span>${news.data[i].title}</span>
                        </a>
                    </li>
                `
            }
        })