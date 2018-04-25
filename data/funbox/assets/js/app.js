'use strict';

window.onload = function () {
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return;
  };

  const products = document.querySelector('.products');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcHJvZHVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMnKTtcclxuICBjb25zdCBjaGVja2VkQ2FyZCA9IHByb2R1Y3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19jaGVja2JveCcpO1xyXG5cclxuICBjaGVja2VkQ2FyZC5mb3JFYWNoKGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICBjb25zdCBjYXJkID0gaW5wdXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuY2FyZCcpO1xyXG5cclxuICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XHJcbiAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZF9zZWxlY3RlZCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICAgXHJcbiAgcHJvZHVjdHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBjb25zdCBjaGVja2JveCA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IGNoZWNrYm94LnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBjYXJkID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcuY2FyZCcpO1xyXG5cclxuICAgIGNhcmQub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBpZiAoIWNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdjYXJkX3NlbGVjdGVkJyk7XHJcbiAgICB9ICBcclxuICB9KVxyXG59OyJdfQ==
