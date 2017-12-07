function showLoadingIconOnSearch() {
	var timer;
	$('#clients-search-dialog .fa-spinner').hide();
	$('#clients-search-dialog input[type="text"]').on('input', function() {
		$(this).attr('size', $(this).val().length);
		$('#clients-search-dialog .fa-spinner').show();
		clearTimeout(timer);
    timer = setTimeout(function () {
      $('#clients-search-dialog .fa-spinner').fadeOut();
      var classes = ['no-results', 'list-results'];
      $('#clients-search-dialog .results').addClass(classes[Math.floor(Math.random() * classes.length)]);
    }, 1000);
	});
}

function resetSearchModalOnClose() {
	$('#clients-search-dialog').on('hidden.bs.modal', function() {
		$('#clients-search-dialog .results').removeClass('no-results').removeClass('list-results');
		$('#clients-search-dialog input[type="text"]').val('');
		$('#clients-search-dialog input[type="text"]').siblings('.placeholder').removeClass('hide');
	});
}

function modalDetailsOnScroll() {
	var lastScrollTop = 0;
	var limitScroll = 0;
	var speed = 4.5;
	$('#clients-details-dialog .modal-body .client').scroll(function() {
		var st = $(this).scrollTop();
		var posY = $(this).find('.client-img .box-top').css('top');
		posY = parseInt(posY.replace('px',''));

		if (st == 0) {
			limitScroll = 0;
		}

		if (st > lastScrollTop){
			// downscroll code
			if (posY <= -($(this).find('.client-img .box-top').height()/2)) {
				if (limitScroll == 0) {
					limitScroll = st;
				}
				$(this).find('.client-info').css('margin-top', limitScroll);
			}
			else {
				posY -= speed;
				$(this).find('.client-info').css('margin-top', st);
			}
		} else {
		  // upscroll code
		  if (posY <= -($(this).find('.client-img .box-top').height()/2)) {
		  	if (st > limitScroll) {
		  		$(this).find('.client-info').css('margin-top', limitScroll);
		  	}
		  	else {
		  		posY += speed;
		  		$(this).find('.client-info').css('margin-top', st);
		  	}
		  }
		  else {
		  	posY += speed;
		  	$(this).find('.client-info').css('margin-top', st);
		  }
		}
		lastScrollTop = st;

		$(this).find('.client-img .box-top').css('top', posY+'px');
		$(this).find('.client-img .box-bottom').css('bottom', -posY+'px');
	});
}

$(document).ready(function() {
	showLoadingIconOnSearch();
	resetSearchModalOnClose();
	console.log(is_mobile);
	if (!is_mobile) {
		modalDetailsOnScroll();
	}
	setQuotesSlider('.quotes', '.main-clients > .nav-dots a');
	showFooter();
});