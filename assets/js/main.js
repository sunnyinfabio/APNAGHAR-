$(function () {
    $('main').css("margin-top", $('header').height())
    $(window).on('scroll', function (e) {
        $(this).scrollTop() > ($(window).height()) / 100 ? $('header').addClass("header-fixed") : $('header').removeClass("header-fixed");
    })
    $('.datepickerDefault').datepicker({
        minDate: 0,
        firstDay: 0,
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'DD, d MM, yy',
        onSelect: function (selectedDate) {
            $(this).parent('.form-group').addClass('valid');
            $(this).siblings('label').addClass('valid');
        }
    });
    // Login Model
    //$('.get_otpBtn').on('click', function(e){
    //    e.preventDefault();
    //    $('.login-otp-form').slideDown()
    //    $('.login_form').slideUp()
    //})
    $('.btn_goback').on('click', function (e) {
        e.preventDefault();
        $('.login-otp-form').slideUp()
        $('.login_form').slideDown()
    })
    // Open Model
    $('.model-open').on('click', function (e) {
        e.preventDefault();
        var model = $(this).attr('data-model');
        $(".overlay").addClass('overlay_active');
        $(model).addClass('is-open');
    });
    // Close Model
    $('.close_model').on('click', function () {
        $(this).parents('.model').removeClass('is-open');
        $(".overlay").removeClass('overlay_active');
        $('.video_full iframe').attr('src', '');
    });


    $('.overlay').on('click', function () {        
        if($('.Popup_Book_ParkModel.is-open').length > 0){
            location.reload();
        }
        $('.model').removeClass('is-open');
        $(this).removeClass('overlay_active');
    });

    $('.model-video').on('click', function () {
        var src = $(this).attr('data-video');
        $('.video_full iframe').attr('src', src);
    });
    $(".close_model").click(function () {
        $(".Modelreview").removeClass('is-open');
        $("body").css("overflow-y", "scroll");
    });

    $('.overlay').on('click', function () {
        $('body').removeClass('hiddenY');
        $(this).parent('.model').removeClass('is-open');
    });

    $(".menu_li").each(function () {
        $(this).click(function () {
            $(this).find('.side-sub-menu').slideToggle();
            $(this).siblings().find('.side-sub-menu').slideUp()
        })

    });
    $('.close_book_model').click(function () {
        $('.Popup_Book_ParkModel').removeClass('is-open');
    });
    $('.form-control').each(function () {
        $(this).val() != '' ? $(this).parent('.form-group').addClass('valid') : $(this).parent('.form-group').removeClass('valid');
    });
    $('.form-control').on('change', function () {
        $(this).val() != '' ? $(this).parent('.form-group').addClass('valid') : $(this).parent('.form-group').removeClass('valid');
    });
    $('.form-group input').focus(function () {
        $(this).siblings('label').addClass('valid');
    })
    $('.form-group input').focusout(function () {
        if ($(this).val() == '') {
            $(this).siblings('label').removeClass('valid');
        } else {
            $(this).siblings('label').addClass('valid');
        }
    })
    if ($('.form-group input').val() == '') {
        $(this).siblings('label').removeClass('valid');
    }
    $('.chckbx input').click(function () {
        if ($(this).is(':checked')) {
            $(this).addClass('active')
        }
        else {
            $(this).removeClass('active')
        }
    });
})
$("#myfile").change(function () {
    if ($("#myfile").val() == '') {
        $(this).removeClass('valid');
    } else {
        $(this).addClass('valid');
    }
})

var totaldots = $('.cola_wrapper .nav_dots ul li').length;
var totaltabs = $('.content_colb .cont').length;
if (totaldots > totaltabs) {
    $('.cola_wrapper .nav_dots ul li').slice(totaltabs).remove()
}

$('.cola_wrapper .nav_dots ul li').on('click', function (e) {
    var currentAttrValue = jQuery(this).attr('data-attr');
    $('.content_cola .card[data-attr=' + currentAttrValue + ']').fadeIn(400).siblings().hide();
    $('.content_colb .cont[data-attr=' + currentAttrValue + ']').addClass('active').siblings().removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    e.preventDefault();
});

$('.upper_nav ul li a').on('click', function (e) {
    $(this).parent().addClass('active').siblings().removeClass('active');
    var datatab = $(this).parent().attr('data-tab');
    $('.event_wrapper .event_demo[data-tab=' + datatab + ']').fadeIn(400).siblings().hide();
    e.preventDefault();
});


$('.scrolltopakage').click(function () {
    $('html, body').animate({
        scrollTop: $(".amusement_secE").offset().top
    }, 1000);
})
if ($(window).width() < 992) {
    $('.accom-slider .left_image').remove();
    $('.accom-slider .right_image').remove()
}
$(function () {

    //owl carousel
    $('.banner-slider').owlCarousel({
        items: 4,
        margin: 0,
        autoplay: false,
        nav: true,
        navText: ['<img src="assets/icons/left.png" />', '<img src="assets/icons/right.png" />'],
        dots: false,
        loop: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            520: {
                items: 2
            },
            768: {
                items: 3
            },
            991: {
                items: 4
            },
        }
    });
    $('.banner-slider').find('.owl-item.active').not(":first").on('mouseover', function(){
        $('.banner-slider .owl-item:not(.cloned)').eq(0).addClass('current');
        $('.banner-slider .owl-item:not(.cloned)').eq(0).children('.item').removeClass('active');
    });
    $('.banner-slider').find('.owl-item.active').not(":first").on('mouseout', function(){
        $('.banner-slider .owl-item:not(.cloned)').eq(0).removeClass('current');
        $('.banner-slider .owl-item:not(.cloned)').eq(0).children('.item').addClass('active');
    });
    $('.testi-slider').owlCarousel({
        items: 1,
        margin: 0,
        autoplay: true,
        nav: false,
        navText: ['<img src="assets/icons/left.png" />', '<img src="assets/icons/right.png" />'],
        dots: true,
        loop: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            675: {
                items: 1
            },
            991: {
                items: 1
            },
        }
    });
    $('.head-slider').owlCarousel({
        items: 4,
        margin: 25,
        autoplay: true,
        nav: false,
        navText: ['<img src="assets/icons/left.png" />', '<img src="assets/icons/right.png" />'],
        dots: true,
        loop: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            675: {
                items: 1
            },
            991: {
                items: 4
            },
        }
    });

    var testiSlider = $('.accom-slider');
    testiSlider.owlCarousel({
        items: 3,
        loop: false,
        rewind: true,
        center: true,
        pagination: false,
        margin: 0,
        autoplay: false,
        startPosition: 1,
        nav: true,
        dots: false,
        smartSpeed: 2000,
        slideBy:3,
        navText: ['<img src="assets/icons/left_black.png" />', '<img src="assets/icons/right_black.png" />'],
        responsive: {
            0: {
                items: 1.2,
                nav: false,
                dots: true,
                margin: 8,
                loop: true,
                rewind: false,
                center: false,
                startPosition: 0,
            },
            675: {
                items: 2,
                margin: 10,
                nav: false,
                dots: true,
                loop: true,
                rewind: false,
                center: false,
                startPosition: 0,
            },
            991: {
                items: 3,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
                freeDrag: false,
            }
        },
        onDragged: callback,
    });
    $(".center").next().addClass("next");
    $(".center").prev().addClass("prev");
    function callback(event) {
        $(".owl-item").removeClass("next");
        $(".owl-item").removeClass("prev");
        $(".center").next().addClass("next");
        $(".center").prev().addClass("prev");
        $('.center').find('.info_card,.info_slide').addClass('active');
        $(".center").prev().find('.info_card,.info_slide').removeClass('active')
        $(".center").next().find('.info_card,.info_slide').removeClass('active')
    }


    $('.accom-slider .owl-nav button.owl-next,button.owl-prev').click(function () {
        callback();
    })
    var eventSlider = $('.event-slider');
    function event_demo(event) {
        eventSlider.owlCarousel({
            items: 2.5,
            loop: true,
            center: true,
            pagination: true,
            margin: 0,
            autoplay: false,
            nav: true,
            dots: false,
            smartSpeed: 1000,
            navText: ['<img src="assets/icons/left.png" />', '<img src="assets/icons/right.png" />'],
            responsive: {
                0: {
                    items: 1.2,
                    nav: false,
                    dots: true,
                    navText: false,
                    center: false,
                    margin: 10
                },
                675: {
                    items: 2,
                    margin: 10
                },
                991: {
                    items: 3,
                }
            },
            onDragged: callback,
        });
        callback()
        $('.event-slider .owl-nav button.owl-next,button.owl-prev').click(function () {
            callback();
        })
    }
    event_demo();
    callback()
    eventSlider.on('initialized.owl.carousel', function (event) {
        callback();
    })
    eventSlider.on('changed.owl.carousel.owl.carousel', function (event) {
        callback();
    })
    $('.upper_nav ul li a').click(function () {
        eventSlider.trigger('destroy.owl.carousel');
        event_demo();
        e.preventDefault();
    })


})

