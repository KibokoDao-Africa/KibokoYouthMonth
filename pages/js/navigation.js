$(function() {
	$(".toggle a").on("click", function(e) {
		e.preventDefault();

		// Home page

		if ($("body.home-page .nav").hasClass("active")) {
			$("body.home-page .nav").removeClass("active");
		} else {
			$("body.home-page .nav").addClass("active");
		}

		// Burger menu

		if ($(".item").hasClass("active")) {
			$(".item").removeClass("active");
			$(".toggle-open").show();
			$(".toggle-close").hide();
		} else {
			$(".item").addClass("active");
			$(".toggle-close").show();
			$(".toggle-open").hide();
		}
	});

	// Mobile home page background
	
	var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	if (ismobile){
		$('body.home-page').css('background-attachment','scroll');
	}

});