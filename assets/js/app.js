// Global app functions

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = cart.length;
    });
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Format currency
function formatCurrency(amount) {
    return '$' + (amount).toFixed(2);
}

// Calculate totals
function calculateTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    return {
        subtotal,
        tax,
        total
    };
}
