// Data untuk tombol link yang dikategorikan
const linkData = {
    contact: [
        {
            name: "WhatsApp",
            url: "https://wa.me/6283171889478",
            iconClass: "fab fa-whatsapp",
            buttonClass: "contact-button"
        },
        {
            name: "Telegram",
            url: "https://t.me/rmddz",
            iconClass: "fab fa-telegram",
            buttonClass: "contact-button"
        }
    ],
    testimoni: [
        {
            name: "Testimoni Telegram",
            url: "https://t.me/rmddztrust",
            iconClass: "fas fa-comment-alt",
            buttonClass: "testimoni-button"
        },
        {
            name: "Testimoni WhatsApp",
            url: "https://whatsapp.com/channel/0029VbBBd4M3mFXzClY8983Q",
            iconClass: "fas fa-comments",
            buttonClass: "testimoni-button"
        }
    ],
    groups: [
        {
            name: "Groups Marketplace 1",
            url: "https://chat.whatsapp.com/DMlW3e4CdZ71ICRQA2HZ4n",
            iconClass: "fas fa-users",
            buttonClass: "groups-button"
        },
        {
            name: "Groups Marketplace 2",
            url: "https://chat.whatsapp.com/JsDqyCZDHnxIJi8ciU0GPF",
            iconClass: "fas fa-users",
            buttonClass: "groups-button"
        },
        {
            name: "Groups Marketplace 3",
            url: "https://chat.whatsapp.com/CvAQThReFiLFO2IcBH8X7m",
            iconClass: "fas fa-users",
            buttonClass: "groups-button"
        },
        {
            name: "Groups Marketplace 4",
            url: "https://chat.whatsapp.com/JohNc0ty7RYKuAGPNOuYuU",
            iconClass: "fas fa-users",
            buttonClass: "groups-button"
        },
        {
            name: "Groups Marketplace 5",
            url: "https://chat.whatsapp.com/HHQu02C1ZRX4eQFE7rkjpd",
            iconClass: "fas fa-users",
            buttonClass: "groups-button"
        },
        {
            name: "Groups Khusus Stok",
            url: "https://chat.whatsapp.com/EtVz7hjYiE8DJvIMIgfzGP",
            iconClass: "fas fa-boxes",
            buttonClass: "groups-button"
        }
    ]
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const contactLinks = document.getElementById('contact-links');
const testimoniLinks = document.getElementById('testimoni-links');
const groupsLinks = document.getElementById('groups-links');
const logo = document.getElementById('logo');

// Fungsi untuk membuat tombol link
function createLinkButton(link) {
    const button = document.createElement('a');
    button.href = link.url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.className = `link-button ${link.buttonClass}`;
    
    button.innerHTML = `
        <div class="button-icon">
            <i class="${link.iconClass}"></i>
        </div>
        <span class="button-text">${link.name}</span>
        <div class="button-arrow">
            <i class="fas fa-arrow-up-right-from-square"></i>
        </div>
    `;
    
    // Tambahkan efek klik
    button.addEventListener('click', function(e) {
        // Efek visual saat diklik
        this.style.transform = 'translateY(0)';
        this.style.transition = 'transform 100ms ease';
        
        // Revert setelah 100ms
        setTimeout(() => {
            this.style.transform = '';
            this.style.transition = '';
        }, 100);
    });
    
    return button;
}

// Fungsi untuk memuat link berdasarkan kategori
function loadLinksByCategory() {
    // Load contact links
    linkData.contact.forEach(link => {
        const button = createLinkButton(link);
        contactLinks.appendChild(button);
    });
    
    // Load testimoni links
    linkData.testimoni.forEach(link => {
        const button = createLinkButton(link);
        testimoniLinks.appendChild(button);
    });
    
    // Load groups links
    linkData.groups.forEach(link => {
        const button = createLinkButton(link);
        groupsLinks.appendChild(button);
    });
}

// Fungsi untuk menyembunyikan loading screen
function hideLoadingScreen() {
    // Simulasi loading dengan durasi berbeda
    setTimeout(() => {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Muat link setelah loading selesai
        loadLinksByCategory();
        
        // Tambahkan efek hover untuk category sections
        const categorySections = document.querySelectorAll('.category-section');
        categorySections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-4px)';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateY(0)';
            });
        });
        
        // Animasi logo setelah loading
        setTimeout(() => {
            logo.style.transform = 'scale(1.05)';
            logo.style.transition = 'transform 0.4s ease';
            
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 400);
        }, 200);
    }, 1800); // Loading selama 1.8 detik
}

// Fungsi untuk menambahkan efek floating particles di background
function addFloatingParticles() {
    const background = document.querySelector('.background-effect');
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.1 + 0.02;
        
        // Apply styles
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            z-index: 0;
            pointer-events: none;
            animation: float ${duration}s infinite ease-in-out ${delay}s;
        `;
        
        background.appendChild(particle);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg); 
                opacity: 0.05;
            }
            25% { 
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg); 
                opacity: 0.1;
            }
            50% { 
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(180deg); 
                opacity: 0.03;
            }
            75% { 
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg); 
                opacity: 0.08;
            }
        }
    `;
    document.head.appendChild(style);
}

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Mulai loading
    hideLoadingScreen();
    
    // Tambahkan floating particles
    addFloatingParticles();
    
    // Tambahkan efek klik untuk seluruh panel
    const panel = document.querySelector('.main-panel');
    panel.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.995)';
        this.style.transition = 'transform 100ms ease';
    });
    
    panel.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
        setTimeout(() => {
            this.style.transition = '';
        }, 100);
    });
    
    // Tambahkan smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Fallback jika logo tidak dimuat
logo.addEventListener('error', function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMGExYTI0IiByeD0iMTIiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1WiIgZmlsbD0idXJsKCNhKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjM1IiB5MT0iMzUiIHgyPSI2NSIgeTI9IjY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzhhNWNmNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNhODZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8L3N2Zz4=';
    this.alt = "PixelLink Logo";
});

// Tambahkan efek keyboard interaction
document.addEventListener('keydown', function(e) {
    // Tab navigation highlight
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add styles for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation .link-button:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyles);