
$(document).ready(function () {
    
//     $('#nav').children('li').first().children('a').addClass('active')
//         .next().addClass('is-open').show(500);
        
//     $('#nav').on('click', 'li > a', function() {
        
//       if (!$(this).hasClass('active')) {

//         $('#nav .is-open').removeClass('is-open').hide(500);
//         $(this).next().toggleClass('is-open').toggle(500);
          
//         $('#nav').find('.active').removeClass('active');
//         $(this).addClass('active');
//       } else {
//         $('#nav .is-open').removeClass('is-open').hide(500);
//         $(this).removeClass('active');
//       }
//    });

    $('#nav li').click(function(){
        $(this).removeClass('stacked').addClass('open').siblings().removeClass('open').addClass('stacked');
    });
    $('#nav li .escape').click(function(e){
        $(this).parent().removeClass('open').siblings().removeClass('stacked');
        e.stopPropagation();
    });
});