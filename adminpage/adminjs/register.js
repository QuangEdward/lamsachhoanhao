let getSubmitForm = document.querySelector('.submit-form')
let getName = document.querySelector('#username')
let getEmail = document.querySelector('#email')
let getPhone = document.querySelector('#phone')
let getPassword = document.querySelector('#password')
let getToastMessage = document.querySelector('#toast')
let getInputValue = document.querySelectorAll('.form-control input')
let getMsg = document.querySelectorAll('.form-control span')
let dataUser = {
    
}
getSubmitForm.addEventListener('click', function() {
    for (let i = 0; i < getInputValue.length; i++) {
        if (getInputValue[i].value == '') {
            getMsg[i].innerText = 'Kiểm tra dữ liệu nhập vào'
        }
        else {
            getMsg[i].innerText = ''
        }
    }
    let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    getEmail.value = getEmail.value.trim()
    if (!regex.test(getEmail.value)) {
        getMsg[1].innerText = 'Email không hợp lệ'
    }
    else {
        getMsg[1].innerText = ''
    }
    let num = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    getPhone.value = getPhone.value.trim()
    if (!num.test(getPhone.value)) {
        getMsg[2].innerText = 'Số điện thoại không hợp lệ'
    }
    else {
        getMsg[2].innerText = ''
    }
    if (getPassword.value.length <= 4 && getPassword.value.length >= 1) {
        getMsg[3].innerText = 'Mật khẩu yếu'
    }
    else {
        if (getPassword.value.length == 0) {
            getMsg[3].innerText = 'Kiểm tra dữ liệu nhập vào'
        }
        else {
            getMsg[3].innerText = ''
        }
    }
    let getEmailValue = getEmail.value
    let getPhoneValue = getPhone.value
    let getNameValue = getName.value
    let getPasswordValue = getPassword.value
    console.log(getEmailValue, getNameValue, getPhoneValue, getPasswordValue)
    if (getMsg[0].innerText == '' && getMsg[1].innerText == '' && getMsg[2].innerText == '' && getMsg[3].innerText == '') {
        let toasts = {
            icon: '<i class="fa fa-check-circle"></i>',
            msg: 'Đăng ký thành công'
        }
        fetch('http://localhost:3000/api/v1/users/register', {
            method: 'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: getEmailValue, name: getNameValue, phone: getPhoneValue, password: getPasswordValue})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let toast = document.createElement('div')
                toast.className = `toast`
                toast.innerHTML = `
                    ${toasts.icon}
                    <span class="msg">${toasts.msg}</span>
                    <span class="countdown"></span>
                `
                getToastMessage.appendChild(toast)
                setTimeout(() => {
                    toast.style.animation = 'hide_slide 1s ease forwards'
                }, 2000)
                setTimeout(() => {
                    toast.remove()
                }, 3000)
                setTimeout(() => {
                    window.location.assign('./login.html')
                }, 4000)
            })
            .catch((errorMessage) => {
                console.error('Catch với tham số lỗi ' + errorMessage);
                return 456;
            })
    }
})
