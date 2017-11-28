'use strict';

window.onload = function () {
  var modal = document.querySelector('.modal');
  var takeit = document.querySelector('.take-it');
  var close = document.querySelector('.close');
  var flip = document.querySelector('.rotate');

  takeit.addEventListener('click', function () {
    modal.classList.add('modal--disable');
  });

  close.addEventListener('click', function () {
    modal.classList.add('modal--disable');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbiAgdmFyIHRha2VpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWtlLWl0Jyk7XHJcbiAgdmFyIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XHJcbiAgdmFyIGZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJyk7XHJcblxyXG4gIHRha2VpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1kaXNhYmxlJyk7XHJcbiAgfSk7XHJcblxyXG4gIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWRpc2FibGUnKTtcclxuICB9KTtcclxuXHJcbiAgZmxpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcclxuICAgIHZhciBidXR0b25zID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cclxuICAgIGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2J1dHRvbnMtLWZhZGUnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsX19idXR0b25zLS1mYWRlJyk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICBpZiAoZmxpcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZXItLXJvdGF0ZScpKSB7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlci0tcm90YXRlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmbGlwcGVyLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItLXJvdGF0ZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59OyJdfQ==
