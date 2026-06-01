// Checkout functionality

document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
    setupCheckoutForm();
});

function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsDiv = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        window.location.href = 'katalog.html';
        return;
    }
    
    orderItemsDiv.innerHTML = '';
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-price">${formatCurrency(item.price)}</div>
        `;
        orderItemsDiv.appendChild(itemDiv);
    });
    
    const totals = calculateTotals(cart);
    document.getElementById('summarySubtotal').textContent = formatCurrency(totals.subtotal);
    document.getElementById('summaryTax').textContent = formatCurrency(totals.tax);
    document.getElementById('summaryTotal').textContent = formatCurrency(totals.total);
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    const WHATSAPP_NUMBER = '+15866901926';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            specialRequests: document.getElementById('specialRequests').value
        };
        
        // Get cart and calculate total
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totals = calculateTotals(cart);
        
        // Build WhatsApp message
        const cartSummary = cart.map(item => `- ${item.name} (${item.tier}): ${formatCurrency(item.price)}`).join('\n');
        const message = encodeURIComponent(
            `Hello! I would like to order wedding invitation templates.\n\nCustomer Details:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}, ${formData.country}\n\nOrder Summary:\n${cartSummary}\n\nSubtotal: ${formatCurrency(totals.subtotal)}\nTax (10%): ${formatCurrency(totals.tax)}\nTotal: ${formatCurrency(totals.total)}\n\nSpecial Requests: ${formData.specialRequests || 'None'}\n\nThank you!`
        );
        
        // Save order data
        const orderData = {
            ...formData,
            cart: cart,
            subtotal: formatCurrency(totals.subtotal),
            tax: formatCurrency(totals.tax),
            total: formatCurrency(totals.total)
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Clear cart
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Redirect to WhatsApp
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
        window.location.href = whatsappUrl;
        
        // Redirect to success page after a short delay
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 1000);
    });
}
