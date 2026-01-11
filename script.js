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

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Halo Romadz Store,\n\nSaya ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/6283171889474?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Terkirim!';
        submitBtn.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMobile && navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (linkHref === currentPage || 
        (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === '/'))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to elements
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

    // Observe cards and sections
    document.querySelectorAll('.feature-card, .service-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Add loading state to buttons
document.querySelectorAll('a.btn[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add loading indicator
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuka WhatsApp...';
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
        }, 2000);
    });
});