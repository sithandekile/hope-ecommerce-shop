document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const toggleText = document.getElementById("toggleText");
  const menu = toggleMenu.querySelector("p");

  menu.addEventListener("click", function () {
    // Check the current display status of the links
    const isVisible = window.getComputedStyle(toggleText).display !== "none";

    if (isVisible) {
      // Hide the links and update menu text
      toggleText.style.display = "none";
      menu.textContent = "Menu";
      toggleText.style.backgroundColor = "rgb(1, 1, 27)"; // Reset background color
    } else {
      // Show the links and update menu text
      toggleText.style.display = "block";
      menu.textContent = "Close";
    }
  });
});

 
 document.addEventListener("DOMContentLoaded", () => {
 const heroBackground = document.getElementById("hero");
const images = ["https://images.pexels.com/photos/6214134/pexels-photo-6214134.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/7552326/pexels-photo-7552326.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6868178/pexels-photo-6868178.jpeg?auto=compress&cs=tinysrgb&w=600"];
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  heroBackground.style.backgroundImage = `url('${images[currentIndex]}')`;
}, 5000); // rotating every 5 seconds

})
 // Display featured products on index.html
function showFeaturedProducts() {
  const featuredContainer = document.getElementById("featured-container");
  if (!featuredContainer) return;

  // Select a few featured products (e.g., the first 3 products)
  const featured = products.slice(0, 4);

  featured.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("featured-product");
    div.innerHTML = `
      <a href="product-details.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
      </a>
    `;
    featuredContainer.appendChild(div);
  });
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", () => {
  showFeaturedProducts();
});

// my product data
const products = [
  { id: 1, name: "T-Shirt", price: 10, image: "./assets/coding.png", description: "Comfortable cotton T-shirt." },
  { id: 2, name: "Sneakers", price: 200, image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Stylish running sneakers." },
  { id: 3, name: "short coat", price: 210, image: "./assets/short.png", description: "short winter coat." },
  { id: 4, name: "T-Shirt", price: 10, image: "./assets/orange.png", description: "Stylish cotton T-shirt." },
  { id: 5, name: "T-Shirt", price: 20, image: "./assets/minds.png", description: "Stylish running sneakers." },
  { id: 6, name: "T-Shirt", price: 30, image: "./assets/heroe.png", description: "Stylish running sneakers." },
  { id: 7, name: "T-Shirt", price: 50, image: "./assets/lorem.png", description: "Stylish running sneakers." },
  { id: 8, name: "Sneakers", price: 250, image: "./assets/allstar.png", description: "Stylish running sneakers." },
  { id: 9, name: "Sneakers", price: 300, image: "./assets/pink.png", description: "Stylish running sneakers." },
  { id: 10, name: "Sneakers", price: 350, image: "./assets/white.png", description: "Stylish running sneakers." },
  { id: 11, name: "Sneakers", price: 375, image: "./assets/navy.png", description: "Stylish running sneakers." },
  { id: 12, name: "long coat", price: 320, image: "./assets/whitec.png", description: "long winter black coat." }
];

// Display products on products.html
function showProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <a href="product-details.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      </a>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// Display single product on product-details.html
function showProductDetails() {
  const productDetailsContainer = document.getElementById("product-details");
  if (!productDetailsContainer) return; // Exit if the element does not exist

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    productDetailsContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  productDetailsContainer.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
}

// Add product to cart (localStorage)
function addToCart(productId) {
  // Retrieve the cart from local storage or initialize it as an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the product by its ID
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      // If the product is already in the cart, increase its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Alert the user
    alert("Product added to cart!");
  } else {
    alert("Product not found!");
  }
}

// Show cart items on cart.html
function showCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <h4>${product.name}</h4>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${product.price}</p>
      <p>Subtotal: $${subtotal}</p>
    `;
    cartContainer.appendChild(div);
  });

  document.getElementById("cart-total").innerText = `Total: $${total}`;
}

// Call appropriate functions on page load
document.addEventListener("DOMContentLoaded", () => {
  showProducts();
  showProductDetails();
  showCart();
});

// Display order summary on checkout.html
function showOrderSummary() {
  const orderSummary = document.getElementById("order-summary");
  if (!orderSummary) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty. Please add items to your cart before checking out.</p>";
    return;
  }

  let total = 0;
  const summaryHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;
    return `
      <p>${product.name} (x${item.quantity}): $${subtotal}</p>
    `;
  }).join("");

  orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    ${summaryHTML}
    <p><strong>Total:</strong> $${total}</p>
  `;
}

// Handling the checkout  form submission
document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed successfully!");
  localStorage.removeItem("cart"); // Clearing the cart
  window.location.href = "index.html"; // Redirecting to home page
});

// Call the function on page load
document.addEventListener("DOMContentLoaded", () => {
  showOrderSummary();
});

document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Load testimonials from localStorage or use defaults
  const defaultTestimonials = [
    {
      name: "Peter N.",
      feedback: "Amazing products and fantastic customer service!",
      rating: 5,
    },
    {
      name: "Olley M.",
      feedback: "Great prices and fast delivery. Highly recommend!",
      rating: 4,
    },
    {
      name: "Sipho S.",
      feedback: "I love shopping here. Always a great experience!",
      rating: 5,
    },
  ];

  let testimonials = JSON.parse(localStorage.getItem("testimonials")) || defaultTestimonials;

  const testimonialContainer = document.getElementById("testimonial-container");
  const feedbackForm = document.getElementById("feedback-form");

  // Step 2: Render testimonials
  function renderTestimonials() {
    testimonialContainer.innerHTML = testimonials.slice(0, 4)
      .map(
        (testimonial) => `
        <div class="testimonial">
          <p class="feedback">"${testimonial.feedback}"</p>
          <p class="name">- ${testimonial.name}</p>
          <p class="rating">Rating: ${"⭐".repeat(testimonial.rating)}</p>
        </div>
      `
      )
      .join("");
  }

  renderTestimonials();  

  // Step 3: Handle form submission
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;
    const rating = parseInt(document.getElementById("rating").value);

    const newTestimonial = { name, feedback, rating };
    testimonials.push(newTestimonial);

    // Step 4: Update localStorage
    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    renderTestimonials();
    feedbackForm.reset();
    alert("Thank you for your feedback!");
  });
});
