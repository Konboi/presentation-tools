$(function () {
    // Fixed number
    var SLIDE_WIDTH = 1280;
    var SLIDE_HEIGHT = 800;
    var current_x = 0;  
    var current_y = 0;

    // initialize
    // width
    var slides = $('.slide').length;  
    $("#contents").css("width", SLIDE_WIDTH * slides + "px");
    $(".slide").css("float", "left");

    // progress bar
    var progress_top = $(window).height() - 20;
    $(".progress").css("top", progress_top + "px");

    // next slide
    $(window).keypress(function (e) {
        if (e.which === 13 || e.which === 32 || e.which === 39) {
          current_x += SLIDE_WIDTH;
          $('body').animate({ scrollLeft: current_x, scrollTop: current_y }, 1200);
        }
    });

    // back slide
    $(window).keypress(function (e) {
        if (e.which === 37 || e.which === 8) {
          current_x -= SLIDE_WIDTH;
          $('body').animate({scrollLeft: current_x, scrollTop: current_y}, 1200);
        }
    });
});
