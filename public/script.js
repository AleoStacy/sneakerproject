// Fetch Sneakers Data
fetch('http://localhost:3000/sneakers')
  .then(response => response.json())
  .then(data => {
    const sneakersContainer = document.getElementById('sneakers-container');

    data.forEach(sneaker => {
      const sneakerCard = `
        <div class="sneaker-card">
          <img src="${sneaker.img}" alt="${sneaker.name}">
          <h3>${sneaker.name}</h3>
          <p>Price: Ksh ${sneaker.price}</p>
          <button onclick="addToCart(${sneaker.id})">Add to Cart</button>
        </div>
      `;
      sneakersContainer.innerHTML += sneakerCard;
    });
  })
  .catch(error => console.error('Error fetching sneakers:', error));

const sneakers = [
  { id: 4, name: 'Nike SB Dunks', price: 2700.00, img: "/images/Nike Women's Dunk Low.jpeg" },
  { id: 5, name: 'Old Skool Vans', price: 2500.00, img: "/images/Old skool vans black.jpeg" },
  { id: 6, name: 'Adidas Samba', price: 4000.00, img: "/images/adidas Originals Samba OG.jpeg" },
  { id: 7, name: 'Air Jordan 4', price: 3550.00, img: "/images/Air Jordan 4 Retro.jpeg" },
  { id: 8, name: 'Air Jordan 11', price: 3500.00, img: "/images/Air Jordan 11 Retro.jpeg" },
  { id: 10, name: 'Gift Nike ', price: 4000.00, img: "/images/Gift Nike this season_.jpeg" },
  { id: 11, name: 'New Balance', price: 3000.00, img: "/images/NEW BALANCE.jpeg" },
  { id: 12, name: 'Air Force 1', price: 2500.00, img: "/images/Air Force 1.jpeg"},
];


let cart = [];
let reviewData = []; // Array to hold reviews
let starRating = 0; // Initialize star rating

// Function to load sneakers into the page
function loadSneakers() {
  const sneakerList = document.getElementById('sneaker-list');
  sneakers.forEach(sneaker => {
    const sneakerDiv = document.createElement('div');
    sneakerDiv.classList.add('sneaker');
    sneakerDiv.innerHTML = `
      <img src="${sneaker.img}" alt="${sneaker.name}">
      <h3>${sneaker.name}</h3>
      <p>Ksh ${sneaker.price}</p>
      <button class="view-details" data-id="${sneaker.id}" data-bs-toggle="modal" data-bs-target="#sneakerModal">View Details</button>
    `;
    sneakerList.appendChild(sneakerDiv);
  });
}

// Function to handle cart functionality
function addToCart(sneakerId) {
  const sneaker = sneakers.find(s => s.id === sneakerId);
  if (sneaker) {
    cart.push(sneaker);
    document.getElementById('cart-count').innerText = cart.length; // Update cart count
  }
}

// Function to display sneaker details in modal
function showSneakerDetails(sneakerId) {
  const sneaker = sneakers.find(s => s.id === sneakerId);
  if (sneaker) {
    document.getElementById('modal-name').innerText = sneaker.name;
    document.getElementById('modal-price').innerText = `Ksh ${sneaker.price}`;
    document.getElementById('modal-img').src = sneaker.img;
    
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    modalAddToCart.onclick = () => addToCart(sneaker.id);
  }
}

// Function to render cart items
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = ""; // Clear previous items
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `${item.name} - Ksh ${item.price} <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(listItem);
  });
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item from cart
  document.getElementById('cart-count').innerText = cart.length; // Update cart count
  renderCart(); // Refresh cart display
}

// Function to submit reviews
function submitReview() {
  const name = document.getElementById('review-name').value;
  const text = document.getElementById('review-text').value;

  if (name && text && starRating) {
    reviewData.push({ name, text, rating: starRating });
    displayReviews();
    document.getElementById('review-name').value = ''; // Clear input
    document.getElementById('review-text').value = ''; // Clear input
    starRating = 0; // Reset star rating
    updateStarDisplay();
  } else {
    alert("Please fill in all fields and select a rating.");
  }
}

// Function to display reviews
function displayReviews() {
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = ''; // Clear previous reviews
  reviewData.forEach(review => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `<strong>${review.name} (${review.rating} ★)</strong>: ${review.text}`;
    reviewList.appendChild(listItem);
  });
}

// Function to handle star rating selection
function handleStarRating(star) {
  const value = parseInt(star.getAttribute('data-value'));
  starRating = value; // Set the rating based on selected star
  updateStarDisplay(); // Update the star display
}

// Function to update star display based on selection
function updateStarDisplay() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= starRating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Event listeners for dynamic elements
document.addEventListener('DOMContentLoaded', () => {
  loadSneakers();

  // Event listener for sneaker detail buttons
  document.getElementById('sneaker-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details')) {
      const sneakerId = parseInt(e.target.getAttribute('data-id'));
      showSneakerDetails(sneakerId);
    }
  });

  // Event listener for review submission
  document.getElementById('submit-review').addEventListener('click', submitReview);

  // Event listeners for star rating
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => handleStarRating(star));
  });
});

// Cart button event listener
document.getElementById('cart-btn').addEventListener('click', () => {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('hidden');
  renderCart(); // Show updated cart items
});



// Function to display reviews
function displayReviews() {
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = ''; // Clear previous reviews
  reviewData.forEach(review => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
      <strong>${review.name}</strong>: ${review.text}
      <div class="star-rating">${'★'.repeat(Math.round(review.rating))}${'☆'.repeat(5 - Math.round(review.rating))}</div>
    `;
    reviewList.appendChild(listItem);
  });
}

// Call displayReviews on page load
document.addEventListener('DOMContentLoaded', () => {
  displayReviews();
  // Other initialization code...
});
// Confirm purchase event listener
document.getElementById('confirm-purchase-btn').addEventListener('click', function() {
  const name = document.getElementById('customer-name').value;
  const email = document.getElementById('customer-email').value;
  const phone = document.getElementById('customer-phone').value;
  const location = document.getElementById('customer-location').value;

  // Here you could also do additional processing or send this info to your server
  alert(`Thank you, ${name}! Your order has been confirmed. We will send details to ${email}.`);
  
  // Close the modal and reset the form
  document.getElementById('checkout-form').reset();
  var checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
  checkoutModal.hide();
});

