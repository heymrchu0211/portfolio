$(function(){
    var navMenu = $('header .nav > ul > li'),
        humburgerBtn = $('header .btn_hamburger'),
        loginBtn = $('.btn_family'),
        loginCloseBtn = $('.login_box i'),
        slide = $('.slide'),
        slidePagerHtml = '',
        slidePager = $('.pager'),
        timer = '',
        currentIdx = '',
        slideLength = slide.length,
        playing = true,
        pagerControl = $('.btn_control'),
        fixedHeader = $('header'),
        accordion = $('header .all_menu_wrap nav > ul > li > a'),
        ua = window.navigator.userAgent;
    //네비게이션 메뉴 드롭다운
    navMenu.mouseenter(function(){
        $(this).children('ul').stop().slideDown();
    })
    .mouseleave(function(){
        $(this).children('ul').stop().slideUp();
    });

    //햄버거버튼 토글
    humburgerBtn.click(function(){
        $(this).toggleClass('clicked');
    });

    //로그인박스 열기 버튼
    loginBtn.click(function(){
        $(this).addClass('clicked');
    });

    //로그인박스 닫기 버튼
    loginCloseBtn.click(function(){
        loginBtn.removeClass('clicked');
    });

    //슬라이드 페이저 생성
    slide.each(function(i){
        slidePagerHtml += '<span>' + ('0' + (i + 1)) + '</span>';
        slidePager.html(slidePagerHtml);
    });
    
    //슬라이드 show 함수
    function showSlide(i){ 
        slide.eq(i).addClass('active').siblings().removeClass('active');
        clearInterval(timer);
        startAutoSlide();
        currentIdx = i; 
        updateNav();
     }

    //슬라이드 페이저 클릭시 클릭된 페이저 순번에 맞는 슬라이드 보여지게 하기
    slidePager.children().click(function(){
        var slideIdx = $(this).index();
        showSlide(slideIdx); 
    });

    //슬라이드 자동 재생
    function startAutoSlide(){
        timer = setInterval(function(){
            var targetIdx = (currentIdx + 1) % slideLength;
            showSlide(targetIdx);
        }, 7500);
    }
    startAutoSlide();

    // 보여지는 슬라이드의 순번에 맞게 페이저에 active 클래스 추가하기
    function updateNav(){
        slidePager.children().removeClass('active').eq(currentIdx).addClass('active');
    }
    slidePager.find('span').eq(0).addClass('active');

    // 일시정지 버튼 눌렀을때 사용할 슬라이드 자동재생 멈춤 함수
    function pauseSlide(){
        playing = false;
        clearInterval(timer);
        pagerControl.html('<i class="fas fa-play"></i>');
    }

    // 플레이 버튼 눌렀을때 사용할 슬라이드 자동재생 실행 함수
    function playSlide(){
        playing = true;
        startAutoSlide();
        pagerControl.html('<i class="fas fa-pause"></i>');
    }

    // 일시정지 버튼을 클릭하면 자동 슬라이드가 멈추고 동시에 플레이 버튼으로 바뀌기
    pagerControl.click(function(){
        if(playing){
            pauseSlide();
        }else{
            playSlide();
        }
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            fixedHeader.addClass('fixed');
        }else{
            fixedHeader.removeClass('fixed');
        }
    });
    accordion.click(function(e){
        var width = $(window).width();
        e.preventDefault();

        if(width <= 992){
            accordion.siblings().slideUp();
            $(this).siblings().slideDown();
            accordion.removeClass('clicked');
            $(this).addClass('clicked');
        }
    });
    $(window).resize(function(){
        var width = $(window).width();

        if(width >= 992){ 
            $('header .all_menu_wrap nav ul ul').show();
            accordion.removeClass('clicked');
        }else{
            $('header .all_menu_wrap nav ul ul').hide();
        }
    });
    

    // ie 감지
    if(ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0){ 
        //윈도우 10까지는 MSIE, 윈도우 11부터는 Trident/ 사용
        document.body.className="ie10";
    }
});
