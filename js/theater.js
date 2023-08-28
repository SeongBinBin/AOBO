const cgv = document.querySelector('.cgv')
const lotte = document.querySelector('.lotte')
const megabox = document.querySelector('.megabox')
const cgvbtn = document.querySelector('.cgv_btn')
const lottebtn = document.querySelector('.lotte_btn')
const megaboxbtn = document.querySelector('.megabox_btn')

cgvbtn.addEventListener('click', function(){
    lotte.classList.add('hide')
    megabox.classList.add('hide')
    cgv.classList.remove('hide')
})
lottebtn.addEventListener('click', function(){
    cgv.classList.add('hide')
    megabox.classList.add('hide')
    lotte.classList.remove('hide')
})
megaboxbtn.addEventListener('click', function(){
    cgv.classList.add('hide')
    lotte.classList.add('hide')
    megabox.classList.remove('hide')
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