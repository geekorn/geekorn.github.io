// Шаги алгоритма ECMA-262, 6-е издание, 22.1.2.1
// Ссылка: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
    Array.from = (function() {
        var toStr = Object.prototype.toString;
        var isCallable = function(fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // Свойство length метода from равно 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Положим C равным значению this.
            var C = this;

            // 2. Положим items равным ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. Если mapfn равен undefined, положим mapping равным false.
            var mapFn = arguments[1];
            if (typeof mapFn !== 'undefined') {
                mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                // 5. иначе
                // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Положим lenValue равным Get(items, "length").
            // 11. Положим len равным ToLength(lenValue).
            var len = toLength(items.length);

            // 13. Если IsConstructor(C) равен true, то
            // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
            //     объекта C со списком аргументов, содержащим единственный элемент len.
            // 14. a. Иначе, положим A равным ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Положим k равным 0.
            var k = 0;
            // 17. Пока k < len, будем повторять... (шаги с a по h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Положим putStatus равным Put(A, "length", len, true).
            A.length = len;
            // 20. Вернём A.
            return A;
        };
    }());
}

$(document).ready(function () {

    /*---------------------------
     YA MAPS
     ---------------------------*/
    ymaps.ready(initMap);
    var myMap;

    function initMap() {
        myMap = new ymaps.Map("map", {
            center: [55.703131, 37.743225],
            zoom: 15,
            controls: ["routeEditor"]
        });

        myMap.behaviors.disable('scrollZoom');

        myMap.controls.add("zoomControl", {
            size: 'small',
            position: {
                left: 10,
                top: 300
            }
        });
    }


    /*---------------------------
     FIXED MENU
     ---------------------------*/
    $(function () {
        var $element = $('.header__bottom'),
            className = 'header__bottom_pos_fixed',
            top = $element.offset().top;

        $(window).on('scroll', function (event) {
            event.preventDefault();

            $element.toggleClass(className, $(this).scrollTop() >= top);
        });
    });

    $('.menu-btn').click(function () {
        var menu = $('.header-menu');

        if (!menu.hasClass('menu_open')) {
            menu.addClass('menu_open')
                .animate({
                    'right': "0",
                    'left': '0'
                });
            $(this).addClass('menu-btn_open');
            // $(document).
        } else {
            menu.removeClass('menu_open')
                .animate({
                    'right': "auto",
                    'left': '100%'
                });
            $(this).removeClass('menu-btn_open');
        }
    });


    /*---------------------------
     PAGE ANCHORS / MENU
     ---------------------------*/

    $('.nav__link').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 90
        }, 800);
        return false;
    });

    /*---------------------------
     ACTIVATE MENU ITEM OVER CURRENT SECTION
     ---------------------------*/
    var $sections = $('section');
    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        var $currentSection;

        $sections.each(function () {
            var divPosition = $(this).offset().top;

            if (divPosition - 90 < currentScroll) {
                $currentSection = $(this);

                var id = $currentSection.attr('id');

                $('.nav__item').removeClass('nav__item_active');
                $('[href="#' + id + '"]').parent('.nav__item').addClass('nav__item_active');
            }


        })
    });

    /*---------------------------
     PRODUCTS TABS
     ---------------------------*/

    $('.tabs-controls__item:eq(0)').addClass('tabs-controls__item_active');
    $('.tabs-content__item:eq(0)').addClass('tabs-content__item_active');

    $('.tabs-controls__item').click(function () {
        var target = $(this).data('products');

        $(this).siblings().removeClass('tabs-controls__item_active');
        $(this).addClass('tabs-controls__item_active');
        $('.tabs-content__item').removeClass('tabs-content__item_active');
        $('.' + target + '').addClass('tabs-content__item_active');

    });


    /* ---portfolio filter--- */

    $('.works-filter__item').click(function (e) {
        e.preventDefault();

        $(this).addClass('works-filter__item_active')
            .siblings()
            .removeClass('works-filter__item_active');

        var itemCategory = $(this).text().toLowerCase();

        if ($(window).width() <= 550) {
            var imgWidth = 100 / 2 + '%';
        } else if ($(window).width() <= 960) {
            imgWidth = 100 / 3 + '%';
        } else {
            imgWidth = 100 / 4 + '%';
        }

        console.log(imgWidth)

        if (itemCategory !== 'все') {

            $('.portfolio__card[data-filter="' + itemCategory + '"]').stop()
                .animate({
                    'opacity': 1,
                    // 'visibility': 'visible',
                    'width': imgWidth
                });

            $('.portfolio__card[data-filter!="' + itemCategory + '"]').stop()
                .animate({
                    'opacity': 0,
                    // 'visibility': 'hidden',
                    'width': 0
                });
        } else {
            $('.portfolio__card').stop()
                .animate({
                    'opacity': 1,
                    // 'visibility': 'visible',
                    'width': imgWidth
                });
        }
    });

    $('.works-filter-select').change(function(e) {
        var category = $('option:selected', this).val();
        var imgWidth = '50%';

        if (category === 'все') {
            $('.portfolio__card').stop()
                .animate({
                    'opacity': 1,
                    'width': imgWidth
                });
        } else {
            $('.portfolio__card[data-filter="' + category + '"]').stop()
                .animate({
                    'opacity': 1,
                    // 'visibility': 'visible',
                    'width': imgWidth
                });

            $('.portfolio__card[data-filter!="' + category + '"]').stop()
                .animate({
                    'opacity': 0,
                    // 'visibility': 'hidden',
                    'width': 0
                });
        }
    });

    /* ---SLIDER--- */
    $('.slider').slick({
        prevArrow: $('.slider-btn_prev'),
        nextArrow: $('.slider-btn_next')
    });

    /* ---SLIDER PRODUCTS FOR PHONE--- */
    if ($(window).width() <= 500) {
        $('.tabs-content').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.tabs-controls'
        });
        $('.tabs-controls').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.tabs-content',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            variableWidth: true
        });
    }

    /* ---POP-UP--- */
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    /* --- --- */
    $('.portfolio').magnificPopup({
        delegate: '.portfolio__link',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.data('title') + '<small>' + $('.portfolio__desc', item.el).text() + '</small>';
            }
        }
    });


});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vINCo0LDQs9C4INCw0LvQs9C+0YDQuNGC0LzQsCBFQ01BLTI2MiwgNi3QtSDQuNC30LTQsNC90LjQtSwgMjIuMS4yLjFcclxuLy8g0KHRgdGL0LvQutCwOiBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtYXJyYXkuZnJvbVxyXG5pZiAoIUFycmF5LmZyb20pIHtcclxuICAgIEFycmF5LmZyb20gPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICAgICAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoaXNOYU4obnVtYmVyKSkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7IHJldHVybiBudW1iZXI7IH1cclxuICAgICAgICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgICAgIHZhciB0b0xlbmd0aCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDQodCy0L7QudGB0YLQstC+IGxlbmd0aCDQvNC10YLQvtC00LAgZnJvbSDRgNCw0LLQvdC+IDEuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcEZuLCB0aGlzQXJnICovKSB7XHJcbiAgICAgICAgICAgIC8vIDEuINCf0L7Qu9C+0LbQuNC8IEMg0YDQsNCy0L3Ri9C8INC30L3QsNGH0LXQvdC40Y4gdGhpcy5cclxuICAgICAgICAgICAgdmFyIEMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gMi4g0J/QvtC70L7QttC40LwgaXRlbXMg0YDQsNCy0L3Ri9C8IFRvT2JqZWN0KGFycmF5TGlrZSkuXHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IE9iamVjdChhcnJheUxpa2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxyXG4gICAgICAgICAgICBpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb20gcmVxdWlyZXMgYW4gYXJyYXktbGlrZSBvYmplY3QgLSBub3QgbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gNC4g0JXRgdC70LggbWFwZm4g0YDQsNCy0LXQvSB1bmRlZmluZWQsINC/0L7Qu9C+0LbQuNC8IG1hcHBpbmcg0YDQsNCy0L3Ri9C8IGZhbHNlLlxyXG4gICAgICAgICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwRm4gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyA1LiDQuNC90LDRh9C1XHJcbiAgICAgICAgICAgICAgICAvLyA1LiBhLiDQldGB0LvQuCDQstGL0LfQvtCyIElzQ2FsbGFibGUobWFwZm4pINGA0LDQstC10L0gZmFsc2UsINCy0YvQutC40LTRi9Cy0LDQtdC8INC40YHQutC70Y7Rh9C10L3QuNC1IFR5cGVFcnJvci5cclxuICAgICAgICAgICAgICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIDUuIGIuINCV0YHQu9C4IHRoaXNBcmcg0L/RgNC40YHRg9GC0YHRgtCy0YPQtdGCLCDQv9C+0LvQvtC20LjQvCBUINGA0LDQstC90YvQvCB0aGlzQXJnOyDQuNC90LDRh9C1INC/0L7Qu9C+0LbQuNC8IFQg0YDQsNCy0L3Ri9C8IHVuZGVmaW5lZC5cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIFQgPSBhcmd1bWVudHNbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDEwLiDQn9C+0LvQvtC20LjQvCBsZW5WYWx1ZSDRgNCw0LLQvdGL0LwgR2V0KGl0ZW1zLCBcImxlbmd0aFwiKS5cclxuICAgICAgICAgICAgLy8gMTEuINCf0L7Qu9C+0LbQuNC8IGxlbiDRgNCw0LLQvdGL0LwgVG9MZW5ndGgobGVuVmFsdWUpLlxyXG4gICAgICAgICAgICB2YXIgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDEzLiDQldGB0LvQuCBJc0NvbnN0cnVjdG9yKEMpINGA0LDQstC10L0gdHJ1ZSwg0YLQvlxyXG4gICAgICAgICAgICAvLyAxMy4gYS4g0J/QvtC70L7QttC40LwgQSDRgNCw0LLQvdGL0Lwg0YDQtdC30YPQu9GM0YLQsNGC0YMg0LLRi9C30L7QstCwINCy0L3Rg9GC0YDQtdC90L3QtdCz0L4g0LzQtdGC0L7QtNCwIFtbQ29uc3RydWN0XV1cclxuICAgICAgICAgICAgLy8gICAgINC+0LHRitC10LrRgtCwIEMg0YHQviDRgdC/0LjRgdC60L7QvCDQsNGA0LPRg9C80LXQvdGC0L7Qsiwg0YHQvtC00LXRgNC20LDRidC40Lwg0LXQtNC40L3RgdGC0LLQtdC90L3Ri9C5INGN0LvQtdC80LXQvdGCIGxlbi5cclxuICAgICAgICAgICAgLy8gMTQuIGEuINCY0L3QsNGH0LUsINC/0L7Qu9C+0LbQuNC8IEEg0YDQsNCy0L3Ri9C8IEFycmF5Q3JlYXRlKGxlbikuXHJcbiAgICAgICAgICAgIHZhciBBID0gaXNDYWxsYWJsZShDKSA/IE9iamVjdChuZXcgQyhsZW4pKSA6IG5ldyBBcnJheShsZW4pO1xyXG5cclxuICAgICAgICAgICAgLy8gMTYuINCf0L7Qu9C+0LbQuNC8IGsg0YDQsNCy0L3Ri9C8IDAuXHJcbiAgICAgICAgICAgIHZhciBrID0gMDtcclxuICAgICAgICAgICAgLy8gMTcuINCf0L7QutCwIGsgPCBsZW4sINCx0YPQtNC10Lwg0L/QvtCy0YLQvtGA0Y/RgtGMLi4uICjRiNCw0LPQuCDRgSBhINC/0L4gaClcclxuICAgICAgICAgICAgdmFyIGtWYWx1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKGsgPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcEZuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQVtrXSA9IHR5cGVvZiBUID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGtWYWx1ZSwgaykgOiBtYXBGbi5jYWxsKFQsIGtWYWx1ZSwgayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEFba10gPSBrVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMTguINCf0L7Qu9C+0LbQuNC8IHB1dFN0YXR1cyDRgNCw0LLQvdGL0LwgUHV0KEEsIFwibGVuZ3RoXCIsIGxlbiwgdHJ1ZSkuXHJcbiAgICAgICAgICAgIEEubGVuZ3RoID0gbGVuO1xyXG4gICAgICAgICAgICAvLyAyMC4g0JLQtdGA0L3RkdC8IEEuXHJcbiAgICAgICAgICAgIHJldHVybiBBO1xyXG4gICAgICAgIH07XHJcbiAgICB9KCkpO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICBZQSBNQVBTXHJcbiAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIHltYXBzLnJlYWR5KGluaXRNYXApO1xyXG4gICAgdmFyIG15TWFwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzAzMTMxLCAzNy43NDMyMjVdLFxyXG4gICAgICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICAgICAgY29udHJvbHM6IFtcInJvdXRlRWRpdG9yXCJdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XHJcblxyXG4gICAgICAgIG15TWFwLmNvbnRyb2xzLmFkZChcInpvb21Db250cm9sXCIsIHtcclxuICAgICAgICAgICAgc2l6ZTogJ3NtYWxsJyxcclxuICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAzMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgIEZJWEVEIE1FTlVcclxuICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJCgnLmhlYWRlcl9fYm90dG9tJyksXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoZWFkZXJfX2JvdHRvbV9wb3NfZml4ZWQnLFxyXG4gICAgICAgICAgICB0b3AgPSAkZWxlbWVudC5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcyhjbGFzc05hbWUsICQodGhpcykuc2Nyb2xsVG9wKCkgPj0gdG9wKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tZW51LWJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWVudSA9ICQoJy5oZWFkZXItbWVudScpO1xyXG5cclxuICAgICAgICBpZiAoIW1lbnUuaGFzQ2xhc3MoJ21lbnVfb3BlbicpKSB7XHJcbiAgICAgICAgICAgIG1lbnUuYWRkQ2xhc3MoJ21lbnVfb3BlbicpXHJcbiAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAnMCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdtZW51LWJ0bl9vcGVuJyk7XHJcbiAgICAgICAgICAgIC8vICQoZG9jdW1lbnQpLlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lbnUucmVtb3ZlQ2xhc3MoJ21lbnVfb3BlbicpXHJcbiAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAnMTAwJSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdtZW51LWJ0bl9vcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgUEFHRSBBTkNIT1JTIC8gTUVOVVxyXG4gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgJCgnLm5hdl9fbGluaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gOTBcclxuICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgQUNUSVZBVEUgTUVOVSBJVEVNIE9WRVIgQ1VSUkVOVCBTRUNUSU9OXHJcbiAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIHZhciAkc2VjdGlvbnMgPSAkKCdzZWN0aW9uJyk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyICRjdXJyZW50U2VjdGlvbjtcclxuXHJcbiAgICAgICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGl2UG9zaXRpb24gPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXZQb3NpdGlvbiAtIDkwIDwgY3VycmVudFNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTZWN0aW9uID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAkY3VycmVudFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2X19pdGVtJykucmVtb3ZlQ2xhc3MoJ25hdl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJ1tocmVmPVwiIycgKyBpZCArICdcIl0nKS5wYXJlbnQoJy5uYXZfX2l0ZW0nKS5hZGRDbGFzcygnbmF2X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICBQUk9EVUNUUyBUQUJTXHJcbiAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiAgICAkKCcudGFicy1jb250cm9sc19faXRlbTplcSgwKScpLmFkZENsYXNzKCd0YWJzLWNvbnRyb2xzX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgJCgnLnRhYnMtY29udGVudF9faXRlbTplcSgwKScpLmFkZENsYXNzKCd0YWJzLWNvbnRlbnRfX2l0ZW1fYWN0aXZlJyk7XHJcblxyXG4gICAgJCgnLnRhYnMtY29udHJvbHNfX2l0ZW0nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuZGF0YSgncHJvZHVjdHMnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCd0YWJzLWNvbnRyb2xzX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3RhYnMtY29udHJvbHNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLnRhYnMtY29udGVudF9faXRlbScpLnJlbW92ZUNsYXNzKCd0YWJzLWNvbnRlbnRfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLicgKyB0YXJnZXQgKyAnJykuYWRkQ2xhc3MoJ3RhYnMtY29udGVudF9faXRlbV9hY3RpdmUnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyogLS0tcG9ydGZvbGlvIGZpbHRlci0tLSAqL1xyXG5cclxuICAgICQoJy53b3Jrcy1maWx0ZXJfX2l0ZW0nKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnd29ya3MtZmlsdGVyX19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd29ya3MtZmlsdGVyX19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICB2YXIgaXRlbUNhdGVnb3J5ID0gJCh0aGlzKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDU1MCkge1xyXG4gICAgICAgICAgICB2YXIgaW1nV2lkdGggPSAxMDAgLyAyICsgJyUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gOTYwKSB7XHJcbiAgICAgICAgICAgIGltZ1dpZHRoID0gMTAwIC8gMyArICclJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbWdXaWR0aCA9IDEwMCAvIDQgKyAnJSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhpbWdXaWR0aClcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1DYXRlZ29yeSAhPT0gJ9Cy0YHQtScpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5wb3J0Zm9saW9fX2NhcmRbZGF0YS1maWx0ZXI9XCInICsgaXRlbUNhdGVnb3J5ICsgJ1wiXScpLnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyxcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBpbWdXaWR0aFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcucG9ydGZvbGlvX19jYXJkW2RhdGEtZmlsdGVyIT1cIicgKyBpdGVtQ2F0ZWdvcnkgKyAnXCJdJykuc3RvcCgpXHJcbiAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLnBvcnRmb2xpb19fY2FyZCcpLnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyxcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBpbWdXaWR0aFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLndvcmtzLWZpbHRlci1zZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBjYXRlZ29yeSA9ICQoJ29wdGlvbjpzZWxlY3RlZCcsIHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBpbWdXaWR0aCA9ICc1MCUnO1xyXG5cclxuICAgICAgICBpZiAoY2F0ZWdvcnkgPT09ICfQstGB0LUnKSB7XHJcbiAgICAgICAgICAgICQoJy5wb3J0Zm9saW9fX2NhcmQnKS5zdG9wKClcclxuICAgICAgICAgICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogaW1nV2lkdGhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5wb3J0Zm9saW9fX2NhcmRbZGF0YS1maWx0ZXI9XCInICsgY2F0ZWdvcnkgKyAnXCJdJykuc3RvcCgpXHJcbiAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGltZ1dpZHRoXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5wb3J0Zm9saW9fX2NhcmRbZGF0YS1maWx0ZXIhPVwiJyArIGNhdGVnb3J5ICsgJ1wiXScpLnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qIC0tLVNMSURFUi0tLSAqL1xyXG4gICAgJCgnLnNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICBwcmV2QXJyb3c6ICQoJy5zbGlkZXItYnRuX3ByZXYnKSxcclxuICAgICAgICBuZXh0QXJyb3c6ICQoJy5zbGlkZXItYnRuX25leHQnKVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogLS0tU0xJREVSIFBST0RVQ1RTIEZPUiBQSE9ORS0tLSAqL1xyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDUwMCkge1xyXG4gICAgICAgICQoJy50YWJzLWNvbnRlbnQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLnRhYnMtY29udHJvbHMnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLnRhYnMtY29udHJvbHMnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLnRhYnMtY29udGVudCcsXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogLS0tUE9QLVVQLS0tICovXHJcbiAgICAkKCcubWFnbmlmaWMnKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuXHJcbiAgICAgICAgZml4ZWRDb250ZW50UG9zOiB0cnVlLFxyXG4gICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcblxyXG4gICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgICAgIG1vZGFsOiBmYWxzZSxcclxuXHJcbiAgICAgICAgY2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcbiAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbWlkQ2xpY2s6IHRydWUsXHJcbiAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXHJcbiAgICAgICAgbWFpbkNsYXNzOiAnbXktbWZwLXNsaWRlLWJvdHRvbSdcclxuICAgIH0pO1xyXG5cclxuICAgIC8qIC0tLSAtLS0gKi9cclxuICAgICQoJy5wb3J0Zm9saW8nKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICBkZWxlZ2F0ZTogJy5wb3J0Zm9saW9fX2xpbmsnLFxyXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXHJcbiAgICAgICAgdExvYWRpbmc6ICdMb2FkaW5nIGltYWdlICMlY3VyciUuLi4nLFxyXG4gICAgICAgIG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuICAgICAgICBnYWxsZXJ5OiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcclxuICAgICAgICAgICAgcHJlbG9hZDogWzAsIDFdIC8vIFdpbGwgcHJlbG9hZCAwIC0gYmVmb3JlIGN1cnJlbnQsIGFuZCAxIGFmdGVyIHRoZSBjdXJyZW50IGltYWdlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB6b29tOiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAgLy8gZG9uJ3QgZm9nZXQgdG8gY2hhbmdlIHRoZSBkdXJhdGlvbiBhbHNvIGluIENTU1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgdEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGltYWdlICMlY3VyciU8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJyxcclxuICAgICAgICAgICAgdGl0bGVTcmM6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5lbC5kYXRhKCd0aXRsZScpICsgJzxzbWFsbD4nICsgJCgnLnBvcnRmb2xpb19fZGVzYycsIGl0ZW0uZWwpLnRleHQoKSArICc8L3NtYWxsPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59KTtcclxuIl19
