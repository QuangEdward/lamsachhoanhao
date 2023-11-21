let getUserInfor = document.querySelector('.user-body')
let getDelModal = document.querySelector('#delete-user-modal')
let getCancelBtn = document.querySelector('.cancel-delete')
let getDelBtn = document.querySelector('.delete')
let getTiclose = document.querySelector('.fa-close')
let getAd = JSON.parse(localStorage.getItem('getUser'))
console.log(getAd)
fetch('http://localhost:3000/api/v1/orders', {
    method: "GET",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getAd.userToken}`
      },
})
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        let htmls = data.map(function(user) {
            return `
            <tr class="user-item-${user.id}">
                            <td style= "text-align:center">
                                <button onclick="delUser('${user.id}')" style="padding: 8px 12px; cursor:pointer">Xóa<button>
                            </td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.address}</td>
                            <td>${user.content}</td>
                        </tr>
            `
        })
        getUserInfor.innerHTML = htmls.join('')
    })

    function delUser(id) {
        getDelModal.style.display = 'block'
        getCancelBtn.addEventListener('click', function() {
            getDelModal.style.display = 'none'
        })
        getTiclose.addEventListener('click', function() {
            getDelModal.style.display = 'none'
        })
        window.onclick = function(event) {
            if (event.target == getDelModal) {
                getDelModal.style.display = "none";
            }
        }
        getDelBtn.addEventListener('click', function() {
            fetch('http://localhost:3000/api/v1/orders' + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAd.userToken}`
            }
            })
            .then(function(response) {
                return response.json()
            })
            .then(function() {
                let userItem = document.querySelector('.user-item-' + id)
                if (userItem) {
                    userItem.remove()
                    getDelModal.style.display = 'none'
                    alert("Xóa thành công")
                }
            })
        })
    }

function filterName() {
    let input = document.querySelector('#content input')
    let filter = input.value.toUpperCase()
    let table = document.querySelector('table')
    let tr = table.querySelectorAll('tr')
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1]
        if (td) {
            let textValue = td.textContent || td.innerText
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            }
            else {
                tr[i].style.display = "none"
            }
        }
    }
}
    

