// Data untuk tombol link yang dikategorikan
const linkData = {
    contact: [
        {
            name: "WHATSAPP",
            url: "https://wa.me/6283171889478",
            iconClass: "fab fa-whatsapp",
            buttonClass: "contact-button",
            color: "#4ad66d"
        },
        {
            name: "TELEGRAM",
            url: "https://t.me/rmddz",
            iconClass: "fab fa-telegram",
            buttonClass: "contact-button",
            color: "#4cc9f0"
        }
    ],
    testimoni: [
        {
            name: "TESTIMONI TELEGRAM",
            url: "https://t.me/rmddztrust",
            iconClass: "fas fa-comment-alt",
            buttonClass: "testimoni-button",
            color: "#ffd166"
        },
        {
            name: "TESTIMONI WHATSAPP",
            url: "https://whatsapp.com/channel/0029VbBBd4M3mFXzClY8983Q",
            iconClass: "fas fa-comments",
            buttonClass: "testimoni-button",
            color: "#ffd166"
        }
    ],
    groups: [
        {
            name: "MARKETPLACE 1",
            url: "https://chat.whatsapp.com/DMlW3e4CdZ71ICRQA2HZ4n",
            iconClass: "fas fa-users",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        },
        {
            name: "MARKETPLACE 2",
            url: "https://chat.whatsapp.com/JsDqyCZDHnxIJi8ciU0GPF",
            iconClass: "fas fa-users",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        },
        {
            name: "MARKETPLACE 3",
            url: "https://chat.whatsapp.com/CvAQThReFiLFO2IcBH8X7m",
            iconClass: "fas fa-users",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        },
        {
            name: "MARKETPLACE 4",
            url: "https://chat.whatsapp.com/JohNc0ty7RYKuAGPNOuYuU",
            iconClass: "fas fa-users",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        },
        {
            name: "MARKETPLACE 5",
            url: "https://chat.whatsapp.com/HHQu02C1ZRX4eQFE7rkjpd",
            iconClass: "fas fa-users",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        },
        {
            name: "GROUPS STOK",
            url: "https://chat.whatsapp.com/EtVz7hjYiE8DJvIMIgfzGP",
            iconClass: "fas fa-boxes",
            buttonClass: "groups-button",
            color: "#4cc9f0"
        }
    ]
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const contactLinks = document.getElementById('contact-links');
const testimoniLinks = document.getElementById('testimoni-links');
const groupsLinks = document.getElementById('groups-links');
const logo = document.getElementById('logo');
const titleChars = document.querySelectorAll('.title-char');

// Fungsi untuk membuat efek pixel typing pada title
function initPixelTitleAnimation() {
    titleChars.forEach((char, index) => {
        char.style.setProperty('--char-index', index);
        char.style.animationDelay = `${index * 0.1}s`;
    });
}

// Fungsi untuk membuat tombol link dengan efek pixel
function createLinkButton(link) {
    const button = document.createElement('a');
    button.href = link.url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.className = `link-button ${link.buttonClass}`;
    button.dataset.color = link.color;
    
    button.innerHTML = `
        <div class="button-icon">
            <i class="${link.iconClass}"></i>
        </div>
        <span class="button-text">${link.name}</span>
        <div class="button-arrow">
            <i class="fas fa-arrow-right"></i>
        </div>
    `;
    
    // Efek hover dengan animasi pixel
    button.addEventListener('mouseenter', function() {
        this.style.borderColor = this.dataset.color;
        this.style.boxShadow = `
            5px 5px 0 var(--pixel-border),
            inset 0 0 20px ${this.dataset.color}30
        `;
        
        // Efek sonar pada icon
        const icon = this.querySelector('.button-icon');
        icon.style.animation = 'pixelPulse 0.5s ease';
        icon.style.backgroundColor = this.dataset.color;
        icon.style.color = 'var(--pixel-dark)';
        
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        
        const icon = this.querySelector('.button-icon');
        icon.style.backgroundColor = '';
        icon.style.color = '';
    });
    
    // Efek klik pixel
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateX(2px) translateY(2px)';
        this.style.boxShadow = `
            3px 3px 0 var(--pixel-border),
            inset 0 0 20px ${this.dataset.color}30
        `;
        
        // Efek klik visual
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = `${this.dataset.color}40`;
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.zIndex = '1';
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        // Animasi ripple
        setTimeout(() => {
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.opacity = '0';
            ripple.style.transition = 'all 0.4s ease';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 410);
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateX(5px)';
        this.style.boxShadow = `
            5px 5px 0 var(--pixel-border),
            inset 0 0 20px ${this.dataset.color}30
        `;
    });
    
    return button;
}

// Fungsi untuk memuat link dengan animasi berurutan
function loadLinksWithAnimation() {
    // Load contact links dengan delay
    linkData.contact.forEach((link, index) => {
        setTimeout(() => {
            const button = createLinkButton(link);
            contactLinks.appendChild(button);
            button.style.animation = 'fadeInUp 0.4s ease forwards';
            button.style.opacity = '0';
        }, index * 100);
    });
    
    // Load testimoni links dengan delay
    linkData.testimoni.forEach((link, index) => {
        setTimeout(() => {
            const button = createLinkButton(link);
            testimoniLinks.appendChild(button);
            button.style.animation = 'fadeInUp 0.4s ease forwards';
            button.style.opacity = '0';
        }, linkData.contact.length * 100 + index * 100);
    });
    
    // Load groups links dengan delay
    linkData.groups.forEach((link, index) => {
        setTimeout(() => {
            const button = createLinkButton(link);
            groupsLinks.appendChild(button);
            button.style.animation = 'fadeInUp 0.4s ease forwards';
            button.style.opacity = '0';
        }, (linkData.contact.length + linkData.testimoni.length) * 100 + index * 100);
    });
}

// Fungsi untuk menyembunyikan loading screen dengan animasi
function hideLoadingScreen() {
    // Animasi loading progress
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.animation = 'loadingProgress 1.8s ease-in-out forwards';
    
    // Animasi pixel grid scanning
    const pixelCells = document.querySelectorAll('.pixel-cell');
    pixelCells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('active');
            setTimeout(() => {
                cell.classList.remove('active');
            }, 300);
        }, index * 200);
    });
    
    // Sembunyikan loading screen setelah animasi selesai
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Inisialisasi animasi title
        initPixelTitleAnimation();
        
        // Load links dengan animasi
        setTimeout(() => {
            loadLinksWithAnimation();
        }, 300);
        
        // Animasi logo setelah loading
        setTimeout(() => {
            logo.style.transform = 'scale(1.1) rotate(5deg)';
            logo.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        }, 400);
    }, 2000);
}

// Fungsi untuk menambahkan efek pixel noise pada background
function addPixelNoiseEffect() {
    const noiseLayer = document.querySelector('.pixel-noise');
    
    // Create pixel noise pattern
    for (let i = 0; i < 50; i++) {
        const noisePixel = document.createElement('div');
        noisePixel.className = 'noise-pixel';
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.1 + 0.02;
        const colors = ['#4ad66d', '#4cc9f0', '#7209b7', '#ffd166'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        noisePixel.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            z-index: 1;
            pointer-events: none;
            animation: noiseFlicker ${duration}s infinite ${delay}s;
        `;
        
        noiseLayer.appendChild(noisePixel);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes noiseFlicker {
            0%, 100% { opacity: 0.02; transform: translate(0, 0); }
            25% { opacity: 0.05; transform: translate(1px, -1px); }
            50% { opacity: 0.03; transform: translate(-1px, 1px); }
            75% { opacity: 0.08; transform: translate(1px, 1px); }
        }
    `;
    document.head.appendChild(style);
}

// Fungsi untuk menambahkan efek hover pada category cards
function initCategoryCardEffects() {
    const categoryCards = document.querySelectorAll('.pixel-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const category = card.dataset.category;
            let color;
            
            switch(category) {
                case 'contact':
                    color = 'var(--pixel-green)';
                    break;
                case 'testimoni':
                    color = 'var(--pixel-yellow)';
                    break;
                case 'groups':
                    color = 'var(--pixel-cyan)';
                    break;
            }
            
            // Animasi border glow
            card.style.borderColor = color;
            card.style.boxShadow = `
                0 10px 25px rgba(0, 0, 0, 0.4),
                0 0 20px ${color}80
            `;
            
            // Animasi arrow
            const arrow = card.querySelector('.pixel-arrow');
            arrow.style.transform = 'translateX(5px)';
            arrow.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
            
            const arrow = card.querySelector('.pixel-arrow');
            arrow.style.transform = '';
        });
    });
}

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Mulai loading sequence
    hideLoadingScreen();
    
    // Tambahkan efek pixel noise
    addPixelNoiseEffect();
    
    // Inisialisasi efek category cards
    setTimeout(() => {
        initCategoryCardEffects();
    }, 2500);
    
    // Tambahkan efek klik pada main panel
    const panel = document.querySelector('.main-panel');
    panel.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(2px)';
        this.style.transition = 'transform 0.1s ease';
    });
    
    panel.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Tambahkan efek status LED
    const statusLed = document.querySelector('.status-led');
    setInterval(() => {
        statusLed.style.animation = 'ledPulse 0.5s ease';
        setTimeout(() => {
            statusLed.style.animation = '';
        }, 500);
    }, 3000);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
});

// Fallback jika logo tidak dimuat
logo.addEventListener('error', function() {
    // Create pixel art logo fallback
    const canvas = document.createElement('canvas');
    canvas.width = 164;
    canvas.height = 164;
    const ctx = canvas.getContext('2d');
    
    // Draw pixel art logo
    ctx.fillStyle = '#1b263b';
    ctx.fillRect(0, 0, 164, 164);
    
    // Draw pixel pattern
    ctx.fillStyle = '#4ad66d';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillRect(20 + i * 16, 20 + j * 16, 12, 12);
            }
        }
    }
    
    this.src = canvas.toDataURL();
    this.alt = "PixelGate Logo";
});

// Tambahkan styles untuk keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-nav .link-button:focus {
        outline: 3px solid var(--pixel-green);
        outline-offset: 3px;
        transform: translateX(5px) !important;
    }
    
    .keyboard-nav .pixel-card:focus-within {
        border-color: var(--pixel-green) !important;
        box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.4),
            0 0 20px var(--glow-green) !important;
    }
`;
document.head.appendChild(keyboardStyles);