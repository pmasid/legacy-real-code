function showLoadingIconOnSearch() {
	var timer;
	$('#cases-search-dialog .fa-spinner').hide();
	$('#cases-search-dialog input[type="text"]').on('input', function() {
		$(this).attr('size', $(this).val().length);
		$('#cases-search-dialog .fa-spinner').show();
		clearTimeout(timer);
    timer = setTimeout(function () {
      $('#cases-search-dialog .fa-spinner').fadeOut();
      var classes = ['no-results', 'list-results'];
      $('#cases-search-dialog .results').addClass(classes[Math.floor(Math.random() * classes.length)]);
    }, 1000);
	});
}

function resetSearchModalOnClose() {
	$('#cases-search-dialog').on('hidden.bs.modal', function () {
		$('#cases-search-dialog .results').removeClass('no-results').removeClass('list-results');
		$('#cases-search-dialog input[type="text"]').val('');
		$('#cases-search-dialog input[type="text"]').siblings('.placeholder').removeClass('hide');
	});
}

$(document).ready(function() {
	showLoadingIconOnSearch();
	resetSearchModalOnClose();
	showFooter();
});