let getDetailBox = document.querySelector('.detail-box')
function getService(serviceId) {
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
        let services = data.filter(function(service) {
            return service.id == serviceId
        })
        let html = services.map(function(item) {
            let desc = item.description.replace(/\n/g, "<br>")
            return `
            <h1>${item.name}</h1>
            <img src="${item.image}" alt="">
            <p style="margin: 20px 0; line-height: 1.5;">
                ${desc}
            </p>
            `
        })
        getDetailBox.innerHTML += html
    })
}

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

window.onload = function() {
    const url = document.location.href
    console.log(url)
    const id = url.split('?id=')?.[1]
    console.log(id)
    getService(id)
}