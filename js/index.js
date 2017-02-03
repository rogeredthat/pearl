wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : //     Modern browsers support "wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
          "DOMMouseScroll";
document.addEventListener(wheelEvent, catchWheel, false);
var counter = 0;
function catchWheel(e) {
    delta = e.wheelDelta || e.deltaY;
    counter = (counter + (delta / 120));
    document.removeEventListener(wheelEvent, catchWheel, false);
    $('.wrapper').css({
        "transform": "rotateZ(" + (counter * 90) + "deg)"
    });
    $('.active_from_anchor').removeClass('active_from_anchor');
    $('[anchor='+(counter%4)+']').addClass('active_from_anchor');
    $('#backgrounds > div').eq(counter%4).addClass('active').siblings().removeClass('active');
    $(".carriage").stop(true).animate({
        textIndent: (-counter * 90)
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + (now) + 'deg)');
        },
        duration: 7000,
        easing: 'easeOutElastic'
    });
    setTimeout(function() {
        $('.page.active').removeClass('active');
        var selector = '.page[pageId=' + (-(counter % 4)) + ']';
        $(selector).addClass('active');
        document.addEventListener(wheelEvent, catchWheel, false);
    }, 1500);
}
