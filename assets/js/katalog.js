// Catalog page functionality

let currentFilter = 'all';

// Initialize catalog on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTemplates('all');
    setupFilterButtons();
    setupModal();
});

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            displayTemplates(currentFilter);
        });
    });
}

// Display templates based on filter
function displayTemplates(filter) {
    const grid = document.getElementById('templatesGrid');
    grid.innerHTML = '';
    
    let filtered = products;
    if (filter !== 'all') {
        filtered = products.filter(p => p.tier === filter);
    }
    
    filtered.forEach(product => {
        const card = createTemplateCard(product);
        grid.appendChild(card);
    });
}

// Create template card element
function createTemplateCard(product) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
        <div class="template-image">${product.icon}</div>
        <div class="template-info">
            <h3>${product.name}</h3>
            <span class="template-tier ${product.tier}">${product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}</span>
            <div class="template-price">${formatCurrency(product.price)}</div>
            <div class="template-actions">
                <button class="preview-btn" onclick="previewTemplate('${product.preview}')">Preview</button>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
    return card;
}

// Preview template
function previewTemplate(previewUrl) {
    const modal = document.getElementById('previewModal');
    const frame = document.getElementById('previewFrame');
    frame.src = previewUrl;
    modal.style.display = 'block';
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('previewModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.getElementById('previewFrame').src = '';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.getElementById('previewFrame').src = '';
        }
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    alert(`${product.name} added to cart!`);
}
