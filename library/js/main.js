
$(function(){
  var $mainmenu = $('header nav > ul'),
      $nav = $('header nav');

    $mainmenu.mouseenter(function(){
      $nav.stop().animate({height:'320px'},400);
    })
    .mouseleave(function(){
      $nav.stop().animate({height:'79px'},400);
    })

    
  });

  var slideWrap = document.querySelector('.notice_top .slide_wrap'),
      slideContainer = slideWrap.querySelector('.notice_slide'),
      slides = slideContainer.querySelectorAll('li'),
      slideCount = slides.length,
      currentIndex = 0,
      topHeight = 0,
      navPrev = document.querySelector('.notice_top .prev'),
      navNext = document.querySelector('.notice_top .next'),
      btnPause = document.querySelector('.notice_wrap .pause'),
      btnPlay = document.querySelector('.notice_wrap .play'),
      pager = document.querySelector('.notice_wrap .pager'),
      timer,
      playing = true;
  
//슬라이드의 높이 확인하여 부모의 높이로 지정하기
for(var i = 0; i < slideCount; i++){
  if(slides[i].offsetHeight > topHeight){
    topHeight = slides[i].offsetHeight;
  }
}

// 슬라이드 가로로 배열하기
for(var i = 0; i < slideCount; i++){
  slides[i].style.left = i * 100 + '%';
}

// 슬라이드 이동 함수 
function moveSlide(idx){
  slideContainer.style.left = idx * -100 + '%';
  currentIndex = idx; //현재활성화된 슬라이드 번호를 업데이트
  console.log(currentIndex);

  // 현재 보고있는 슬라이드 페이지 번호 표시하기
  pager.innerText = currentIndex + 1 + '/' + slideCount;
}

// 버튼을 클릭하면 슬라이드 이동시키기
navNext.addEventListener('click', function(e){
  e.preventDefault();
  if(currentIndex < slideCount -1){
    moveSlide(currentIndex + 1);
  }
});
navPrev.addEventListener('click', function(e){
  e.preventDefault();
  if(currentIndex > 0){
    moveSlide(currentIndex - 1);
  }
});

// 일시정지 버튼을 누르면 재생버튼이 나오게 하기
btnPause.addEventListener('click', function(e){
  e.preventDefault();
  
});

// 자동으로 돌아가는 슬라이드
function startAutoSlide(){
  timer = setInterval(function(){

    var auto = (currentIndex + 1) % slideCount;
    moveSlide(auto);
      
  }, 2000);
}

startAutoSlide();

// slideWrap에 마우스가 들어오면 자동 슬라이드 멈추기
slideWrap.addEventListener('mouseenter', function(){
    clearInterval(timer);
});

// slideWrap에서 마우스가 나가면 다시 슬라이드가 자동으로 돌아가기
slideWrap.addEventListener('mouseleave', function(){
    startAutoSlide();
});

// 재생정지 버튼 눌렀을때 사용할 슬라이드 자동재생 멈춤 함수
function pauseSlide(){
  playing = false;
  clearInterval(timer);
  btnPause.innerHTML = '<span class="hide">재생</span><i class="fas fa-play">';
}
// 플레이 버튼 눌렀을때 사용할 슬라이드 자동재생 실행 함수
function playSlide(){
  playing = true;
  startAutoSlide();
  btnPause.innerHTML = '<span class="hide">일시정지</span><i class="fas fa-pause">';
}
// 일시정지 버튼을 클릭하면 자동 슬라이드가 멈추고 동시에 플레이 버튼으로 바뀌기
btnPause.addEventListener('click', function(){
  if(playing){
      pauseSlide();
  }else{
      playSlide();
  }
});

/********** book_list 영역 슬라이드 **********/
var bookSlideContainer = document.querySelector('.book_list .tabs_panel'),
    bookSlide = bookSlideContainer.querySelectorAll('li'),
    bookSlideWidth = 152,
    bookSlideMargin = 80,
    bookcurrentIndex = 0,
    bookSlideCount = bookSlide.length,
    bookBtnNext = document.querySelector('.book_list .next'),
    bookBtnPrev = document.querySelector('.book_list .prev'),
    noticeSlideTimer = '',
    noticePlaying = 'true';

bookSlideContainer.style.width = (bookSlideWidth + bookSlideMargin) * (bookSlideCount - 1) + 'px';

// 슬라이동 이동 함수
function bookmoveSlide(idx){
    bookSlideContainer.style.left = -idx * (bookSlideWidth + bookSlideMargin) + 'px';
    bookcurrentIndex = idx;
}
// 오른쪽 버튼 클릭시 슬라이드 이동 함수
bookBtnNext.addEventListener('click', function(e){
    e.preventDefault();
    if(bookcurrentIndex < bookSlideCount - 6){
      bookmoveSlide(bookcurrentIndex + 1);
    }else{
      bookmoveSlide(0);
    }
    
});
// 왼쪽 버튼 클릭시 슬라이드 이동 함수
bookBtnPrev.addEventListener('click', function(e){
  e.preventDefault();
  if(bookcurrentIndex > 0){
    bookmoveSlide(bookcurrentIndex - 1);
  }else{
    bookmoveSlide(bookSlideCount - 6);
  }
  
});

/********** banner 영역 슬라이드 **********/
var noticeSlideContainer = document.querySelector('.banner .notice_slide'),
    noticeSlide = noticeSlideContainer.querySelectorAll('li'),
    noticeSlideWidth = 117,
    noticeSlideMargin = 52,
    noticecurrentIndex = 0,
    noticeSlideCount = noticeSlide.length,
    noticeBtnNext = document.querySelector('.banner .next'),
    noticeBtnPrev = document.querySelector('.banner .prev');
    noticeBtnPause = document.querySelector('.banner .pause');

noticeSlideContainer.style.width = (noticeSlideWidth + noticeSlideMargin) * (noticeSlideCount - 1) + 'px';

// 슬라이동 이동 함수
function noticeMoveSlide(idx){
  noticeSlideContainer.style.left = -idx * (noticeSlideWidth + noticeSlideMargin) + 'px';
  noticecurrentIndex = idx;
}

// 오른쪽 버튼 클릭시 슬라이드 이동 함수
noticeBtnNext.addEventListener('click', function(){
  if(noticecurrentIndex < noticeSlideCount -7){
    noticeMoveSlide(noticecurrentIndex + 1);
  }else{
    noticeMoveSlide(0);
  }
});

// 왼쪽 버튼 클릭시 슬라이드 이동 함수
noticeBtnPrev.addEventListener('click', function(){
  if(noticecurrentIndex > 0){
    noticeMoveSlide(noticecurrentIndex - 1);
  }else{
    noticeMoveSlide(noticeSlideCount -7);
  }
});

// 자동으로 돌아가는 슬라이드
function StartAutoNoticeSlide(){
  noticeSlideTimer = setInterval(function(){
    var auto = (noticecurrentIndex + 1) % (noticeSlideCount - 6);
    noticeMoveSlide(auto);
  }, 2000);
}
StartAutoNoticeSlide()
// 재생정지 버튼 눌렀을때 사용할 슬라이드 자동재생 멈춤 함수
function noticePauseSlide(){
  noticePlaying = false;
  clearInterval(noticeSlideTimer);
  noticeBtnPause.innerHTML = '<span class="hide">재생</span><i class="fas fa-play"></i>';
}
// 플레이 버튼 눌렀을때 사용할 슬라이드 자동재생 실행 함수
function noticePlaySlide(){
  noticePlaying = true;
  StartAutoNoticeSlide();
  noticeBtnPause.innerHTML = '<span class="hide">재생</span><i class="fas fa-pause"></i>';
}

// 일시정지 버튼을 클릭하면 자동 슬라이드가 멈추고 동시에 플레이 버튼으로 바뀌기
noticeBtnPause.addEventListener('click', function(){
  if(noticePlaying){
      noticePauseSlide();
  }else{
    noticePlaySlide();
  }
});

// service 영역 탭메뉴
var serviceTabsContainer = document.querySelector('.service'),
    serviceTabsNav = serviceTabsContainer.querySelectorAll('.tabs_nav a'),
    serviceTabsContent = document.querySelectorAll('.service > div > div');

      for(var i = 0; i < serviceTabsNav.length; i++){
        serviceTabsNav[i].addEventListener('click', function(e){
         
          e.preventDefault();

          for(var y = 0; y < serviceTabsNav.length; y++){
            serviceTabsNav[y].classList.remove('active');
          }
          this.classList.add('active');
          
          for(var x = 0; x < serviceTabsContent.length; x++){
            serviceTabsContent[x].style.display = 'none';
          }
          var targetContent = this.getAttribute('href');

          serviceTabsContainer.querySelector(targetContent).style.display = 'block';

      });
    }
    for(var x = 0; x < serviceTabsContent.length; x++){
      serviceTabsContent[x].style.display = 'none';
      }
      serviceTabsContent[0].style.display = 'block'; 

  // book_list 영역 탭메뉴
  var booklistTabsContainer = document.querySelector('.book_list'),
      booktabsNav = booklistTabsContainer.querySelectorAll('.tabs_nav a'),
      booktabsContent = document.querySelectorAll('.book_list > div');

      for(var i = 0; i < booktabsNav.length; i++){
        booktabsNav[i].addEventListener('click', function(e){
           
            e.preventDefault();
  
            for(var y = 0; y < booktabsNav.length; y++){
              booktabsNav[y].classList.remove('active');
            }
            this.classList.add('active');
            
            for(var x = 0; x < booktabsContent.length; x++){
              booktabsContent[x].style.display = 'none';
            }
            var targetContent = this.getAttribute('href');

            booklistTabsContainer.querySelector(targetContent).style.display = 'block';
        });
      }
      for(var x = 0; x < booktabsContent.length; x++){
        booktabsContent[x].style.display = 'none';
        }
        booktabsContent[0].style.display = 'block'; 

// notice_wrap 영역 탭메뉴
var noticeTabsContainer = document.querySelector('.inform .notice_wrap'),
    noticetabsNav = noticeTabsContainer.querySelectorAll('.tabs_nav a'),
    noticetabsContent = document.querySelectorAll('.notice_wrap .tabs_panel');
console.log(noticeTabsContainer);
for(var i = 0; i < noticetabsNav.length; i++){
      noticetabsNav[i].addEventListener('click', function(e){ 

      e.preventDefault();

      for(var y = 0; y < noticetabsNav.length; y++){
        noticetabsNav[y].classList.remove('active');
      }
      this.classList.add('active');
      
      for(var x = 0; x < noticetabsContent.length; x++){
        noticetabsContent[x].style.display = 'none';
      }
      var targetContent = this.getAttribute('href');
      console.log(targetContent);

      noticeTabsContainer.querySelector(targetContent).style.display = 'block';
  });
}
for(var x = 0; x < noticetabsContent.length; x++){
  noticetabsContent[x].style.display = 'none';
  }
  noticetabsContent[0].style.display = 'block'; 

// news_wrap 영역 탭메뉴
var newsTabsContainer = document.querySelector('.inform .news_wrap'),
    newsTabsNav = newsTabsContainer.querySelectorAll('.tabs_nav a'),
    newsTabsContent = newsTabsContainer.querySelectorAll('.tabs_panel');
console.log(noticeTabsContainer);

for(var i = 0; i < newsTabsNav.length; i++){
      newsTabsNav[i].addEventListener('click', function(e){ 

      e.preventDefault();

      for(var y = 0; y < newsTabsNav.length; y++){
        newsTabsNav[y].classList.remove('active');
      }
      this.classList.add('active');
      
      for(var x = 0; x < newsTabsContent.length; x++){
        newsTabsContent[x].style.display = 'none';
      }
      var targetContent = this.getAttribute('href');
      console.log(targetContent);

      newsTabsContainer.querySelector(targetContent).style.display = 'block';
  });
}
for(var x = 0; x < newsTabsContent.length; x++){
  newsTabsContent[x].style.display = 'none';
  }
  newsTabsContent[0].style.display = 'block';

// 상세검색 버튼 누르면 모달창 뜨기
var detailBtn = document.querySelector('.detail_search_btn'),
    detailWrap = document.querySelector('.detail_search_wrap'),
    detailClose = detailWrap.querySelector('span');

detailBtn.addEventListener('click', function(){
  detailWrap.style.display = 'block';
});
detailClose.addEventListener('click', function(){
  detailWrap.style.display = 'none';
});

//포트폴리오 팝업창 
    var myPopUP = document.querySelector('.popup');
    var closeBtn = document.querySelector('.popup .close');
    var onedayCheck = document.querySelector('#popup_check');

    function setCookie(name, value, day){
        var date = new Date();
        date.setDate(date.getDate() + day);

        var mycookie = '';
        mycookie += name + '=' + value +';';
        mycookie += 'expires=' + date.toUTCString();

        document.cookie = mycookie;
        //alert(document.cookie);
    }

    checkCookie('library');

    function checkCookie(name){
        var currentCookie = document.cookie.split(';');

        //모든번째 쿠기에 원하는 문자가 없다면
        //모든번째 쿠키에 원하는 문자가 하나라도 있다면
        var visited = false;
    
        for(var i = 0; i < currentCookie.length; i++){
            if(currentCookie[i].search(name) > -1){
            //방문한 적이 있으면
            visited = true;
            } 
        }
        
        if(visited){
            myPopUP.style.display = 'none'; //재방문
        }else{
            myPopUP.style.display = 'block'; //신규방문
        }
        
    }

    function delCookie(name){
        var date = new Date();
        date.setDate(date.getDate() -1);

        var mycookie ='';
        mycookie += 'CookieName=Value;';
        mycookie += 'expires='+ date.toUTCString();
        mycookie += 'Path=/cookietest'

        document.cookie = mycookie;
        //alert(name +'쿠키가 삭제됨');
    } 

    closeBtn.addEventListener('click', function(){
        
        if(!onedayCheck.checked){ //checkbox 체크되어 있지 않으면, 팝업을 다시 보고싶다. 쿠기 지운다.
            delCookie('library');
            myPopUP.style.display = 'none';
            //alert('쿠키삭제');
        } else{ //checkbox 체크되어 있으면, 팝업을 다시 안본다. 쿠키 안 지우기
            setCookie('library','corp',1); //1일간 유지되는 쿠키 생성
            myPopUP.style.display = 'none';
        }
    });



