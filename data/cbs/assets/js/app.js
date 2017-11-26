'use strict';

window.onload = function () {
  var close = document.querySelector('.close');
  var flip = document.querySelector('.rotate');
  // console.log(rotate);

  close.addEventListener('click', function () {
    this.parentNode.parentNode.classList.add('modal--disable');
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
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuICB2YXIgZmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUnKTtcclxuICAvLyBjb25zb2xlLmxvZyhyb3RhdGUpO1xyXG5cclxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1kaXNhYmxlJyk7XHJcbiAgfSk7XHJcblxyXG4gIGZsaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XHJcbiAgICB2YXIgYnV0dG9ucyA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHJcbiAgICBidXR0b25zLmNsYXNzTGlzdC5hZGQoJ21vZGFsX19idXR0b25zLS1mYWRlJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgYnV0dG9ucy5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbF9fYnV0dG9ucy0tZmFkZScpO1xyXG4gICAgfSwgMTAwMCk7XHJcblxyXG4gICAgaWYgKGZsaXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVyLS1yb3RhdGUnKSkge1xyXG4gICAgICBmbGlwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXItLXJvdGF0ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QuYWRkKCdmbGlwcGVyLS1yb3RhdGUnKTtcclxuICAgIH1cclxuICB9KTtcclxufTsiXX0=
