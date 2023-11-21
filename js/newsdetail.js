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

let detailBox = document.querySelector('.detail-box')
function getNews(newId) {
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
        let newsData = news.data
        console.log(newsData)
        let getData = newsData.filter(function(newInfo) {
            return newInfo.id == newId
        })
        console.log(getData)
        let info = getData.map(function(item) {
            return `
            <h1>${item.title}</h1>
                    <p>
                        ${item.description2.replace(/\n/g, "<br>")}
                    </p>
                    <img src="${item.images[0].image0}" alt="">
                    <br>

                    <br>
                    <p>
                        ${item.description3.replace(/\n/g, "<br>")}
                    </p>
                    <img src="${item.images[1].image1}" alt="">
                    <br>

                    <br>
                    <p>
                        ${item.description4.replace(/\n/g, "<br>")}
                    </p>
                    <img src="${item.images[2].image2}" alt="">
                    <br>

                    <br>
                    <p>
                        ${item.description5.replace(/\n/g, "<br>")}
                    </p>
                    <img src="${item.images[3].image3}" alt="">
            `
        })
        detailBox.innerHTML += info
    })
}

window.onload = function() {
    const url = document.location.href
    console.log(url)
    const id = url.split('?id=')?.[1]
    console.log(id)
    getNews(id)
}
