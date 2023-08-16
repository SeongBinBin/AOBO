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

// 오늘 날짜에서 하루를 뺀 날짜를 넣어주기
const today = new Date()
const yesterday = new Date(today.setDate(today.getDate() - 1))

const year = yesterday.getFullYear()
const month = String(yesterday.getMonth() + 1).padStart(2, '0')
const day = String(yesterday.getDate()).padStart(2, '0')
const formattedDate = `${year}${month}${day}`

const boxofficeDate = document.querySelector('.boxoffice_date')
boxofficeDate.innerHTML = `${year}년 ${month}월 ${day}일의 박스오피스`

// 영화 API에서 영화 이름 가져오기
fetch(`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=4780929b900d6e7e32787f2fc7dfac8e&targetDt=${formattedDate}`)
    .then(response => response.json())
    .then(data => {
        const movieCode = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.movieCd)

        const movieTitle = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.movieNm)
        const rank = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.rank)                 // 해당일자의 박스오피스 순위를 출력합니다.
        const rankInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.rankInten)       // 전일대비 순위의 증감분을 출력합니다.
        const openDt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.openDt)             // 영화의 개봉일을 출력합니다.
        const audiCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiCnt)           // 해당일의 관객수를 출력합니다.
        const audiInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiInten)       // 전일 대비 관객수 증감분을 출력합니다.
        const audiChange = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiChange)     // 전일 대비 관객수 증감 비율을 출력합니다.
        const audiAcc = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.audiAcc)           // 누적관객수를 출력합니다.
        const salesAmt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesAmt)         // 해당일의 매출액을 출력합니다.
        const salesShare = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesShare)     // 해당일자 상영작의 매출총액 대비 해당 영화의 매출비율을 출력합니다.
        const salesInten = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesInten)     // 전일 대비 매출액 증감분을 출력합니다.
        const salesChange = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesChange)   // 전일 대비 매출액 증감 비율을 출력합니다.
        const salesAcc = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.salesAcc)         // 누적매출액을 출력합니다.
        const scrnCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.scrnCnt)           // 해당일자에 상영한 스크린수를 출력합니다.
        const showCnt = data.boxOfficeResult.dailyBoxOfficeList.map(item => item.showCnt)           // 해당일자에 상영된 횟수를 출력합니다.
        const boxofficeInfoName = document.querySelector('.boxoffice_info_name')

        for(let i = 0; i < movieTitle.length; i++){
            boxofficeInfoName.innerHTML = `${year}년 ${month}월 ${day}일 ${movieTitle[i-9]}의 정보`
            changeText(i, 'movie_title', `${i + 1}위 / ${movieTitle[i]}`);
            changeText(i, 'rank', `박스오피스 순위 - ${rank[i]}위`);
            changeText(i, 'rankInten', `전일 대비 순위 변동 - ${rankInten[i]}`);
            changeText(i, 'openDt', `개봉일 - ${openDt[i]}`);
            changeText(i, 'audiCnt', `해당일의 관객수 - ${priceToString(audiCnt[i])}명`);
            changeText(i, 'audiInten', `전일 대비 관객수 증감분 - ${priceToString(audiInten[i])}명`);
            changeText(i, 'audiChange', `전일 대비 관객수 증감 비율 - ${audiChange[i]}%`);
            changeText(i, 'audiAcc', `누적 관객수 - ${priceToString(audiAcc[i])}명`);
            changeText(i, 'salesAmt', `해당일의 매출액 - ${priceToString(salesAmt[i])}원`);
            changeText(i, 'salesShare', `해당일자 모든 상영작의 매출총액 대비 매출비율 - ${salesShare[i]}%`);
            changeText(i, 'salesInten', `전일 대비 매출액 증감분 - ${priceToString(salesInten[i])}원`);
            changeText(i, 'salesChange', `전일 대비 매출액 증감 비율 - ${salesChange[i]}%`);
            changeText(i, 'salesAcc', `누적 매출액 - ${priceToString(salesAcc[i])}원`);
            changeText(i, 'scrnCnt', `해당일자에 상영한 스크린수 - ${priceToString(scrnCnt[i])}개`);
            changeText(i, 'showCnt', `해당일자에 상영된 횟수 - ${priceToString(showCnt[i])}회`);
        }
    })
function changeText(index, className, content) {
    const textElement = document.getElementsByClassName(className)[index];
    if (textElement) {
        textElement.textContent = content;
    }
}
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 아이템 클릭시 모달 창 팝업
const choseItem = document.querySelectorAll('.item')
const boxofficeInfo = document.querySelector('.boxoffice_info')
const infoClose = document.querySelector('.info_close')

function popupModal(){
    boxofficeInfo.classList.add('show')
}
for(let item of choseItem){
    item.addEventListener('click', popupModal)
}

function closeModal(){
    boxofficeInfo.classList.remove('show')
    boxofficeInfo.classList.add('hide')
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