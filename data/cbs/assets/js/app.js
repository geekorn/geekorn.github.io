'use strict';


var Modal = (function () {
  var modal = document.querySelector('.modal');
  var close = document.querySelector('.close');
  var flip = document.querySelector('.rotate');

  
  var _hide = function () { 
    if (modal !== null) {       
      modal.classList.add('modal--disabled');
    }
  }
  var _show = function () {
    if (modal !== null) {
      modal.classList.remove('modal--disabled');
    }
  }

  close.addEventListener('click', function () {
    _hide();
  });

  flip.addEventListener('click', function () {
    var flipper = document.querySelector('.flipper');
    var buttons = this.parentNode;

    buttons.classList.add('modal__buttons--fade');
    setTimeout(function () {
      buttons.classList.remove('modal__buttons--fade');
    }, 1000);

    if (flipper.classList.contains('flipper--rotate')) {
      flipper.classList.remove('flipper--rotate');
    } else {
      flipper.classList.add('flipper--rotate');
    }
  });

  return {
    show: _show,
    hide: _hide
  }
})()

window.onload = function () {
  var takeit = document.querySelector('.take-it');

  takeit.addEventListener('click', function () { Modal.hide() } );

};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIE1vZGFsID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcclxuICB2YXIgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuICB2YXIgZmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUnKTtcclxuXHJcbiAgXHJcbiAgdmFyIF9oaWRlID0gZnVuY3Rpb24gKCkgeyBcclxuICAgIGlmIChtb2RhbCAhPT0gbnVsbCkgeyAgICAgICBcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChtb2RhbCAhPT0gbnVsbCkge1xyXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC0tZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgX2hpZGUoKTtcclxuICB9KTtcclxuXHJcbiAgZmxpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcclxuICAgIHZhciBidXR0b25zID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cclxuICAgIGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2J1dHRvbnMtLWZhZGUnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsX19idXR0b25zLS1mYWRlJyk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICBpZiAoZmxpcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZXItLXJvdGF0ZScpKSB7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlci0tcm90YXRlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmbGlwcGVyLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItLXJvdGF0ZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvdzogX3Nob3csXHJcbiAgICBoaWRlOiBfaGlkZVxyXG4gIH1cclxufSkoKVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFrZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRha2UtaXQnKTtcclxuXHJcbiAgdGFrZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyBNb2RhbC5oaWRlKCkgfSApO1xyXG5cclxufTsiXX0=
