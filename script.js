// script.js
// Loading screen functionality
window.addEventListener('DOMContentLoaded', (event) => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Add a subtle animation to sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
    }, 1800); // 1.8 seconds loading time
    
    // Button click animation
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // For touch devices
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add pixelated effect to logo on hover
    const logo = document.querySelector('.logo');
    const logoContainer = document.querySelector('.logo-container');
    
    logoContainer.addEventListener('mouseenter', () => {
        logo.style.filter = 'contrast(1.2) brightness(1.1)';
        logo.style.transform = 'scale(1.05)';
    });
    
    logoContainer.addEventListener('mouseleave', () => {
        logo.style.filter = 'none';
        logo.style.transform = 'scale(1)';
    });
});