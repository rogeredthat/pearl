document.addEventListener('mousewheel', catchWheel, false);
var counter = 0;
function catchWheel(e) {
    delta = e.wheelDelta || e.deltaY;
    counter = (counter + (delta / 120));
    document.removeEventListener('mousewheel', catchWheel, false);
    $('.wrapper').css({
        "transform": "rotateZ(" + (counter * 90) + "deg)"
    });
    setTimeout(function() {
        $('.page.active').removeClass('active');
        var selector = '.page[pageId=' + (-(counter % 4)) + ']';
        console.log(selector);
        $(selector).addClass('active');
        document.addEventListener('mousewheel', catchWheel, false);
    }, 1000);
}
