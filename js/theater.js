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