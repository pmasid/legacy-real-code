'use strict';

var is_mobile = false;
var countLogoAnimationOnSticky = 0;

function setIsMobileFlag() {
	if($('footer .addresses').css('display') == 'none') {
    is_mobile = true;
  }
}

function toggleNavMenu() {
	$('.nav-icon').on('click', function() {
		$('.nav-menu').fadeIn(function() {
			$('.nav-icon').addClass('close');
		});
	});
	$('.nav-icon.close').on('click', function() {
		$('.nav-menu').fadeOut(function() {
			$('.nav-icon').removeClass('close');
		});
	});
}

function toggleFooterNewsletterInputClass() {
	$('footer .newsletter fieldset legend').hide();
	$('footer .newsletter input[type="text"]').on('focus', function() {
		$('footer .newsletter fieldset').addClass('focus');
		$('footer .newsletter fieldset legend').show();
	});
	$('footer .newsletter input[type="text"]').on('blur', function() {
		$('footer .newsletter fieldset').removeClass('focus');
		$('footer .newsletter fieldset legend').hide();
	});
}

function stickyTopBar() {
	$('.top-bar')
		.sticky({ topSpacing:0 })
		.on('sticky-start', function() {
			if (!$('.top-bar').hasClass('is-sticky')) {
				$(this).addClass('is-sticky');
			}
		});
	if (countLogoAnimationOnSticky < 1) {
		setTimeout(function() {
			$('.logo').addClass('play');
		}, 500);
		countLogoAnimationOnSticky++;
	}
}

function unStickyTopBar(blnRmClass) {
	if (is_mobile) {
		var lastScrollTop = 0;
		$(window).scroll(function() {
			var st = $(this).scrollTop();
		  var scrolledY = st;
		  if (st > lastScrollTop) {
		  	if (scrolledY > 49) {
			  	scrolledY = 49;
			  	if ($('.top-bar').hasClass('is-sticky')) {
			  		$('.top-bar').removeClass('is-sticky');
			  	}
			  }
			  $('.top-bar').css('top', (-(scrolledY)) + 'px');
		  }

		  lastScrollTop = st;
		});
	}
	else {
		$('.top-bar').removeClass('is-sticky');
	}
	if (!blnRmClass && countLogoAnimationOnSticky < 1) {
		$('.logo').removeClass('play');
	}
	if (countLogoAnimationOnSticky > 0 && !$('.logo').hasClass('play')) {
		$('.logo').addClass('play');
	}
}

function setLogoMouseHover() {
	$('.logo').on('mouseenter', function() {
		$('.logo').removeClass('play');
	});
	$('.logo').on('mouseleave', function() {
		setTimeout(function() {
			$('.logo').addClass('play');
		}, 4500);
	});
}

function unStickyTopBarOnPageTop() {
	$('.top-bar').fadeOut(function() {
		$('.top-bar').show(0).addClass('short-top-space');
		unStickyTopBar(true);
		$('.top-bar').removeClass('short-top-space');
	});
}

function handleTopBarAnimationOnScroll() {
	var lastScrollTop = 0;
	$(window).scroll(function() {
		var st = $(this).scrollTop();

		if (st < 100) {
			$('.logo').addClass('play');
		}

		if (st > lastScrollTop) {
			// downscroll code
			unStickyTopBar(st < 100);
		}
		else {
		  // upscroll code
		  stickyTopBar();
		  if (st <= 20 && !is_mobile) {
		  	unStickyTopBarOnPageTop();
		  }
		}
		lastScrollTop = st;
	});

	setLogoMouseHover();
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function showNewsletterModal() {
	var email = $('footer .newsletter form input[type="email"]').val();
	if (isEmail(email)) {
		$('#newsletter-dialog form input[name="email"]').val(email);
		$('#newsletter-dialog').modal('show');
	}
	else {
		$('footer .newsletter form .input-message-validate').addClass('is-invalid').addClass('show');
	}
}

function checkNewsletterValidEmail() {
	$('footer .newsletter form button').on('click', function() {
		showNewsletterModal();
	});
	$('footer .newsletter form input[type="email"]').keydown(function (e){
    if (e.keyCode == 13) {
    	e.preventDefault();
      showNewsletterModal();
    }
	});

	$('#newsletter-dialog').on('hidden.bs.modal', function (e) {
		$('footer .newsletter form .input-message-validate').removeClass('show');
		$('footer .newsletter form input[type="email"]').val('');
	});
}

function handleCheckboxesClick() {
	$('.form-ctrl span.checkbox').on('click', function() {
		var realCheckbox = $('input[type="checkbox"][name="'+ $(this).attr('data-name') +'"][value="'+ $(this).attr('data-value') +'"]');
		if (realCheckbox.prop('checked')) {
			realCheckbox.prop('checked', false);
			$(this).parent().removeClass('selected');
		}
		else {
			realCheckbox.prop('checked', true);
			$(this).parent().addClass('selected');
		}
	});
}

function addInputCheckboxes() {
	var dataName = '',
		htmlCheckbox = '<div class="hidden">',
		form;

	if ($('.form-ctrl span.checkbox').length > 0) {
		$('.form-ctrl span.checkbox').each(function(index) {
			var currentDataName = $(this).attr('data-name'),
				currentDataValue = $(this).attr('data-value');

			if (currentDataName !== undefined && currentDataValue !== undefined) {
				form = $(this).parents('form');

				if (dataName != currentDataName) {
					dataName = currentDataName;
				}

				htmlCheckbox += '<input type="checkbox" name="'+ dataName +'" value="'+ currentDataValue +'" />';
			}
		});

		htmlCheckbox += '</div>';
		form.append(htmlCheckbox);

		handleCheckboxesClick();
	}
}

function showFooter() {
	$('footer').show();
}

function handleFormInputOnTyping() {
	$('.form__input input').keyup(function() {
    if ($(this).val().length > 0) {
    	$(this).parents('.form__input').removeClass('form__input--empty');
    }
    else {
    	$(this).parents('.form__input').addClass('form__input--empty');
    }
	});
}

function initFormSelect() {
	$('.form__input .form-select').each(function() {
		if ($(this).find('li.selected').length > 0) {
			$(this).parents('.form__input').removeClass('form__input--empty');
			$(this).find('a').append($(this).find('li.selected').text());
		}
		else {
			$(this).find('a').append($(this).find('li[data-value="default"]').text());
		}
	});
}

function handleFormSelectClick() {
	$('.form__input .form-select').on('click', function() {
		$(this).find('ul').toggle();
		if ($(this).hasClass('hide-next')) {
			$('.form__input.has-to-hide').toggleClass('hidden-visibility');
		}
	});
}

function handleFormSelectOptionClick() {
	$('.form__input .form-select li').on('click', function() {
		$(this).parents('ul').find('li').removeClass('selected');
		$(this).addClass('selected');
		$(this).parents('.form-select').find('a').html($(this).text() + '<i class="icon-base icon-arrow-down"></i>');
		$(this).parents('.form__input').removeClass('form__input--empty');
	});
}

function handleFormSelect() {
	initFormSelect();
	handleFormSelectClick();
	handleFormSelectOptionClick();
}

function handleFormInputFileUpload() {
	$('.form__input-file button').on('click', function() {
		$(this).parents('.form__input-file').find('input[type="file"]').trigger('click');
		$(this).parents('.form__input-file').find('input[type="file"]').on('change', function() {
			$(this).parents('.form__input-file').find('button')
				.append('<span>['+ $(this).val().replace(/.*(\/|\\)/, '') +']</span>');
		});
	});
}

function handleModalSearchInputPlaceholder() {
	$('input.modal-search-input')
    .focus(function() {
    	$(this).siblings('.placeholder').addClass('hide');
    })
    .blur(function() {
    	if ($(this).val().length <= 0) {
    		$(this).siblings('.placeholder').removeClass('hide');
    	}
    });
}

function handleTopBarOnStart() {
	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			$('.top-bar').removeClass('is-on-top');
		}
		else {
			$('.top-bar').addClass('is-on-top');
		}
	});
}

function handleNavDotsClick(slider, dotsAnchor) {
	$(dotsAnchor).each(function (i) {
		$(this).on('click', function() {
			slider.goToSlide(i);
			$(dotsAnchor).removeClass('active');
			$(this).addClass('active');
		});
		if (i == 0) {
			$(this).addClass('active');
		}
	});
}

function setQuotesSlider(quotesContainer, dotsAnchor) {
	var slider = $(quotesContainer).lightSlider({
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
    	$(dotsAnchor).each(function (i) {
    		$(this).removeClass('active');
    		if ((i+1) == el.getCurrentSlideCount()) {
    			$(this).addClass('active');
    		}
    	});
    }
	});
	handleNavDotsClick(slider, dotsAnchor);
}

$(document).ready(function() {
	$.material.init();

	setIsMobileFlag();

	toggleNavMenu();

	toggleFooterNewsletterInputClass();

	if (!is_mobile) {
		handleTopBarOnStart();
	}

	handleTopBarAnimationOnScroll();

	checkNewsletterValidEmail();

	addInputCheckboxes();

	handleFormInputOnTyping();

	handleFormSelect();

	handleFormInputFileUpload();

	handleModalSearchInputPlaceholder();
});