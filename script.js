// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get loading screen and main content elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simulate loading time (2 seconds)
    setTimeout(function() {
        // Hide loading screen
        loadingScreen.style.opacity = '0';
        
        // Show main content after a short delay
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('visible');
        }, 500);
    }, 2000);
    
    // Add click effect to buttons
    const linkButtons = document.querySelectorAll('.link-button');
    
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add pressed effect
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'transform 0.1s ease';
            
            // Reset after a short delay
            setTimeout(() => {
                this.style.transform = 'translateY(-4px)';
                this.style.transition = 'all 0.2s ease';
            }, 100);
        });
        
        // Track link clicks (optional analytics placeholder)
        button.addEventListener('click', function() {
            const linkText = this.querySelector('.button-text').textContent;
            console.log(`Link clicked: ${linkText}`);
            // Here you could add actual analytics tracking
        });
    });
    
    // Add subtle hover effect to cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Focus management for accessibility
        if (e.key === 'Tab') {
            // Ensure focus is visible for keyboard users
            document.documentElement.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Remove keyboard nav class on mouse usage
        document.documentElement.classList.remove('keyboard-nav');
    });
});