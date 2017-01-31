
$(document).ready(function () {
    $('#nav li').click(function(){
        $(this).removeClass('stacked').addClass('open').siblings().filter(".enabled").removeClass('open').addClass('stacked');
    });
    $('#nav li .escape').click(function(e){
        $(this).parent().removeClass('open').siblings().filter(".enabled").removeClass('stacked');
        e.stopPropagation();
    });
    $('#sidebar > ul > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('#nav > li.enabled').removeClass('enabled');
        var category = ($(this).data('category'));
        console.log(category);
        $("#nav > li[data-category=" + category + "]").addClass('enabled');
    })
});