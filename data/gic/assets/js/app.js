var Menu = (function () {
  var menu = document.querySelector('.header__container'),
    burgerMenu = document.querySelector('.menu-button');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('menu-button_closed');
      menu.classList.toggle('header__container_active');
    }
  }
})();


(function() {
  'use strict';

  var menuButton = document.querySelector('.menu-button');

  menuButton.addEventListener('click', function() {
    Menu.toggle();    
  });

 $('#form').validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10
      }
    },
    messages: {
      name: {
        required: "Поле 'Имя' обязательно к заполнению",
        minlength: "Введите не менее 2-х символов в поле 'Имя'"
      },
      email: {
        required: "Поле 'Email' обязательно к заполнению",
        email: "Необходим формат адреса email" 
      },
      phone: {
        required: "Поле 'Сайт' обязательно к заполнению",
        number: "Телефон должен содержать только цифры",
        minlength: "Телефон должен содержать не менее 10 цифр",
        maxlength: "Телефон должен содержать не более 10 цифр",
      }
    },
    submitHandler: function(form) {
      $(form).submit(function(e) {
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize()          
        }).done(function() {
          console.log('success');
          $form.trigger("reset");;
        }).fail(function() {
          console.log('fail');
        });

        e.preventDefault(); 
      });
    }
 });


})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTWVudSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyJyksXG4gICAgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ1dHRvbicpO1xuXG4gIHJldHVybiB7XG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBidXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtYnV0dG9uX2Nsb3NlZCcpO1xuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NvbnRhaW5lcl9hY3RpdmUnKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idXR0b24nKTtcblxuICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgTWVudS50b2dnbGUoKTsgICAgXG4gIH0pO1xuXG4gJCgnI2Zvcm0nKS52YWxpZGF0ZSh7XG4gICAgcnVsZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogMlxuICAgICAgfSxcbiAgICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBudW1iZXI6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogMTAsXG4gICAgICAgIG1heGxlbmd0aDogMTBcbiAgICAgIH1cbiAgICB9LFxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiBcItCf0L7Qu9C1ICfQmNC80Y8nINC+0LHRj9C30LDRgtC10LvRjNC90L4g0Log0LfQsNC/0L7Qu9C90LXQvdC40Y5cIixcbiAgICAgICAgbWlubGVuZ3RoOiBcItCS0LLQtdC00LjRgtC1INC90LUg0LzQtdC90LXQtSAyLdGFINGB0LjQvNCy0L7Qu9C+0LIg0LIg0L/QvtC70LUgJ9CY0LzRjydcIlxuICAgICAgfSxcbiAgICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiBcItCf0L7Qu9C1ICdFbWFpbCcg0L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQuiDQt9Cw0L/QvtC70L3QtdC90LjRjlwiLFxuICAgICAgICBlbWFpbDogXCLQndC10L7QsdGF0L7QtNC40Lwg0YTQvtGA0LzQsNGCINCw0LTRgNC10YHQsCBlbWFpbFwiIFxuICAgICAgfSxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIHJlcXVpcmVkOiBcItCf0L7Qu9C1ICfQodCw0LnRgicg0L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQuiDQt9Cw0L/QvtC70L3QtdC90LjRjlwiLFxuICAgICAgICBudW1iZXI6IFwi0KLQtdC70LXRhNC+0L0g0LTQvtC70LbQtdC9INGB0L7QtNC10YDQttCw0YLRjCDRgtC+0LvRjNC60L4g0YbQuNGE0YDRi1wiLFxuICAgICAgICBtaW5sZW5ndGg6IFwi0KLQtdC70LXRhNC+0L0g0LTQvtC70LbQtdC9INGB0L7QtNC10YDQttCw0YLRjCDQvdC1INC80LXQvdC10LUgMTAg0YbQuNGE0YBcIixcbiAgICAgICAgbWF4bGVuZ3RoOiBcItCi0LXQu9C10YTQvtC9INC00L7Qu9C20LXQvSDRgdC+0LTQtdGA0LbQsNGC0Ywg0L3QtSDQsdC+0LvQtdC1IDEwINGG0LjRhNGAXCIsXG4gICAgICB9XG4gICAgfSxcbiAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XG4gICAgICAkKGZvcm0pLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogJGZvcm0uYXR0cignbWV0aG9kJyksXG4gICAgICAgICAgdXJsOiAkZm9ybS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgICBkYXRhOiAkZm9ybS5zZXJpYWxpemUoKSAgICAgICAgICBcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuICAgICAgICAgICRmb3JtLnRyaWdnZXIoXCJyZXNldFwiKTs7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIH0pO1xuICAgIH1cbiB9KTtcblxuXG59KSgpOyJdfQ==
