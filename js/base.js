$(function () {
    var socket = io.connect('http:192.168.100.100:8080');

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
        e.preventDefault();
        if (e.which === 13 || e.which === 32 || e.which === 39) {
          next_slide();
        }

        if (e.which === 37 || e.which === 8) {
          prev_slide();
        }
    });

    $('#q1-true').click(function () {
        socket.emit('question', 1, true);
        var count = $("#result-1-true").html();
        count =  parseInt(count, 10) + 1;
        $("#result-1-true").html(count);
    });

    $('#q1-false').click(function () {
        socket.emit('question', 1, false);
        var count = $("#result-1-false").html();
        count =  parseInt(count, 10) + 1;
        $("#result-1-false").html(count);
    });

    socket.on('prev', function () {
        prev_slide();
    });

    socket.on('next', function () {
        next_slide();
    });

    socket.on('answer', function (res) {
        var count = $("#result-" + res.question + "-" + res.answer).html();
        count = parseInt(count) + 1;
        $("#result-" + res.question + "-" + res.answer).html(count);
    });
});
