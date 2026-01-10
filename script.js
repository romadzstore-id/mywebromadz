// Loading screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        // Fade out loading screen
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds loading time
    
    // Button click animation
    const buttons = document.querySelectorAll('.pixel-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 2px 6px rgba(16, 185, 129, 0.3)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click sound effect simulation (visual only)
        button.addEventListener('click', function() {
            // Add a subtle visual feedback
            const originalBorderColor = this.style.borderColor;
            this.style.borderColor = '#10B981';
            
            setTimeout(() => {
                this.style.borderColor = originalBorderColor;
            }, 200);
        });
    });
    
    // Add subtle pixel grid background effect to panels
    const panels = document.querySelectorAll('.panel');
    
    panels.forEach(panel => {
        // Create subtle pixel grid effect
        const pixelGrid = document.createElement('div');
        pixelGrid.style.position = 'absolute';
        pixelGrid.style.top = '0';
        pixelGrid.style.left = '0';
        pixelGrid.style.width = '100%';
        pixelGrid.style.height = '100%';
        pixelGrid.style.backgroundImage = `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
        `;
        pixelGrid.style.backgroundSize = '20px 20px';
        pixelGrid.style.pointerEvents = 'none';
        pixelGrid.style.zIndex = '0';
        
        panel.style.position = 'relative';
        panel.style.zIndex = '1';
        
        const content = panel.children;
        for (let i = 0; i < content.length; i++) {
            content[i].style.position = 'relative';
            content[i].style.zIndex = '2';
        }
        
        panel.appendChild(pixelGrid);
    });
    
    // Add pixel art cursor effect
    const body = document.querySelector('body');
    
    body.addEventListener('mousemove', function(e) {
        // Remove existing cursor effect
        const existingCursor = document.querySelector('.pixel-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // Create new cursor effect
        const cursor = document.createElement('div');
        cursor.classList.add('pixel-cursor');
        cursor.style.position = 'fixed';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.backgroundColor = '#10B981';
        cursor.style.borderRadius = '1px';
        cursor.style.zIndex = '9999';
        cursor.style.pointerEvents = 'none';
        cursor.style.opacity = '0.7';
        
        document.body.appendChild(cursor);
        
        // Remove cursor effect after animation
        setTimeout(() => {
            cursor.style.opacity = '0';
            cursor.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 200);
        }, 300);
    });
    
    // Add CSS for pixel cursor
    const style = document.createElement('style');
    style.textContent = `
        .pixel-cursor {
            transition: transform 0.2s ease, opacity 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});