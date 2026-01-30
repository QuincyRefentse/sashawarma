// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu
    loadMenuItems();
    updateCartDisplay();
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Order Modal
    const orderModal = document.getElementById('orderModal');
    const orderNowBtn = document.getElementById('orderNowBtn');
    const closeModal = document.querySelector('.close-modal');
    const orderOnlineBtn = document.getElementById('orderOnlineBtn');
    const viewMenuBtn = document.getElementById('viewMenuBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCart');
    
    // Open modal functions
    function openOrderModal() {
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Open modal when clicking cart icon
    document.querySelector('.cart-icon').addEventListener('click', openOrderModal);
    
    // Open modal from various buttons
    orderNowBtn?.addEventListener('click', openOrderModal);
    orderOnlineBtn?.addEventListener('click', openOrderModal);
    viewMenuBtn?.addEventListener('click', () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close modal
    closeModal?.addEventListener('click', () => {
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    orderModal?.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Clear cart
    clearCartBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    });
    
    // Checkout
    checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // In a real application, this would redirect to a checkout page
        // or open a payment modal
        alert('Thank you for your order! This would proceed to checkout in a real application.');
        
        // For demo purposes, clear cart after "checkout"
        clearCart();
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Form submission (for future implementation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Listen for cart updates
cartModule.onCartUpdate(() => {
    updateCartDisplay();
});

// Add some CSS for scroll effects
const style = document.createElement('style');
style.textContent = `
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: var(--gray);
    }
`;
document.head.appendChild(style);