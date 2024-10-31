function addToCart(name, price) {
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  
  const existingItemIndex = cart.findIndex(item => item.name === name);

  if (existingItemIndex > -1) {
      
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].totalPrice = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
  } else {
      
      cart.push({ name, price: parseFloat(price), quantity: 1, totalPrice: parseFloat(price) });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart items
function displayCartItems() {
  const cartItemsDiv = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('totalPrice');
  cartItemsDiv.innerHTML = ''; 

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      totalPriceEl.textContent = '0';
      return;
  }

  let total = 0;

  cart.forEach((item, index) => {
      
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';

      itemDiv.innerHTML = `
          <h4>${item.name}</h4>
          <div class="quantity-controls">
              <button class="decrement" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increment" data-index="${index}">+</button>
          </div>
          <p class="price">₹${item.totalPrice}</p>
          <button class="remove-item" data-index="${index}">🗑️</button>
      `;

      cartItemsDiv.appendChild(itemDiv);
      total += item.totalPrice;
  });

  totalPriceEl.textContent = total;

  // Attach event listeners for quantity controls and delete buttons
  attachCartEventListeners();
}

// Function to attach event listeners to cart buttons
function attachCartEventListeners() {
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');
  const removeButtons = document.querySelectorAll('.remove-item');

  incrementButtons.forEach(button => {
      button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'));
          updateQuantity(index, 1);
      });
  });

  decrementButtons.forEach(button => {
      button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'));
          updateQuantity(index, -1);
      });
  });

  removeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'));
          removeItem(index);
      });
  });
}

// Function to update item quantity
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart[index]) {
      cart[index].quantity += change;

      if (cart[index].quantity <= 0) {
          // Remove item if quantity is 0 or less
          cart.splice(index, 1);
      } else {
          // Update totalPrice for the item
          cart[index].totalPrice = cart[index].quantity * cart[index].price;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
  }
}




// Function to remove item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart[index]) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
  }
}

// Function to handle "Add More Items" button
function addMoreItems() {
  window.location.href = 'landing.html#menu'; 
}

// Function to handle "Proceed to Checkout" button
function proceedToCheckout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
  }

  // Implement checkout functionality here
  alert('Proceeding to Checkout...');

  // Example: Clear the cart after checkout
  // localStorage.removeItem('cart');
  // window.location.href = 'thankyou.html';
}

// Event listener for cart.html and landing.html
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('cart.html')) {
      displayCartItems();

      document.getElementById('addMoreButton').addEventListener('click', addMoreItems);
      document.getElementById('checkoutButton').addEventListener('click', proceedToCheckout);
  } else {
      
      const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

      addToCartButtons.forEach(button => {
          button.addEventListener('click', () => {
              const itemName = button.getAttribute('data-item');
              const itemPrice = button.getAttribute('data-price');
              const itemImage = button.getAttribute('data-image');

              addToCart(itemName, itemPrice, itemImage);

              // Redirect to cart page
              window.location.href = 'cart.html';
          });
      });
  }

  // Feedback Section Toggle (Optional)
  const moreFeedbackButton = document.getElementById('moreFeedback');
  const hiddenFeedbackItems = document.querySelectorAll('.feedback-item.hidden');

  if (moreFeedbackButton) {
      moreFeedbackButton.addEventListener('click', () => {
          hiddenFeedbackItems.forEach(item => {
              item.classList.toggle('hidden'); 
          });

          // Change button text
          if (hiddenFeedbackItems[0].classList.contains('hidden')) {
              moreFeedbackButton.innerText = "More Feedback";
          } else {
              moreFeedbackButton.innerText = "Less Feedback";
          }
      });
  }
});
