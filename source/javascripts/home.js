'use strict';

var loadedElements = 0,
	totalElements = 0,
	loader,
  loaderProgress = $('.loader svg #fill'),
  progress = 0,
	elementTimer = $('.loader .counter p:last-child'),
  storage = window.localStorage;

if (!storage.cachedElements) {
  storage.cachedElements = "";
}

function logCache(source) {
  if (storage.cachedElements.indexOf(source, 0) < 0) {
    if (storage.cachedElements != "") {
      storage.cachedElements += ";";
    }
    storage.cachedElements += source;
  }
}

function cached(source) {
  return (storage.cachedElements.indexOf(source, 0) >= 0);
}

function toggleIconScrollAnimation() {
	setInterval(function(){
		$('.icon-scroll .mouse .wheel').toggleClass('paused');
	}, 4000);
}

function setIndustrySlider() {
	$('.industry-list-box').hide();
	$('button.list-industries').on('click', function() {
		$('section.industry .text').addClass('move-left');
		$('.industry-list-box').css('visibility', 'hidden');
		$('.industry-list-box').fadeIn(500, function() {
			$('.industry-list').lightSlider({
				item:      2,
		    slideMove: 2,
		    autoWidth: false,

		    slideMargin:   0,
		    galleryMargin: 0,

		    speed:  1500,
		    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
		    auto:   true,
		    loop:   true,
		    slideEndAnimation: true,
		    pause:    4000,
		    freeMove: false,
		    enableDrag: false,

		    controls: false,

		    responsive : [
          {
            breakpoint: 767,
            settings: {
              item: 1,
              slideMove: 1,
              slideMargin: 0
            }
          }
        ],

		    onSliderLoad: function (el) {
		    	$('.industry-list-box .lSPager')
					.append('<i class="fa fa-angle-left" aria-hidden="true"></i>')
					.append('<i class="fa fa-angle-right" aria-hidden="true"></i>');

					$('.industry-list-box .lSPager .fa-angle-left').on('click', function() {
						el.goToPrevSlide();
					});
					$('.industry-list-box .lSPager .fa-angle-right').on('click', function() {
						el.goToNextSlide();
					});
					$('.industry-list-box').css('visibility', 'visible');
		    }
			});
		});
	});
}

function loadAllPage() {
	$('section:not(.initial)').show();
	showFooter();
}

function showContentInOrder() {
	elementTimer.parent().hide();

	$('.loader').addClass('loaded');
	$('.loader').fadeOut('slow', function() {
		$('body').removeClass('loading');
		setTimeout(function() {
			$('.title h1').addClass('animate-scroll');
			$('.title h3').show().addClass('animated slideInUp');
		}, 400);
		setTimeout(function() {
			$('.icon-scroll').show().addClass('animated fadeIn');
			loadAllPage();
			loader.progress(0);
		}, 800);
	});
}

function setProgress() {
	progress = ((loadedElements / totalElements).toFixed(2))*100;

	loader.to(loaderProgress, 0.08, { y:(100 - progress)+'%', ease:Linear.easeNone })
		.to(elementTimer, 0.08, {onUpdate: setProgressCounter, onUpdateParams:[progress] });
}

function setProgressCounter(obj) {
	elementTimer.text(obj.toFixed(0)+'%');
}

function updateProgress(item) {
	loadedElements++;
  setProgress();
  logCache(item);
}

function setLoader() {

	var tmax_optionsGlobal = {
	  delay: 0.25,
	  onComplete: showContentInOrder
	};
	loader = new TimelineMax(tmax_optionsGlobal);

  if (sessionStorage.getItem('firstAccess') === 'false') {
		return false;
	}

	return true;
}

function getallBgimages(){
	var url, B=[], A=document.getElementsByTagName('*');
	A = B.slice.call(A, 0, A.length);
	while(A.length){
		url= document.deepCss(A.shift(),'background-image');
		if(url) url=/url\(['"]?([^")]+)/.exec(url) || [];
		url= url[1];
		if(url && B.indexOf(url)== -1) B[B.length]= url;
	}
	return B;
}

document.deepCss = function(who, css) {
	if(!who || !who.style) return '';
	var sty= css.replace(/\-([a-z])/g, function(a, b) {
		return b.toUpperCase();
	});
	if(who.currentStyle) {
		return who.style[sty] || who.currentStyle[sty] || '';
	}
	var dv= document.defaultView || window;
	return who.style[sty] ||
	dv.getComputedStyle(who,"").getPropertyValue(css) || '';
}

Array.prototype.indexOf = Array.prototype.indexOf || function(what, index) {
	index = index || 0;
	var L = this.length;
	while(index< L){
		if(this[index]=== what) return index;
		++index;
	}
	return -1;
}

function img_find() {
  var imgs = document.getElementsByTagName("img");
  var imgSrcs = [];

  for (var i = 0; i < imgs.length; i++) {
  	if(imgs[i].src && imgSrcs.indexOf(imgs[i].src) == -1) {
  		imgSrcs.push(imgs[i].src);
  	}
  }
  return imgSrcs;
}

function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function checkFontAwesome() {
	var span = document.createElement('span');

  span.className = 'fa';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);

  var icons = document.getElementById('icons');
  if ((css(span, 'font-family')) === 'FontAwesome') {
  	updateProgress();
  	document.body.removeChild(span);
    return true;
  } else {
    checkFontAwesome();
  }
}

function loadImages() {
	var imgs = getallBgimages();
	imgs = imgs.concat(img_find());

	totalElements += imgs.length;

	jQuery.each(imgs, function(index, item) {
    $("<img/>")
    .on('load', function() {
    	updateProgress(item);
    })
    .on('error', function() {
    	console.log('Error loading image: '+ $(this).attr('src'));
    })
    .attr("src", item);
	});
}

function loadFonts() {
	var fonts = [
		'Flexo',
		'Flexo-Bold',
		'Flexo-Light'
	];

	totalElements += fonts.length;

	jQuery.each(fonts, function(index, item) {
		fontSpy(item, {
		  success: function() {
		  	updateProgress(item);
		  },
		  failure: function() {
				console.log('Error loading font: '+ item);
		  }
		});
	});
}

function loadFontAwesome() {
	totalElements += 1;
	checkFontAwesome();
}

function navMenuAnchorClick() {
	$('.nav-menu .nav-box .anchor').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
      	$('.nav-menu').fadeOut(function() {
					$('.nav-icon').removeClass('close');
				});
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
	});
}

$(document).ready(function() {

	var loaderIsActive = setLoader();

	if (loaderIsActive) {
		loadImages();
		loadFonts();
		loadFontAwesome();
	}

	toggleIconScrollAnimation();

	setIndustrySlider();

	navMenuAnchorClick();
});