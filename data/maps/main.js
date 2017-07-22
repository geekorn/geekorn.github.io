/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Storage = __webpack_require__(3);
var random = __webpack_require__(2);

module.exports = new function () {
    // объявление переменных
    var map = void 0,
        clusterer = void 0,
        reviews = [],
        storage = false;

    // приватные функции

    /**
     * функции получения координат по адресу и наоборот
     * @return {Promise}
     */
    function getAddress(coords) {
        return ymaps.geocode(coords).then(function (result) {
            return result.geoObjects.get(0).getAddressLine();
        });
    }
    function getCoords(address) {
        return ymaps.geocode(address).then(function (result) {
            return result.geoObjects.get(0).geometry.getCoordinates();
        });
    }

    /**
     * получение отзывов по конкретному адресу
     * @param address
     * @return {Array.<*>}
     */
    function getReviews(address) {
        return reviews.filter(function (item) {
            return item.address == address;
        }).reverse();
    }

    /**
     * создание макетов балуна и сохранение их в локальном хранилище
     */
    function createLayouts() {
        ymaps.layout.storage.add('balloon#reviews', ymaps.templateLayoutFactory.createClass('{% if reviews.length %}' + '{% for review in reviews %}' +
        // Переменная name "видна" только в блоке for ... endfor
        '<div class="review">' + '<div class="review__header">' + '<div class="review__name">{{ review.name }}</div>' + '</div>' + '<div class="review__body">' + '<div class="review__msg">{{ review.text }}</div>' + '<div class="review__footer">' + '<div class="review__place"> {{ review.place }}</div>' + '<div class="review__date">{{ review.date }}</div>' + '</div>' + '</div>' + '</div>' + '{% endfor %}' + '{% else %}' + '<div>Отзывов еще нет...</div>' + '{% endif %}'));
        ymaps.layout.storage.add('balloon#maximize', ymaps.templateLayoutFactory.createClass('<div class="balloon">' + '<div class="balloon__header">' + '<div class="balloon__location">{{ properties.reviewAddress| default: address}}</div>' + '<div class="balloon__close">&times</div></div>' + '<div class="balloon__content">' + '<div class="balloon__reviews">' + '{% include options.contentLayout %}' + '</div>' + '<div class="balloon__form">' + '<form action="" method="post" class="form">' + '<div class="form__title">ваш отзыв</div>' + '<label class="form__field textfield">' + '<input type="text" name="name" class="textfield__control" placeholder="Имя">' + '<span class="random place">Сгенерировать</span>' + '</label>' + '<label class="form__field textfield">' + '<input type="text" name="place" class="textfield__control" placeholder="Место">' + '</label>' + '<label class="form__field textarea">' + '<textarea name="message" id="" rows="5" class="textarea__control" placeholder="Отзыв"></textarea>' + '</label>' + '<div class="form__buttons"><button class="form__btn save-review" type="button">Сохранить</button>' + '<button class="form__btn del-reviews" type="button">Удалить все метки</button></div>' + '</form></div></div></div>', {
            // todo - сделать сдвиг карты, чтобы балун было видно полностью
            build: function build() {
                this.constructor.superclass.build.call(this);
                this.close = this._parentElement.querySelector('.balloon__close');
                this.save = this._parentElement.querySelector('.save-review');
                this.remove = this._parentElement.querySelector('.del-reviews');
                this.random = this._parentElement.querySelector('.random');

                this._attachListeners();
            },
            clear: function clear() {
                this._detachListeners();
                this.constructor.superclass.clear.call(this);
            },
            getShape: function getShape() {
                var el = this.getElement();

                if (el) {
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[0, 0], [el.firstChild.offsetWidth, el.firstChild.offsetHeight]]));
                }
            },
            _attachListeners: function _attachListeners() {
                this.random.addEventListener('click', this._setFieldsRandomString);
                this.close.addEventListener('click', this._closeBalloon.bind(this));
                this.save.addEventListener('click', this._savePlacemark.bind(this));
                this.remove.addEventListener('click', this._deleteData);
            },
            _detachListeners: function _detachListeners() {
                this.random.removeEventListener('click', this._setFieldsRandomString);
                this.close.removeEventListener('click', this._closeBalloon);
                this.save.removeEventListener('click', this._savePlacemark);
                this.remove.removeEventListener('click', this._deleteData);
            },
            _closeBalloon: function _closeBalloon(e) {
                e.preventDefault();
                this.events.fire('userclose');
            },
            _savePlacemark: function _savePlacemark(e) {
                var form = e.target.closest('form');
                var coords = this.getData().coords ? this.getData().coords : this.getData().geometry.getCoordinates();

                saveReview(form, coords);
            },
            _deleteData: function _deleteData() {
                map.balloon.close();
                clusterer.removeAll();
                reviews.length = 0;
                storage && Storage.deleteData();
            },
            _setFieldsRandomString: function _setFieldsRandomString(e) {
                var target = e.target;
                var form = target.closest('form');

                random.getRandomWord().then(function (array) {
                    form.name.value = array[Math.floor(Math.random() * array.length)].name;
                    form.place.value = array[Math.floor(Math.random() * array.length)].name;
                    form.message.value = random.getRandomString(Math.floor(Math.random() * (10 - 4) + 4));
                });
            }
        }));
        ymaps.layout.storage.add('balloon#carousel', ymaps.templateLayoutFactory.createClass('<div class=cluster-balloon>' + '<div class="cluster__header"><h2 class=cluster__place>{{ properties.reviewAddress }}</h2>' + '<a href=# class=cluster__link>{{ properties.reviewAddress }}</a></div>' + '<div class=cluster__message>{{ properties.reviewText }}</div>' + '<div class=cluster__footer>{{ properties.reviewDate}}</div></div>', {
            build: function build() {
                this.constructor.superclass.build.call(this);

                var link = this._parentElement.querySelector('.cluster__link');

                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    getCoords(e.target.innerText).then(function (coords) {
                        return openBalloon(coords);
                    });
                });
            }
        }));
    }

    /**
     * Создание метки
     * @param {object} properties {name, place, text, date, coords, address}
     * @return {ymaps.Placemark}
     */
    function createPlacemark(properties) {
        return new ymaps.Placemark(properties.coords, {
            hintContent: properties.address,
            reviewAddress: properties.address,
            reviewName: properties.name,
            reviewDate: properties.date,
            reviewText: properties.text,
            reviewPlace: properties.place,
            reviews: getReviews(properties.address)
        }, {
            hasBalloon: false,
            openBalloonOnClick: false
        });
    }

    /**
     * установка метки
     * @param {object} review - объект с данными отзыва
     */
    function setPlacemark(review) {
        clusterer.add(createPlacemark(review));
        updateBalloon(review);
    }

    /**
     * сохранение отзыва
     * @param form - форма с полями ввода
     * @param coords - координаты места
     */
    function saveReview(form, coords) {
        getAddress(coords).then(function (address) {
            var review = {
                name: form.name.value,
                place: form.place.value,
                text: form.message.value,
                address: address,
                coords: coords,
                date: new Date().toLocaleString('ru', {})
            };

            reviews.push(review);
            setPlacemark(review);
            storage && Storage.setData(reviews);
        });
    }

    /**
     * открыть балун в нужных координатах
     * @param coords
     */
    function openBalloon(coords) {
        getAddress(coords).then(function (address) {
            map.balloon.open(coords, {
                address: address,
                coords: coords,
                reviews: getReviews(address)
            }, {
                layout: 'balloon#maximize',
                contentLayout: 'balloon#reviews'
            });
        });
    }

    /**
     * Обновить список отзывов в балуне
     * @param {object} review
     */
    function updateBalloon(review) {
        map.balloon.setData({
            address: review.address,
            coords: review.coords,
            reviews: getReviews(review.address)
        });
    }

    // публичные методы
    this.init = function () {
        var center = [55.76, 37.64],
            zoom = 15,
            controls = [];

        createLayouts();
        map = new ymaps.Map('map', {
            center: center,
            zoom: zoom,
            controls: controls,
            behaviors: ['default']
        });
        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            // Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
            groupByCoordinates: false,
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            clusterOpenBalloonOnClick: true,
            // Устанавливаем стандартный макет балуна кластера "Карусель".
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            // Устанавливаем собственный макет.
            clusterBalloonItemContentLayout: 'balloon#carousel',
            // Устанавливаем режим открытия балуна.
            // В данном примере балун никогда не будет открываться в режиме панели.
            clusterBalloonPanelMaxMapArea: 0,
            // Устанавливаем размеры макета контента балуна (в пикселях).
            clusterBalloonContentLayoutWidth: 250,
            clusterBalloonContentLayoutHeight: 130
            // Устанавливаем максимальное количество элементов в нижней панели на одной странице
            // clusterBalloonPagerSize: 5
        });

        if (Storage.exist()) {
            storage = true;
            reviews = Storage.getData();
            clusterer.add(reviews.map(function (item) {
                return createPlacemark(item);
            }));
        }

        map.geoObjects.add(clusterer);
        // метки центрируются при загрузке карты
        clusterer.getGeoObjects().length && map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true, zoomMargin: 30 }).then(function () {
            map.getZoom() > 15 && map.setZoom(15);
        });

        map.events.add('click', function (e) {
            if (!map.balloon.isOpen()) {
                var coords = e.get('coords');

                openBalloon(coords);
            } else {
                map.balloon.close();
            }
        });

        clusterer.events.add('click', function (e) {
            var target = e.get('target');
            var geoObjectState = clusterer.getObjectState(target);

            // Если объект не попал в кластер, открываем его собственный балун.
            if (geoObjectState.isShown) {
                openBalloon(target.geometry.getCoordinates());
            }
        });
    };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Map = __webpack_require__(0);

window.onload = function () {
    ymaps.ready(Map.init);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    array: [],
    words: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero', 'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia', 'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros', 'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus', 'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus', 'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam', 'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque', 'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada', 'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat', 'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante', 'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae', 'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl', 'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae', 'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu', 'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis', 'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis', 'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam', 'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi', 'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus', 'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus', 'elementum', 'tempor', 'risus', 'cras'],
    getRandomString: function getRandomString(len) {
        var wordCount = len > this.words.length ? this.words.length - 1 : len;
        var extracted = [];

        for (var i = 0; i < wordCount; i++) {

            var word = Math.floor(Math.random() * this.words.length);

            extracted[i] = this.words[word];
        }

        return extracted.join(' ');
    },
    getRandomWord: function getRandomWord() {
        var url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        return fetch(url).then(function (response) {
            return response.json();
        });
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(4);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = new function () {
    var storage = window.localStorage;
    var key = 'reviews';

    this.exist = function () {
        return storage;
    };
    this.getData = function () {
        return storage[key] ? JSON.parse(storage.getItem(key)) : [];
    };
    this.setData = function (data) {
        return storage.setItem(key, (0, _stringify2.default)(data));
    };
    this.deleteData = function () {
        return storage.removeItem(key);
    };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(6)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map