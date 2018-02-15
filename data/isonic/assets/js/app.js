if (window.location.hash) {
  var hash = window.location.hash;
  console.log(hash);
  location.hash = '';
  var scrollPos = $(hash).offset().top;
  $('html, body').animate({ scrollTop: scrollPos - 130 }, 1500);
}

function initMap() {
  var myMap = new ymaps.Map('map', {
    center: [55.755361, 37.580818],
    zoom: 14,
    controls: []
  });

  myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point', // тип геометрии - точка
      coordinates: [55.751832, 37.52527] // координаты точки
    }
  });
  myMap.geoObjects.add(myGeoObject);
  myMap.behaviors.disable('scrollZoom');
}

function scrollTo(elem) {
  if (!elem) return false;
  var id = $(elem).attr('data-scrollTo'); //забираем идентификатор бока с атрибута href
  var top = $(id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь

  $('body,html').animate({ scrollTop: top - 130 }, 1500); //анимируем переход на расстояние - top за 1500 мс
}

(function() {
  'use strict';

  // var links = document.querySelectorAll('.menu__link');
  // console.log(links)
  $(document).ready(function() {
    svg4everybody();
    ymaps.ready(initMap);

    // MENU-fixed
    $(window).on('scroll', function(event) {
      var header = $('.header');
      var className = 'header_fixed';

      header.toggleClass(className, $(this).scrollTop() > 10);
    });

    // смена активной ссылки в меню
    $(window).on('scroll', function() {
      var links = $('.menu__link');

      $(links).each(function(i, el) {
        var id = $(el).attr('data-scrollTo');
        var item = $(this).parent();

        if (id && $(id).offset().top - $(window).scrollTop() <= 180) {
          $(item)
            .addClass('menu__item_active')
            .siblings()
            .removeClass('menu__item_active');
        }
      });
    });

    // MENU-scroll
    $('.menu__link[data-scrollTo], .intro__button').on('click', function(
      event
    ) {
      if (window.location.pathname === '/') {
        event.preventDefault();
        var id = $(this).attr('data-scrollTo'); //забираем идентификатор бока с атрибута href
        var top = $(id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь

        $('body,html').animate({ scrollTop: top - 130 }, 1500); //анимируем переход на расстояние - top за 1500 мс
      } else {
      }
    });

    // SLIDER
    $('.slider__list').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $('.slider__button_prev'),
      nextArrow: $('.slider__button_next'),
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'slider__dots',
            arrows: false
          }
        }
      ]
    });

    $('.slider, .gallery').magnificPopup({
      delegate: '.magnific-link',
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
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      }
    });

    // TABS
    $('.tab-controls__item:eq(0)').addClass('tab-controls__item_active');
    $('.tab-content__item:eq(0)').addClass('tab-content__item_active');

    $('.tab-controls__item').click(function(event) {
      event.preventDefault();
      var $this = $(this);
      var tabContent = $('.tab-content__item');
      var index = $this.index();
      var target = $(this).data('type');

      $this
        .addClass('tab-controls__item_active')
        .siblings()
        .removeClass('tab-controls__item_active');

      tabContent
        .eq(index)
        .addClass('tab-content__item_active')
        .siblings()
        .removeClass('tab-content__item_active');
    });

    //VALIDATION
    $('.form').validate({
      debug: true,
      validClass: 'success',
      rules: {
        username: 'required',
        msg: 'required',
        mail: {
          required: true,
          email: true
        },
        consent: {
          required: true,
          message: false
        }
      },
      messages: {
        username: 'Пожалуйста, введите свое имя',
        msg: 'Пожалуйста, введите сообщение',
        mail: {
          required: 'Введите почтовый адрес для обратной связи',
          email: 'Почтовый адрес должен быть вида name@domain.com'
        },
        consent: ''
      },
      highlight: function(element, errorClass) {
        var label = $(element).closest('.checkbox');
        label && label.addClass('checkbox_error');
      },
      unhighlight: function(element, errorClass) {
        var label = $(element).closest('.checkbox');
        label && label.removeClass('checkbox_error');
      },
      submitHandler: function(form, event) {
        var str = $(form).serialize();
        var result = $('.feedback__message');
        var button = $('.form__button');
        console.log(str);

        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: str,
          beforeSend: function() {
            $(button).addClass('form__button_loader');
          },
          success: function(msg) {
            if (msg == 1) {
              $(result).text('Спасибо, ваше сообщение было отправлено.');
              // $('#fields').hide();
            } else {
              $(result).text('Что-то пошло не так, попробуйте позже');
            }
            $(result).removeClass('feedback__message_disabled');
            $(button).removeClass('form__button_loader');

            setTimeout(function() {
              $(result).addClass('feedback__message_disabled');
            }, 3000);
          }
        });
      }
    });
  });
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgY29uc29sZS5sb2coaGFzaCk7XHJcbiAgbG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gIHZhciBzY3JvbGxQb3MgPSAkKGhhc2gpLm9mZnNldCgpLnRvcDtcclxuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogc2Nyb2xsUG9zIC0gMTMwIH0sIDE1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuICAgIGNlbnRlcjogWzU1Ljc1NTM2MSwgMzcuNTgwODE4XSxcclxuICAgIHpvb206IDE0LFxyXG4gICAgY29udHJvbHM6IFtdXHJcbiAgfSk7XHJcblxyXG4gIG15R2VvT2JqZWN0ID0gbmV3IHltYXBzLkdlb09iamVjdCh7XHJcbiAgICBnZW9tZXRyeToge1xyXG4gICAgICB0eXBlOiAnUG9pbnQnLCAvLyDRgtC40L8g0LPQtdC+0LzQtdGC0YDQuNC4IC0g0YLQvtGH0LrQsFxyXG4gICAgICBjb29yZGluYXRlczogWzU1Ljc1MTgzMiwgMzcuNTI1MjddIC8vINC60L7QvtGA0LTQuNC90LDRgtGLINGC0L7Rh9C60LhcclxuICAgIH1cclxuICB9KTtcclxuICBteU1hcC5nZW9PYmplY3RzLmFkZChteUdlb09iamVjdCk7XHJcbiAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG8oZWxlbSkge1xyXG4gIGlmICghZWxlbSkgcmV0dXJuIGZhbHNlO1xyXG4gIHZhciBpZCA9ICQoZWxlbSkuYXR0cignZGF0YS1zY3JvbGxUbycpOyAvL9C30LDQsdC40YDQsNC10Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0LHQvtC60LAg0YEg0LDRgtGA0LjQsdGD0YLQsCBocmVmXHJcbiAgdmFyIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDsgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuXHJcbiAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdG9wIC0gMTMwIH0sIDE1MDApOyAvL9Cw0L3QuNC80LjRgNGD0LXQvCDQv9C10YDQtdGF0L7QtCDQvdCwINGA0LDRgdGB0YLQvtGP0L3QuNC1IC0gdG9wINC30LAgMTUwMCDQvNGBXHJcbn1cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vIHZhciBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgLy8gY29uc29sZS5sb2cobGlua3MpXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBzdmc0ZXZlcnlib2R5KCk7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0TWFwKTtcclxuXHJcbiAgICAvLyBNRU5VLWZpeGVkXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbiAgICAgIHZhciBjbGFzc05hbWUgPSAnaGVhZGVyX2ZpeGVkJztcclxuXHJcbiAgICAgIGhlYWRlci50b2dnbGVDbGFzcyhjbGFzc05hbWUsICQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRgdC80LXQvdCwINCw0LrRgtC40LLQvdC+0Lkg0YHRgdGL0LvQutC4INCyINC80LXQvdGOXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbGlua3MgPSAkKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgICAgJChsaW5rcykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG4gICAgICAgIHZhciBpZCA9ICQoZWwpLmF0dHIoJ2RhdGEtc2Nyb2xsVG8nKTtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgIGlmIChpZCAmJiAkKGlkKS5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPD0gMTgwKSB7XHJcbiAgICAgICAgICAkKGl0ZW0pXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnbWVudV9faXRlbV9hY3RpdmUnKVxyXG4gICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ21lbnVfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1FTlUtc2Nyb2xsXHJcbiAgICAkKCcubWVudV9fbGlua1tkYXRhLXNjcm9sbFRvXSwgLmludHJvX19idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihcclxuICAgICAgZXZlbnRcclxuICAgICkge1xyXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLycpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZGF0YS1zY3JvbGxUbycpOyAvL9C30LDQsdC40YDQsNC10Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0LHQvtC60LAg0YEg0LDRgtGA0LjQsdGD0YLQsCBocmVmXHJcbiAgICAgICAgdmFyIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDsgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuXHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdG9wIC0gMTMwIH0sIDE1MDApOyAvL9Cw0L3QuNC80LjRgNGD0LXQvCDQv9C10YDQtdGF0L7QtCDQvdCwINGA0LDRgdGB0YLQvtGP0L3QuNC1IC0gdG9wINC30LAgMTUwMCDQvNGBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNMSURFUlxyXG4gICAgJCgnLnNsaWRlcl9fbGlzdCcpLnNsaWNrKHtcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxyXG4gICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICBwcmV2QXJyb3c6ICQoJy5zbGlkZXJfX2J1dHRvbl9wcmV2JyksXHJcbiAgICAgIG5leHRBcnJvdzogJCgnLnNsaWRlcl9fYnV0dG9uX25leHQnKSxcclxuICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHNDbGFzczogJ3NsaWRlcl9fZG90cycsXHJcbiAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXIsIC5nYWxsZXJ5JykubWFnbmlmaWNQb3B1cCh7XHJcbiAgICAgIGRlbGVnYXRlOiAnLm1hZ25pZmljLWxpbmsnLFxyXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxyXG4gICAgICB0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcbiAgICAgIG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuICAgICAgZ2FsbGVyeToge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxyXG4gICAgICAgIHByZWxvYWQ6IFswLCAxXSAvLyBXaWxsIHByZWxvYWQgMCAtIGJlZm9yZSBjdXJyZW50LCBhbmQgMSBhZnRlciB0aGUgY3VycmVudCBpbWFnZVxyXG4gICAgICB9LFxyXG4gICAgICB6b29tOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBkdXJhdGlvbjogMzAwIC8vIGRvbid0IGZvZ2V0IHRvIGNoYW5nZSB0aGUgZHVyYXRpb24gYWxzbyBpbiBDU1NcclxuICAgICAgfSxcclxuICAgICAgaW1hZ2U6IHtcclxuICAgICAgICB0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRBQlNcclxuICAgICQoJy50YWItY29udHJvbHNfX2l0ZW06ZXEoMCknKS5hZGRDbGFzcygndGFiLWNvbnRyb2xzX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgJCgnLnRhYi1jb250ZW50X19pdGVtOmVxKDApJykuYWRkQ2xhc3MoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICQoJy50YWItY29udHJvbHNfX2l0ZW0nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgdGFiQ29udGVudCA9ICQoJy50YWItY29udGVudF9faXRlbScpO1xyXG4gICAgICB2YXIgaW5kZXggPSAkdGhpcy5pbmRleCgpO1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XHJcblxyXG4gICAgICAkdGhpc1xyXG4gICAgICAgIC5hZGRDbGFzcygndGFiLWNvbnRyb2xzX19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYi1jb250cm9sc19faXRlbV9hY3RpdmUnKTtcclxuXHJcbiAgICAgIHRhYkNvbnRlbnRcclxuICAgICAgICAuZXEoaW5kZXgpXHJcbiAgICAgICAgLmFkZENsYXNzKCd0YWItY29udGVudF9faXRlbV9hY3RpdmUnKVxyXG4gICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWItY29udGVudF9faXRlbV9hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vVkFMSURBVElPTlxyXG4gICAgJCgnLmZvcm0nKS52YWxpZGF0ZSh7XHJcbiAgICAgIGRlYnVnOiB0cnVlLFxyXG4gICAgICB2YWxpZENsYXNzOiAnc3VjY2VzcycsXHJcbiAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICdyZXF1aXJlZCcsXHJcbiAgICAgICAgbXNnOiAncmVxdWlyZWQnLFxyXG4gICAgICAgIG1haWw6IHtcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgZW1haWw6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnNlbnQ6IHtcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgbWVzc2FnZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0YHQstC+0LUg0LjQvNGPJyxcclxuICAgICAgICBtc2c6ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0YHQvtC+0LHRidC10L3QuNC1JyxcclxuICAgICAgICBtYWlsOiB7XHJcbiAgICAgICAgICByZXF1aXJlZDogJ9CS0LLQtdC00LjRgtC1INC/0L7Rh9GC0L7QstGL0Lkg0LDQtNGA0LXRgSDQtNC70Y8g0L7QsdGA0LDRgtC90L7QuSDRgdCy0Y/Qt9C4JyxcclxuICAgICAgICAgIGVtYWlsOiAn0J/QvtGH0YLQvtCy0YvQuSDQsNC00YDQtdGBINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQstC40LTQsCBuYW1lQGRvbWFpbi5jb20nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25zZW50OiAnJ1xyXG4gICAgICB9LFxyXG4gICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MpIHtcclxuICAgICAgICB2YXIgbGFiZWwgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGxhYmVsICYmIGxhYmVsLmFkZENsYXNzKCdjaGVja2JveF9lcnJvcicpO1xyXG4gICAgICB9LFxyXG4gICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24oZWxlbWVudCwgZXJyb3JDbGFzcykge1xyXG4gICAgICAgIHZhciBsYWJlbCA9ICQoZWxlbWVudCkuY2xvc2VzdCgnLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgbGFiZWwgJiYgbGFiZWwucmVtb3ZlQ2xhc3MoJ2NoZWNrYm94X2Vycm9yJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHN0ciA9ICQoZm9ybSkuc2VyaWFsaXplKCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICQoJy5mZWVkYmFja19fbWVzc2FnZScpO1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuZm9ybV9fYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3RyKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgIHVybDogJ21haWwucGhwJyxcclxuICAgICAgICAgIGRhdGE6IHN0cixcclxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKGJ1dHRvbikuYWRkQ2xhc3MoJ2Zvcm1fX2J1dHRvbl9sb2FkZXInKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgJChyZXN1bHQpLnRleHQoJ9Ch0L/QsNGB0LjQsdC+LCDQstCw0YjQtSDRgdC+0L7QsdGJ0LXQvdC40LUg0LHRi9C70L4g0L7RgtC/0YDQsNCy0LvQtdC90L4uJyk7XHJcbiAgICAgICAgICAgICAgLy8gJCgnI2ZpZWxkcycpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAkKHJlc3VsdCkudGV4dCgn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0L/QvtC/0YDQvtCx0YPQudGC0LUg0L/QvtC30LbQtScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQocmVzdWx0KS5yZW1vdmVDbGFzcygnZmVlZGJhY2tfX21lc3NhZ2VfZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgJChidXR0b24pLnJlbW92ZUNsYXNzKCdmb3JtX19idXR0b25fbG9hZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICQocmVzdWx0KS5hZGRDbGFzcygnZmVlZGJhY2tfX21lc3NhZ2VfZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KSgpO1xyXG4iXX0=
