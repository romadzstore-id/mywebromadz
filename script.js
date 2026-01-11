// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const contactLinks = document.querySelectorAll('.contact-link');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start loading progress
    startLoadingProgress();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize animations
    initAnimations();
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Add smooth scroll behavior
    initSmoothScroll();
});

// Loading Screen
function startLoadingProgress() {
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
        loadingProgress.style.width = '100%';
        
        // Hide loading overlay after animation completes
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.visibility = 'hidden';
            
            // Show welcome toast
            setTimeout(() => {
                showToast('Selamat datang di Romadz Store!', 'success');
            }, 500);
        }, 2000);
    }
}

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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === '/' && currentPage === '') {
            link.classList.add('active');
        } else if (linkHref.includes(currentPage)) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === '/') {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

// Contact Link Interactions
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href').startsWith('http')) return;
        
        e.preventDefault();
        const href = link.getAttribute('href');
        const platform = link.closest('.contact-card').querySelector('.contact-title').textContent;
        
        // Show toast notification
        showToast(`Membuka ${platform}...`, 'info');
        
        // Open link after a short delay
        setTimeout(() => {
            window.open(href, '_blank');
        }, 800);
    });
});

// Toast Notification System
function showToast(message, type = 'info') {
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    const toastIcon = toast.querySelector('.toast-icon');
    
    switch(type) {
        case 'success':
            toast.style.borderLeftColor = '#10B981';
            toastIcon.className = 'toast-icon fas fa-check-circle';
            toastIcon.style.color = '#10B981';
            break;
        case 'error':
            toast.style.borderLeftColor = '#EF4444';
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            toastIcon.style.color = '#EF4444';
            break;
        case 'warning':
            toast.style.borderLeftColor = '#F59E0B';
            toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
            toastIcon.style.color = '#F59E0B';
            break;
        default:
            toast.style.borderLeftColor = '#1E40AF';
            toastIcon.className = 'toast-icon fas fa-info-circle';
            toastIcon.style.color = '#1E40AF';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = 'var(--shadow)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.style.padding = '0.75rem 0';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Initialize tooltips
function initTooltips() {
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
                
                // Add event listeners
                el.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.transform = 'translateY(0)';
                });
                
                el.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateY(10px)';
                });
            }
        }
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add delay for staggered animations
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('product-card')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .product-card, .contact-card, .category-header').forEach(el => {
        observer.observe(el);
    });
}

// Card hover animation enhancement
const cards = document.querySelectorAll('.service-card, .product-card, .contact-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    
    .service-card, .product-card, .contact-card, .category-header {
        opacity: 0;
    }
    
    .service-card:hover, .product-card:hover {
        --mouse-x: 50%;
        --mouse-y: 50%;
        background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
            rgba(30, 64, 175, 0.05) 0%, 
            transparent 50%);
    }
`;
document.head.appendChild(animationStyles);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        showToast('Selamat datang kembali!', 'info');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu and modals
    if (e.key === 'Escape') {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        toast.classList.remove('show');
    }
    
    // Space key to scroll down
    if (e.key === ' ' && !e.target.matches('input, textarea, button, a')) {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Update active section in viewport
        updateActiveSection();
    }, 100);
});

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Preload important resources
function preloadResources() {
    const resources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap'
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preload on page load
window.addEventListener('load', preloadResources);

// Form handling (if any forms exist)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Terima kasih! Pesan Anda telah dikirim.', 'success');
        form.reset();
        
        // Simulate form submission
        setTimeout(() => {
            showToast('Tim kami akan menghubungi Anda segera.', 'info');
        }, 1500);
    });
});

// Copy domain to clipboard
const domainElement = document.querySelector('.footer-domain');
if (domainElement) {
    domainElement.addEventListener('click', () => {
        const domain = domainElement.textContent;
        navigator.clipboard.writeText(domain).then(() => {
            showToast(`Domain "${domain}" disalin ke clipboard!`, 'success');
        }).catch(err => {
            showToast('Gagal menyalin domain.', 'error');
        });
    });
    
    // Add cursor pointer
    domainElement.style.cursor = 'pointer';
    domainElement.title = 'Klik untuk menyalin domain';
}

// Lazy loading for images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}