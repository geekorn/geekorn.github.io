'use strict';

window.onload = function () {
  var modal = document.querySelector('.modal');
  var takeit = document.querySelector('.take-it');
  var close = document.querySelector('.close');
  var flip = document.querySelector('.rotate');

  takeit.addEventListener('click', function () {
    modal.classList.add('modal--disabled');
  });

  close.addEventListener('click', function () {
    modal.classList.add('modal--disabled');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbiAgdmFyIHRha2VpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWtlLWl0Jyk7XHJcbiAgdmFyIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XHJcbiAgdmFyIGZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJyk7XHJcblxyXG4gIHRha2VpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1kaXNhYmxlZCcpO1xyXG4gIH0pO1xyXG5cclxuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1kaXNhYmxlZCcpO1xyXG4gIH0pO1xyXG5cclxuICBmbGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG4gICAgdmFyIGJ1dHRvbnMgPSB0aGlzLnBhcmVudE5vZGU7XHJcblxyXG4gICAgYnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdtb2RhbF9fYnV0dG9ucy0tZmFkZScpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJ1dHRvbnMuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWxfX2J1dHRvbnMtLWZhZGUnKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIGlmIChmbGlwcGVyLmNsYXNzTGlzdC5jb250YWlucygnZmxpcHBlci0tcm90YXRlJykpIHtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVyLS1yb3RhdGUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LmFkZCgnZmxpcHBlci0tcm90YXRlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07Il19
