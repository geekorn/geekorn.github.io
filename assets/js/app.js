var BlogMenu = (function () {
  var sidebar = document.querySelector('.sidebar');

  function _fixMenu() {
    var nav = document.querySelector('.blog-menu'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (window.innerWidth >= 780) {
      if (navCoords <= -50) {
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.width = '20%';
      } else {
        nav.style.position = 'static';
        nav.style.width = 'auto';
      }
    } else {
      nav.style.position = 'absolute';
      nav.style.top = '';
      nav.style.width = 'auto';
    }

  }

  function _initActive () {
    var posts = document.querySelectorAll('.post__title'),
      postLinks = document.querySelectorAll('.blog-menu__link'),
      activeLink = document.getElementsByClassName('blog-menu__link_active');


    for (var i = 0; i < posts.length; i++) {
      var post = posts[i],
        postTop = post.getBoundingClientRect().top;

      if (postTop <= 100) {
        activeLink[0].classList.remove('blog-menu__link_active');
        postLinks[i].classList.add('blog-menu__link_active');
      }
    }
  }

  var _openMenu = function () {
    sidebar.classList.add('sidebar_open');
  };
  var _closeMenu = function () {
    sidebar.classList.remove('sidebar_open');
  };

  return {
    init: _fixMenu,
    initActive: _initActive,
    toggle: function () {
      if (!sidebar.classList.contains('sidebar_open')) {
        _openMenu();
      }
      else {
        _closeMenu();
      }
    }
  }
})();
// BLUR EFFECT
var Blur = (function () {
  var section = document.querySelector('.feedback'),
    blurWrapper = document.querySelector('.feedback-form'),
    blur = document.querySelector('.feedback-form__blur');

  return {
    set: function () {
      var imgWidth = document.querySelector('.feedback__bg').offsetWidth,
        img = document.querySelector('.feedback__bg'),
        imgCoords = img.getBoundingClientRect(),
        sectionCoords = section.getBoundingClientRect(),
        blurCoords = blurWrapper.getBoundingClientRect(),
        posLeft = -blurWrapper.offsetLeft,
        posTop = img.offsetTop - blurWrapper.offsetTop,
        blurCSS = blur.style;

      blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
      blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
    }
  }
})();
// index flip
var Flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  var _auth = function () {
    flipper.style.transform = 'rotateY(180deg)';
    btn.style.display = 'none';
  };

  var _welcome = function () {
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.display = 'block';
  };

  return {
    auth: _auth,
    welcome: _welcome
  }

})();
var Validation = (function () {
  var errorField = document.querySelector('.input-error-msg'),
    captchaError = document.querySelector('.welcome__error'),
    formContainer = document.querySelector('.form__container');

  var _init = function (form) {
    var elems = form.elements;

    console.log(elems);
    return _validate(elems) ? true : false;
  };

  function _validate(inputs) {

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].tagName === 'BUTTON') continue;

      var elem = inputs[i];

      if (elem.value == '') {
        console.log(elem);
        return _showError(elem)
      }

      if (elem.type === 'checkbox' || elem.type === 'radio') {

        if (elem.checked && elem.value === 'yes') {
          return true;
        }
        if (!elem.checked) {
          captchaError.style.display = 'flex';
        }
      }
    }

    return true;

  };

  function _showError(elem) {
    var text = elem.getAttribute('placeholder').toLowerCase();
    var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

    elem.parentNode.classList.add('input-group_error');
    errorField.style.display = 'block';
    errorField.innerText = 'Вы не ввели ' + text;

    // if (position > formContainer.offsetHeight)
    errorField.style.top = position + 'px';
  }

  function _clearError(elem) {
    console.log(elem);
    elem.parentNode.classList.remove('input-group_error');
    errorField.style.display = 'none';
  }


  return {
    init: _init,
    clear: _clearError
  }
})();
function initMap () {
  var pointer = new google.maps.LatLng(55.787069, 37.478220),
    center = new google.maps.LatLng(55.786273, 37.418623);

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#96d7c8"},{"visibility":"on"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapSettings = {
    center: center,
    scrollwheel: false,
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map'), mapSettings);

  var marker = new google.maps.Marker({
    icon: 'assets/img/decor/map_marker.png',
    position: pointer,
    map: map,
    title: "I'm here!",
    animation: google.maps.Animation.BOUNCE
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
};

var Menu = (function () {
  var menu = document.querySelector('.main-navigation'),
    burgerMenu = document.querySelector('.hamburger-btn');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('hamburger-btn_closed');
      menu.classList.toggle('main-navigation_disabled');

      document.body.style.overflow = (!menu.classList.contains('main-navigation_disabled')) ? 'hidden' : 'auto';
    }
  }
})();
//index paralax
var MainParalax = (function () {

  var _show = function () {

    var paralaxContainer = document.querySelector('#paralax'),
      layers = paralaxContainer.children;

    window.addEventListener('mousemove', function (e) {

      var pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY;

      [].slice.call(layers).forEach(function (layer, i) {
        var layerStyle = layer.style,
          divider = i / 40,
          bottomPosition = (window.innerHeight / 2) * divider,
          horizontalPosition = (window.innerWidth / 2) * divider,
          positionX = initialX * divider,
          positionY = initialY * divider,
          transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

        layerStyle.transform = transformString;
        layerStyle.webkitTransform = transformString;
        layerStyle.bottom = '-' + bottomPosition + 'px';
        layerStyle.left = '-' + horizontalPosition + 'px';
        layerStyle.right = '-' + horizontalPosition + 'px';
      })

    });
  };

  var _disabled = function () {
    //для планшетов и телефонов подставить просто картинку, а не грузить весь паралакс
  };

  return {
    init: _show
  };

})();
// var Slider = new function () {
//     var items,
//         index,
//         initialIndex = 1,
//         ndx,
//         duration = 500,
//         toggle = document.querySelector('.work-slider');
//
//     function init(data) {
//         var activeSlide = {
//             index: initialIndex,
//             title: document.querySelector('.work__title'),
//             technology: document.querySelector('.work__technology'),
//             img: document.querySelector('.work__pic'),
//             next: document.querySelector('.work-slider__list_next'),
//             prev: document.querySelector('.work-slider__list_prev')
//
//         };
//
//         items = data;
//
//         // отрисовка основного слайда
//         changeSlide(activeSlide);
//
//         // подготовка слайдов-переключателей
//         activeSlide.next.appendChild(createSlides(items, activeSlide.index + 1));
//         activeSlide.prev.appendChild(createSlides(items, activeSlide.index - 1));
//
//         // слушаем событие по нажатию на слайды
//         toggle.addEventListener('click', function(e) {
//             e.preventDefault();
//             slideShow(e.target);
//         })
//     }
//
//     function createSlides(items, active) {
//         var list = document.createDocumentFragment();
//
//         items.forEach(function (item, i) {
//             var span = document.createElement('LI');
//             var img = new Image();
//
//             (i === active) && span.classList.add('work-slider__item_current');
//             span.classList.add('work-slider__item');
//             span.dataset.title = item.name;
//             span.dataset.technology = item.technology;
//             span.dataset.link = item.link;
//             img.src = item.img;
//             img.classList.add('work-slider__img');
//
//             span.appendChild(img);
//             list.appendChild(span);
//         });
//
//         return list;
//     }
//
//     function slideShow (target) {
//         if (target.contains(next)) {
//             index++;
//         } else if (target.contains(prev)) {
//             index--;
//         }
//
//         if (index > items.length - 1) {
//             index = 0;
//         } else if (index < 0) {
//             index = items.length - 1;
//         }
//       // moveSlide(next);
//       // moveSlide(prev);
//         console.log(index)
//       changeSlide(index);
//     }
//
//     function moveSlide() {
//
//     }
//
//     function changeSlide(activeItem) {
//         console.log(activeItem)
//         activeItem.title.innerHTML = items[activeItem.index].name;
//         activeItem.technology.innerHTML = items[activeItem.index].technology.join(', ');
//         activeItem.img.src = items[activeItem.index].img;
//     }
//
//
//     this.init = init;
// };
var Preloader = (function () {
  var loader = document.querySelector('.preloader'),
    wrapper = document.querySelector('.index-wrapper'),
    images = document.querySelectorAll('img'),
    flipCard = document.querySelector('.flipper'),
    procentField = document.querySelector('.preloader__percent'),
    percent = 0,
    percentStep = 100 / (images.length + 0.4);

  function _loadImage(img) {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        percent = Math.ceil(percent + percentStep);
        console.log(percent, percentStep);
        procentField.innerHTML = percent + '%';
        resolve(img);
      };
      img.onerror = function () {
        reject(img);
      }
    });
  }

  function _showLoader(imgList) {
    var promiseImg = imgList.map(_loadImage);

    Promise.all(promiseImg)
      .then(function (value) {
        wrapper.style.display = 'block';

        percent = 100;
        procentField.innerHTML = percent + '%';
        setTimeout(function () {
          loader.style.opacity = '0';
          // loader.parentNode.removeChild(loader);
          loader.style.display = 'none';
        }, 1500)
      })
      .then(function () {
        setTimeout(function () {
          flipCard.style.transform = 'rotate3d(1,0,0, 0deg)';
        }, 1500)
      })
  };

function _closeLoader() {
  var imgArr = Array.prototype.slice.call(images);

  _showLoader(imgArr);
};


return {
  init: _closeLoader
}

})
();


/*
 1 - загрузить сам прелоадер
 2 - взять все картинки на странице
 3 - по мере загрузки картинок менять проценты
 4 - после загрузки всех картинок убрать прелоадер
 */
var ScrollPage = (function () {

  return {
    down: function (elem) {
      var section = elem.parentNode.nextSibling.nextSibling,
        posTop = section.offsetTop;

      $('body,html').animate({scrollTop: posTop}, 1500);
    },

    up: function () {
      $('body,html').animate({scrollTop: 0}, 1200);
    }
  }
})();

//
// var scrollPage = (function () {
//   var speed = 1,
//     currentPosition,
//     distPosition;
//
//   speed = (currentPosition - distPosition) / 1000;
//
//   return {
//     downTo: function (element) {
//     var distPosition = element.offsetTop;
//
//     setInterval(function () {
//
//       window.scrollTo(0, distPosition);
//
//       if (top > 1000) {
//         clearInterval(scr);
//       }
//     }, 15);
//
//     }
//   }
// })();
// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var HeaderParallax = (function () {
  var bg = document.querySelector('.header__bg'),
    portfolio = document.querySelector('.header__portfolio'),
    user = document.querySelector('.header__user');

  var _move = function (block, windowScroll, strafeAmount) {
    var strafe = windowScroll / -strafeAmount + '%',
      transformString = 'translate3d(0, ' + strafe + ', 0)',
      style = block.style;

    if (windowScroll < window.innerHeight) {
      style.transform = transformString;
      style.webkitTransform = transformString;
    }
  };

  return {

    init: function (wScroll) {
      _move(bg, wScroll, 45);
      if (portfolio !== null) {
        _move(portfolio, wScroll, 20);
      };
      _move(user, wScroll, 3);
    }

  }

})();
// АНИМАЦИЯ ИКОНОК СКИЛОВ
var Skills = (function () {
  var skills = document.querySelectorAll('.skill'),
    circles = document.querySelectorAll('.circle-second'),
    windowHeight = window.innerHeight;

  // вычисляем длину окружности
  var circleLength = function (circle) {
    var circleRadius = circle.getAttribute('r'),
      circleLength = 2 * Math.PI * circleRadius;

    return circleLength;
  };

  // применяем к окружности свойства по умолчанию
  [].slice.call(circles).forEach(function (circle) {

    circle.style.strokeDashoffset = circleLength(circle);
    circle.style.strokeDasharray = circleLength(circle);

  });

  // функция анимирования окружности в зависимости от процентов
  var circleAnimation = function (skill) {

    var circleFill = skill.querySelector('.circle-second'),
      skillPercent = skill.getAttribute('data-percent'),
      length = circleLength(circleFill),
      percent = length * (100 - skillPercent) / 100;

    setTimeout(function () {
      circleFill.style.strokeDashoffset = percent;
      circleFill.style.transition = 'all 1s';

      if (skillPercent < 50) {
        skill.style.opacity = 0.4;
        skill.style.transition = 'all 1s';
      }
    }, 500);

  };

  return {
    grow: function () {

      [].slice.call(skills).forEach(function (skill) {

        var circleRect = skill.getBoundingClientRect(),
          circlePos = circleRect.bottom,
          startAnimation = circlePos - windowHeight;

        if (startAnimation <= 0) {
          circleAnimation(skill);
        }

      });
    }
  }

})();
var Slider = (function () {
    var items,
        index = 1,
        ndx,
        duration = 500,
        title = $('.work__title'),
        skills = $('.work__technology'),
        desc = $('.work__description'),
        imgContainer = $('.work__pic'),
        link = $('.work__link'),
        source = $('.work__source');

    function _init(data) {
        items = data;

        var activeItem = items.eq(index),
            imgSrc = activeItem.find('img').attr('src'),
            activeTitle = activeItem.data('title'),
            activeSlill = activeItem.data('technology'),
            activeDesc = activeItem.data('description'),
            activeLink = activeItem.data('link');

        imgContainer.attr('src', imgSrc);
        title.text(activeTitle);
        skills.text(activeSlill);
        desc.text(activeDesc);
        link.attr('href', activeLink);
        (activeItem.data('source')) && source.attr('href', activeItem.data('source'));

        var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
        nextItem.addClass('work-slider__item_current');
        var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
        prevItem.addClass('work-slider__item_current');
    }

    function animateSlide(ndx, container, direction) {
        var nextItems = $('.work-slider__item', container),
            currentItem = nextItems.filter('.work-slider__item_current'),
            reqItem = nextItems.eq(ndx);
        direction = direction === 'up' ? -100 : 100;

        currentItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': 0
        }, duration, function () {
            currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
            reqItem.addClass('work-slider__item_current');
        })
    }

    function _moveNext() {
        var container = $('.work-slider__list_next'),
            direction = 'up';

        if (index == items.length - 1) {
            ndx = 0;
        } else if (index < 0) {
            ndx = items.length - 1;
        } else {
            ndx = index + 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _movePrev() {
        var container = $('.work-slider__list_prev'),
            direction = 'down';

        if (index > items.length - 1) {
            ndx = 0;
        } else if (index <= 0) {
            ndx = items.length - 1;
        } else {
            ndx = index - 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _slideShow() {
        var fadedOut = $.Deferred(),
            loaded = $.Deferred(),
            nextItem = items.eq(index),
            nextSrc = nextItem.find('img').attr('src'),
            nextTitle = nextItem.data('title'),
            nextSkills = nextItem.data('technology'),
            nextDesc = nextItem.data('description'),
            nextLink = nextItem.data('link');

        _moveNext();
        _movePrev();

        imgContainer.fadeOut(function () {
            title.fadeOut();
            skills.fadeOut();
            fadedOut.resolve();
        });

        fadedOut.done(function () {
            title.text(nextTitle);
            skills.text(nextSkills);
            desc.text(nextDesc);
            link.attr('href', nextLink);
            if (nextItem.data('source')) {
                source.attr('href', nextItem.data('source'));
                source.show();
            } else {
                source.hide();
            }

            imgContainer.attr('src', nextSrc).on('load', function () {
                loaded.resolve();
            })
        });

        loaded.done(function () {
            title.fadeIn();
            skills.fadeIn();
            imgContainer.fadeIn();
        });
    }

    return {
        init: _init,
        move: function () {

            $('.toggle__link').on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('toggle__link_next')) {
                    index++;
                } else if ($(this).hasClass('toggle__link_prev')) {
                    index--;
                }

                if (index > items.length - 1) {
                    index = 0;
                } else if (index < 0) {
                    index = items.length - 1;
                }

                _slideShow();

            })
        }
    }
})
();
var request = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr. open('GET', url, true);
        xhr.addEventListener('load', function() {

            if (xhr.status > 400) {
                reject('не удалось загрузить файл');
            } else {
                var data = JSON.parse(xhr.responseText);

                resolve(data);
            }
        });
        xhr.send();
    })
};

var preload = document.querySelector('.preloader');

if (preload !== null) Preloader.init();

window.onload = function () {

  //MAIN PARALAX
  var paralax = document.querySelector('#paralax');

  if (paralax !== null) {
    MainParalax.init();
  }
  //
  // console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      Flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      Flip.welcome();
    });
  }

  //BURGERMENU
  var burgerMenu = document.querySelector('.hamburger-btn');

  if (burgerMenu !== null) {
    burgerMenu.addEventListener('click', function () {
      Menu.toggle();
    });
  }


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    Blur.set();
    window.onresize = function () {
      Blur.set();
    };
  }


  var form = document.querySelector('form');

  if (form !== null) {
    //очистка ошибки
    var inputs = form.elements;
    var closeError = document.querySelector('.input-error-captcha__close');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onfocus = function() {
        if (this.parentNode.classList.contains('input-group_error')) {
          Validation.clear(this);
        }
      }
    }

    if (closeError !== null) {
      closeError.onclick = function() {
        closeError.parentNode.parentNode.style.display = 'none';
      };
    }


    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = Validation.init(form);
    })
  }


  //SCROLL PAGE
  var scrollLinkDown = document.querySelector('.scroll-link_down');
  var scrollLinkUp = document.querySelector('.scroll-link_up');

  if (scrollLinkDown !== null) {
    scrollLinkDown.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.down(this);
    })
  }
  if (scrollLinkUp !== null) {
    scrollLinkUp.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.up(this);
    })
  }

  //SLIDER
  var slider = document.querySelector('.work__slider');

  if (slider !== null) {
    $.getJSON('../data/works.json', function (data) {
        // console.log(data)
        $('.work-slider__list_prev').append(createSlides(data));
        $('.work-slider__list_next').append(createSlides(data));

        Slider.init($('.work-slider__list_next').children());
        Slider.move();
    });
  }

        function createSlides(items, active) {
        var list = document.createDocumentFragment();

        items.forEach(function (item, i) {
            var span = document.createElement('LI');
            var img = new Image();

            (i === active) && span.classList.add('work-slider__item_current');
            span.classList.add('work-slider__item');
            span.dataset.title = item.name;
            span.dataset.technology = item.technology.join(', ');
            span.dataset.description = item.description;
            span.dataset.link = item.link;
            // span.dataset.source = (item.source) ? item.source : '';
            if (item.source) span.dataset.source = (item.source);
            img.src = item.img;
            img.classList.add('work-slider__img');

            span.appendChild(img);
            list.appendChild(span);
        });

        return list;
    }
  //HEADER PARALAX & SKILLS
  var bg = document.querySelector('.header__bg'),
    skills = document.querySelectorAll('.skill'),
    blogWrapper = document.querySelector('.blog-container');

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {

    var wScroll = window.pageYOffset;

    if (bg !== null) {
      HeaderParallax.init(wScroll);
    }

    if (skills !== null) {
      Skills.grow();
    }

    if (blogWrapper !== null) {
      BlogMenu.init();
      BlogMenu.initActive();
    }

  };

  var sideMenu = document.querySelector('.sidemenu-btn');

  if (sideMenu !== null) {
    sideMenu.onclick = function () {
      BlogMenu.toggle();
    }
  }

  window.onresize = function () {
    BlogMenu.init();
  }


};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwibmV3U2xpZGVyLmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInhoci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJsb2dNZW51ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIGZ1bmN0aW9uIF9maXhNZW51KCkge1xuICAgIHZhciBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1tZW51JyksXG4gICAgICBuYXZDb29yZHMgPSBzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3ODApIHtcbiAgICAgIGlmIChuYXZDb29yZHMgPD0gLTUwKSB7XG4gICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIG5hdi5zdHlsZS50b3AgPSAnMjBweCc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICcyMCUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIG5hdi5zdHlsZS50b3AgPSAnJztcbiAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbml0QWN0aXZlICgpIHtcbiAgICB2YXIgcG9zdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdF9fdGl0bGUnKSxcbiAgICAgIHBvc3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9nLW1lbnVfX2xpbmsnKSxcbiAgICAgIGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb3N0ID0gcG9zdHNbaV0sXG4gICAgICAgIHBvc3RUb3AgPSBwb3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKHBvc3RUb3AgPD0gMTAwKSB7XG4gICAgICAgIGFjdGl2ZUxpbmtbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgICBwb3N0TGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcbiAgdmFyIF9jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IF9maXhNZW51LFxuICAgIGluaXRBY3RpdmU6IF9pbml0QWN0aXZlLFxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9vcGVuJykpIHtcbiAgICAgICAgX29wZW5NZW51KCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX2Nsb3NlTWVudSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKTsiLCIvLyBCTFVSIEVGRkVDVFxyXG52YXIgQmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSxcclxuICAgIGJsdXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm0nKSxcclxuICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKS5vZmZzZXRXaWR0aCxcclxuICAgICAgICBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJyksXHJcbiAgICAgICAgaW1nQ29vcmRzID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHNlY3Rpb25Db29yZHMgPSBzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIGJsdXJDb29yZHMgPSBibHVyV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBwb3NMZWZ0ID0gLWJsdXJXcmFwcGVyLm9mZnNldExlZnQsXHJcbiAgICAgICAgcG9zVG9wID0gaW1nLm9mZnNldFRvcCAtIGJsdXJXcmFwcGVyLm9mZnNldFRvcCxcclxuICAgICAgICBibHVyQ1NTID0gYmx1ci5zdHlsZTtcclxuXHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy8gaW5kZXggZmxpcFxyXG52YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XHJcblxyXG4gIHZhciBfYXV0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9O1xyXG5cclxuICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcclxuICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aDogX2F1dGgsXHJcbiAgICB3ZWxjb21lOiBfd2VsY29tZVxyXG4gIH1cclxuXHJcbn0pKCk7IiwidmFyIFZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBlcnJvckZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLW1zZycpLFxyXG4gICAgY2FwdGNoYUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlbGNvbWVfX2Vycm9yJyksXHJcbiAgICBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2NvbnRhaW5lcicpO1xyXG5cclxuICB2YXIgX2luaXQgPSBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgdmFyIGVsZW1zID0gZm9ybS5lbGVtZW50cztcclxuXHJcbiAgICBjb25zb2xlLmxvZyhlbGVtcyk7XHJcbiAgICByZXR1cm4gX3ZhbGlkYXRlKGVsZW1zKSA/IHRydWUgOiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBfdmFsaWRhdGUoaW5wdXRzKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlucHV0c1tpXS50YWdOYW1lID09PSAnQlVUVE9OJykgY29udGludWU7XHJcblxyXG4gICAgICB2YXIgZWxlbSA9IGlucHV0c1tpXTtcclxuXHJcbiAgICAgIGlmIChlbGVtLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIF9zaG93RXJyb3IoZWxlbSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpIHtcclxuXHJcbiAgICAgICAgaWYgKGVsZW0uY2hlY2tlZCAmJiBlbGVtLnZhbHVlID09PSAneWVzJykge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZWxlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICBjYXB0Y2hhRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gX3Nob3dFcnJvcihlbGVtKSB7XHJcbiAgICB2YXIgdGV4dCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YXIgcG9zaXRpb24gPSBlbGVtLnBhcmVudE5vZGUub2Zmc2V0VG9wICsgZWxlbS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBlcnJvckZpZWxkLmlubmVyVGV4dCA9ICfQktGLINC90LUg0LLQstC10LvQuCAnICsgdGV4dDtcclxuXHJcbiAgICAvLyBpZiAocG9zaXRpb24gPiBmb3JtQ29udGFpbmVyLm9mZnNldEhlaWdodClcclxuICAgIGVycm9yRmllbGQuc3R5bGUudG9wID0gcG9zaXRpb24gKyAncHgnO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX2NsZWFyRXJyb3IoZWxlbSkge1xyXG4gICAgY29uc29sZS5sb2coZWxlbSk7XHJcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcblxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX2luaXQsXHJcbiAgICBjbGVhcjogX2NsZWFyRXJyb3JcclxuICB9XHJcbn0pKCk7IiwiZnVuY3Rpb24gaW5pdE1hcCAoKSB7XHJcbiAgdmFyIHBvaW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc4NzA2OSwgMzcuNDc4MjIwKSxcclxuICAgIGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg2MjczLCAzNy40MTg2MjMpO1xyXG5cclxuICB2YXIgc3R5bGVzID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzk2ZDdjOFwifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19XTtcclxuXHJcbiAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcclxuICAgIHtuYW1lOiBcIlN0eWxlZCBNYXBcIn0pO1xyXG5cclxuICB2YXIgbWFwU2V0dGluZ3MgPSB7XHJcbiAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIHpvb206IDEzLFxyXG4gICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ21hcF9zdHlsZSddXHJcbiAgICB9LFxyXG4gICAgem9vbUNvbnRyb2w6IHRydWUsXHJcbiAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgIH0sXHJcbiAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2VcclxuICB9O1xyXG5cclxuICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcFNldHRpbmdzKTtcclxuXHJcbiAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgaWNvbjogJ2Fzc2V0cy9pbWcvZGVjb3IvbWFwX21hcmtlci5wbmcnLFxyXG4gICAgcG9zaXRpb246IHBvaW50ZXIsXHJcbiAgICBtYXA6IG1hcCxcclxuICAgIHRpdGxlOiBcIkknbSBoZXJlIVwiLFxyXG4gICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFXHJcbiAgfSk7XHJcblxyXG4gIG1hcC5tYXBUeXBlcy5zZXQoJ21hcF9zdHlsZScsIHN0eWxlZE1hcCk7XHJcbiAgbWFwLnNldE1hcFR5cGVJZCgnbWFwX3N0eWxlJyk7XHJcbn07XHJcbiIsInZhciBNZW51ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24nKSxcclxuICAgIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLWJ0bl9jbG9zZWQnKTtcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAoIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKSkgPyAnaGlkZGVuJyA6ICdhdXRvJztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy9pbmRleCBwYXJhbGF4XHJcbnZhciBNYWluUGFyYWxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcGFyYWxheENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4JyksXHJcbiAgICAgIGxheWVycyA9IHBhcmFsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICBkaXZpZGVyID0gaSAvIDQwLFxyXG4gICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHZhciBfZGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL9C00LvRjyDQv9C70LDQvdGI0LXRgtC+0LIg0Lgg0YLQtdC70LXRhNC+0L3QvtCyINC/0L7QtNGB0YLQsNCy0LjRgtGMINC/0YDQvtGB0YLQviDQutCw0YDRgtC40L3QutGDLCDQsCDQvdC1INCz0YDRg9C30LjRgtGMINCy0LXRgdGMINC/0LDRgNCw0LvQsNC60YFcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX3Nob3dcclxuICB9O1xyXG5cclxufSkoKTsiLCIvLyB2YXIgU2xpZGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcbi8vICAgICB2YXIgaXRlbXMsXG4vLyAgICAgICAgIGluZGV4LFxuLy8gICAgICAgICBpbml0aWFsSW5kZXggPSAxLFxuLy8gICAgICAgICBuZHgsXG4vLyAgICAgICAgIGR1cmF0aW9uID0gNTAwLFxuLy8gICAgICAgICB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1zbGlkZXInKTtcbi8vXG4vLyAgICAgZnVuY3Rpb24gaW5pdChkYXRhKSB7XG4vLyAgICAgICAgIHZhciBhY3RpdmVTbGlkZSA9IHtcbi8vICAgICAgICAgICAgIGluZGV4OiBpbml0aWFsSW5kZXgsXG4vLyAgICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3RpdGxlJyksXG4vLyAgICAgICAgICAgICB0ZWNobm9sb2d5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya19fdGVjaG5vbG9neScpLFxuLy8gICAgICAgICAgICAgaW1nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya19fcGljJyksXG4vLyAgICAgICAgICAgICBuZXh0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxuLy8gICAgICAgICAgICAgcHJldjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstc2xpZGVyX19saXN0X3ByZXYnKVxuLy9cbi8vICAgICAgICAgfTtcbi8vXG4vLyAgICAgICAgIGl0ZW1zID0gZGF0YTtcbi8vXG4vLyAgICAgICAgIC8vINC+0YLRgNC40YHQvtCy0LrQsCDQvtGB0L3QvtCy0L3QvtCz0L4g0YHQu9Cw0LnQtNCwXG4vLyAgICAgICAgIGNoYW5nZVNsaWRlKGFjdGl2ZVNsaWRlKTtcbi8vXG4vLyAgICAgICAgIC8vINC/0L7QtNCz0L7RgtC+0LLQutCwINGB0LvQsNC50LTQvtCyLdC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Llcbi8vICAgICAgICAgYWN0aXZlU2xpZGUubmV4dC5hcHBlbmRDaGlsZChjcmVhdGVTbGlkZXMoaXRlbXMsIGFjdGl2ZVNsaWRlLmluZGV4ICsgMSkpO1xuLy8gICAgICAgICBhY3RpdmVTbGlkZS5wcmV2LmFwcGVuZENoaWxkKGNyZWF0ZVNsaWRlcyhpdGVtcywgYWN0aXZlU2xpZGUuaW5kZXggLSAxKSk7XG4vL1xuLy8gICAgICAgICAvLyDRgdC70YPRiNCw0LXQvCDRgdC+0LHRi9GC0LjQtSDQv9C+INC90LDQttCw0YLQuNGOINC90LAg0YHQu9Cw0LnQtNGLXG4vLyAgICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgICAgICAgICAgIHNsaWRlU2hvdyhlLnRhcmdldCk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiBjcmVhdGVTbGlkZXMoaXRlbXMsIGFjdGl2ZSkge1xuLy8gICAgICAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbi8vXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbi8vICAgICAgICAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnTEknKTtcbi8vICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbi8vXG4vLyAgICAgICAgICAgICAoaSA9PT0gYWN0aXZlKSAmJiBzcGFuLmNsYXNzTGlzdC5hZGQoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcbi8vICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnd29yay1zbGlkZXJfX2l0ZW0nKTtcbi8vICAgICAgICAgICAgIHNwYW4uZGF0YXNldC50aXRsZSA9IGl0ZW0ubmFtZTtcbi8vICAgICAgICAgICAgIHNwYW4uZGF0YXNldC50ZWNobm9sb2d5ID0gaXRlbS50ZWNobm9sb2d5O1xuLy8gICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LmxpbmsgPSBpdGVtLmxpbms7XG4vLyAgICAgICAgICAgICBpbWcuc3JjID0gaXRlbS5pbWc7XG4vLyAgICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZCgnd29yay1zbGlkZXJfX2ltZycpO1xuLy9cbi8vICAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoaW1nKTtcbi8vICAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoc3Bhbik7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgcmV0dXJuIGxpc3Q7XG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiBzbGlkZVNob3cgKHRhcmdldCkge1xuLy8gICAgICAgICBpZiAodGFyZ2V0LmNvbnRhaW5zKG5leHQpKSB7XG4vLyAgICAgICAgICAgICBpbmRleCsrO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jb250YWlucyhwcmV2KSkge1xuLy8gICAgICAgICAgICAgaW5kZXgtLTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xuLy8gICAgICAgICAgICAgaW5kZXggPSAwO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xuLy8gICAgICAgICAgICAgaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAvLyBtb3ZlU2xpZGUobmV4dCk7XG4vLyAgICAgICAvLyBtb3ZlU2xpZGUocHJldik7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuLy8gICAgICAgY2hhbmdlU2xpZGUoaW5kZXgpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gbW92ZVNsaWRlKCkge1xuLy9cbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGNoYW5nZVNsaWRlKGFjdGl2ZUl0ZW0pIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYWN0aXZlSXRlbSlcbi8vICAgICAgICAgYWN0aXZlSXRlbS50aXRsZS5pbm5lckhUTUwgPSBpdGVtc1thY3RpdmVJdGVtLmluZGV4XS5uYW1lO1xuLy8gICAgICAgICBhY3RpdmVJdGVtLnRlY2hub2xvZ3kuaW5uZXJIVE1MID0gaXRlbXNbYWN0aXZlSXRlbS5pbmRleF0udGVjaG5vbG9neS5qb2luKCcsICcpO1xuLy8gICAgICAgICBhY3RpdmVJdGVtLmltZy5zcmMgPSBpdGVtc1thY3RpdmVJdGVtLmluZGV4XS5pbWc7XG4vLyAgICAgfVxuLy9cbi8vXG4vLyAgICAgdGhpcy5pbml0ID0gaW5pdDtcbi8vIH07IiwidmFyIFByZWxvYWRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKSxcclxuICAgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5kZXgtd3JhcHBlcicpLFxyXG4gICAgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nJyksXHJcbiAgICBmbGlwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyksXHJcbiAgICBwcm9jZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyX19wZXJjZW50JyksXHJcbiAgICBwZXJjZW50ID0gMCxcclxuICAgIHBlcmNlbnRTdGVwID0gMTAwIC8gKGltYWdlcy5sZW5ndGggKyAwLjQpO1xyXG5cclxuICBmdW5jdGlvbiBfbG9hZEltYWdlKGltZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwZXJjZW50ID0gTWF0aC5jZWlsKHBlcmNlbnQgKyBwZXJjZW50U3RlcCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGVyY2VudCwgcGVyY2VudFN0ZXApO1xyXG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xyXG4gICAgICAgIHJlc29sdmUoaW1nKTtcclxuICAgICAgfTtcclxuICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVqZWN0KGltZyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX3Nob3dMb2FkZXIoaW1nTGlzdCkge1xyXG4gICAgdmFyIHByb21pc2VJbWcgPSBpbWdMaXN0Lm1hcChfbG9hZEltYWdlKTtcclxuXHJcbiAgICBQcm9taXNlLmFsbChwcm9taXNlSW1nKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICBwZXJjZW50ID0gMTAwO1xyXG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgbG9hZGVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAvLyBsb2FkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkZXIpO1xyXG4gICAgICAgICAgbG9hZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMTUwMClcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZmxpcENhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDEsMCwwLCAwZGVnKSc7XHJcbiAgICAgICAgfSwgMTUwMClcclxuICAgICAgfSlcclxuICB9O1xyXG5cclxuZnVuY3Rpb24gX2Nsb3NlTG9hZGVyKCkge1xyXG4gIHZhciBpbWdBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZXMpO1xyXG5cclxuICBfc2hvd0xvYWRlcihpbWdBcnIpO1xyXG59O1xyXG5cclxuXHJcbnJldHVybiB7XHJcbiAgaW5pdDogX2Nsb3NlTG9hZGVyXHJcbn1cclxuXHJcbn0pXHJcbigpO1xyXG5cclxuXHJcbi8qXHJcbiAxIC0g0LfQsNCz0YDRg9C30LjRgtGMINGB0LDQvCDQv9GA0LXQu9C+0LDQtNC10YBcclxuIDIgLSDQstC30Y/RgtGMINCy0YHQtSDQutCw0YDRgtC40L3QutC4INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gMyAtINC/0L4g0LzQtdGA0LUg0LfQsNCz0YDRg9C30LrQuCDQutCw0YDRgtC40L3QvtC6INC80LXQvdGP0YLRjCDQv9GA0L7RhtC10L3RgtGLXHJcbiA0IC0g0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0YPQsdGA0LDRgtGMINC/0YDQtdC70L7QsNC00LXRgFxyXG4gKi8iLCJ2YXIgU2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkb3duOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICB2YXIgc2VjdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vXHJcbi8vIHZhciBzY3JvbGxQYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuLy8gICB2YXIgc3BlZWQgPSAxLFxyXG4vLyAgICAgY3VycmVudFBvc2l0aW9uLFxyXG4vLyAgICAgZGlzdFBvc2l0aW9uO1xyXG4vL1xyXG4vLyAgIHNwZWVkID0gKGN1cnJlbnRQb3NpdGlvbiAtIGRpc3RQb3NpdGlvbikgLyAxMDAwO1xyXG4vL1xyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBkb3duVG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbi8vICAgICB2YXIgZGlzdFBvc2l0aW9uID0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbi8vXHJcbi8vICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbi8vXHJcbi8vICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBkaXN0UG9zaXRpb24pO1xyXG4vL1xyXG4vLyAgICAgICBpZiAodG9wID4gMTAwMCkge1xyXG4vLyAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2NyKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSwgMTUpO1xyXG4vL1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gfSkoKTsiLCIvLyDQn9CQ0KDQkNCb0JDQmtChINCt0KTQpNCk0JXQmtCiINCSINCo0JDQn9Ca0JUg0KHQkNCZ0KLQkFxyXG52YXIgSGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICBwb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19wb3J0Zm9saW8nKSxcclxuICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJyk7XHJcblxyXG4gIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJyxcclxuICAgICAgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgaWYgKHBvcnRmb2xpbyAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9tb3ZlKHBvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xyXG4gICAgICB9O1xyXG4gICAgICBfbW92ZSh1c2VyLCB3U2Nyb2xsLCAzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSkoKTsiLCIvLyDQkNCd0JjQnNCQ0KbQmNCvINCY0JrQntCd0J7QmiDQodCa0JjQm9Ce0JJcclxudmFyIFNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gIC8vINCy0YvRh9C40YHQu9GP0LXQvCDQtNC70LjQvdGDINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgdmFyIGNpcmNsZUxlbmd0aCA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgIHJldHVybiBjaXJjbGVMZW5ndGg7XHJcbiAgfTtcclxuXHJcbiAgLy8g0L/RgNC40LzQtdC90Y/QtdC8INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCy0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xyXG5cclxuICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICAgIHNraWxsUGVyY2VudCA9IHNraWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JyksXHJcbiAgICAgIGxlbmd0aCA9IGNpcmNsZUxlbmd0aChjaXJjbGVGaWxsKSxcclxuICAgICAgcGVyY2VudCA9IGxlbmd0aCAqICgxMDAgLSBza2lsbFBlcmNlbnQpIC8gMTAwO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgIHNraWxsLnN0eWxlLm9wYWNpdHkgPSAwLjQ7XHJcbiAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ3JvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcclxuICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uID0gY2lyY2xlUG9zIC0gd2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgY2lyY2xlQW5pbWF0aW9uKHNraWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsInZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zLFxyXG4gICAgICAgIGluZGV4ID0gMSxcclxuICAgICAgICBuZHgsXHJcbiAgICAgICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICAgICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcclxuICAgICAgICBza2lsbHMgPSAkKCcud29ya19fdGVjaG5vbG9neScpLFxyXG4gICAgICAgIGRlc2MgPSAkKCcud29ya19fZGVzY3JpcHRpb24nKSxcclxuICAgICAgICBpbWdDb250YWluZXIgPSAkKCcud29ya19fcGljJyksXHJcbiAgICAgICAgbGluayA9ICQoJy53b3JrX19saW5rJyksXHJcbiAgICAgICAgc291cmNlID0gJCgnLndvcmtfX3NvdXJjZScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIF9pbml0KGRhdGEpIHtcclxuICAgICAgICBpdGVtcyA9IGRhdGE7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICBpbWdTcmMgPSBhY3RpdmVJdGVtLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgICBhY3RpdmVUaXRsZSA9IGFjdGl2ZUl0ZW0uZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgYWN0aXZlU2xpbGwgPSBhY3RpdmVJdGVtLmRhdGEoJ3RlY2hub2xvZ3knKSxcclxuICAgICAgICAgICAgYWN0aXZlRGVzYyA9IGFjdGl2ZUl0ZW0uZGF0YSgnZGVzY3JpcHRpb24nKSxcclxuICAgICAgICAgICAgYWN0aXZlTGluayA9IGFjdGl2ZUl0ZW0uZGF0YSgnbGluaycpO1xyXG5cclxuICAgICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgaW1nU3JjKTtcclxuICAgICAgICB0aXRsZS50ZXh0KGFjdGl2ZVRpdGxlKTtcclxuICAgICAgICBza2lsbHMudGV4dChhY3RpdmVTbGlsbCk7XHJcbiAgICAgICAgZGVzYy50ZXh0KGFjdGl2ZURlc2MpO1xyXG4gICAgICAgIGxpbmsuYXR0cignaHJlZicsIGFjdGl2ZUxpbmspO1xyXG4gICAgICAgIChhY3RpdmVJdGVtLmRhdGEoJ3NvdXJjZScpKSAmJiBzb3VyY2UuYXR0cignaHJlZicsIGFjdGl2ZUl0ZW0uZGF0YSgnc291cmNlJykpO1xyXG5cclxuICAgICAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xyXG4gICAgICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgdmFyIHByZXZJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuZXEoaW5kZXggLSAxKTtcclxuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIG5leHRJdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcclxuICAgICAgICAgICAgcmVxSXRlbSA9IG5leHRJdGVtcy5lcShuZHgpO1xyXG4gICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xMDAgOiAxMDA7XHJcblxyXG4gICAgICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogMFxyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgICAgICAgcmVxSXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX21vdmVOZXh0KCkge1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIG5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9zbGlkZVNob3coKSB7XHJcbiAgICAgICAgdmFyIGZhZGVkT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBsb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIG5leHRJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICBuZXh0U3JjID0gbmV4dEl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICAgIG5leHRUaXRsZSA9IG5leHRJdGVtLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgIG5leHRTa2lsbHMgPSBuZXh0SXRlbS5kYXRhKCd0ZWNobm9sb2d5JyksXHJcbiAgICAgICAgICAgIG5leHREZXNjID0gbmV4dEl0ZW0uZGF0YSgnZGVzY3JpcHRpb24nKSxcclxuICAgICAgICAgICAgbmV4dExpbmsgPSBuZXh0SXRlbS5kYXRhKCdsaW5rJyk7XHJcblxyXG4gICAgICAgIF9tb3ZlTmV4dCgpO1xyXG4gICAgICAgIF9tb3ZlUHJldigpO1xyXG5cclxuICAgICAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpdGxlLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgc2tpbGxzLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmYWRlZE91dC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGl0bGUudGV4dChuZXh0VGl0bGUpO1xyXG4gICAgICAgICAgICBza2lsbHMudGV4dChuZXh0U2tpbGxzKTtcclxuICAgICAgICAgICAgZGVzYy50ZXh0KG5leHREZXNjKTtcclxuICAgICAgICAgICAgbGluay5hdHRyKCdocmVmJywgbmV4dExpbmspO1xyXG4gICAgICAgICAgICBpZiAobmV4dEl0ZW0uZGF0YSgnc291cmNlJykpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5hdHRyKCdocmVmJywgbmV4dEl0ZW0uZGF0YSgnc291cmNlJykpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBuZXh0U3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxvYWRlZC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGl0bGUuZmFkZUluKCk7XHJcbiAgICAgICAgICAgIHNraWxscy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgaW1nQ29udGFpbmVyLmZhZGVJbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogX2luaXQsXHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLnRvZ2dsZV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19uZXh0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfcHJldicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX3NsaWRlU2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbigpOyIsInZhciByZXF1ZXN0ID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICB4aHIuIG9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID4gNDAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCfQvdC1INGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjCDRhNCw0LnQuycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KVxufTtcbiIsInZhciBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpO1xyXG5cclxuaWYgKHByZWxvYWQgIT09IG51bGwpIFByZWxvYWRlci5pbml0KCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvL01BSU4gUEFSQUxBWFxyXG4gIHZhciBwYXJhbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKTtcclxuXHJcbiAgaWYgKHBhcmFsYXggIT09IG51bGwpIHtcclxuICAgIE1haW5QYXJhbGF4LmluaXQoKTtcclxuICB9XHJcbiAgLy9cclxuICAvLyBjb25zb2xlLmxvZyhwYXJhbGF4KTtcclxuXHJcblxyXG4gIC8vRkxJUCBDQVJEXHJcbiAgdmFyIGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIHdlbGNvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xyXG5cclxuICBpZiAoYXV0aEJ0biAhPT0gbnVsbCkge1xyXG4gICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgRmxpcC5hdXRoKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmICh3ZWxjb21lQnRuICE9PSBudWxsKSB7XHJcbiAgICB3ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGbGlwLndlbGNvbWUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9CVVJHRVJNRU5VXHJcbiAgdmFyIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xyXG5cclxuICBpZiAoYnVyZ2VyTWVudSAhPT0gbnVsbCkge1xyXG4gICAgYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgTWVudS50b2dnbGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vQkxVUlxyXG4gIHZhciBibHVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gIGlmIChibHVyRm9ybSAhPT0gbnVsbCkge1xyXG4gICAgQmx1ci5zZXQoKTtcclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgQmx1ci5zZXQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuXHJcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcblxyXG4gIGlmIChmb3JtICE9PSBudWxsKSB7XHJcbiAgICAvL9C+0YfQuNGB0YLQutCwINC+0YjQuNCx0LrQuFxyXG4gICAgdmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHM7XHJcbiAgICB2YXIgY2xvc2VFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1jYXB0Y2hhX19jbG9zZScpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlucHV0c1tpXS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2lucHV0LWdyb3VwX2Vycm9yJykpIHtcclxuICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlRXJyb3IgIT09IG51bGwpIHtcclxuICAgICAgY2xvc2VFcnJvci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2xvc2VFcnJvci5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICB2YXIgdmFsaWQgPSBWYWxpZGF0aW9uLmluaXQoZm9ybSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIC8vU0NST0xMIFBBR0VcclxuICB2YXIgc2Nyb2xsTGlua0Rvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfZG93bicpO1xyXG4gIHZhciBzY3JvbGxMaW5rVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfdXAnKTtcclxuXHJcbiAgaWYgKHNjcm9sbExpbmtEb3duICE9PSBudWxsKSB7XHJcbiAgICBzY3JvbGxMaW5rRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGlmIChzY3JvbGxMaW5rVXAgIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UudXAodGhpcyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy9TTElERVJcclxuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xyXG5cclxuICBpZiAoc2xpZGVyICE9PSBudWxsKSB7XHJcbiAgICAkLmdldEpTT04oJy4uL2RhdGEvd29ya3MuanNvbicsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAkKCcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLmFwcGVuZChjcmVhdGVTbGlkZXMoZGF0YSkpO1xyXG4gICAgICAgICQoJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JykuYXBwZW5kKGNyZWF0ZVNsaWRlcyhkYXRhKSk7XHJcblxyXG4gICAgICAgIFNsaWRlci5pbml0KCQoJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JykuY2hpbGRyZW4oKSk7XHJcbiAgICAgICAgU2xpZGVyLm1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2xpZGVzKGl0ZW1zLCBhY3RpdmUpIHtcclxuICAgICAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0xJJyk7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIChpID09PSBhY3RpdmUpICYmIHNwYW4uY2xhc3NMaXN0LmFkZCgnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ3dvcmstc2xpZGVyX19pdGVtJyk7XHJcbiAgICAgICAgICAgIHNwYW4uZGF0YXNldC50aXRsZSA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LnRlY2hub2xvZ3kgPSBpdGVtLnRlY2hub2xvZ3kuam9pbignLCAnKTtcclxuICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LmRlc2NyaXB0aW9uID0gaXRlbS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LmxpbmsgPSBpdGVtLmxpbms7XHJcbiAgICAgICAgICAgIC8vIHNwYW4uZGF0YXNldC5zb3VyY2UgPSAoaXRlbS5zb3VyY2UpID8gaXRlbS5zb3VyY2UgOiAnJztcclxuICAgICAgICAgICAgaWYgKGl0ZW0uc291cmNlKSBzcGFuLmRhdGFzZXQuc291cmNlID0gKGl0ZW0uc291cmNlKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IGl0ZW0uaW1nO1xyXG4gICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZCgnd29yay1zbGlkZXJfX2ltZycpO1xyXG5cclxuICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAvL0hFQURFUiBQQVJBTEFYICYgU0tJTExTXHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYmcnKSxcclxuICAgIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgYmxvZ1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jb250YWluZXInKTtcclxuXHJcbiAgLy8g0JLQq9CX0J7QkiDQpNCj0J3QmtCm0JjQryDQn9CeINCh0JrQoNCe0JvQm9CjINCh0KLQoNCQ0J3QmNCm0KtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGJnICE9PSBudWxsKSB7XHJcbiAgICAgIEhlYWRlclBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICBTa2lsbHMuZ3JvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChibG9nV3JhcHBlciAhPT0gbnVsbCkge1xyXG4gICAgICBCbG9nTWVudS5pbml0KCk7XHJcbiAgICAgIEJsb2dNZW51LmluaXRBY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyIHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVtZW51LWJ0bicpO1xyXG5cclxuICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgIHNpZGVNZW51Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsb2dNZW51LnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgQmxvZ01lbnUuaW5pdCgpO1xyXG4gIH1cclxuXHJcblxyXG59OyJdfQ==
