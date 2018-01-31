(function() {
  'use strict';

  // var links = document.querySelectorAll('.menu__link');
  // console.log(links)
  $(document).ready(function() {
    svg4everybody();

    // MENU-fixed
    $(window).on('scroll', function(event) {
      var header = $('.header');
      var className = 'header_fixed';

      header.toggleClass(className, $(this).scrollTop() > 10);
    });

    $(window).on('scroll', function(event) {
      var links = $('.menu__link');

      $(links).each(function(i, el) {
        var id = $(el).attr('href');
        var item = $(this).parent();

        if ($(id).offset().top - $(window).scrollTop() <= 180) {
          $(item)
            .addClass('menu__item_active')
            .siblings()
            .removeClass('menu__item_active');
        }
      });
    });

    // MENU-scroll
    $('.menu').on('click', 'a', function(event) {
      event.preventDefault(); //отменяем стандартную обработку нажатия по ссылке
      var id = $(this).attr('href'); //забираем идентификатор бока с атрибута href
      var top = $(id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь
      $('body,html').animate({ scrollTop: top }, 1500); //анимируем переход на расстояние - top за 1500 мс
    });

    $('.intro__button').on('click', function(event) {
      event.preventDefault();
      var id = '#ink';
      var top = $(id).offset().top;
      $('body,html').animate({ scrollTop: top }, 1500);
    });

    // SLIDER
    $('.gallery__list').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $('.gallery__button_prev'),
      nextArrow: $('.gallery__button_next'),
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'gallery__dots',
            arrows: false
          }
        }
      ]
    });

    $('.gallery').magnificPopup({
      delegate: '.gallery__link',
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
        // titleSrc: function(item) {
        //   return (
        //     item.el.data('title') +
        //     '<small>' +
        //     $('.portfolio__desc', item.el).text() +
        //     '</small>'
        //   );
        // }
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

      // $('.' + target + '').addClass('tab-content__item_active');
    });

    //VALIDATION
    $('.form').validate({
      debug: true,
      validClass: 'success',
      rules: {
        username: 'required',
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
        console.log(str);

        $.ajax({
          type: 'POST',
          url: 'contact.php',
          data: str,
          success: function(msg) {
            if (msg == 'OK') {
              result =
                '<div class="notification_ok">Спасибо, ваше сообщение было отправлено. Ожидайте звонка</div>';
              $('#fields').hide();
            } else {
              result = msg;
            }
            $('#note').html(result);
          }
        });
      }
    });
  });
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8gdmFyIGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAvLyBjb25zb2xlLmxvZyhsaW5rcylcclxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxuXHJcbiAgICAvLyBNRU5VLWZpeGVkXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbiAgICAgIHZhciBjbGFzc05hbWUgPSAnaGVhZGVyX2ZpeGVkJztcclxuXHJcbiAgICAgIGhlYWRlci50b2dnbGVDbGFzcyhjbGFzc05hbWUsICQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBsaW5rcyA9ICQoJy5tZW51X19saW5rJyk7XHJcblxyXG4gICAgICAkKGxpbmtzKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcbiAgICAgICAgdmFyIGlkID0gJChlbCkuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKCQoaWQpLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKSA8PSAxODApIHtcclxuICAgICAgICAgICQoaXRlbSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdtZW51X19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbWVudV9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTUVOVS1zY3JvbGxcclxuICAgICQoJy5tZW51Jykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL9C+0YLQvNC10L3Rj9C10Lwg0YHRgtCw0L3QtNCw0YDRgtC90YPRjiDQvtCx0YDQsNCx0L7RgtC60YMg0L3QsNC20LDRgtC40Y8g0L/QviDRgdGB0YvQu9C60LVcclxuICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7IC8v0LfQsNCx0LjRgNCw0LXQvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDQsdC+0LrQsCDRgSDQsNGC0YDQuNCx0YPRgtCwIGhyZWZcclxuICAgICAgdmFyIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDsgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdG9wIH0sIDE1MDApOyAvL9Cw0L3QuNC80LjRgNGD0LXQvCDQv9C10YDQtdGF0L7QtCDQvdCwINGA0LDRgdGB0YLQvtGP0L3QuNC1IC0gdG9wINC30LAgMTUwMCDQvNGBXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuaW50cm9fX2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciBpZCA9ICcjaW5rJztcclxuICAgICAgdmFyIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdG9wIH0sIDE1MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU0xJREVSXHJcbiAgICAkKCcuZ2FsbGVyeV9fbGlzdCcpLnNsaWNrKHtcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxyXG4gICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICBwcmV2QXJyb3c6ICQoJy5nYWxsZXJ5X19idXR0b25fcHJldicpLFxyXG4gICAgICBuZXh0QXJyb3c6ICQoJy5nYWxsZXJ5X19idXR0b25fbmV4dCcpLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgZG90c0NsYXNzOiAnZ2FsbGVyeV9fZG90cycsXHJcbiAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5nYWxsZXJ5JykubWFnbmlmaWNQb3B1cCh7XHJcbiAgICAgIGRlbGVnYXRlOiAnLmdhbGxlcnlfX2xpbmsnLFxyXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxyXG4gICAgICB0TG9hZGluZzogJ0xvYWRpbmcgaW1hZ2UgIyVjdXJyJS4uLicsXHJcbiAgICAgIG1haW5DbGFzczogJ21mcC1pbWctbW9iaWxlJyxcclxuICAgICAgZ2FsbGVyeToge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxyXG4gICAgICAgIHByZWxvYWQ6IFswLCAxXSAvLyBXaWxsIHByZWxvYWQgMCAtIGJlZm9yZSBjdXJyZW50LCBhbmQgMSBhZnRlciB0aGUgY3VycmVudCBpbWFnZVxyXG4gICAgICB9LFxyXG4gICAgICB6b29tOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBkdXJhdGlvbjogMzAwIC8vIGRvbid0IGZvZ2V0IHRvIGNoYW5nZSB0aGUgZHVyYXRpb24gYWxzbyBpbiBDU1NcclxuICAgICAgfSxcclxuICAgICAgaW1hZ2U6IHtcclxuICAgICAgICB0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2UgIyVjdXJyJTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXHJcbiAgICAgICAgLy8gdGl0bGVTcmM6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAvLyAgIHJldHVybiAoXHJcbiAgICAgICAgLy8gICAgIGl0ZW0uZWwuZGF0YSgndGl0bGUnKSArXHJcbiAgICAgICAgLy8gICAgICc8c21hbGw+JyArXHJcbiAgICAgICAgLy8gICAgICQoJy5wb3J0Zm9saW9fX2Rlc2MnLCBpdGVtLmVsKS50ZXh0KCkgK1xyXG4gICAgICAgIC8vICAgICAnPC9zbWFsbD4nXHJcbiAgICAgICAgLy8gICApO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVEFCU1xyXG4gICAgJCgnLnRhYi1jb250cm9sc19faXRlbTplcSgwKScpLmFkZENsYXNzKCd0YWItY29udHJvbHNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAkKCcudGFiLWNvbnRlbnRfX2l0ZW06ZXEoMCknKS5hZGRDbGFzcygndGFiLWNvbnRlbnRfX2l0ZW1fYWN0aXZlJyk7XHJcblxyXG4gICAgJCgnLnRhYi1jb250cm9sc19faXRlbScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIHZhciB0YWJDb250ZW50ID0gJCgnLnRhYi1jb250ZW50X19pdGVtJyk7XHJcbiAgICAgIHZhciBpbmRleCA9ICR0aGlzLmluZGV4KCk7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3R5cGUnKTtcclxuXHJcbiAgICAgICR0aGlzXHJcbiAgICAgICAgLmFkZENsYXNzKCd0YWItY29udHJvbHNfX2l0ZW1fYWN0aXZlJylcclxuICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygndGFiLWNvbnRyb2xzX19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgdGFiQ29udGVudFxyXG4gICAgICAgIC5lcShpbmRleClcclxuICAgICAgICAuYWRkQ2xhc3MoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgLy8gJCgnLicgKyB0YXJnZXQgKyAnJykuYWRkQ2xhc3MoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9WQUxJREFUSU9OXHJcbiAgICAkKCcuZm9ybScpLnZhbGlkYXRlKHtcclxuICAgICAgZGVidWc6IHRydWUsXHJcbiAgICAgIHZhbGlkQ2xhc3M6ICdzdWNjZXNzJyxcclxuICAgICAgcnVsZXM6IHtcclxuICAgICAgICB1c2VybmFtZTogJ3JlcXVpcmVkJyxcclxuICAgICAgICBtYWlsOiB7XHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25zZW50OiB7XHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgIHVzZXJuYW1lOiAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INGB0LLQvtC1INC40LzRjycsXHJcbiAgICAgICAgbWFpbDoge1xyXG4gICAgICAgICAgcmVxdWlyZWQ6ICfQktCy0LXQtNC40YLQtSDQv9C+0YfRgtC+0LLRi9C5INCw0LTRgNC10YEg0LTQu9GPINC+0LHRgNCw0YLQvdC+0Lkg0YHQstGP0LfQuCcsXHJcbiAgICAgICAgICBlbWFpbDogJ9Cf0L7Rh9GC0L7QstGL0Lkg0LDQtNGA0LXRgSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LLQuNC00LAgbmFtZUBkb21haW4uY29tJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uc2VudDogJydcclxuICAgICAgfSxcclxuICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbihlbGVtZW50LCBlcnJvckNsYXNzKSB7XHJcbiAgICAgICAgdmFyIGxhYmVsID0gJChlbGVtZW50KS5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBsYWJlbCAmJiBsYWJlbC5hZGRDbGFzcygnY2hlY2tib3hfZXJyb3InKTtcclxuICAgICAgfSxcclxuICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MpIHtcclxuICAgICAgICB2YXIgbGFiZWwgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGxhYmVsICYmIGxhYmVsLnJlbW92ZUNsYXNzKCdjaGVja2JveF9lcnJvcicpO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtLCBldmVudCkge1xyXG4gICAgICAgIHZhciBzdHIgPSAkKGZvcm0pLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cik7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICB1cmw6ICdjb250YWN0LnBocCcsXHJcbiAgICAgICAgICBkYXRhOiBzdHIsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID1cclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uX29rXCI+0KHQv9Cw0YHQuNCx0L4sINCy0LDRiNC1INGB0L7QvtCx0YnQtdC90LjQtSDQsdGL0LvQviDQvtGC0L/RgNCw0LLQu9C10L3Qvi4g0J7QttC40LTQsNC50YLQtSDQt9Cy0L7QvdC60LA8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICQoJyNmaWVsZHMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbXNnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyNub3RlJykuaHRtbChyZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSkoKTtcclxuIl19
