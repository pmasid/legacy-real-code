'use strict';

function handleDotsEventsOnTimelineScroll() {
	'use strict';

	var pointTopPos = $('.timeline-content .point').offset().top;

  $('.timeline-content').scrollspy({
  	container: $('.events'),
  	max: $('.timeline-content').offset().top,
    onTick: function(element, position) {
    	var addClass = false;
    	$(element).find('.event h3').each(function() {
    		if (pointTopPos > $(this).offset().top && pointTopPos < $(this).offset().top + $(this).height()) {
    			addClass = true;
    			var imgSrc = 	$('img[data-target="'+ $(this).parent().attr('id') +'"]').attr('src');
    			$('.timeline-img').css('background-image', 'url('+ imgSrc +')');
    			console.log();
				}
    	});
    	if (addClass) {
    		$('.point').addClass('big');
    	}
    	else {
    		$('.point').removeClass('big');
    	}
    }
  });
}

function handleNavDotsClick(slider) {
	$('.section.second .text > .nav-dots a').each(function (i) {
		$(this).on('click', function() {
			slider.goToSlide(i);
			$('.section.second .text > .nav-dots a').removeClass('active');
			$(this).addClass('active');
		});
		if (i == 0) {
			$(this).addClass('active');
		}
	});
}

function setQuotesSlider() {
	var slider = $('.section.second .quotes').lightSlider({
		item:      1,
    slideMove: 1,
    autoWidth: false,

    slideMargin:   0,
    galleryMargin: 0,
    thumbMargin: 0,

    auto:       false,
    freeMove:   false,
    enableDrag: true,
    pager: false,

    controls: false,

    onAfterSlide: function (el) {
    	$('.section.second .text > .nav-dots a').each(function (i) {
    		$(this).removeClass('active');
    		if ((i+1) == el.getCurrentSlideCount()) {
    			$(this).addClass('active');
    		}
    	});
    }
	});
	handleNavDotsClick(slider);
}

function handleCounterUp() {
	var currentCounter = 1;
	$('.counter'+ currentCounter).counterUp({
    delay: 10,
    time: 1000,
    callback: function() {
    	setInterval(function() {
		  	$('.counter'+ currentCounter).parent().hide();
		  	currentCounter++;
		  	if (currentCounter > 4) {
		  		currentCounter = 1;
		  	}
		  	$('.counter'+ currentCounter).parent().show();
		  	$('.counter'+ currentCounter).counterUp({
			    delay: 10,
			    time: 1000
			  });
		  }, 3020);
    }
  });
}

$(document).ready(function() {
	'use strict';
	handleDotsEventsOnTimelineScroll();
    $('.title h1').addClass('animate-scroll');
	setQuotesSlider();
	handleCounterUp();
	showFooter();
});