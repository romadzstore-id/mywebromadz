// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-item a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
        const linkHref = link.getAttribute('href');
        if ((currentPage === '' || currentPage === 'index.html') && linkHref === 'index.html') {
            item.classList.add('active');
        } else if (currentPage === linkHref) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    }
});

// Add hover effect to cards
const cards = document.querySelectorAll('.feature-card, .preview-card, .contact-card, .product-card');

cards.forEach(card => {
    // Add event listeners for hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
    
    // Add click effect for mobile
    card.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
        }
    });
});

// Sticky header behavior
const header = document.querySelector('.header');
let lastScrollTop = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Product card interaction enhancement
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const btn = card.querySelector('.btn');
    
    if (btn) {
        card.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// WhatsApp button interaction
const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .btn-primary[href*="whatsapp"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Optional: Add analytics tracking here
        console.log('WhatsApp button clicked');
    });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('ROMADZ STORE website loaded successfully');
});