
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

const mainImage = document.getElementById('mainImage');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const dots = document.querySelectorAll('.dot');
const btnAddToCart = document.querySelectorAll('.btn-add-to-cart');
const cartContainer = document.querySelector('.cart-container');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuIcon.classList.toggle('open');
});


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('open');
        }
    });
});


const images = [
    'images/combo1.jpg',          
    'images/combo6.jpg',          
    'images/combo4.jpg',
    'images/coffee_fries.jpg',
    'images/roll2.jpeg' 
];


let currentIndex = 0;


images.forEach((src) => {
    const img = new Image();
    img.src = src;
});


function updateImage() {
    
    mainImage.classList.add('hidden');
    
    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.classList.remove('hidden');
        updateActiveDot();
    }, 500); 
}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        updateImage();
        updateActiveDot();
        resetSlideInterval();
    });
});

function updateActiveDot() {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}


let slideInterval = setInterval(() => {
    nextButton.click();
}, 5000); 


const imageContainer = document.querySelector('.image-container');

imageContainer.addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

imageContainer.addEventListener('mouseout', () => {
    resetSlideInterval();
});

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextButton.click();
    }, 5000);
}


let cart = [];

btnAddToCart.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = button.getAttribute('data-price');
        addToCart(itemName, itemPrice);
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartSection = document.getElementById('cart');
    const cartContainerDiv = cartSection.querySelector('.cart-container');
    if (cart.length === 0) {
        cartContainerDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    let cartHTML = '<h3>Your Cart</h3><ul>';
    let total = 0;
    cart.forEach(item => {
        cartHTML += `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`;
        total += item.price * item.quantity;
    });
    cartHTML += `</ul><p><strong>Total: ₹${total}</strong></p>`;
    cartHTML += `<button class="btn-clear-cart">Clear Cart</button>`;
    cartContainerDiv.innerHTML = cartHTML;
    
   
    const btnClearCart = document.querySelector('.btn-clear-cart');
    btnClearCart.addEventListener('click', clearCart);
}

function clearCart() {
    cart = [];
    updateCartUI();
}




const moreFeedbackButton = document.getElementById('moreFeedback');
const hiddenFeedbackItems = document.querySelectorAll('.feedback-item.hidden');

moreFeedbackButton.addEventListener('click', () => {
    hiddenFeedbackItems.forEach(item => {
        item.classList.toggle('hidden'); // Toggle visibility of hidden feedback items
    });

    // Change button text
    if (hiddenFeedbackItems[0].classList.contains('hidden')) {
        moreFeedbackButton.innerText = "More Feedback";
    } else {
        moreFeedbackButton.innerText = "Less Feedback";
    }
});



function addToCart(name, price) {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
      // If item exists, increase the quantity and update totalPrice
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].totalPrice = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
      // If item does not exist, add as new
      cart.push({ name, price: parseFloat(price), quantity: 1, totalPrice: parseFloat(price) });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Attach event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        
      const itemName = button.getAttribute('data-item');
      const itemPrice = button.getAttribute('data-price');

      addToCart(itemName, itemPrice);

      // Redirect to cart page
      window.location.href = 'cart.html';
    });
  });













