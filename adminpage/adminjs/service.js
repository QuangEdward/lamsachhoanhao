let getModal = document.querySelector('#modal')
let getUpdateModal = document.querySelector('#update-modal')
let addBtn = document.querySelector('.content button')
let getClose = document.querySelector('.modal-header i')
let getCancel = document.querySelector('.cancel')
let getCate = document.querySelector('#category')
let getCateUpdate = document.querySelector('#category-update')
let getServiceTable = document.querySelector('.service-table')
let getDelModal = document.querySelector('#delete-user-modal')
let getCancelBtn = document.querySelector('.cancel-delete')
let getDelBtn = document.querySelector('.delete')
let getTiclose = document.querySelector('.close-del')
let updateBtn = document.querySelector('.update')
let getCancelUpdate = document.querySelector('.cancel-update')
let getError = document.querySelectorAll('.error')
let getUpdateError = document.querySelectorAll('.error-update')
addBtn.addEventListener('click', function() {
    getModal.style.display = 'block'
})

getClose.addEventListener('click', function() {
    getModal.style.display = 'none'
    getError[0].innerText = ""
    getError[1].innerText = ""
    getError[2].innerText = ""
})

getCancel.addEventListener('click', function() {
    getModal.style.display = 'none'
    getError[0].innerText = ""
    getError[1].innerText = ""
    getError[2].innerText = ""
})

getCancelUpdate.addEventListener('click', function() {
    getUpdateModal.style.display = 'none'
    getUpdateError[0].innerText = ""
    getUpdateError[1].innerText = ""
    getUpdateError[2].innerText = ""
})

document.querySelector('#update-modal .add-close').addEventListener('click', function() {
    getUpdateModal.style.display = 'none'
    getUpdateError[0].innerText = ""
    getUpdateError[1].innerText = ""
    getUpdateError[2].innerText = ""
})

window.onclick = function(event) {
    if (event.target == getModal) {
        getModal.style.display = "none"
        getError[0].innerText = ""
        getError[1].innerText = ""
        getError[2].innerText = ""
    }
    if (event.target == getUpdateModal) {
        getUpdateModal.style.display = "none"
        getUpdateError[0].innerText = ""
        getUpdateError[1].innerText = ""
        getUpdateError[2].innerText = ""
    }
}

function renderServices() {
    fetch('http://localhost:3000/api/v1/services', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(services) {
            console.log(services)
            let htmls = services.map(function(service) {
                return `
                <tr class="service-item-${service.id}">
                    <td style="text-align: center;">
                        <button style="padding:8px 12px" onclick="deleteService('${service.id}')" class="delButton">Xóa</button>
                    </td>
                    <td>${service.category.name}</td>
                    <td>${service.name}</td>
                    <td>
                        <img src="${service.image}" alt="">
                    </td>
                    <td style="text-align: center;">
                        <i onclick="updateService('${service.id}')" style="cursor: pointer" class="fa fa-user-pen"></i>
                    </td>
                </tr>
        `
            })
    getServiceTable.innerHTML = htmls.join('')
        })
}

renderServices()
function renderCategories() {
    fetch('http://localhost:3000/api/v1/categories', {
        method: 'GET',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(categories) {
        for(let i = 0; i < categories.length; i++) {
            getCate.innerHTML += `
            <option value="${categories[i].id}">${categories[i].name}</option>
            `
            getCateUpdate.innerHTML += `
            <option value="${categories[i].id}">${categories[i].name}</option>
            `
        }
    })
}
renderCategories()

let getAdmin = JSON.parse(localStorage.getItem('getUser'))
function createService() {
    let getImg = document.querySelector('.image').files
    let getTitle = document.querySelector('.title').value
    let getContent = document.querySelector('#subject').value
    // console.log(getTrueContent)
    if (getTitle.length < 10 || getTitle.length > 100) {
        getError[0].innerText = "Tiêu đề phải có ít nhất 10 kí tự hoặc trên 100 kí tự"
    }
    else {
        getError[0].innerText = ""
    }
    if (getImg.length == 0) {
        getError[1].innerText = "Hãy chọn 1 ảnh"
    }
    else {
        getError[1].innerText = ""
    }
    if (getContent.length == 0) {
        getError[2].innerText = "Hãy nhập trường này"
    }
    else {
        getError[2].innerText = ""
    }
    
    if (getError[0].innerText == "" && getError[1].innerText == "" && getError[2].innerText == "") {
        const formData = new FormData();
        const docsfile = getImg
        formData.append("image", docsfile[0])
        formData.append("name", getTitle)
        formData.append("description", getContent)
        formData.append("category", getCate.value)
        fetch('http://localhost:3000/api/v1/services', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': `Bearer ${getAdmin.userToken}`
            },
            body: formData
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            alert('Đăng thành công')
            getModal.style.display = 'none'
            renderServices()
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

function deleteService(id) {
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
            fetch('http://localhost:3000/api/v1/services' + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAdmin.userToken}`
                }
            })
            .then(function(response) {
                return response.json()
            })
            .then(function() {
                let serviceItem = document.querySelector('.service-item-' + id)
                if (serviceItem) {
                    serviceItem.remove()
                    getDelModal.style.display = 'none'
                    alert("Xóa thành công")
                }
            })
        })
    
}

function updateService(serviceId) {
    getUpdateModal.style.display = 'block'
    fetch('http://localhost:3000/api/v1/services')
    .then(function(response) {
        return response.json()
    })
    .then(function(existedData) {
        let getItemData = existedData.filter(function(dataItem) {
            return dataItem.id == serviceId
        })
            updateBtn.addEventListener('click', function() {
                let getTitleUpdate = document.querySelector('.title-update').value
                let getContentUpdate = document.querySelector('#subject-update').value
                let getImgUpdate = document.querySelector('.image-update').files
                    getItemData[0] = new FormData()
                    const docsFile = getImgUpdate
                    getItemData[0].set("image", docsFile[0])
                    getItemData[0].set("name", getTitleUpdate)
                    getItemData[0].set("description", getContentUpdate)
                    getItemData[0].set("category", getCateUpdate.value)
                    fetch('http://localhost:3000/api/v1/services', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Authorization': `Bearer ${getAdmin.userToken}`
                        },
                        body: getItemData[0]
                    })
                    .then(function(res) {
                        return res.json()
                    })
                    .then(function() {
                        fetch('http://localhost:3000/api/v1/services' + '/' + serviceId, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${getAdmin.userToken}`
                            }
                        })
                        .then(function(response) {
                        return response.json()
                        })
                        .then(function() {
                            alert("Lưu thành công")
                            getUpdateModal.style.display = 'none'
                            renderServices()
                        })
                    })
                  
            })
        
    })
}

function filterService() {
    let input = document.querySelector('#search')
    let filter = input.value.toUpperCase()
    let table = document.querySelector('table')
    let tr = table.querySelectorAll('tr')
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[2]
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

