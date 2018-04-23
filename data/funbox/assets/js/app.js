'use strict';

window.onload = function () {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return;
  };

  const products = document.querySelector('.products');

  // products.addEventListener("mouseover", function(e) {
  //   let target = e.target;
  //   let flag = false;

  //   while (target != this) {
  //     if (target.classList.contains('card')) break;

  //     target = target.parentNode;
  //   }

    
  products.addEventListener("change", function(e) {
    let checkbox = e.target;
    let product = checkbox.parentNode;
    let card = product.querySelector('.card');

    if (checkbox.checked) {
      // card.onmouseleave = function() {
      //   console.log('leave')
      card.classList.add('card_selected');
    } else {
      card.classList.remove('card_selected');
    }  
  })
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcclxuICAgIHJldHVybjtcclxuICB9O1xyXG5cclxuICBjb25zdCBwcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpO1xyXG5cclxuICAvLyBwcm9kdWN0cy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAvLyAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAvLyAgIGxldCBmbGFnID0gZmFsc2U7XHJcblxyXG4gIC8vICAgd2hpbGUgKHRhcmdldCAhPSB0aGlzKSB7XHJcbiAgLy8gICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkJykpIGJyZWFrO1xyXG5cclxuICAvLyAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgLy8gICB9XHJcblxyXG4gICAgXHJcbiAgcHJvZHVjdHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgY2hlY2tib3ggPSBlLnRhcmdldDtcclxuICAgIGxldCBwcm9kdWN0ID0gY2hlY2tib3gucGFyZW50Tm9kZTtcclxuICAgIGxldCBjYXJkID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcuY2FyZCcpO1xyXG5cclxuICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgIC8vIGNhcmQub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ2xlYXZlJylcclxuICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2NhcmRfc2VsZWN0ZWQnKTtcclxuICAgIH0gIFxyXG4gIH0pXHJcbn07Il19
