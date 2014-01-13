$(function () {
    // Fixed number
    var SLIDE_WIDTH = 1280;
    var SLIDE_HEIGHT = 800;
    var current_x = 0;
    var current_y = 0;
    var current_slide_number = 1;
    // initialize
    // width
    var slides = $('.slide').length;
    $("#contents").css("width", SLIDE_WIDTH * slides + "px");
    $(".slide").css("float", "left");

    // progress bar
    var progress_top = $(window).height() - 20;
    $(".progress").css("top", progress_top + "px");
    $("#progress-bar").css("width", (SLIDE_WIDTH/slides) * current_slide_number);

    function prev_slide() {
      current_x -= SLIDE_WIDTH;
      current_slide_number -= 1;
      $('body').animate({scrollLeft: current_x, scrollTop: current_y}, 1200);
    }

    function next_slide() {
      current_x += SLIDE_WIDTH;
      current_slide_number += 1;

      $('body').animate({ scrollLeft: current_x, scrollTop: current_y }, 1200);
      $("#progress-bar").css("width", (SLIDE_WIDTH/slides) * current_slide_number);
    }

    // next slide
    $(window).keydown(function (e) {
        if (e.which === 13 || e.which === 32 || e.which === 39) {
          next_slide();
        }
    });

    // back slide
    $(window).keypress(function (e) {
        if (e.which === 37 || e.which === 8) {
          prev_slide();
        }
    });

    var socket = io.connect('http:192.168.100.100:8080');

    socket.on('prev', function () {
        prev_slide();
    });

    socket.on('next', function () {
        next_slide();
    });

});
