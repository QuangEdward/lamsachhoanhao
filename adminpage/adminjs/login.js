let getSubmitForm = document.querySelector('.submit-form')
let getEmail = document.querySelector('#email')
let getPassword = document.querySelector('#password')
let getPassMessage = document.querySelector('.pass-msg')
let getEmailMessage = document.querySelector('.email-msg')
let getToastMessage = document.querySelector('#toast')
getSubmitForm.addEventListener('click', function() {
    let toasts = {
        icon: '<i class="fa fa-check-circle"></i>',
        msg: 'Đăng nhập thành công'
    }
    let getEmailValue = getEmail.value
    let getPasswordValue = getPassword.value
    fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: getEmailValue, password: getPasswordValue})
      }).then(res => res.json())
        .then(res => {
            console.log(res)
            let userInfo = {
                'gmail': res.user,
                'userToken': res.token,
                'nameOfUser': res.name
            }
            console.log(userInfo)
            localStorage.setItem('getUser', JSON.stringify(userInfo))
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
                }, 1000)
                setTimeout(() => {
                    toast.remove()
                }, 2000)
                setTimeout(() => {
                    window.location.assign('./user.html')
                }, 3000)
        })
        .catch((errorMessage) => {
            console.log(errorMessage)
            if(errorMessage.toString().includes("The user not found")) {
                getEmailMessage.innerText = 'Email không tồn tại'
                getPassMessage.innerText = ''
            }
            if(errorMessage.toString().includes("password is wrong")) {
                getPassMessage.innerText = 'Mật khẩu không chính xác'
            }
            return 456;
        })
})  
