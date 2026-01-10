// Menunggu DOM siap
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simulasi loading selama 1.5 detik
    setTimeout(function() {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        
        // Setelah fade out selesai, sembunyikan loading dan tampilkan konten utama
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Efek fade in untuk konten utama
            setTimeout(function() {
                mainContent.style.opacity = '1';
                mainContent.style.transition = 'opacity 0.5s ease';
            }, 10);
        }, 500);
        
    }, 1500);
    
    // Efek hover untuk tombol
    const pixelButtons = document.querySelectorAll('.pixel-button');
    
    pixelButtons.forEach(button => {
        // Efek klik
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            if (this.matches(':hover')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Animasi masuk untuk tombol
        button.style.opacity = '0';
        button.style.transform = 'translateY(10px)';
    });
    
    // Animasi tombol muncul bertahap
    setTimeout(function() {
        pixelButtons.forEach((button, index) => {
            setTimeout(function() {
                button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 600);
    
    // Efek hover untuk panel
    const panels = document.querySelectorAll('.pixel-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = 
                '0 8px 20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(46, 230, 168, 0.1)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 
                '0 5px 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Animasi untuk logo
    const logoFrame = document.querySelector('.logo-frame');
    
    setTimeout(function() {
        logoFrame.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        logoFrame.style.transform = 'scale(1.05)';
        
        setTimeout(function() {
            logoFrame.style.transform = 'scale(1)';
        }, 300);
    }, 2000);
    
    // Efek pixel grid dinamis
    const body = document.querySelector('body');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Efek parallax ringan pada grid background
        body.style.backgroundPosition = 
            `${mouseX * 10 - 5}px ${mouseY * 10 - 5}px`;
    });
    
    // Console log untuk branding
    console.log('%c ROMADZ STORE ', 'background: #2ee6a8; color: #0a0c10; font-size: 16px; font-weight: bold; padding: 5px 10px; border-radius: 3px;');
    console.log('%c anda puas - Kami senang ', 'background: #252a36; color: #2ee6a8; font-size: 14px; padding: 3px 8px; border-radius: 3px;');
});