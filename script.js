document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------
       1. LOADING SCREEN LOGIC
       ----------------------------------------------- */
    const loader = document.getElementById('loader-overlay');
    
    // Simulate minimal loading time for branding effect
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Wait for fade out transition
        }
    }, 1200); // 1.2 seconds branding time

    /* -----------------------------------------------
       2. MOBILE MENU TOGGLE
       ----------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars to X (handled in CSS usually, or simple toggle here)
            // CSS handles the .active state visual changes if configured
        });

        // Close menu when link clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* -----------------------------------------------
       3. SMOOTH SCROLL ANIMATION (INTERSECTION OBSERVER)
       ----------------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    /* -----------------------------------------------
       4. CUSTOM TOAST NOTIFICATION (No alert())
       ----------------------------------------------- */
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.background = '#334155';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
        toast.style.fontSize = '0.9rem';
        toast.style.zIndex = '10000';
        toast.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }

    // Attach toast to specific buttons if needed (example usage)
    const orderButtons = document.querySelectorAll('.btn-sm');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Biarkan link membuka WhatsApp, tapi tampilkan toast sebagai feedback
            showToast('Mengarahkan ke WhatsApp...');
        });
    });

    const contactIcons = document.querySelectorAll('.icon-link');
    contactIcons.forEach(icon => {
        icon.addEventListener('click', () => {
             showToast('Membuka kontak...');
        });
    });

});