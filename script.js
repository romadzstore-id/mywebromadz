// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const contactIcons = document.querySelectorAll('.contact-icon');

// Loading Screen
window.addEventListener('load', () => {
    // Simulate loading delay for better UX
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            // Show welcome toast
            showToast('Selamat datang di Romadz Store!');
        }, 500);
    }, 1500);
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Icon Interactions
contactIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const href = icon.getAttribute('href');
        const title = icon.getAttribute('title');
        
        // Show toast notification
        showToast(`Membuka ${title}...`);
        
        // Open link after a short delay
        setTimeout(() => {
            window.open(href, '_blank');
        }, 800);
    });
});

// Toast Notification Function
function showToast(message, type = 'info') {
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    const toastIcon = toast.querySelector('.toast-icon');
    
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#10B981';
            toastIcon.className = 'toast-icon fas fa-check-circle';
            break;
        case 'error':
            toast.style.backgroundColor = '#EF4444';
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            toast.style.backgroundColor = '#F59E0B';
            toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
            break;
        default:
            toast.style.backgroundColor = '#1E40AF';
            toastIcon.className = 'toast-icon fas fa-info-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '15px 0';
    }
});

// Card hover animation enhancement
const cards = document.querySelectorAll('.service-card, .product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Page transition effect
document.addEventListener('DOMContentLoaded', () => {
    // Fade in content after loading
    const mainContent = document.querySelector('main, .hero, .products-header');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
});

// Prevent form submission if any form exists
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Fitur formulir dalam pengembangan', 'info');
    });
});

// Initialize tooltips
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(el => {
        const title = el.getAttribute('title');
        if (title) {
            el.removeAttribute('title');
            
            // Create tooltip element if it doesn't exist
            if (!el.querySelector('.tooltip')) {
                const tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = title;
                el.appendChild(tooltip);
            }
        }
    });
};

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', initTooltips);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        showToast('Selamat datang kembali!', 'info');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to focus search (if exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showToast('Fitur pencarian dalam pengembangan', 'info');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .product-card, .section-title, .category-title').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card, .product-card, .section-title, .category-title {
        opacity: 0;
    }
`;
document.head.appendChild(style);