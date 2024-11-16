$(document).ready(function(){
    $(".plus").on('click',function(){
        $('.count').val(parseInt($('.count').val()) + 1);
        if ($('.count').val() == 26) {
            $('.count').val(25);
        }
    });

    $(".minus").on('click',function(){
        $('.count').val(parseInt($('.count').val()) - 1);
        if ($('.count').val() == 0) {
            $('.count').val(1);
        }
    });
});