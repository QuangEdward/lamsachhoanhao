let getName = document.querySelector('#name')
let getEmail = document.querySelector('#email')
let getPhone = document.querySelector('#phone')
let getSubject = document.querySelector('#subject')
let getAddress = document.querySelector('#address')
let getForm = document.querySelector('form')
function showError(input, message) {
    input.className = 'error'
    let getFormControl = input.parentElement
    let getErrors = getFormControl.querySelector('.errors')
    getErrors.innerText = message
}

function showSuccess(input) {
    let getFormControl = input.parentElement
    let getErrors = getFormControl.querySelector('.errors')
    input.classList.remove('error')
    getErrors.innerText = ''
}

function checkEmail(input) {
    let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    input.value = input.value.trim()
    if (regex.test(input.value)) {
        showSuccess(input)
        return true
    }
    else {
        showError(input, 'Email không hợp lệ')
    }
}

function checkPhoneNumber(input) {
    let num = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    input.value = input.value.trim()
    if (num.test(input.value)) {
        showSuccess(input)
        return true
    }
    else {
        showError(input, 'Số điện thoại không hợp lệ')
    }
}

function checkEmpty(listInput) {
    let required = true
    listInput.forEach(function(input) {
        if (input.value.length > 0) {
            showSuccess(input)
        }
        else {
            showError(input, 'Kiểm tra dữ liệu nhập vào')
            required = false
        }
    })
    return required
}

getForm.addEventListener('submit', function(e) {
    e.preventDefault()
    if (!checkEmpty([getName, getEmail, getPhone, getAddress, getSubject])) {
        checkEmail(getEmail)
        checkPhoneNumber(getPhone)
    }
    else {
        alert("Xin cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất")
        postInformation()
    }
})

function postInformation() {
    let userData = {
        name: getName.value,
        email: getEmail.value,
        phone: getPhone.value,
        address: getAddress.value,
        content: getSubject.value
    }
    fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
        .catch(function(err) {
            console.log(err)
        })
}



