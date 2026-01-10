// Loading screen functionality - Cyberpunk Edition
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Cyberpunk boot sequence
    setTimeout(() => {
        // Add glitch effect before fade out
        loadingScreen.style.animation = 'glitch 0.3s';
        
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Start background animations
                initCyberpunkEffects();
            }, 800);
        }, 300);
    }, 2500); // 2.5 seconds loading time with boot sequence
    
    // Initialize all cyberpunk effects
    function initCyberpunkEffects() {
        // Panel scan animation
        const panels = document.querySelectorAll('.panel');
        panels.forEach(panel => {
            panel.addEventListener('mouseenter', function() {
                this.style.animation = 'scan 3s linear infinite';
            });
            
            panel.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });
        
        // Button cyber effects
        const buttons = document.querySelectorAll('.pixel-button');
        
        buttons.forEach(button => {
            // Add data attribute for glow color
            if (button.classList.contains('contact-btn')) {
                button.dataset.glow = '#2de2e6';
            } else if (button.classList.contains('testimoni-btn')) {
                button.dataset.glow = '#ff3864';
            } else if (button.classList.contains('group-btn')) {
                button.dataset.glow = '#b913f8';
            }
            
            button.addEventListener('mousedown', function() {
                const glowColor = this.dataset.glow || '#2de2e6';
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = `0 8px 20px ${glowColor}80`;
                
                // Add click sound effect simulation
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '100%';
                ripple.style.height = '100%';
                ripple.style.top = '0';
                ripple.style.left = '0';
                ripple.style.background = `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`;
                ripple.style.opacity = '0.5';
                ripple.style.zIndex = '-1';
                ripple.style.animation = 'ripple 0.5s ease-out';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            });
            
            button.addEventListener('mouseup', function() {
                const glowColor = this.dataset.glow || '#2de2e6';
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = `0 10px 25px ${glowColor}80`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
            
            // Add data transmission effect on click
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create data stream effect
                const stream = document.createElement('div');
                stream.style.position = 'fixed';
                stream.style.top = e.clientY + 'px';
                stream.style.left = e.clientX + 'px';
                stream.style.width = '100px';
                stream.style.height = '2px';
                stream.style.background = 'linear-gradient(90deg, #2de2e6, #ff3864)';
                stream.style.transform = 'rotate(45deg)';
                stream.style.zIndex = '10000';
                stream.style.animation = 'data-stream 1s forwards';
                
                document.body.appendChild(stream);
                
                // Navigate after animation
                setTimeout(() => {
                    window.open(this.href, '_blank');
                    stream.remove();
                }, 800);
            });
        });
        
        // Add animated grid to background
        const gridContainer = document.createElement('div');
        gridContainer.className = 'cyber-grid';
        gridContainer.style.position = 'fixed';
        gridContainer.style.top = '0';
        gridContainer.style.left = '0';
        gridContainer.style.width = '100%';
        gridContainer.style.height = '100%';
        gridContainer.style.pointerEvents = 'none';
        gridContainer.style.zIndex = '-1';
        gridContainer.style.opacity = '0.1';
        
        for (let i = 0; i < 50; i++) {
            const node = document.createElement('div');
            node.style.position = 'absolute';
            node.style.width = '2px';
            node.style.height = '2px';
            node.style.background = '#2de2e6';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.boxShadow = '0 0 10px #2de2e6';
            node.style.animation = `node-pulse ${2 + Math.random() * 3}s infinite`;
            gridContainer.appendChild(node);
        }
        
        document.body.appendChild(gridContainer);
        
        // Add CSS for new animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 0.5; }
                100% { transform: scale(2); opacity: 0; }
            }
            
            @keyframes data-stream {
                0% { 
                    transform: rotate(45deg) scaleX(0); 
                    opacity: 1; 
                }
                100% { 
                    transform: rotate(45deg) scaleX(20); 
                    opacity: 0; 
                }
            }
            
            @keyframes node-pulse {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Terminal-style typing effect for loading text
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        const originalText = loadingText.textContent;
        loadingText.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                loadingText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add cursor blink after typing
                loadingText.innerHTML += '<span class="cursor">█</span>';
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});