$.fn.nextOrFirst = function(selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}
$('document').ready(function() {
    document.addEventListener("DOMMouseScroll", catchWheel, false);
    document.addEventListener("mousewheel", catchWheel, false);
});
var counter = 0;
function catchWheel(e) {
    delta = e.wheelDelta || e.deltaY || e.detail;
    if (Math.abs(delta / 120) < 1) {
        delta = delta * 40;
    }
    counter = (counter + (delta / 120));
    document.removeEventListener("DOMMouseScroll", catchWheel, false);
    document.removeEventListener("mousewheel", catchWheel, false);
    $('.wrapper').css({
        "transform": "rotateZ(" + (counter * 90) + "deg)"
    });
    $('.active_from_anchor').removeClass('active_from_anchor');
    $('#backgrounds > div').eq(counter % 4).addClass('active').siblings().removeClass('active');
    $(".carriage").stop(true).animate({
        textIndent: (-counter * 90)
    }, {
        step: function(now, fx) {
            $(this).css('transform', 'rotate(' + (now) + 'deg)');
        },
        duration: 7000,
        easing: 'easeOutElastic'
    });
    $('.page.active').removeClass('active');
    setTimeout(function() {
        $('.page[pageId=' + (-(counter % 4)) + ']').addClass('active');
        currentSlider = $('[anchor=' + (-counter % 4) + ']').attr('id');
        $('#' + currentSlider).addClass('active_from_anchor');
        document.addEventListener("DOMMouseScroll", catchWheel, false);
        document.addEventListener("mousewheel", catchWheel, false);
    }, 1500);
}
var $next = $('#headliners > .card').eq(3);
slider = setInterval(function() {
    $('#headliners.active_from_anchor > .card.active[order]').each(function(i, item) {
        if ($(item).attr('order') == '3') {
            $(item).removeClass('active').addClass('leaving');
        } else if ($(item).attr('order') == '2') {
            $(item).attr('order', '3');
        } else if ($(item).attr('order') == '1') {
            $(item).attr('order', '2');
        }
    });
    if ($('#headliners').hasClass('active_from_anchor')) {
        $next.addClass('active').attr('order', 1);
        $next = $next.nextOrFirst();
    }
    setTimeout(function() {
        $('#headliners.active_from_anchor > .card.leaving').removeClass('leaving').attr('order', false);
    }, 1000);
}, 5000);
pro_shows = setInterval(function() {
    $('#pro_shows.active_from_anchor > .card.active').addClass('leaving').removeClass('active').nextOrFirst().addClass('active');
    setTimeout(function() {
        $('#pro_shows.active_from_anchor > .leaving').removeClass('leaving');
    }, 1500)
}, 5000);
