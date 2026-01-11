// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const footerDomain = document.querySelector('.footer-domain');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start loading progress
    startLoadingProgress();
    
    // Initialize animations
    initAnimations();
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Add smooth scroll behavior
    initSmoothScroll();
    
    // Add WhatsApp button tracking
    initWhatsAppTracking();
    
    // Add domain copy functionality
    if (footerDomain) {
        initDomainCopy();
    }
});

// Loading Screen
function startLoadingProgress() {
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
        loadingProgress.style.width = '100%';
        
        // Preload logo image
        const logoImg = new Image();
        logoImg.src = 'https://files.catbox.moe/tdv5h0.jpg';
        
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
    const currentPage = currentPath.split('/').pop() || '';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === '/' && (currentPage === '' || currentPage === 'index.html')) {
            link.classList.add('active');
        } else if (linkHref === '/produk.html' && currentPage === 'produk.html') {
            link.classList.add('active');
        } else if (linkHref === '#contact' && window.location.hash === '#contact') {
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
                
                // Update active nav
                setActiveNavLink();
            }
        });
    });
}

// WhatsApp Tracking
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get product name if available
            let productName = 'Layanan Digital';
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productTitle = productCard.querySelector('.product-title');
                if (productTitle) {
                    productName = productTitle.textContent.trim();
                }
            }
            
            // Show toast notification
            showToast(`Membuka WhatsApp untuk: ${productName}`, 'info');
            
            // Track click (simulated)
            console.log(`WhatsApp button clicked for: ${productName}`);
        });
    });
}

// Domain Copy Functionality
function initDomainCopy() {
    footerDomain.addEventListener('click', () => {
        const domain = 'romadzstore.biz.id';
        
        // Copy to clipboard
        navigator.clipboard.writeText(domain).then(() => {
            showToast(`Domain "${domain}" berhasil disalin!`, 'success');
            
            // Visual feedback
            footerDomain.style.color = 'white';
            footerDomain.style.fontWeight = '600';
            
            setTimeout(() => {
                footerDomain.style.color = '';
                footerDomain.style.fontWeight = '';
            }, 2000);
            
        }).catch(err => {
            showToast('Gagal menyalin domain. Silakan salin manual.', 'error');
        });
    });
    
    // Add tooltip
    footerDomain.title = 'Klik untuk menyalin domain';
}

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
                    entry.target.classList.contains('product-card') ||
                    entry.target.classList.contains('alternative-item')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .product-card, .contact-main, .alternative-item, .category-header').forEach(el => {
        observer.observe(el);
    });
}

// Card hover animation enhancement
const cards = document.querySelectorAll('.service-card, .product-card, .alternative-item');
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
    
    .service-card, .product-card, .alternative-item, .contact-main, .category-header {
        opacity: 0;
    }
    
    .service-card:hover, .product-card:hover, .alternative-item:hover {
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
    
    // Ctrl/Cmd + K to focus search (if any)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showToast('Gunakan WhatsApp untuk konsultasi cepat!', 'info');
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
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else if (sectionId !== 'contact') {
                    link.classList.remove('active');
                }
            });
        }
    });
}

// Preload important resources
function preloadResources() {
    const resources = [
        'https://files.catbox.moe/tdv5h0.jpg',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap'
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.includes('.jpg') ? 'image' : 'style';
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

// Product card interaction enhancement
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const whatsappBtn = card.querySelector('.btn-primary');
    if (whatsappBtn) {
        // Add click effect
        whatsappBtn.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = whatsappBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            whatsappBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// WhatsApp floating button for mobile
function createWhatsAppFloatingButton() {
    if (window.innerWidth <= 768) {
        const floatingBtn = document.createElement('a');
        floatingBtn.href = 'https://wa.me/6283171889474?text=Halo%20Romadz%20Store,%20saya%20ingin%20konsultasi%20tentang%20layanan%20digital';
        floatingBtn.target = '_blank';
        floatingBtn.className = 'whatsapp-float';
        floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        floatingBtn.title = 'Chat via WhatsApp';
        
        document.body.appendChild(floatingBtn);
        
        // Add styles for floating button
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            .whatsapp-float {
                position: fixed;
                width: 60px;
                height: 60px;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                color: white;
                border-radius: 50%;
                text-align: center;
                font-size: 30px;
                box-shadow: var(--shadow-lg);
                z-index: 100;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                transition: var(--transition);
                animation: float 3s ease-in-out infinite;
            }
            
            .whatsapp-float:hover {
                transform: scale(1.1);
                box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
}

// Initialize floating button
setTimeout(createWhatsAppFloatingButton, 3000);

// Product badge color coding
function initProductBadges() {
    const badges = document.querySelectorAll('.product-badge');
    badges.forEach(badge => {
        const badgeType = badge.textContent.trim();
        if (badgeType === 'POPULAR') {
            badge.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
        } else if (badgeType === 'NEW') {
            badge.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        } else if (badgeType === 'RECOMMENDED') {
            badge.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
        } else if (badgeType === 'HOT') {
            badge.style.background = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)';
        }
    });
}

// Initialize product badges
initProductBadges();