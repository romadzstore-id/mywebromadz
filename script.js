// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMobile.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = hamburger.querySelectorAll('.hamburger-line');
        if (hamburger.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMobile && navMobile.classList.contains('active') && 
        !navMobile.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navMobile.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const lines = hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.nav-mobile a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const lines = hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Halo Romadz Store, saya ${name}%0AEmail: ${email}%0ALayanan yang diminati: ${service}%0APesan: ${message}`;
        const whatsappUrl = `https://wa.me/6283171889474?text=${whatsappMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        submitBtn.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (currentPage === '' || currentPage === 'index.html') {
        if (linkHref === 'index.html' || linkHref === '') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    } else if (linkHref === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize scroll effect on load
window.dispatchEvent(new Event('scroll'));

// Add loading animation to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't add loading to links that open in new tab
        if (this.getAttribute('target') === '_blank' || this.getAttribute('href')?.startsWith('http')) {
            return;
        }
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.pointerEvents = 'auto';
        }, 1500);
    });
});

// Add hover effect to cards
const cards = document.querySelectorAll('.card, .feature-card, .product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.card, .feature-card, .product-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
`;

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-5px)';
    backToTopBtn.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
});