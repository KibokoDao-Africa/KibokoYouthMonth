$(document).ready(function() {
	
	$(".tab-set .tab").on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (!$(this).hasClass("active")) {
			$(".tab").removeClass("active");
			$(this).addClass("active");
			$(".panel").removeClass("active");
			$(this).next(".panel").addClass("active");
		}
	});

});