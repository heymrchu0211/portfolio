/******************** 페이지 로드 되었을때 로딩되는 모습 ********************/

window.addEventListener('load', function () {
  document.querySelector('.overlay-preloading').classList.add('opacity-zero'); // opacity-zero라는 클래스를 추가하여 opacity가 1에서 0으로 바뀌는 모습을 보여줍니다.
  setTimeout(function () {
    document.querySelector('.overlay-preloading').style.display = 'none';
  }, 1500); // 1.5초가 지나면 display속성의 속성값을 none으로 설정하여 화면에서 아예 사라지도록 합니다.
});

/******************** section home에 있는 "신입 웹퍼블리셔 지원자 김춘영입니다." 타이핑 되는 모습 ********************/

var targetTyping = document.querySelector('.home h2'); // 해당 요소를 변수에 저장합니다.
var targetString = targetTyping.textContent; // 해당 요소의 텍스트를 변수에 저장합니다.

targetTyping.textContent = ''; // 해당 요소의 textContent 프로퍼티에 빈 값을 넣습니다.

function targetSringArgument() {
  var targetStringArr = targetString.split(''); // 해당 요소의 텍스트를 글자 하나하나로 쪼개서 배열로 만든 후 그것을 targetStringArr라는 변수에 저장합니다.
  return targetStringArr; // 내보냅니다.
}

function resetTyping() {
  targetTyping.textContent = ''; // 해당 요소의 textContent 프로퍼티에 빈 값을 넣습니다.
  typing(targetSringArgument()); // typing함수를 실행 시킵니다.
}

function typing(targetSringArgument) {

  if (targetSringArgument.length > 0) { // targetSringArgument의 길이가 0보다 크다면 targetSringArgument라는 배열의 값을 하나씩 shift 메서드를 사용해서 뺀 후, 해당 요소의 textContent 프로퍼티에 넣습니다. 그리고 typing함수를 0.15초에 실행시킵니다.
    targetTyping.textContent += targetSringArgument.shift();
    setTimeout(function () {
      typing(targetSringArgument)
    }, 150)
  } else { // targetSringArgument의 길이가 0보다 크지 않다면 즉, 0이 되었다면 3초 후에 resetTyping함수를 실행합니다. 그래서 타이핑 되는 모습을 다시 반복하는 것입니다.
    setTimeout(resetTyping, 3000);
  }
}
typing(targetSringArgument()); // typing함수를 실행 시킵니다.

function blink() { // 커서가 깜빡깜빡거리는 모습을 blink함수로 만듭니다.
  targetTyping.classList.toggle('active');
}
setInterval(blink, 400); // 0.4초마다 blink 함수가 실행됩니다.

/******************** 햄버거버튼 클릭시 ********************/

var btnHamburger = document.querySelector('.btn-hamburger'); // 햄버거버튼(전체메뉴 버튼) 요소를 변수에 저장합니다.
var dim = document.querySelector('.dim'); // 뒷배경으로 쓸 요소를 변수에 저장합니다. (모달창이 나왔을때 뒷배경으로 쓸 요소)

btnHamburger.addEventListener('click', function () { // 햄버거버튼 요소의 부모요소(header)에 active클래스를 추가하거나 빼서(toggle) header요소가 나타나거나 사라지도록하고 dim요소에도 active클래스를 toggle하여 나타나거나 사라지도록 합니다.
  this.parentElement.classList.toggle('active');
  dim.classList.toggle('active');
});

/******************** .dim 클릭시 ********************/

dim.addEventListener('click', function () { // dim요소 클릭시 dim요소에 active라는 class가 있다면 이전형제요소(header)에 있는 active class를 제거하고 자기자신의 active class도 제거합니다.
  for (var i = 0; i < this.classList.length; i++) {
    if (this.classList[i] == 'active') {
      this.previousElementSibling.classList.remove('active');
      this.classList.remove('active');
    }
  }
});

/******************** 각 메뉴 클릭시 해당 섹션 보여주기 ********************/

var menu = document.querySelectorAll('.header__nav-item'); // 모든 .header__nav-item요소를 변수에 저장합니다.
var section = document.querySelectorAll('.section'); // 모든 .section요소를 변수에 저장합니다.
var header = document.querySelector('.header'); // .header요소를 변수에 저장합니다.

for (var i = 0; i < menu.length; i++) {
  var targetMenu = menu[i].querySelector('.header__nav-name'); // 각각의 .header__nav-name요소를 변수에 저장합니다.

  targetMenu.addEventListener('click', function () {

    for (y = 0; y < menu.length; y++) {
      section[y].classList.remove('back'); // 모든 .section요소의 class back을 제거합니다.

      if (menu[y].querySelector('.header__nav-name').classList.contains('header__nav-name--active')) { // header__nav-name--active라는 클래스를 가지고 있는 .header__nav-name요소가 있으면 
        section[y].classList.add('back'); // 그 .header__nav-item요소의 인덱스(y)에 상응하는 인덱스를 가진 section요소에 back클래스를 추가합니다.
      }
      menu[y].querySelector('.header__nav-name').classList.remove('header__nav-name--active'); //모든 .header__nav-name요소의 class active를 제거합니다.
    }
    this.classList.add('header__nav-name--active'); // 클릭된 .header__nav-item요소에 active 클래스를 추가합니다.

    showSection(this); // showSection함수를 호출하고 이때 클릭된 요소인 this를 인수로 넣습니다. 

    if (window.innerWidth <= 992) { // 브라우저의 뷰포트 너비가 992px이하라면
      header.classList.toggle('active');
      dim.classList.remove('active');
    }
  });
}

function showSection(element) {
  var targetSection = element.getAttribute('href').split('#')[1]; // 매개변수로 클릭된 요소를 받고 이 클릭된 요소의 href속성값을 얻어서 쪼갠 후 1번째 배열값을 변수에 저장합니다.
  for (var z = 0; z < section.length; z++) {
    section[z].classList.remove('active'); // 모든 .section요소의 active class를 제거합니다.
  }
  document.querySelector('#' + targetSection).classList.add('active'); // '#'과 targetSection변수에 저장되어있는 값을 합친 ID값을 찾아서 해당되는 .section요소에 active class를 추가합니다.
}

/******************** 포트폴리오 모달창 제어하기 ********************/

var btn_portfolioMore = document.querySelectorAll('.portfolio__btn-more'); // 클릭시 모달창이 나오게 하는 요소를 변수에 저장합니다.
var btn_portfolioClose = document.querySelectorAll('.portfolio-modal__btn-close'); // 클릭시 모달창을 닫는 요소를 변수에 저장합니다.
var portfolioModal = document.querySelectorAll('.portfolio-modal'); // 모달창의 최상위 부모를 변수에 저장합니다.
var portfolioBody = document.querySelectorAll('.portfolio-modal__body'); // 모달창을 변수에 저장합니다.
currentIndex = 0; // 포트폴리오 모달창 내부에 있는 슬라이더를 제어할 용도로 사용할 변수입니다.
var modal_slideWrap = document.querySelectorAll('.portfolio-modal__slide-wrap'); // 슬라이드 부모 요소를 변수에 저장합니다.

// 포트폴리오 모달창 열기
for (var i = 0; i < btn_portfolioMore.length; i++) {

  btn_portfolioMore[i].addEventListener('click', function () {
    if (window.innerWidth <= 992) { // 브라우저의 뷰포트 너비가 992px이하라면
      header.classList.add('active-z-index'); // header요소에 active-z-index를 추가하여 header요소를 감추도록 합니다.
    }
    this.parentElement.nextElementSibling.classList.add('active'); // .portfolio-modal요소에 active class를 추가합니다.
    this.parentElement.nextElementSibling.firstElementChild.classList.add('active'); // .portfolio-modal__body요소에 active class를 추가합니다.

    for (var i = 0; i < this.parentElement.nextElementSibling.querySelectorAll('.portfolio-modal__slide-item').length; i++) {
      this.parentElement.nextElementSibling.querySelectorAll('.portfolio-modal__slide-item')[i].classList.remove('active');
    } // 모달창 내부의 모든 슬라이드 아이템 요소들의 active class를 제거합니다.
    this.parentElement.nextElementSibling.querySelectorAll('.portfolio-modal__slide-item')[0].classList.add('active'); // 모달창 내부의 첫번째 슬라이드 아이템 요소에 active class를 추가합니다. 그래서 첫번째 슬라이드 아이템 요소가 가장 먼저 보이도록 하는겁니다.

    this.parentElement.nextElementSibling.querySelector('.portfolio-modal__button-next').classList.remove('display-none'); // .portfolio-modal__button-next요소에는 display-none class를 제거하여 요소가 보이도록 하고
    this.parentElement.nextElementSibling.querySelector('.portfolio-modal__button-prev').classList.add('display-none'); // portfolio-modal__button-prev요소에는 display-none class를 추가하여 요속 안보이도록 합니다.

  });
}

// 포트폴리오 모달창 닫기
for (var i = 0; i < btn_portfolioClose.length; i++) {

  btn_portfolioClose[i].addEventListener('click', function () { // .portfolio-modal__btn-close요소를 클릭시

    header.classList.remove('active-z-index'); // .header요소에 active-z-index class를 제거하여 .header요소가 다시 보이도록 합니다.
    // for (var i = 0; i < portfolioModal.length; i++) {
    //   portfolioModal[i].classList.remove('active');
    // }
    this.parentElement.parentElement.classList.remove('active'); //
    this.parentElement.classList.remove('active');
    currentIndex = 0;

  });
}

// 포트폴리오 모달창 바깥영역 클릭시 모달창 닫기
window.addEventListener('click', function (e) {

  for (var i = 0; i < portfolioModal.length; i++) {
    if (e.target == portfolioModal[i]) { // 윈도우를 클릭했는데 클릭한 부분이 .portfolio-modal요소와 같다면
      header.classList.remove('active-z-index'); // .header요소에 active-z-index class를 제거하여 다시 요소가 보이도록 합니다.
      portfolioModal[i].classList.remove('active'); // .portfolio-modal요소에 active class를 제거합니다.
      portfolioBody[i].classList.remove('active'); // .portfolio-modal__body active class를 제거합니다.
      currentIndex = 0;
    }
  }
});

/******************** 포트폴리오 모달창 내부에서 좌우버튼 클릭시 슬라이더 이동 ********************/

// next버튼 클릭시
for (var i = 0; i < modal_slideWrap.length; i++) {
  modal_slideWrap[i].querySelector('.portfolio-modal__button-next').addEventListener('click', function () {

    if (currentIndex < this.parentElement.querySelectorAll('.portfolio-modal__slide-item').length - 1) {

      currentIndex++;
      var target = this;

      for (var i = 0; i < this.parentElement.querySelectorAll('.portfolio-modal__slide-item').length; i++) {
        this.parentElement.querySelectorAll('.portfolio-modal__slide-item')[i].classList.remove('active');
      }
      this.parentElement.querySelectorAll('.portfolio-modal__slide-item')[currentIndex].classList.add('active');

      control_className(target);
    }
  });
}

// prev버튼 클릭시
for (var i = 0; i < modal_slideWrap.length; i++) {
  modal_slideWrap[i].querySelector('.portfolio-modal__button-prev').addEventListener('click', function () {

    if (currentIndex > 0) {

      currentIndex--;
      var target = this;

      for (var i = 0; i < this.parentElement.querySelectorAll('.portfolio-modal__slide-item').length; i++) {
        this.parentElement.querySelectorAll('.portfolio-modal__slide-item')[i].classList.remove('active');
      }
      this.parentElement.querySelectorAll('.portfolio-modal__slide-item')[currentIndex].classList.add('active');

      control_className(target);
    }
  });
}

// control_className
function control_className(target) {
  if (currentIndex === target.parentElement.querySelectorAll('.portfolio-modal__slide-item').length - 1) {
    target.classList.add('display-none');
  } else if (currentIndex === 0) {
    target.classList.add('display-none');
  } else {
    target.classList.remove('display-none');
    targetSiblings_removeClas(target);
  }
}

function targetSiblings_removeClas(target) {
  var children = target.parentElement.children; // 매개변수로 들어온 target (button-next 또는 button-prev)의 부모의 자식들을 변수에 저장합니다.
  var tempArr = []; // 비어있는 배열을 변수에 저장합니다.

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }
  tempArr[1].classList.remove('display-none');
  tempArr[2].classList.remove('display-none');
}





