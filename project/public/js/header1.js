$(function () {
    var $li = $(".navbar-nav>li");
    var $a = $(".navbar-nav>li>a");
    var $span = $(".navbar-nav>li>a>span");
    var $ul = $(".navbar-nav>li>ul");

    window.onload = function () {
        window.onresize = adjust;
        adjust();
    }
    function adjust() {
        if ($(window).innerWidth() < 750) {
            //用for遍历时用bind绑定
            $span.each(function (index, element) {
                $(this).mouseenter(function () {
                    $ul.eq(index).css("display", "none");
                });
            })
            $("nav").attr("class", "navbar header-top navbar-fixed-top");
        }
        else {
            $span.each(function (index, element) {
                $(this).mouseenter(function () {
                    $ul.eq(index).css("display", "block");
                });
            })
            $("nav").attr("class", "navbar header-top");
            if ($(window).innerWidth() > 1900) {
                //普通横幅
                $(".hid").css("width", "100%");
                $(".hid").css("left", "0px");
                //轮播图
                $(".hidd").css("width", "100%");
                $(".hidd").css("left", "0px");
            } else {
                //普通横幅
                $(".hid").css("width", "1920px");
                var x = parseInt($(".container").css("marginLeft")) - 365;
                $(".hid").css("left", x);
                //轮播图
                $(".hidd").css("width", "1920px");
                if ($(window).innerWidth() > 1200) {
                    var x = parseInt($(".container").css("marginLeft")) - 365;
                } else if ($(window).innerWidth() > 992) {
                    var x = parseInt($(".container").css("marginLeft")) - 470;
                } else if ($(window).innerWidth() > 768) {
                    var x = parseInt($(".container").css("marginLeft")) - 600;
                }
                $(".hidd").css("left", x);
            }

        }
    }
    $a.click(function () {
        $a.attr("class", "");
        $(this).attr("class", "activee");
    });
    $li.mouseleave(function () {
        $ul.css("display", "none");
    });
})