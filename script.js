let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');

function updateCartDisplay() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
        total += item.price;
    });
    cartTotal.textContent = total;
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function openCart() {
    updateCartDisplay();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Show payment form in modal
    cartItems.innerHTML = `
        <form id="payment-form">
            <h3>Payment Details</h3>
            <input type="text" placeholder="Cardholder Name" required>
            <input type="text" placeholder="Card Number (e.g., 1234 5678 9012 3456)" required pattern="[0-9]{16}" maxlength="19">
            <input type="text" placeholder="Expiry Date (MM/YY)" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}">
            <input type="text" placeholder="CVV (3 digits)" required pattern="[0-9]{3}" maxlength="3">
            <button type="submit">Pay Now</button>
        </form>
    `;
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Payment successful! (Demo only - no real transaction)');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        closeCart();
    });
}

// Initialize cart display on page load
updateCartDisplay();

// Search and filter functionality for products page
if (document.getElementById('search')) {
    document.getElementById('search').addEventListener('input', filterProducts);
    document.getElementById('category').addEventListener('change', filterProducts);
}

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const prodCategory = product.getAttribute('data-category');
        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = category === 'all' || prodCategory === category;
        product.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}