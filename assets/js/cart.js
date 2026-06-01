// Shopping cart functionality

document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <a href="katalog.html" class="btn btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    document.querySelector('.cart-summary').style.display = 'block';
    cartItemsDiv.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        itemDiv.innerHTML = `
            <div>
                <div class="item-name">${item.name}</div>
                <div class="template-tier ${item.tier}">${item.tier}</div>
            </div>
            <div class="item-price">${formatCurrency(item.price)}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    updateCartSummary(cart);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartSummary(cart) {
    const totals = calculateTotals(cart);
    document.getElementById('subtotal').textContent = formatCurrency(totals.subtotal);
    document.getElementById('tax').textContent = formatCurrency(totals.tax);
    document.getElementById('total').textContent = formatCurrency(totals.total);
}
