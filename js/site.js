---
---
;(function(){
    var isTouch = false //var to indicate current input type (is touch versus no touch)
    var isTouchTimer
    var curRootClass = '' //var indicating current document root class ("can-touch" or "")

    function addtouchclass(e){
        clearTimeout(isTouchTimer)
        isTouch = true
        if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
            curRootClass = 'can-touch'
            document.documentElement.classList.add(curRootClass)
        }
        isTouchTimer = setTimeout(function(){isTouch = false}, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
    }

    function removetouchclass(e){
        if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false
            curRootClass = ''
            document.documentElement.classList.remove('can-touch')
        }
    }

    document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
    document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
})();

$(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
        if (!$('#navbar').hasClass('scrolled')) {
            $('#navbar').addClass('scrolled');
        }
    } else {
        if ($('#navbar').hasClass('scrolled')) {
            $('#navbar').removeClass('scrolled');
        }
    }
});

function toggleMenu() {
    if (!$('#menu-toggle').hasClass('open')) {
        console.log("expand");
        $('#nav-container').addClass("expanded");
        $('#navbar').addClass("expanded");
        $('#menu-toggle').addClass("open");
    } else {
        $('#nav-container').removeClass("expanded");
        $('#navbar').removeClass("expanded");
        $('#menu-toggle').removeClass("open");
        console.log("retract");
    }
    console.log("dekimashita");
};

// for fixing timestamps to local time
$(function () {    
    $("time[data-format]").each(function () {
        var el = $(this);
        var dt = moment(el.attr("datetime"));
        el.text(dt.format(el.data("format")));
    });
});

$(document).on("click", '#comment-form-submit', function (event) {
    event.preventDefault();
    var form = $('#comment-form');

    $(form).addClass('disabled');
    $('#comment-form-submit').html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div> Loading...');

    $.ajax({
        type: "POST",
        url: "https://dev.staticman.net/v3/entry/github/{{site.repository}}/{{site.staticman.branch}}/comments",
        data: $(form).serialize(),
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            $('#comment-form-submit').html('Submit');
            $('.post-comments-form .js-notice').removeClass('notice--danger').addClass('notice--success');
            showAlert('<strong>Thank you for your comment!</strong> It will show on the site once it has been approved.');
        },
        error: function (err) {
            console.log(err);
            $('#comment-form-submit').html('Submit');
            $('.post-comments-form .js-notice').removeClass('notice--success').addClass('notice--danger');
            showAlert('<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again.');
            $(form).removeClass('disabled');
        }
    });

    return false;
});

function showAlert(message) {
    $('.post-comments-form .js-notice').removeClass('hidden');
    $('.post-comments-form .js-notice-text').html(message);
}