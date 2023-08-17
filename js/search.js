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
var today = new Date()
var yesterday = new Date(today.setDate(today.getDate() - 1))

var year = yesterday.getFullYear()
var month = String(yesterday.getMonth() + 1).padStart(2, '0')
var day = String(yesterday.getDate()).padStart(2, '0')
var formattedDate = `${year}${month}${day}`


// input에 오늘 날짜에 하루를 뺀 날짜까지만 선택 가능하게하기
const inputDate = document.querySelector('.select_date')
const dateMaxFormat = `${year}-${month}-${day}`
inputDate.setAttribute("max", dateMaxFormat)

// index.html의 input값이 search.html의 input값으로 넘어옴
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dateParam = urlParams.get('date');

if (dateParam) {
    const inputDate = document.querySelector('.select_date');
    inputDate.value = dateParam;
}

// input에서 날짜값 가져오기
const search = document.querySelector('.search')
const boxofficeDate = document.querySelector('.boxoffice_date')
function updateFormattedDate(){
    formattedDate = inputDate.value.replaceAll("-", "")
    console.log(formattedDate)

    var searchYear = formattedDate.substring(0, 4)
    var searchMonth = formattedDate.substring(4, 6)
    var searchDay = formattedDate.substring(6, 8)
    boxofficeDate.innerHTML = `${searchYear}년 ${searchMonth}월 ${searchDay}일의 박스오피스`
    fetchBoxOfficeData()
}
search.addEventListener('click', updateFormattedDate)
window.onload = updateFormattedDate()   // 페이지 로드 시 함수 실행 (index.html에서 가져온 값으로 결과를 바로 보여줌)

// 영화 API에서 영화 이름 가져오기
function fetchBoxOfficeData(){
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
}
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
    boxofficeInfo.classList.add('show')
    document.body.style.overflow = 'hidden'

    const MovieCode = movieCode[clickedIndex]; hidemovieCode.innerHTML = `${MovieCode}`
    const MovieTitle = movieTitle[clickedIndex]; boxofficeInfoName.innerHTML = `${formattedDate.substring(0, 4)}년 ${formattedDate.substring(4, 6)}월 ${formattedDate.substring(6, 8)}일 '${MovieTitle}' 정보` 
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
}

for(let item of choseItem){
    item.addEventListener('click', popupModal)
}

function closeModal(){
    boxofficeInfo.classList.remove('show')
    boxofficeInfo.classList.add('hide')
    document.body.style.overflow = ''
}
infoClose.addEventListener('click', closeModal)


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