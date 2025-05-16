// =================== PRODUCT DATA ===================
const products = [
  { id: 1, name: "T-Shirt", price: 10, image: "https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Comfortable cotton T-shirt." },
  { id: 2, name: "Sneakers", price: 200, image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Stylish running sneakers." },
  { id: 3, name: "Short Coat", price: 210, image: "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Short winter coat." },
  { id: 4, name: "T-Shirt", price: 10, image: "./assets/orange.png", description: "Stylish cotton T-shirt." },
  { id: 5, name: "T-Shirt", price: 20, image: "./assets/minds.png", description: "Stylish running sneakers." },
  { id: 6, name: "T-Shirt", price: 30, image: "./assets/heroe.png", description: "Stylish running sneakers." },
  { id: 7, name: "T-Shirt", price: 50, image: "./assets/lorem.png", description: "Stylish running sneakers." },
  { id: 8, name: "Sneakers", price: 250, image: "./assets/allstar.png", description: "Stylish running sneakers." },
  { id: 9, name: "Sneakers", price: 300, image: "./assets/pink.png", description: "Stylish running sneakers." },
  { id: 10, name: "Sneakers", price: 350, image: "./assets/white.png", description: "Stylish running sneakers." },
  { id: 11, name: "Sneakers", price: 375, image: "./assets/navy.png", description: "Stylish running sneakers." },
  { id: 12, name: "Long Coat", price: 320, image: "./assets/whitec.png", description: "Long winter black coat." }
];

// =================== EVENT ON PAGE LOAD ===================
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  initHeroBackground();
  showFeaturedProducts();
  showProducts();
  showProductDetails();
  showCart();
  showOrderSummary();
  initTestimonials();
  initCheckoutForm();
});

// =================== MENU TOGGLE ===================
function initMenuToggle() {
  const toggleMenu = document.getElementById("toggleMenu");
  const toggleText = document.getElementById("toggleText");
  if (!toggleMenu || !toggleText) return;

  const menu = toggleMenu.querySelector("p");

  menu.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(toggleText).display !== "none";
    toggleText.style.display = isVisible ? "none" : "block";
    menu.textContent = isVisible ? "Menu" : "Close";
    if (isVisible)
       toggleText.style.backgroundColor = "rgb(1, 1, 27)";
  });
}

// =================== HERO BACKGROUND ===================
function initHeroBackground() {
  const heroBackground = document.getElementById("hero");
  if (!heroBackground) return;

  const images = [
    "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6214134/pexels-photo-6214134.jpeg?auto=compress&cs=tinysrgb&w=600",
    // "https://images.pexels.com/photos/7552326/pexels-photo-7552326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6868178/pexels-photo-6868178.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    heroBackground.style.backgroundImage = `url('${images[currentIndex]}')`;
  }, 5000);
}

// =================== FEATURED PRODUCTS ===================
function showFeaturedProducts() {
  const container = document.getElementById("featured-container");
  if (!container) return;

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
    container.appendChild(div);
  });
}

// =================== ALL PRODUCTS ===================
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

// =================== PRODUCT DETAILS ===================
function showProductDetails() {
  const container = document.getElementById("product-details");
  if (!container) return;

  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
}

// =================== ADD TO CART ===================
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return alert("Product not found!");

  const existing = cart.find(item => item.id === productId);
  existing ? existing.quantity++ : cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// =================== SHOW CART ===================
function showCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
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
    container.appendChild(div);
  });

  document.getElementById("cart-total").innerText = `Total: $${total}`;
}

// =================== ORDER SUMMARY ===================
function showOrderSummary() {
  const container = document.getElementById("order-summary");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty. Please add items to your cart before checking out.</p>";
    return;
  }

  let total = 0;
  const summary = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;
    return `<p>${product.name} (x${item.quantity}): $${subtotal}</p>`;
  }).join("");

  container.innerHTML = `<h3>Order Summary</h3>${summary}<p><strong>Total:</strong> $${total}</p>`;
}

// =================== CHECKOUT FORM ===================
function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}

// =================== TESTIMONIALS ===================
function initTestimonials() {
  const container = document.getElementById("testimonial-container");
  const form = document.getElementById("feedback-form");
  if (!container || !form) return;

  // Default testimonials (used if nothing is in localStorage)
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

  // Load existing testimonials or fallback to defaults
  let testimonials = JSON.parse(localStorage.getItem("testimonials")) || defaultTestimonials;

  // Render testimonials to the page
  function renderTestimonials() {
    container.innerHTML = testimonials.slice(-4).map(t => `
      <div class="testimonial">
        <p class="feedback">"${t.feedback}"</p>
        <p class="name">- ${t.name}</p>
        <p class="rating">Rating: ${"⭐".repeat(t.rating)}</p>
      </div>
    `).join("");
  }

  // Initial render
  renderTestimonials();

  // Handle new testimonial submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const feedback = document.getElementById("feedback").value.trim();
    const rating = parseInt(document.getElementById("rating").value);

    if (!name || !feedback || isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please provide valid name, feedback, and a rating from 1 to 5.");
      return;
    }

    const newTestimonial = { name, feedback, rating };
    testimonials.push(newTestimonial);

    // Save to localStorage
    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    renderTestimonials();
    form.reset();
    alert("Thank you for your feedback!");
  });
}
