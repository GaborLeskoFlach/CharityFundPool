var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
	
	//Preloader
	$(window).load(function(){
		$('.preloader').fadeOut('slow',function(){$(this).remove();});
	});
	
	// Slider Height
	var slideHeight = $(window).height();
	$('#main-carousel .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#main-carousel .item').css('height',slideHeight);
	});
	
	//Menu Toggle
	function menuToggle()
	{		
		var windowWidth = $(window).width();

		if(windowWidth > 767 ){
			$(window).on('scroll', function(){
				if( $(window).scrollTop()>405 ){
					$('.navbar').addClass('navbar-fixed-top animated fadeIn');
					$('.navbar').removeClass('main-nav');
				} else {
					$('.navbar').removeClass('navbar-fixed-top');
					$('.navbar').addClass('main-nav');
				}
			});
		}else{			
			$('.navbar').addClass('navbar-fixed-top');	
			$('.navbar').removeClass('main-nav');
		};
		if(windowWidth > 767 ){
			$(window).on('scroll', function(){
				if( $(window).scrollTop()>405 ){
					$('.top-bar').addClass('top-bar-hide');
				} else {
					$('.top-bar').removeClass('top-bar-hide');
				}
			});
		}else{			
			$('.top-bar').addClass(this);				
		};
		
	}

	//menuToggle();	
	
	//Menu Scrolling
	/*
	$('.navbar-nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.exclude)',
	});
	*/
	/*
	$('.navbar-nav li a').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top -40}, 500);
		return false;
	});
	*/

	//Scrolling
	$('#tohash, #tohash1, #tohash2, #tohas3').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top -75}, 1000);
		return false;
	});
	
	/*
	//Parallax Scrolling
	$(window).bind('load', function () {
		parallaxInit();						  
	});
	function parallaxInit() {				
		//$("#video-section").parallax("50%", 0.3);
		$("#donations").parallax("50%", 0.3);
		$("#word-for-humanity").parallax("50%", 0.3);	
	}	
	parallaxInit();	
	*/
	
	// Progress Bar
	$.each($('div.progress-bar'),function(){
		$(this).css('width', $(this).attr('data-transition')+'%');
	});
	
	//Pretty Photo
	 $("a[data-gallery^='prettyPhoto']").prettyPhoto({
	  social_tools: false
	 });
	 
	//Event Carousel
	$('#event-carousel.carousel').carousel({
	  interval: 8000
	});
	
	$(document).ready(function () {
		$(".navbar-nav li a").click(function(event) {
		$(".navbar-collapse").collapse('hide');
		});
	});		
		
});

