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
    counter = (counter + (delta < 0 ? -1 : 1));
    console.log((counter + 4) % 4);
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
        $('.page[pageId=' + (((-counter + 4) % 4)) + ']').addClass('active');
        currentSlider = $('[anchor=' + ((-counter + 4) % 4) + ']').attr('id');
        console.log(((-counter + 4) % 4));
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
    } else
        return;
}
/*--------------------------------------------*/
$('document').ready(function() {
    if ($('#home_page').hasClass('inactive')) {
        listenersOfTheWheel(1);
    }
    $('#enter_site').click(function() {
        $('#home_page').addClass('inactive');
        listenersOfTheWheel(1);
    });
    $('#campus_location .button').click(function() {
        $('#contact').addClass('busting');
    });
    $('#home_page').addClass('ready');
    $('#enter_site').html('CONTINUE TO WEBSITE');
});
$('.bustiming .escape').click(function() {
    $('#contact').removeClass('busting');
});
//Initializing the carousel for headliners
var $next = $('#headliners > .card').eq(3);
//This stores the next card in the wait list
slider = setInterval(function() {
    $('#headliners.active_from_anchor > .card.active[order]').each(function(i, item) {
        if ($(item).attr('order') == '3') {
            $(item).removeClass('active').addClass('leaving');
            //Give the class 'leaving' to engage in animation
        } else if ($(item).attr('order') == '2') {
            $(item).attr('order', '3');
            //The carousel cards have absolute positioning
        } else if ($(item).attr('order') == '1') {
            //assigned via their order attribute
            $(item).attr('order', '2');
            //Swap the corresponding order values
        }
    });
    if ($('#headliners').hasClass('active_from_anchor')) {
        //Only if carousel is active
        $next.addClass('active').attr('order', 1);
        //on page, should the carousel iterate
        $next = $next.nextOrFirst();
        //hence the class check.
    }
    setTimeout(function() {
        $('#headliners.active_from_anchor > .card.leaving').removeClass('leaving').attr('order', false);
    }, 1000);
    //remove class 'leaving' after animation is over
}, 5000);
//Simple implementation of Slider
pro_shows = setInterval(function() {
    $('#pro_shows.active_from_anchor > .card.active').addClass('leaving').removeClass('active').nextOrFirst().addClass('active');
    setTimeout(function() {
        $('#pro_shows.active_from_anchor > .leaving').removeClass('leaving');
    }, 1500)
}, 5000);
var clearTime = null ;
//required for lights out timeout
$('#home_page:not(".inactive")').mousemove(function(e) {
    w = window.innerWidth / 2;
    h = window.innerHeight / 2;
    $(this).find('[data-depth]').each(function(i, item) {
        $(item).css('transform', 'translate(' + ($(this).data('depth') * 0.1 * (e.pageX - w)) + 'px,' + ($(this).data('depth') * 0.1 * (e.pageY - h)) + 'px)');
    });
    $(this).addClass('lit');
    if (clearTime)
        clearTimeout(clearTime);
    clearTime = setTimeout(function() {
        $('#home_page').removeClass('lit');
    }, 1000);
});
$('#team .dude').mouseover(function() {
    $('#details_of_peeps .dude[dude-anchor=' + $(this).attr('dude') + ']').addClass('active').siblings().removeClass('active');
});
$('#team').mouseout(function() {
    $('#details_of_peeps .dude').removeClass('active');
});
(function() {
  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, drawCircle2, drawCircle3, i, range, xpos;

  NUM_CONFETTI = 60;

  COLORS = [[255, 255, 255], [255, 144, 0], [255, 255, 255], [255, 144, 0], [0, 277, 235]];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("confeti");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  window.resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 2, y);
    context.lineTo(x + 2, y - 2);
    context.lineTo(x, y);
    context.closePath();
    context.fillStyle = style;
    return context.fill();
  };

  drawCircle2 = function(x, y, r, style) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 2, y);
    context.lineTo(x + 2, y - 2);
    context.lineTo(x, y);
    context.closePath();
    context.fillStyle = style;
    return context.fill();
  };

  drawCircle3 = function(x, y, r, style) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 2, y);
    context.lineTo(x + 2, y - 2);
    context.lineTo(x, y);
    context.closePath();
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.9;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 100 / 20);
    };
  })();

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
      drawCircle3(~~this.x * 0.5, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
      return drawCircle2(~~this.x * 1.5, ~~this.y * 1.5, this.r, this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti);
    }
    return results;
  })();

  window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    resizeWindow();
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();

}).call(this);
