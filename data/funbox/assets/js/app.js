'use strict';

window.onload = function () {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return;
  };

  const products = document.querySelector('.products');
  if (!products) return;

  const checkedCard = products.querySelectorAll('.product__checkbox');

  

  checkedCard.forEach(function(input) {
    const card = input.parentNode.querySelector('.card');

    if (input.checked) {
      card.classList.add('card_selected');
    }
  });
    
  products.addEventListener("change", function(e) {
    const checkbox = e.target;
    const product = checkbox.parentNode;
    const card = product.querySelector('.card');

    card.onmouseleave = function() {
      if (checkbox.checked) {
        card.classList.add('card_selected');
      } 
    }
    if (!checkbox.checked) {
      card.classList.remove('card_selected');
    }  
  })
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcclxuICAgIHJldHVybjtcclxuICB9O1xyXG5cclxuICBjb25zdCBwcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpO1xyXG4gIGlmICghcHJvZHVjdHMpIHJldHVybjtcclxuXHJcbiAgY29uc3QgY2hlY2tlZENhcmQgPSBwcm9kdWN0cy5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fY2hlY2tib3gnKTtcclxuXHJcbiAgXHJcblxyXG4gIGNoZWNrZWRDYXJkLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgIGNvbnN0IGNhcmQgPSBpbnB1dC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkJyk7XHJcblxyXG4gICAgaWYgKGlucHV0LmNoZWNrZWQpIHtcclxuICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgICBcclxuICBwcm9kdWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZS50YXJnZXQ7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gY2hlY2tib3gucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGNhcmQgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkJyk7XHJcblxyXG4gICAgY2FyZC5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmRfc2VsZWN0ZWQnKTtcclxuICAgICAgfSBcclxuICAgIH1cclxuICAgIGlmICghY2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2NhcmRfc2VsZWN0ZWQnKTtcclxuICAgIH0gIFxyXG4gIH0pXHJcbn07Il19
