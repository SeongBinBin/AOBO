// const { response } = require("express")

// 랜덤 대체 이미지 가져오기
fetch('https://picsum.photos/v2/list?page=2&limit=20')
    .then(response => response.json())
    .then(data => {
        const movieImgs = data.map(item => item.download_url)

        for(let i = 0; i < movieImgs.length; i++){
            changeImage(i, movieImgs[i])
        }
    })
function changeImage(indexNum, arrayNum) {
    const imageElement = document.getElementsByClassName('movie_img')[indexNum]
    if (imageElement){
      imageElement.src = arrayNum
    }
}

const API_KEY = '4780929b900d6e7e32787f2fc7dfac8e'  // api 키 값

// 오늘 날짜에서 하루를 뺀 날짜를 넣어주기
const today = new Date()
const yesterday = new Date(today.setDate(today.getDate() - 1))

const year = yesterday.getFullYear()
const month = String(yesterday.getMonth() + 1).padStart(2, '0')
const day = String(yesterday.getDate()).padStart(2, '0')
var formattedDate = `${year}${month}${day}`

const boxofficeDate = document.querySelector('.boxoffice_date')
boxofficeDate.innerHTML = `${year}년 ${month}월 ${day}일의 박스오피스`

// input에 오늘 날짜에 하루를 뺀 날짜까지만 선택 가능하게하기
const inputDate = document.querySelector('.select_date')
const dateMaxFormat = `${year}-${month}-${day}`
inputDate.setAttribute("max", dateMaxFormat)

// search 버튼 클릭하면 search.html로 넘어가기
const search = document.querySelector('.search')


function openSearch(){
    if (inputDate.value) {
        const searchUrl = `html/search.html?date=${inputDate.value}`
        window.location.href = searchUrl
    } else {
        alert("날짜를 선택해주세요.")
    }
}

search.addEventListener('click', openSearch)

// 영화 API에서 영화 이름 가져오기
fetch(`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${formattedDate}`)
    .then(response => response.json())
    .then(data => {
        movieCode = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.movieCd)
        movieTitle = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.movieNm)
        rank = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.rank)                 // 해당일자의 박스오피스 순위를 출력합니다.
        rankInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.rankInten)       // 전일대비 순위의 증감분을 출력합니다.
        openDt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.openDt)             // 영화의 개봉일을 출력합니다.
        audiCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiCnt)           // 해당일의 관객수를 출력합니다.
        audiInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiInten)       // 전일 대비 관객수 증감분을 출력합니다.
        audiChange = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiChange)     // 전일 대비 관객수 증감 비율을 출력합니다.
        audiAcc = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiAcc)           // 누적관객수를 출력합니다.
        salesAmt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesAmt)         // 해당일의 매출액을 출력합니다.
        salesShare = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesShare)     // 해당일자 상영작의 매출총액 대비 해당 영화의 매출비율을 출력합니다.
        salesInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesInten)     // 전일 대비 매출액 증감분을 출력합니다.
        salesChange = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesChange)   // 전일 대비 매출액 증감 비율을 출력합니다.
        salesAcc = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesAcc)         // 누적매출액을 출력합니다.
        scrnCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.scrnCnt)           // 해당일자에 상영한 스크린수를 출력합니다.
        showCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.showCnt)           // 해당일자에 상영된 횟수를 출력합니다.

        for(let i = 0; i < movieTitle.length; i++){
            changeText(i, 'movie_title', `${i + 1}위 | ${movieTitle[i]}`)
        }
    })
function changeText(index, className, content) {
    const textElement = document.getElementsByClassName(className)[index]
    if (textElement) {
        textElement.textContent = content
    }
}
function priceToString(price) {     // 3자리 숫자마다 콤마 넣어주기
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 아이템 클릭시 모달 창 팝업
const choseItem = document.querySelectorAll('.item')
const boxofficeInfo = document.querySelector('.boxoffice_info')
const infoClose = document.querySelector('.info_close')
const modalRank = document.querySelector('.rank')
const modalRankInten = document.querySelector('.rankInten')
const modalOpenDt = document.querySelector('.openDt')
const modalAudiCnt = document.querySelector('.audiCnt')
const modalAudiInten = document.querySelector('.audiInten')
const modalAudiChange = document.querySelector('.audiChange') //
const modalAudiAcc = document.querySelector('.audiAcc')
const modalSalesAmt = document.querySelector('.salesAmt')
const modalSalesShare = document.querySelector('.salesShare')
const modalSalesInten = document.querySelector('.salesInten')
const modalSalesChange = document.querySelector('.salesChange')
const modalSalesAcc = document.querySelector('.salesAcc')
const modalScrnCnt = document.querySelector('.scrnCnt')
const modalShowCnt = document.querySelector('.showCnt')
const boxofficeInfoName = document.querySelector('.boxoffice_info_name')

const hidemovieCode = document.querySelector('.hide_movie_code')

function popupModal(e) {
    const clickedIndex = Array.from(choseItem).indexOf(e.currentTarget)
    boxofficeInfo.classList.remove('hide')
    boxofficeInfo.classList.add('show')
    moveTop.classList.remove('show')
    moveTop.classList.add('cloaking')

    const MovieCode = movieCode[clickedIndex]; hidemovieCode.innerHTML = `${MovieCode}`
    const MovieTitle = movieTitle[clickedIndex]; boxofficeInfoName.innerHTML = `${year}년 ${month}월 ${day}일 '${MovieTitle}' 정보` 
    const MovieRank = rank[clickedIndex]; modalRank.innerHTML = `박스오피스 순위 | ${MovieRank}위`
    const MovieRankInten = rankInten[clickedIndex]; modalRankInten.innerHTML = `전일 대비 순위 변동 | ${MovieRankInten}`
    const MovieOpenDt = openDt[clickedIndex]; modalOpenDt.innerHTML = `개봉일 | ${MovieOpenDt}`
    const MovieAudiCnt = audiCnt[clickedIndex]; modalAudiCnt.innerHTML = `해당일의 관객수 | ${priceToString(MovieAudiCnt)}명`
    const MovieAudiInten = audiInten[clickedIndex]; modalAudiInten.innerHTML = `전일 대비 관객수 증감분 | ${priceToString(MovieAudiInten)}명`
    const MovieAudiChange = audiChange[clickedIndex]; modalAudiChange.innerHTML = `전일 대비 관객수 증감 비율 | ${MovieAudiChange}%`
    const MovieAudiAcc = audiAcc[clickedIndex]; modalAudiAcc.innerHTML = `누적 관객수 | ${priceToString(MovieAudiAcc)}명`
    const MovieSalesAmt = salesAmt[clickedIndex]; modalSalesAmt.innerHTML = `해당일의 매출액 | ${priceToString(MovieSalesAmt)}원`
    const MovieSalesShare = salesShare[clickedIndex]; modalSalesShare.innerHTML = `해당일자 모든 상영작의 매출총액 대비 매출비율 | ${priceToString(MovieSalesShare)}%`
    const MovieSalesInten = salesInten[clickedIndex]; modalSalesInten.innerHTML = `전일 대비 매출액 증감분 | ${priceToString(MovieSalesInten)}원`
    const MovieSalesChange = salesChange[clickedIndex]; modalSalesChange.innerHTML = `전일 대비 매출액 증감 비율 | ${MovieSalesChange}%`
    const MovieSalesAcc = salesAcc[clickedIndex]; modalSalesAcc.innerHTML = `누적 매출액 | ${priceToString(MovieSalesAcc)}원`
    const MovieScrnCnt = scrnCnt[clickedIndex]; modalScrnCnt.innerHTML = `해당일자에 상영한 스크린수 | ${priceToString(MovieScrnCnt)}관`
    const MovieShowCnt = showCnt[clickedIndex]; modalShowCnt.innerHTML = `해당일자에 상영된 횟수 | ${priceToString(MovieShowCnt)}회`

    let nextIndex = clickedIndex   // 클릭할때 index에 맞게 movieCode를 넣어주는 역할
    if (nextIndex !== 0) {
        nextIndex - 1
    }

    const getMovieCode = movieCode[nextIndex]

    // 영화 상세정보 API에서 영화정보 가져오기
    fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${API_KEY}&movieCd=${getMovieCode}`)
    .then(response => response.json())
    .then(data => {
        const movieInfo = data.movieInfoResult.movieInfo

        movieNm = movieInfo.movieNm
        showTm = movieInfo.showTm                                                  // 상영시간을 출력합니다.
        typeNm = movieInfo.typeNm                                                  // 영화유형명을 출력합니다.
        nationNm = movieInfo.nations[0].nationNm                                   // 제작국가를 나타냅니다.              
        genres = movieInfo.genres.map(genre => genre.genreNm)                      // 장르명을 출력합니다. 
        genreStr = genres.join(', ')
        directors = movieInfo.directors[0].peopleNm                                // 감독을 나타냅니다.         
        actors = movieInfo.actors.map(actor => actor.peopleNm)                     // 배우명을 출력합니다.         

        showTypes = movieInfo.showTypes.map(showType => showType.showTypeGroupNm) // 상영형태 구분을 출력합니다.
        const showTypesSet = new Set(showTypes)                                    // new Set을 사용해 중복 제거
        showTypesStr = [...showTypesSet].join(', ')                               

        companys = movieInfo.companys[0].companyNm                                 // 참여 영화사를 나타냅니다.
        audits = movieInfo.audits[0].watchGradeNm                                 // 심의정보를 나타냅니다.
        
        changeText(0, 'movieNm', `${movieNm}`)
        changeText(0, 'showTm', `상영 시간 | ${showTm}분`)
        changeText(0, 'typeNm', `영화 유형 | ${typeNm}`)
        changeText(0, 'nationNm', `제작 국가 | ${nationNm}`)
        changeText(0, 'genreStr', `장르 | ${genreStr}`)
        changeText(0, 'directors', `감독 | ${directors}`)
        changeText(0, 'showTypesStr', `상영 형태 | ${showTypesStr}`)
        changeText(0, 'companys', `영화사 | ${companys}`)
        changeText(0, 'audits', `심의 정보 | ${audits}`)

        const actorsContainer = document.querySelector('.actors_container')
        actorsContainer.innerHTML = ''

        if(actors.length === 0){
            const actorsList = document.createElement('li')
            actorsList.className = 'actors' 
            const actorsTitle = document.createElement('p')
            actorsTitle.textContent = '출연 배우 | 출연 배우 정보가 없습니다.'
            actorsList.appendChild(actorsTitle)
            actorsContainer.appendChild(actorsList)
        }else{
            const actorsList = document.createElement('li')
            actorsList.className = 'actors' 
            const actorsTitle = document.createElement('p')
            const actorsTitle2 = document.createElement('p')
            actorsTitle.textContent = '출연 배우'
            actorsTitle2.textContent = '--------------'
            actorsList.appendChild(actorsTitle)
            actorsList.appendChild(actorsTitle2)
            for (let i = 0; i < Math.min(5, actors.length); i++) {
                const actorElement = document.createElement('p')
                actorElement.textContent = actors[i]
                actorsList.appendChild(actorElement)
            }   
            actorsContainer.appendChild(actorsList)
        }
    })
}

for(let item of choseItem){
    item.addEventListener('click', popupModal)
}

infoClose.addEventListener('click', function(){
    boxofficeInfo.classList.remove('show')
    boxofficeInfo.classList.add('hide')
    moveTop.classList.remove('cloaking')
    moveTop.classList.add('show')
})



// 영화 상세정보 모달
const moreModal = document.querySelector('.more_Modal')
const moreInfo = document.querySelector('.more_info')
const moreModalClose = document.querySelector('.more_close')
const goBack = document.querySelector('.go_back')

const modalShowTm = document.querySelector('.showTm')
const modalTypeNm = document.querySelector('.typeNm')
const modalNationNm = document.querySelector('.nationNm')
const modalGenreStr = document.querySelector('.genreStr')
const modalDirectors = document.querySelector('.directors')
const modalActors = document.querySelector('.actors')
const modalShowTypesStr = document.querySelector('.showTypesStr')
const modalCompanys = document.querySelector('.companys')
const modalAudits = document.querySelector('.audits')

moreInfo.addEventListener('click', function(){
    boxofficeInfo.classList.remove('show')
    boxofficeInfo.classList.add('hide')

    moreModal.classList.remove('hide')
    moreModal.classList.add('show')
})

moreModalClose.addEventListener('click', function(){
    moreModal.classList.remove('show')
    moreModal.classList.add('hide')
    document.body.style.overflow = ''
})

goBack.addEventListener('click', function(){
    moreModal.classList.remove('show')
    moreModal.classList.add('hide')

    boxofficeInfo.classList.remove('hide')
    boxofficeInfo.classList.add('show')
})

// 새로고침 시 스크롤을 맨 위로
window.onload = function(){
    setTimeout(function(){
        scrollTo(0, 0)
    }, 100)
}

// 윗 화살표 클릭시 맨 위로
const moveTop = document.querySelector('.go_up')

function gotoTop(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
moveTop.addEventListener('click', gotoTop)

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
signupButton.addEventListener('click', function(){
    if(signupPassword.value !== passwordCheck.value){
        alert('비밀번호가 일치하지않습니다.')
    }else{
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: signupId.value,
                email: signupEmail.value,
                password: signupPassword.value,
            })
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

// 중복확인
const idCheck = document.querySelector('.id_check')

idCheck.addEventListener('click', function(){
    fetch('http://localhost:5000/api/users/idcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: signupId.value
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