/*------Extensions-------*/

//Returns the next or the first sibling
$.fn.nextOrFirst = function(selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}


var counter = 0;
//The scroll attempt handler
function catchWheel(e) {
    delta = e.wheelDelta || e.deltaY || e.detail;
    console.log(delta);
    counter = (counter + (delta < 0 ? -1 : 1));
    console.log(counter);
    listenersOfTheWheel(0);
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
        listenersOfTheWheel(1);
    }, 1500);
}

//Cross-browser attachment or detachment of the catchwheel handler to mousewheel
function listenersOfTheWheel(status) {
    if (status == 1) {
        document.addEventListener("DOMMouseScroll", catchWheel, false);
        document.addEventListener("mousewheel", catchWheel, false);
    } else if (status == 0) {
        document.removeEventListener("DOMMouseScroll", catchWheel, false);
        document.removeEventListener("mousewheel", catchWheel, false);
    } else return;
}
/*--------------------------------------------*/



$('document').ready(function() {
    if ($('#home_page').hasClass('inactive')) {
        listenersOfTheWheel(1);
    }
});

$('#enter_site').click(function() {
    $('#home_page').addClass('inactive');
    listenersOfTheWheel(1);
});

$('#campus_location .button').click(function(){
    $('#contact').addClass('busting');
})

$('.bustiming .escape').click(function(){
    $('#contact').removeClass('busting');
})

//Initializing the carousel for headliners

var $next = $('#headliners > .card').eq(3); //This stores the next card in the wait list

slider = setInterval(function() {
    $('#headliners.active_from_anchor > .card.active[order]').each(function(i, item) {
        if ($(item).attr('order') == '3') {                     
            $(item).removeClass('active').addClass('leaving');  //Give the class 'leaving' to engage in animation
        } else if ($(item).attr('order') == '2') {                  
            $(item).attr('order', '3');                         //The carousel cards have absolute positioning
        } else if ($(item).attr('order') == '1') {              //assigned via their order attribute
            $(item).attr('order', '2');                             //Swap the corresponding order values
        }
    });
    if ($('#headliners').hasClass('active_from_anchor')) {      //Only if carousel is active
        $next.addClass('active').attr('order', 1);              //on page, should the carousel iterate
        $next = $next.nextOrFirst();                            //hence the class check.
    }
    setTimeout(function() {
        $('#headliners.active_from_anchor > .card.leaving').removeClass('leaving').attr('order', false);
    }, 1000); //remove class 'leaving' after animation is over
}, 5000);

//Simple implementation of Slider
pro_shows = setInterval(function() {
    $('#pro_shows.active_from_anchor > .card.active').addClass('leaving').removeClass('active').nextOrFirst().addClass('active');
    setTimeout(function() {
        $('#pro_shows.active_from_anchor > .leaving').removeClass('leaving');
    }, 1500)
}, 5000);



var clearTime = null; //required for lights out timeout
$('#home_page:not(".inactive")').mousemove(function(e) {
    w = window.innerWidth / 2;
    h = window.innerHeight / 2;
    $(this).find('[data-depth]').each(function(i, item) {
        $(item).css('transform', 'translate(' + ($(this).data('depth') * 0.1 * (e.pageX - w)) + 'px,' + ($(this).data('depth') * 0.1 * (e.pageY - h)) + 'px)');
    });
    $(this).addClass('lit');
    if (clearTime) clearTimeout(clearTime);
    clearTime = setTimeout(function() {
        $('#home_page').removeClass('lit');
    }, 1000);
});

$('#team .dude').mouseover(function(){
    $('#details_of_peeps .dude[dude-anchor='+$(this).attr('dude')+']').addClass('active').siblings().removeClass('active');
});
$('#team').mouseout(function(){
    $('#details_of_peeps .dude').removeClass('active');
});