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

function handleNavImgClick(slider) {
	$('.highlight.gallery .nav-img a').on('click', function() {
		if ($(this).hasClass('prev')) {
			slider.goToPrevSlide();
		}
		else {
			slider.goToNextSlide();
		}
	});
}

function setGallerySlider() {
	var slider = $('.highlight.gallery ul').lightSlider({
		item:      1,
    slideMove: 1,
    autoWidth: false,

    slideMargin:   2,
    galleryMargin: 0,

    speed:  1500,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    auto:   false,
    loop:   true,
    slideEndAnimation: true,
    pause:    4000,
    freeMove: false,
    enableDrag: false,

    controls: false,

    onSliderLoad: function (el) {
    	$(el).find('li > img').height($(el).height());
    }
	});
	handleNavImgClick(slider);
}

$(document).ready(function() {
	showLoadingIconOnSearch();
	resetSearchModalOnClose();
	if (is_mobile) {
		setGallerySlider();
	}
	showFooter();
});