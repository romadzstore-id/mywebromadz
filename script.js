document.addEventListener("DOMContentLoaded", () => {
    
    // --- KONFIGURASI LINK ---
    const whatsappNumber = "6283171889474"; // Nomor admin

    // --- LOADING SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        if(loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    }, 1000);

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');
            
            // Toggle Hamburger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // --- ORDER FUNCTION ---
    window.orderProduct = function(productName) {
        const text = `Halo Admin Romadz Store, saya ingin memesan/bertanya tentang: *${productName}*`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        
        // Simpel Toast
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "Membuka WhatsApp...";
        
        setTimeout(() => {
            window.open(url, '_blank');
            btn.innerText = originalText;
        }, 800);
    };
});