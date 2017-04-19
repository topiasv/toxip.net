$(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
        if (!$('.navbar').hasClass('scrolled')) {
            $('.navbar').addClass('scrolled');
        }
    } else {
        if ($('.navbar').hasClass('scrolled')) {
            $('.navbar').removeClass('scrolled');
        }
    }
});
