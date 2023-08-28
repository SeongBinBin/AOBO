const cgv = document.querySelector('.cgv')
const lotte = document.querySelector('.lotte')
const megabox = document.querySelector('.megabox')
const cgvBtn = document.querySelector('.cgv_btn')
const lotteBtn = document.querySelector('.lotte_btn')
const megaboxBtn = document.querySelector('.megabox_btn')

function toggleActivate(button) {
    if (button.classList.contains('activate')) {
      button.classList.remove('activate')
    } else {
      button.classList.add('activate')
    }
}
function toggleHide(table) {
    if (table.classList.contains('hide')) {
      table.classList.remove('hide')
    } else {
      table.classList.add('hide')
    }
}
  
cgvBtn.addEventListener('click', function() {
    toggleActivate(cgvBtn)
    toggleHide(cgv)
    lotteBtn.classList.remove('activate'); megaboxBtn.classList.remove('activate')
    lotte.classList.add('hide'); megabox.classList.add('hide')
})
lotteBtn.addEventListener('click', function() {
    toggleActivate(lotteBtn)
    toggleHide(lotte)
    cgvBtn.classList.remove('activate'); megaboxBtn.classList.remove('activate')
    cgv.classList.add('hide'); megabox.classList.add('hide')
})
megaboxBtn.addEventListener('click', function() {
    toggleActivate(megaboxBtn)
    toggleHide(megabox)
    cgvBtn.classList.remove('activate'); lotteBtn.classList.remove('activate')
    cgv.classList.add('hide'); lotte.classList.add('hide')
})

// 새로고침 시 스크롤을 맨 위로
window.onload = function(){
    setTimeout(function(){
        scrollTo(0, 0)
    }, 100)
}

// 가로 스크롤 움직이기
const scrollContainers = document.querySelectorAll('.table')
const specialTheater = document.querySelectorAll('.special_theater_type')
let isDown = false // 플래그 : 현재 마우스 클릭여부 판단
let startX // 마우스 클릭시 마우스의 x 좌표 
let scrollLeft // 최근 스크롤바 위치 저장

scrollContainers.forEach(scrollContainer => {
    scrollContainer.addEventListener('mousedown', e => {
        isDown = true
        scrollContainer.classList.add('active')
        // 컨테이너 기준 클릭한 마우스의 x 좌표
        startX = e.pageX - scrollContainer.offsetLeft
        // 현재 스크롤바 위치 저장
        scrollLeft = scrollContainer.scrollLeft
      })
      
      function deactive(){
        isDown = false
        scrollContainer.classList.remove('active')
      }
      scrollContainer.addEventListener('mouseleave', deactive)
      scrollContainer.addEventListener('mouseup', deactive)
      
      scrollContainer.addEventListener('mousemove', e => {
        if(!isDown) return
        e.preventDefault()
        // 마우스를 드래그할 때 현재 마우스의 x좌표
        const x = e.pageX - scrollContainer.offsetLeft
        // 마우스 드래그 지점에서 이전에 마우스 클릭지점까지 이동한 거리
        const walk = x - startX
        // 최근 스크롤바 위치에서 마우스 이동거리만큼 더하거나 빼줌
        scrollContainer.scrollLeft = scrollLeft - walk
      })
})

specialTheater.forEach(scrollContainer => {
    scrollContainer.addEventListener('mousedown', e => {
        isDown = true
        scrollContainer.classList.add('active')
        // 컨테이너 기준 클릭한 마우스의 x 좌표
        startX = e.pageX - scrollContainer.offsetLeft
        // 현재 스크롤바 위치 저장
        scrollLeft = scrollContainer.scrollLeft
      })
      
      function deactive(){
        isDown = false
        scrollContainer.classList.remove('active')
      }
      scrollContainer.addEventListener('mouseleave', deactive)
      scrollContainer.addEventListener('mouseup', deactive)
      
      scrollContainer.addEventListener('mousemove', e => {
        if(!isDown) return
        e.preventDefault()
        // 마우스를 드래그할 때 현재 마우스의 x좌표
        const x = e.pageX - scrollContainer.offsetLeft
        // 마우스 드래그 지점에서 이전에 마우스 클릭지점까지 이동한 거리
        const walk = x - startX
        // 최근 스크롤바 위치에서 마우스 이동거리만큼 더하거나 빼줌
        scrollContainer.scrollLeft = scrollLeft - walk
      })
})

// 로그인 관련
// 헤더 아이콘 클릭 시 로그인 및 추가 정보 팝업
const headerPopup = document.querySelector('.header_popup')
const popupList = document.querySelector('.popup_list')
const popupClose = document.querySelector('.popup_close')

headerPopup.addEventListener('click', function(){
    headerPopup.classList.add('cloaking')
    popupList.classList.remove('hide')
    popupList.classList.add('show')
})
popupClose.addEventListener('click', function(){
    headerPopup.classList.remove('cloaking')
    popupList.classList.remove('show')
    popupList.classList.add('hide')
})

// 회원가입
const signupButton = document.querySelector('.signup_submit')
const signupId = document.querySelector('.signup_id')
const signupEmail = document.querySelector('.signup_email')
const signupPassword = document.querySelector('.signup_password')
const passwordCheck = document.querySelector('.password_check')
const signupInputs = document.querySelectorAll('.input_signup input')

signupButton.addEventListener('click', function(){
    
    if(signupPassword.value.length < 3){
        alert('비밀번호는 3글자 이상 입력해야합니다.')
    }else if(signupPassword.value !== passwordCheck.value){
        alert('비밀번호가 일치하지않습니다.')
    }else if(signupEmail.value.indexOf('@') === -1){
        alert('이메일 형식을 지켜주세요.')
    }else{
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: signupId.value,
                email: signupEmail.value,
                password: signupPassword.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 200){
                alert('회원가입에 성공했습니다.')
                popupSignup.classList.remove('show')
                for(let input of signupInputs){ // 회원가입 성공 후 input 비워주기
                    input.value = null
                }
            }
        })
    }
})

// SIGN UP 버튼 클릭시 회원가입 창 표시
const signupBtn = document.querySelector('.signup_btn')
const popupSignup = document.querySelector('.popup_signup')
const signupClose = document.querySelector('.signup_close')

signupBtn.addEventListener('click', function(){
    popupSignup.classList.add('show')
})

signupClose.addEventListener('click', function(){
    popupSignup.classList.remove('show')
})

// ID중복확인
const idCheck = document.querySelector('.id_check')

idCheck.addEventListener('click', function(){
    fetch('http://localhost:5000/api/users/idcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: signupId.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 409){
                alert('사용 불가능한 ID입니다.')
            }else if(data.code === 200){
                alert('사용 가능한 ID입니다.')
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
})

// 로그인
const loginBtn = document.querySelector('.login_btn')
const loginId = document.querySelector('.login_id')
const loginPw = document.querySelector('.login_pw')
const inputLogin = document.querySelector('.input_login')
const loginResult = document.querySelector('.login_result')
const loginResultId = document.querySelector('.login_resultId')

loginBtn.addEventListener('click', function(){
    fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: loginId.value,
                password: loginPw.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 401){
                alert('회원정보가 일치하지 않습니다.')
                loginId.value = null
                loginPw.value = null
            }else if(data.code === 200){
                alert('로그인에 성공했습니다.')
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('personalId', loginId.value)
                localStorage.setItem('token', data.token)
                location.reload(true)

                inputLogin.classList.add('hide')
                loginResult.classList.remove('hide')
                loginResultId.innerHTML = `${loginId.value}님`
                loginId.value = null
                loginPw.value = null
            }
        })
})

const isLoggedIn = localStorage.getItem('loggedIn')
console.log(isLoggedIn)

window.onload = function() {    // 새로 고침해도 로그인 정보 유지
    if (isLoggedIn === 'true') {
        const personalId = localStorage.getItem('personalId')
        inputLogin.classList.add('hide')
        loginResult.classList.remove('hide')
        loginResultId.innerHTML = `${personalId}님`
    }
}

// 로그아웃
const logoutBtn = document.querySelector('.logout_btn')

logoutBtn.addEventListener('click', function(){
    alert('로그아웃 되었습니다.')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('personalId')
    localStorage.removeItem('token')
    location.reload(true)

    inputLogin.classList.remove('hide')
    loginResult.classList.add('hide')
})

// 정보수정 버튼 클릭시 팝업
const updateBtn = document.querySelector('.update_btn')
const popupUpdate = document.querySelector('.popup_update')
const updateClose = document.querySelector('.update_close')

updateBtn.addEventListener('click', function(){
    popupUpdate.classList.add('show')
})

updateClose.addEventListener('click', function(){
    popupUpdate.classList.remove('show')
})

// 정보 수정 
const updateSubmit = document.querySelector('.update_submit')
const updateEmail = document.querySelector('.update_email')
const updatePassword = document.querySelector('.update_password')
const updatePasswordCheck = document.querySelector('.update_password_check')

updateSubmit.addEventListener('click', function(){
    const loggedInUserId = localStorage.getItem('personalId')

    if (updatePassword.value.length < 3){
        alert('비밀번호는 3글자 이상 입력해야합니다.')
    }else if(updatePassword.value !== updatePasswordCheck.value){
        alert('비밀번호가 일치하지않습니다.')
    }else{
        fetch(`http://localhost:5000/api/users/${loggedInUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: updateEmail.value,
                password: updatePassword.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 200){
                alert(`정보가 업데이트되었습니다.\n다시 로그인 해주세요.`)

                localStorage.removeItem('loggedIn')
                localStorage.removeItem('personalId')
                localStorage.removeItem('token')
                location.reload(true)

                updateEmail.value = null
                updatePassword.value = null
                updatePasswordCheck.value = null
            }
        })
    }
})