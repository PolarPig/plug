# plug

##for self use

*toggle*

    $(document).ready(function () {
      $(".hidetext").hide();
      $("button").click(function () {
        $(".hidetext").toggle();
      });
    });

*tab*

    var $segments = $('.segment li');
    $segments.each(function (index, el) {
        var $el = $(el);
        $el.click(function () {
            $segments.removeClass('active');
            $el.addClass('active');
            $('.content').hide();
            $('.content:eq(' + index + ')').show();
        });
    });
    $('#case1').click();
