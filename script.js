// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContainer = document.getElementById('main-container');
const logoAvatar = document.getElementById('logo-avatar');
const soundToggle = document.getElementById('sound-toggle');
const themeToggle = document.getElementById('theme-toggle');
const clickSound = document.getElementById('click-sound');
const hoverSound = document.getElementById('hover-sound');
const linkButtons = document.querySelectorAll('.link-button');

// State Variables
let soundEnabled = true;
let nightMode = false;
let loadingProgress = 0;

// Initialize Audio Context for browser autoplay policies
let audioContext;
let clickGainNode;
let hoverGainNode;

// Initialize the page
function init() {
    // Simulate loading progress
    simulateLoading();
    
    // Initialize audio
    initAudio();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();
}

// Simulate loading progress
function simulateLoading() {
    const progressFill = document.querySelector('.loading-progress-fill');
    const loadingBlocks = document.querySelectorAll('.loading-block');
    
    const interval = setInterval(() => {
        loadingProgress += Math.random() * 15 + 5;
        if (loadingProgress > 100) {
            loadingProgress = 100;
            clearInterval(interval);
            
            // Loading complete
            setTimeout(completeLoading, 500);
        }
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${loadingProgress}%`;
        }
        
        // Animate blocks
        loadingBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    block.style.transform = 'translateY(0)';
                }, 200);
            }, index * 100);
        });
    }, 200);
}

// Complete loading and show main content
function completeLoading() {
    // Play click sound if enabled
    playSound('click');
    
    // Fade out loading screen
    loadingScreen.classList.add('hidden');
    
    // Show main container with delay
    setTimeout(() => {
        mainContainer.classList.remove('hidden');
        mainContainer.classList.add('show');
        
        // Add logo animation
        logoAvatar.style.animation = 'logoFloat 4s infinite ease-in-out';
    }, 300);
}

// Initialize audio system
function initAudio() {
    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create gain nodes for volume control
        clickGainNode = audioContext.createGain();
        hoverGainNode = audioContext.createGain();
        
        // Set initial volume (lower for hover)
        clickGainNode.gain.value = 0.3;
        hoverGainNode.gain.value = 0.1;
        
        // Connect gain nodes to destination
        clickGainNode.connect(audioContext.destination);
        hoverGainNode.connect(audioContext.destination);
        
        console.log('Audio initialized successfully');
    } catch (error) {
        console.warn('Web Audio API not supported, using HTML5 audio fallback');
    }
}

// Play sound effect
function playSound(type) {
    if (!soundEnabled) return;
    
    if (type === 'click') {
        // Reset and play click sound
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
    } else if (type === 'hover') {
        // Reset and play hover sound
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    // Update toggle button appearance
    const togglePixels = document.querySelectorAll('.toggle-pixel');
    const toggleLabel = document.querySelector('.toggle-label');
    
    if (soundEnabled) {
        toggleLabel.textContent = 'SFX ON';
        togglePixels.forEach(pixel => {
            pixel.style.backgroundColor = '#e0e0e0';
        });
    } else {
        toggleLabel.textContent = 'SFX OFF';
        togglePixels.forEach(pixel => {
            pixel.style.backgroundColor = '#7a7a7a';
        });
    }
    
    // Play click sound (if turning on)
    if (soundEnabled) {
        playSound('click');
    }
}

// Toggle day/night mode
function toggleTheme() {
    nightMode = !nightMode;
    
    // Update body class
    if (nightMode) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }
    
    // Update toggle knob position is handled by CSS
    
    // Play click sound
    playSound('click');
}

// Set up event listeners
function setupEventListeners() {
    // Sound toggle
    soundToggle.addEventListener('click', () => {
        // Add click animation
        soundToggle.style.transform = 'translateY(2px)';
        setTimeout(() => {
            soundToggle.style.transform = 'translateY(0)';
        }, 100);
        
        toggleSound();
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        // Add click animation
        themeToggle.style.transform = 'translateY(2px)';
        setTimeout(() => {
            themeToggle.style.transform = 'translateY(0)';
        }, 100);
        
        toggleTheme();
    });
    
    // Link button interactions
    linkButtons.forEach(button => {
        // Hover effect
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover');
            playSound('hover');
        });
        
        // Mouse leave
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover');
        });
        
        // Click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(2px)';
            button.style.boxShadow = '0 4px 0 #5a4a3d';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-4px)';
            button.style.boxShadow = '0 12px 0 #5a4a3d';
        });
        
        button.addEventListener('click', (e) => {
            // If it's a marketplace button, add a little extra animation
            if (button.classList.contains('marketplace-button')) {
                const icon = button.querySelector('.button-icon');
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Play click sound
            if (button.getAttribute('data-sound') === 'click') {
                playSound('click');
            }
        });
    });
    
    // Logo interaction
    logoAvatar.addEventListener('click', () => {
        // Add bounce effect
        logoAvatar.style.animation = 'none';
        setTimeout(() => {
            logoAvatar.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logoAvatar.style.transform = 'scale(1)';
                logoAvatar.style.animation = 'logoFloat 4s infinite ease-in-out';
            }, 150);
        }, 10);
        
        playSound('click');
    });
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', handleResize);
    
    // Handle audio context on user interaction (for browsers that require it)
    document.addEventListener('click', initAudioOnInteraction, { once: true });
}

// Initialize audio on first user interaction
function initAudioOnInteraction() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Handle window resize
function handleResize() {
    // Adjust cloud positions if needed
    const clouds = document.querySelectorAll('.pixel-cloud');
    clouds.forEach(cloud => {
        // Reset animation to prevent positioning issues
        cloud.style.animation = 'none';
        setTimeout(() => {
            cloud.style.animation = '';
        }, 10);
    });
}

// Initialize animations
function initAnimations() {
    // Add subtle animation to particles
    const particles = document.querySelectorAll('.pixel-particle');
    particles.forEach((particle, index) => {
        // Random delay for each particle
        particle.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add staggered animation to link buttons on load
    setTimeout(() => {
        linkButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                button.style.display = 'flex';
                
                setTimeout(() => {
                    button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }, 500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);