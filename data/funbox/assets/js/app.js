'use strict';

window.onload = function () {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return;
  };

  const products = document.querySelector('.products');
  const checkedCard = products.querySelectorAll('.product__checkbox');

  checkedCard.forEach(function(input) {
    if (input.checked) {
      input.parentNode.querySelector('.card').classList.add('card_selected');
    }
  })
    
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

  // products.addEventListener("mouseover", function(e) {
  //   let target = e.target;
  //   let flag = false;

  //   while (target != this) {
  //     if (target.classList.contains('card')) break;

  //     target = target.parentNode;
  //   }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcclxuICAgIHJldHVybjtcclxuICB9O1xyXG5cclxuICBjb25zdCBwcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpO1xyXG4gIGNvbnN0IGNoZWNrZWRDYXJkID0gcHJvZHVjdHMucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX2NoZWNrYm94Jyk7XHJcblxyXG4gIGNoZWNrZWRDYXJkLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XHJcbiAgICAgIGlucHV0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmNhcmQnKS5jbGFzc0xpc3QuYWRkKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAgIFxyXG4gIHByb2R1Y3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IGNoZWNrYm94ID0gZS50YXJnZXQ7XHJcbiAgICBsZXQgcHJvZHVjdCA9IGNoZWNrYm94LnBhcmVudE5vZGU7XHJcbiAgICBsZXQgY2FyZCA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLmNhcmQnKTtcclxuXHJcbiAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgICAvLyBjYXJkLm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdsZWF2ZScpXHJcbiAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZF9zZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICB9ICBcclxuICB9KSAgXHJcblxyXG4gIC8vIHByb2R1Y3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZSkge1xyXG4gIC8vICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gIC8vICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgLy8gICB3aGlsZSAodGFyZ2V0ICE9IHRoaXMpIHtcclxuICAvLyAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQnKSkgYnJlYWs7XHJcblxyXG4gIC8vICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAvLyAgIH1cclxufTsiXX0=
