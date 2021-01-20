$(function(){
    $(window).scroll(function(){

        /***** fixed header *****/
        if($(this).scrollTop() > 0){
            $('header').addClass('fixed');
        }else {
            $('header').removeClass('fixed');
        }

        /***** works image animation *****/
        var worksOst = $('.works').offset().top;
        if($(this).scrollTop() > worksOst - 500){
            $('.works .item').addClass('animate');
        }

        /***** btn_here aniamtion *****/
        var btnHereOst = $('.btn_here').offset().top;
        if($(this).scrollTop() > btnHereOst - 600){
            $('.btn_here').addClass('animated');
        }
    });

    /***** hamburger button clicked *****/
    $('.hamburger').click(function(){
        $(this).toggleClass('clicked');
    });

    /***** slide *****/
    var slidePagerHtml = '',
        slideContainer = $('.slideContainer'),
        slide = slideContainer.find('.item'),
        topHeight = 0,
        currentIdx = 0,
        slideLength = slide.length;
        slidePager = $('.pager');

    slide.each(function(i){
        slidePagerHtml += '<button>' + i + '</button>';
        slidePager.html(slidePagerHtml);
    });

    
    /* 슬라이드 컨테이너 반응형 높이 */
    
    $(window).trigger('resize');

    $(window).resize(function(){
        console.log($(this).width());
        test();
    });

    function test(){
        // slide = slideContainer.find('.item'); 
        
        topHeight = slide.outerHeight(); console.log(topHeight);
        
    
        slideContainer.css({height: topHeight + 'px'}); 
    }
    test();
   
	
    
    /* 슬라이드 show */
    function showSlide(i){ 
        slide.eq(i).addClass('active').siblings().removeClass('active');
        currentIdx = i;
        updateNav();
     }

      /* 보여지는 슬라이드의 순번에 맞게 페이저에 active 클래스 추가하기 */
    function updateNav(){
        if(currentIdx == slideLength){
            slidePager.find('button').removeClass('active').eq(slideLength-1).addClass('active');
        }else{
            slidePager.find('button').removeClass('active').eq(currentIdx).addClass('active');
        }
    }
    slidePager.find('button').eq(0).addClass('active');

    /* 페이저 클릭하면 해당 순번에 맞는 슬라이드가 보여지기 */
    slidePager.find('button').click(function(e){
        e.preventDefault();
        var target = $(this).index(); 
        showSlide(target); 
    });

    /* 슬라이드 자동 재생 */
    function startAutoSlide(){
        timer = setInterval(function(){
            var targetIdx = (currentIdx + 1) % slideLength; //console.log(targetIdx);
            showSlide(targetIdx);
        }, 3000);
    }
    startAutoSlide();

    /***** 스크롤에 따라 네비게이션 메뉴 활성화 *****/
   /* 변수지정 */
   var menu = $('header ul li');
   var contents = $('section');
 
   //메뉴 클릭시 해당 section으로 이동하기
   menu.click(function(event){
      event.preventDefault();
      
      var target = $(this);
      var i = target.index();
      
      var section = contents.eq(i);
      var targetTop = section.offset().top;

      $('html, body').stop().animate({scrollTop:targetTop - 74});
   });
   //스크롤 값에 따라 메뉴의 색깔 활성화하기 
   $(window).scroll(function(){
          var sct = $(window).scrollTop();
   
          contents.each(function(){
          var target = $(this);
          var i = target.index();
          
          if(target.offset().top - 74 <= sct + 1){
            menu.removeClass('on');
            menu.eq(i).addClass('on');
            }
        });
    });

});
