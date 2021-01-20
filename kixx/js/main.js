/***************************** .header ******************************/

var btnHamburger = document.querySelector('.header__btn-hamburger'); // 햄버거 버튼(전체메뉴 버튼)
var allMenuWrap = document.querySelector('.all-menu-wrap'); // 전체메뉴 최상위 요소
var allMenu_1depth = allMenuWrap.querySelectorAll('.all-menu__1depth-text'); // 전체메뉴 1depth a요소
var allMenu_btnClose = allMenuWrap.querySelector('.all-menu__btn-close'); // 전체메뉴 닫기버튼 요소

btnHamburger.addEventListener('click', function () {

  allMenuWrap.classList.add('active'); // 전체메뉴 최상위 요소에 active라는 class를 추가하여 전체메뉴가 보이도록 한다.

  allMenu_btnClose.addEventListener('click', function () {
    allMenuWrap.classList.remove('active'); // 전체메뉴 최상위 요소에 active라는 class를 제거하여 전체메뉴가 안보이도록 한다.
  });
});

// 반응형 구간에서 전체메뉴 1depth a요소 클릭시 아코디언 형태로 보여지게 하기
for (var i = 0; i < allMenu_1depth.length; i++) {

  allMenu_1depth[i].addEventListener('click', function (e) {

    e.preventDefault(); // a요소가 기본적으로 가지고 있는 기능을 막는다.(클릭시 href때문에 화면이 새로고침 되는것을 막는다.)
    var accordionTarget = this.nextElementSibling.className; // this의 nextElementSibling은 all-menu__2depth-list라는 요소이다.

    for (var i = 0; i < allMenu_1depth.length; i++) {
      allMenu_1depth[i].nextElementSibling.classList.remove('active'); // 모든 allMenu_1depth의 다음형제요소( .all-menu__2depth-list )의 active class를 제거하여 2depth 메뉴가 안보이도록 한다.
      allMenu_1depth[i].classList.remove('active'); // 모든 allMenu_1depth의 active class를 제거하여 열림모양의 화살표를 닫힘모양의 화살표로 바꾼다.
    }

    if (accordionTarget == 'all-menu__2depth-list') { // 이 조건문은 all-menu__2depth-list에 "active class가 없을때" 라고 생각해 주세요.
      this.nextElementSibling.classList.add('active'); // 클릭된 allMenu_1depth의 다음형제요소( .all-menu__2depth-list )의 active class를 추가하여 2depth 메뉴가 보이도록 한다.
      this.classList.add('active');// 클릭된 allMenu_1depth의 active class를 제거하여 열림모양의 화살표를 닫힘모양의 화살표로 바꾼다.
    }
  });
}

// 전체메뉴 바깥영역 클릭시 전체메뉴 닫히게 하기
window.addEventListener('click', function (e) {
  if (e.target == allMenuWrap) { // 윈도우를 클릭했을때 클릭된 영역이 allMenuWrap 이라면 allMenuWrap의 active class를 제거한다. 
    allMenuWrap.classList.remove('active');
  }
});
/***************************** .intro ******************************/

var intro_btnPrev = document.querySelector('.intro__btn-prev'); // 이전버튼
var intro_btnNext = document.querySelector('.intro__btn-next'); // 다음버튼
var intro_slideWrap = document.querySelector('.intro__slide-wrap') // 슬라이드 아이템들의 최상위 부모요소
var intro_slideList = document.querySelector('.intro__slide-list'); // 슬라이드 아이템들의 부모요소
var intro_slideItem = intro_slideList.querySelectorAll('.intro__slide-item'); // 슬라이드 아이템
var intro_button = document.querySelectorAll('.intro button'); // .intro에 있는 모든 버튼
var intro_progress = document.querySelector('.intro__progress'); // 상태진행 바
var intro_slideLength = intro_slideItem.length; // 슬라이드 아이템들의 개수
var intro_slideWidth = intro_slideItem[0].offsetWidth; // 슬라이드 아이템의 너비
var intro_slideCurrentIndex = 0; // 슬라이드의 순번
var intro_slideSpeed = 300; // 슬라이드 이동하는 속도
var intro_playing = true; // autoplay버튼 클릭시 사용할 toggle용도의 변수

// 뷰포트에 따라 슬라이드 아이템의 너비값를 저장
window.addEventListener('resize', function () {
  intro_slideWidth = intro_slideItem[0].offsetWidth;
});

// 첫번째 슬라이드와 마지막번째 슬라이드
var intro_firstChild = intro_slideList.firstElementChild;
var intro_lastChild = intro_slideList.lastElementChild;

// 첫번째 슬라이드와 마지막번째 슬라이드 복제 
var intro_clonedFirst = intro_firstChild.cloneNode(true);
var intro_clonedLast = intro_lastChild.cloneNode(true);

// 첫번째 복제 슬라이드는 맨뒤에 추가하고 마지막번째 복제 슬라이드는 첫번째 원본 슬라이드 앞에 추가
intro_slideList.appendChild(intro_clonedFirst);
intro_slideList.insertBefore(intro_clonedLast, intro_slideList.firstElementChild);

// intro_slideList의 시작위치 지정 (첫번째 슬라이드 앞에 마지막번째 슬라이드를 복제한 슬라이드가 있기때문에 translate를 지정하지 않으면 시작위치는 마지막번째 슬라이드를 복제한 슬라이드가 된다. 시작위치에는 첫번째 슬라이드가 있어야 되기 때문에 아래처럼 translate를 적용해야 한다.)
intro_slideList.style.transform = 'translateX(-' + intro_slideWidth + 'px)';

// 상태진행 바 너비 지정
intro_progress.style.width = 100 / intro_slideLength + '%';

// 다음 슬라이드로 이동 + 현재 슬라이드 순번에 맞게 index 지정 + 상태진행 바 이동하는 함수
function intro_nextSlide() {
  if (intro_slideCurrentIndex < intro_slideLength) {
    intro_slideList.style.transition = intro_slideSpeed + 'ms';
    intro_slideList.style.transform = 'translateX(-' + (intro_slideWidth * (intro_slideCurrentIndex + 2)) + 'px)';
  }
  if (intro_slideCurrentIndex === intro_slideLength - 1) {
    setTimeout(function () {
      intro_slideList.style.transition = "0ms";
      intro_slideList.style.transform = 'translateX(-' + intro_slideWidth + 'px)';
    }, intro_slideSpeed);

    intro_slideCurrentIndex = -1;
  }

  intro_slideCurrentIndex++;

  document.querySelector('.intro__current-index').textContent = intro_slideCurrentIndex + 1;

  intro_progress.style.transform = 'translate(' + (100 * intro_slideCurrentIndex) + '%)';
  intro_progress.style.transition = intro_slideSpeed + 'ms';

}

// 이전 슬라이드로 이동 + 현재 슬라이드 순번에 맞게 index 지정 + 상태진행 바 이동하는 함수
function intro_prevSlide() {
  if (intro_slideCurrentIndex >= 0) {
    intro_slideList.style.transition = intro_slideSpeed + 'ms';
    intro_slideList.style.transform = 'translateX(-' + (intro_slideWidth * intro_slideCurrentIndex) + 'px)';
  }
  if (intro_slideCurrentIndex === 0) {
    setTimeout(function () {
      intro_slideList.style.transition = "0ms";
      intro_slideList.style.transform = 'translateX(-' + (intro_slideWidth * intro_slideLength) + 'px)';
    }, intro_slideSpeed);

    intro_slideCurrentIndex = intro_slideLength;
  }

  intro_slideCurrentIndex--;

  document.querySelector('.intro__current-index').textContent = intro_slideCurrentIndex + 1;

  intro_progress.style.transform = 'translate(' + (100 * intro_slideCurrentIndex) + '%)';
  intro_progress.style.transition = intro_slideSpeed + 'ms';
}

// 3초마다 다음 슬라이드로 이동하는 오토 슬라이드
var intro_autoSlide = setInterval(intro_nextSlide, 3000);

// .intro에 있는 버튼들을 클릭했을때 각 버튼마다 할 일
for (var i = 0; i < intro_button.length; i++) {
  intro_button[i].addEventListener('click', function () {
    // prev버튼 클릭시
    if (this.classList == 'intro__btn-prev') {
      intro_prevSlide();
    }

    // next버튼 클릭시
    if (this.classList == 'intro__btn-next') {
      intro_nextSlide();
    }

    // autoplay버튼 클릭시
    if (this.classList == 'intro__auto-play') {
      var intro_autoPlay = this;

      // 일시정지 버튼 눌렀을때 함수
      function pauseAutoSlide() {
        clearInterval(intro_autoSlide);
        intro_autoPlay.firstElementChild.setAttribute('src', 'images/btn_pause.svg');
        intro_playing = false;
      }

      // 재생 버튼 눌렀을때 함수
      function startAutoSlide() {
        intro_autoSlide = setInterval(intro_nextSlide, 3000);
        intro_autoPlay.firstElementChild.setAttribute('src', 'images/btn_play.svg');
        intro_playing = true;
      }

      if (intro_playing) {
        pauseAutoSlide();
      } else {
        startAutoSlide();
      }
    }
  });
}

/***************************** .favorite ******************************/

var favorite_slideWrap = document.querySelector('.favorite__list-wrap'); // 드래그와 터치이벤트를 받을 요소
var favorite_slideList = document.querySelector('.favorite__list'); // 드래그와 터치이벤트를 받을 요소의 자식
var moving = false;
var startPageX = 0;
var lastPageX = 0;
var transform = 0;
var transformValue = 0;

var gestureStart = function (e) {
  moving = true;
  startPageX = e.pageX; // 포인터가 눌렸을때 전체문서를 기준으로 하여 X좌표의 값을 변수에 저장
  var transformMatrix = window.getComputedStyle(favorite_slideList).getPropertyValue('transform'); // favorite_slideList의 transform값을 변수에 저장
  if (transformMatrix !== 'none') { // transformMatrix에 저장된 transform값이 none이 아니라면 즉, 값이 있다면
    transform = parseInt(transformMatrix.split(',')[4].trim()); // transformMatrix에는 몇개의 배열이 저장되어 있는데 그 중 4번째 배열이 translateX좌표에 해당한다. 이 4번째 배열에 있는 공백을 trim메서드를 사용하여 제거한 후 parseInt메서드를 사용하여 문자열을 정수로 바꿔준다. 
  }
}

var gestureMove = function (e) {
  if (moving) { // moving이 참이면 즉, true값이 저장되어 있다면
    var diffrent = e.pageX - startPageX; // 드래그 또는 터치가 되는 X좌표값에서 드래그 또는 터치가 시작됐던 X좌표값을 빼서 그 값을 변수에 저장

    if (e.pageX - lastPageX > 0) { // 드래그 또는 터치가 이동할때의 X좌표값에서 lastPageX 값을 뺀 값이 0보다 클때
      if (transformValue > 0) {
        return;
      }
    } else { // 드래그 또는 터치가 이동할때의 X좌표값에서 lastPageX 값을 뺀 값이 0보다 작을때
      if (Math.abs(transformValue) > favorite_slideList.offsetWidth - favorite_slideWrap.offsetWidth) {
        return;
      }
    }
    transformValue = transform + diffrent;
    favorite_slideList.style.transform = 'translateX(' + transformValue + 'px';
  }
  lastPageX = e.pageX; // 최종적으로 이동된 드래그 또는 터치의 X좌표값을 변수에 저장
}

var gestureEnd = function (e) {
  moving = false;
}

if (window.PointerEvent) {
  favorite_slideList.addEventListener('pointerdown', gestureStart);
  favorite_slideList.addEventListener('pointermove', gestureMove);
  favorite_slideList.addEventListener('pointerup', gestureEnd);
} else if (window.MSPointerEvent) { // ie10 호환성을 위한 접두사 (실제로 ie10에서 테스트를 해보니 없어도 문제없이 동작하지만 혹시 모르기 때문에 넣어둠)
  favorite_slideList.addEventListener('MSPointerDown', gestureStart);
  favorite_slideList.addEventListener('MSPointerMove', gestureMove);
  favorite_slideList.addEventListener('MSPointerUp', gestureEnd);
}

/***************************** .recommend ******************************/

var recommend_btnPrev = document.querySelector('.recommend__btn-prev'); // 이전버튼
var recommend_btnNext = document.querySelector('.recommend__btn-next'); // 다음버튼
var recommend_slideList = document.querySelector('.recommend__slide-list'); // 슬라이드 아이템들의 부모요소
var recommend_slideItem = recommend_slideList.querySelectorAll('.recommend__slide-item'); // 슬라이드 아이템 요소
var recommend_slideWidth = recommend_slideItem[0].offsetWidth + 30; // 슬라이드 아이템의 너비
var recommend_slideCurrentIndex = 0; // 현재 슬라이드의 순번
var recommend_slideSpeed = 400; // 슬라이드 이동하는 속도
var recommend_progressWidth = 100 / recommend_slideItem.length + '%'; // 상태진행 바 너비를 변수에 저장
document.querySelector('.recommend__progress').style.width = recommend_progressWidth; // 상태진행 바 너비 지정
document.querySelector('.recommend__total-index').textContent = recommend_slideItem.length;
var recommend_button = document.querySelectorAll('.recommend button'); // .recommend에 있는 모든 버튼
var recommend_playing = true; // autoplay버튼 클릭시 사용할 toggle용도의 변수

// 다음 슬라이드로 이동 + 현재 슬라이드 순번에 맞게 index 지정 + 상태진행 바 이동하는 함수
function recommend_nextSlide() {

  if (recommend_slideCurrentIndex < recommend_slideItem.length - 3) {

    recommend_slideList.style.transform = 'translateX(-' + (recommend_slideWidth * (recommend_slideCurrentIndex + 1)) + 'px)';
    recommend_slideList.style.transition = recommend_slideSpeed + 'ms';
  }
  if (recommend_slideCurrentIndex === recommend_slideItem.length - 3) {

    recommend_slideList.style.transform = 'translateX(-' + (recommend_slideWidth * 0) + 'px)';
    recommend_slideList.style.transition = recommend_slideSpeed + 'ms';
    recommend_slideCurrentIndex = -1;
  }

  document.querySelector('.recommend__current-index').textContent = (recommend_slideCurrentIndex + 1) + 1;

  recommend_slideCurrentIndex++;

  document.querySelector('.recommend__progress').style.transform = 'translateX(' + (100 * recommend_slideCurrentIndex) + '%)';
  document.querySelector('.recommend__progress').style.transition = recommend_slideSpeed + 'ms';
}

// 이전 슬라이드로 이동 + 현재 슬라이드 순번에 맞게 index 지정 + 상태진행 바 이동하는 함수
function recommend_prevSlide() {

  if (recommend_slideCurrentIndex > 0) {
    recommend_slideList.style.transform = 'translateX(-' + (recommend_slideWidth * (recommend_slideCurrentIndex - 1)) + 'px)';
    recommend_slideList.style.transition = recommend_slideSpeed + 'ms';

    document.querySelector('.recommend__current-index').textContent = (recommend_slideCurrentIndex + 1) - 1;

    recommend_slideCurrentIndex--;

    document.querySelector('.recommend__progress').style.transform = 'translateX(' + (100 * recommend_slideCurrentIndex) + '%)';
    document.querySelector('.recommend__progress').style.transition = recommend_slideSpeed + 'ms';
  }
}

// 3초마다 다음 슬라이드로 이동하는 오토 슬라이드
var recommend_autoSlide = setInterval(recommend_nextSlide, 3000);

// .recommend에 있는 버튼들을 클릭했을때 각 버튼마다 할 일
for (var i = 0; i < recommend_button.length; i++) {
  recommend_button[i].addEventListener('click', function () {
    // prev버튼 클릭시
    if (this.classList == 'recommend__btn-prev') {
      recommend_prevSlide();
    }

    // next버튼 클릭시
    if (this.classList == 'recommend__btn-next') {
      recommend_nextSlide();
    }

    // autoplay버튼 클릭시
    if (this.classList == 'recommend__auto-play') {
      var recommend_autoPlay = this;

      // 일시정지 버튼 눌렀을때 함수
      function pauseAutoSlide() {
        clearInterval(recommend_autoSlide);
        recommend_autoPlay.firstElementChild.setAttribute('src', 'images/btn_pause.svg');
        recommend_playing = false;
      }

      // 재생 버튼 눌렀을때 함수
      function startAutoSlide() {
        recommend_autoSlide = setInterval(recommend_nextSlide, 3000);
        recommend_autoPlay.firstElementChild.setAttribute('src', 'images/btn_play.svg');
        recommend_playing = true;
      }

      if (recommend_playing) {
        pauseAutoSlide();
      } else {
        startAutoSlide();
      }
    }
  });
}

/***************************** .notice ******************************/

/***** inform *****/
var inform_slideList = document.querySelector('.notice__inform .notice__slide-list');
var inform_slideitem = document.querySelectorAll('.notice__inform .notice__slide-item');
var inform_slideCurrentIndex = 0;
var inform_slideLength = inform_slideitem.length;
var inform_slideSpeed = 200;
var inform_slideHeight = 78;

// 첫번째 슬라이드와 마지막번째 슬라이드
var inform_firstChild = inform_slideList.firstElementChild;
var inform_lastChild = inform_slideList.lastElementChild;

// 첫번째 슬라이드와 마지막번째 슬라이드 복제 
var inform_clonedFirst = inform_firstChild.cloneNode(true);
var inform_clonedLast = inform_lastChild.cloneNode(true);

// 첫번째 복제 슬라이드는 맨뒤에 추가하고 마지막번째 복제 슬라이드는 첫번째 원본 슬라이드 앞에 추가
inform_slideList.appendChild(inform_clonedFirst);
inform_slideList.insertBefore(inform_clonedLast, inform_slideList.firstElementChild);

setInterval(inform_autoSlide, 2000);

function inform_autoSlide() {
  if (inform_slideCurrentIndex < inform_slideLength) {
    inform_slideList.style.transition = inform_slideSpeed + 'ms';
    inform_slideList.style.transform = 'translateY(-' + (inform_slideHeight * (inform_slideCurrentIndex + 2)) + 'px)';
  }
  if (inform_slideCurrentIndex === inform_slideLength - 1) {
    setTimeout(function () {
      inform_slideList.style.transition = "0ms";
      inform_slideList.style.transform = 'translateY(-' + inform_slideHeight + 'px)';
    }, inform_slideSpeed);

    inform_slideCurrentIndex = -1;
  }

  inform_slideCurrentIndex++;
}

/***** win *****/
var win_slideList = document.querySelector('.notice__win .notice__slide-list');
var win_slideitem = document.querySelectorAll('.notice__win .notice__slide-item');
var win_slideCurrentIndex = 0;
var win_slideLength = win_slideitem.length;
var win_slideSpeed = 200;
var win_slideHeight = 78;

// 첫번째 슬라이드와 마지막번째 슬라이드
var win_firstChild = win_slideList.firstElementChild;
var win_lastChild = win_slideList.lastElementChild;

// 첫번째 슬라이드와 마지막번째 슬라이드 복제 
var win_clonedFirst = win_firstChild.cloneNode(true);
var win_clonedLast = win_lastChild.cloneNode(true);

// 첫번째 복제 슬라이드는 맨뒤에 추가하고 마지막번째 복제 슬라이드는 첫번째 원본 슬라이드 앞에 추가
win_slideList.appendChild(win_clonedFirst);
win_slideList.insertBefore(win_clonedLast, win_slideList.firstElementChild);

setInterval(win_autoSlide, 2000);

function win_autoSlide() {
  if (win_slideCurrentIndex < win_slideLength) {
    win_slideList.style.transition = win_slideSpeed + 'ms';
    win_slideList.style.transform = 'translateY(-' + (win_slideHeight * (win_slideCurrentIndex + 2)) + 'px)';
  }
  if (win_slideCurrentIndex === win_slideLength - 1) {
    setTimeout(function () {
      win_slideList.style.transition = "0ms";
      win_slideList.style.transform = 'translateY(-' + win_slideHeight + 'px)';
    }, win_slideSpeed);

    win_slideCurrentIndex = -1;
  }

  win_slideCurrentIndex++;
}

/***************************** .shopping ******************************/

var shopping_slideWrap = document.querySelector('.shopping__list-wrap'); // 드래그와 터치이벤트를 받을 요소
var shopping_slideList = document.querySelector('.shopping__list'); // 드래그와 터치이벤트를 받을 요소의 자식
var moving = false;
var startPageX = 0;
var lastPageX = 0;
var transform = 0;
var transformValue = 0;

var gestureStart = function (e) {
  moving = true;
  startPageX = e.pageX; // 포인터가 눌렸을때 전체문서를 기준으로 하여 X좌표의 값을 변수에 저장
  var transformMatrix = window.getComputedStyle(shopping_slideList).getPropertyValue('transform'); // shopping_slideList의 transform값을 변수에 저장
  if (transformMatrix !== 'none') { // transformMatrix에 저장된 transform값이 none이 아니라면 즉, 값이 있다면
    transform = parseInt(transformMatrix.split(',')[4].trim()); // transformMatrix에는 몇개의 배열이 저장되어 있는데 그 중 4번째 배열이 translateX좌표에 해당한다. 이 4번째 배열에 있는 공백을 trim메서드를 사용하여 제거한 후 parseInt메서드를 사용하여 문자열을 정수로 바꿔준다. 
  }
}

var gestureMove = function (e) {
  if (moving) { // moving이 참이면 즉, true값이 저장되어 있다면
    var diffrent = e.pageX - startPageX; // 드래그 또는 터치가 되는 X좌표값에서 드래그 또는 터치가 시작됐던 X좌표값을 빼서 그 값을 변수에 저장 50

    if (e.pageX - lastPageX > 0) { // 드래그 또는 터치가 이동할때의 X좌표값에서 lastPageX 값을 뺀 값이 0보다 클때
      if (transformValue > 0) {
        return;
      }
    } else { // 드래그 또는 터치가 이동할때의 X좌표값에서 lastPageX 값을 뺀 값이 0보다 작을때
      if (Math.abs(transformValue) > shopping_slideList.offsetWidth - shopping_slideWrap.offsetWidth) {
        return;
      }
    }
    transformValue = transform + diffrent;
    shopping_slideList.style.transform = 'translateX(' + transformValue + 'px';
  }
  lastPageX = e.pageX; // 최종적으로 이동된 드래그 또는 터치의 X좌표값을 변수에 저장
}

var gestureEnd = function (e) {
  moving = false;
}

if (window.PointerEvent) {
  shopping_slideList.addEventListener('pointerdown', gestureStart);
  shopping_slideList.addEventListener('pointermove', gestureMove);
  shopping_slideList.addEventListener('pointerup', gestureEnd);
} else if (window.MSPointerEvent) { // ie10 호환성을 위한 접두사 (실제로 ie10에서 테스트를 해보니 없어도 문제없이 동작하지만 혹시 모르기 때문에 넣어둠)
  shopping_slideList.addEventListener('MSPointerDown', gestureStart);
  shopping_slideList.addEventListener('MSPointerMove', gestureMove);
  shopping_slideList.addEventListener('MSPointerUp', gestureEnd);
}

/***************************** .footer ******************************/

var btn_familySite = document.querySelector('.footer__btn-family-site'); // 푸터영역에 있는 패밀리사이트 버튼 요소를 변수에 저장

btn_familySite.addEventListener('click', function () {
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active'); // 다음 형제요소(.footer__family-site-list)에 active class를 toggle하여 펼침 또는 접기
});

window.addEventListener('click', function (e) { // 윈도우 클릭시 클릭대상이 btn_familySite가 아니라면 
  if (e.target !== btn_familySite) {
    btn_familySite.classList.remove('active');
    btn_familySite.nextElementSibling.classList.remove('active');
  }
});





// else {
//   shopping_slideList.addEventListener('touchdown', gestureStart);
//   shopping_slideList.addEventListener('touchmove', gestureMove);
//   shopping_slideList.addEventListener('touchup', gestureEnd);
//   shopping_slideList.addEventListener('mousedown', gestureStart);
//   shopping_slideList.addEventListener('mousemove', gestureMove);
//   shopping_slideList.addEventListener('mouseup', gestureEnd);
// }



/*
else if (window.MSPointerEvent) {
  shopping_slideList.addEventListener('MSPointerDown', gestureStart);
  shopping_slideList.addEventListener('MSPointerMove', gestureMove);
  shopping_slideList.addEventListener('MSPointerUp', gestureEnd);
}
*/