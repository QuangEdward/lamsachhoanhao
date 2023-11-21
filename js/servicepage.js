let getServiceBox = document.querySelector('.rest-service')
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
        for (let i = 0; i < data.length; i++) {
            getServiceBox.innerHTML += 
            `
            <div class="rest-service-box service">
                <a href="./servicedetail.html?id=${data[i].id}">
                    <div class="scale">
                        <img class="scale" src="${data[i].image}" alt="">
                    </div>
                    <div class="top-service-desc">
                        <a class="hover" href="./servicedetail.html?id=${data[i].id}">${data[i].name}</a>
                    </div>
                </a>
            </div>
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