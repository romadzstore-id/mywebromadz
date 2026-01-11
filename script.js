// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMobile && navMobile.classList.contains('active') && 
        !navMobile.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navMobile.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Button click effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    // Add ripple effect
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add press effect
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translate(4px, 4px)';
        button.style.boxShadow = '2px 2px 0px var(--black)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = 'translate(0, 0)';
        button.style.boxShadow = 'var(--shadow-offset-sm) var(--black)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
        button.style.boxShadow = 'var(--shadow-offset-sm) var(--black)';
    });
});

// Card hover effects
const cards = document.querySelectorAll('.card, .product-card, .product-preview-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-6px)';
        card.style.boxShadow = '8px 8px 0px var(--black)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-offset) var(--black)';
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;

document.head.appendChild(style);

// Active navigation link highlighting
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (currentPage.includes(linkPage) && linkPage !== '#') {
        link.classList.add('active');
    } else if (linkPage === 'index.html' && (currentPage === '/' || currentPage === '' || currentPage === '/index.html')) {
        link.classList.add('active');
    }
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary);
    color: var(--white);
    border: 3px solid var(--black);
    box-shadow: var(--shadow-offset-sm) var(--black);
    font-family: 'Silkscreen', monospace;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    display: none;
    transition: var(--transition);
`;

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-4px)';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-offset) var(--black)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-offset-sm) var(--black)';
});

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add pixel animation to page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate cards on load
    const animatedCards = document.querySelectorAll('.card, .product-card');
    animatedCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
});