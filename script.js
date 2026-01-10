// Data untuk tombol link
const linkData = [
    {
        name: "WhatsApp",
        url: "https://wa.me/6283171889478",
        icon: "whatsapp-icon",
        iconClass: "fab fa-whatsapp"
    },
    {
        name: "Telegram",
        url: "https://t.me/rmddz",
        icon: "telegram-icon",
        iconClass: "fab fa-telegram"
    },
    {
        name: "Testimoni Telegram",
        url: "https://t.me/rmddztrust",
        icon: "comment-icon",
        iconClass: "fas fa-comment-alt"
    },
    {
        name: "Testimoni WhatsApp",
        url: "https://whatsapp.com/channel/0029VbBBd4M3mFXzClY8983Q",
        icon: "comment-icon",
        iconClass: "fas fa-comments"
    },
    {
        name: "Groups Marketplace 1",
        url: "https://chat.whatsapp.com/DMlW3e4CdZ71ICRQA2HZ4n",
        icon: "group-icon",
        iconClass: "fas fa-users"
    },
    {
        name: "Groups Marketplace 2",
        url: "https://chat.whatsapp.com/JsDqyCZDHnxIJi8ciU0GPF",
        icon: "group-icon",
        iconClass: "fas fa-users"
    },
    {
        name: "Groups Marketplace 3",
        url: "https://chat.whatsapp.com/CvAQThReFiLFO2IcBH8X7m",
        icon: "group-icon",
        iconClass: "fas fa-users"
    },
    {
        name: "Groups Marketplace 4",
        url: "https://chat.whatsapp.com/JohNc0ty7RYKuAGPNOuYuU",
        icon: "group-icon",
        iconClass: "fas fa-users"
    },
    {
        name: "Groups Marketplace 5",
        url: "https://chat.whatsapp.com/HHQu02C1ZRX4eQFE7rkjpd",
        icon: "group-icon",
        iconClass: "fas fa-users"
    },
    {
        name: "Groups Khusus Stok",
        url: "https://chat.whatsapp.com/EtVz7hjYiE8DJvIMIgfzGP",
        icon: "stock-icon",
        iconClass: "fas fa-boxes"
    }
];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const linksContainer = document.getElementById('links-container');
const logo = document.getElementById('logo');

// Fungsi untuk membuat tombol link
function createLinkButton(link) {
    const button = document.createElement('a');
    button.href = link.url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.className = "link-button";
    
    button.innerHTML = `
        <div class="button-icon">
            <i class="${link.iconClass}"></i>
        </div>
        <span class="button-text">${link.name}</span>
        <i class="fas fa-external-link-alt" style="font-size: 0.8rem; opacity: 0.7;"></i>
    `;
    
    // Tambahkan efek klik
    button.addEventListener('click', function(e) {
        // Efek visual saat diklik
        this.style.transform = 'translateY(1px)';
        this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(0, 255, 157, 0.4)';
        
        // Revert setelah 150ms
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
    });
    
    return button;
}

// Fungsi untuk memuat semua tombol
function loadLinks() {
    linkData.forEach(link => {
        const button = createLinkButton(link);
        linksContainer.appendChild(button);
    });
}

// Fungsi untuk menyembunyikan loading screen
function hideLoadingScreen() {
    // Simulasi loading
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Setelah loading selesai, muat link
        loadLinks();
        
        // Tambahkan efek pada logo setelah loading
        setTimeout(() => {
            logo.style.transform = 'scale(1.05)';
            logo.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 300);
        }, 100);
    }, 1500); // Simulasi loading 1.5 detik
}

// Fungsi untuk menambahkan efek visual acak pada background
function addBackgroundEffects() {
    const grid = document.querySelector('.pixel-grid');
    
    // Tambahkan beberapa pixel acak dengan glow
    for (let i = 0; i < 20; i++) {
        const pixel = document.createElement('div');
        pixel.style.position = 'fixed';
        pixel.style.width = Math.floor(Math.random() * 4 + 2) + 'px';
        pixel.style.height = pixel.style.width;
        pixel.style.backgroundColor = 'rgba(0, 255, 157, 0.1)';
        pixel.style.borderRadius = '1px';
        pixel.style.boxShadow = '0 0 5px rgba(0, 255, 157, 0.3)';
        pixel.style.left = Math.random() * 100 + '%';
        pixel.style.top = Math.random() * 100 + '%';
        pixel.style.zIndex = '-1';
        pixel.style.opacity = '0';
        pixel.style.animation = `pixelFade ${Math.random() * 3 + 2}s infinite alternate`;
        
        document.body.appendChild(pixel);
        
        // Animasi fade in/out untuk pixel
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pixelFade {
                0%, 100% { opacity: 0; }
                50% { opacity: ${Math.random() * 0.3 + 0.1}; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Mulai loading
    hideLoadingScreen();
    
    // Tambahkan efek background
    addBackgroundEffects();
    
    // Tambahkan efek hover untuk panel
    const panel = document.querySelector('.main-panel');
    panel.addEventListener('mouseenter', function() {
        this.style.boxShadow = 
            '0 10px 30px rgba(0, 0, 0, 0.5), ' +
            'inset 0 0 15px rgba(0, 0, 0, 0.3), ' +
            '0 0 25px rgba(0, 255, 157, 0.2)';
    });
    
    panel.addEventListener('mouseleave', function() {
        this.style.boxShadow = 
            '0 10px 30px rgba(0, 0, 0, 0.5), ' +
            'inset 0 0 15px rgba(0, 0, 0, 0.3), ' +
            '0 0 20px rgba(0, 255, 157, 0.1)';
    });
});

// Fallback jika logo tidak dimuat
logo.addEventListener('error', function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMGEwZjFlIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDBmZjlkIi8+CjxwYXRoIGQ9Ik0zNSAzNVY2NU02NSA2NVYzNU0zNSA1MEg2NSIgc3Ryb2tlPSIjMGEwZjFlIiBzdHJva2Utd2lkdGg9IjgiLz4KPC9zdmc+';
    this.alt = "PixelLink Logo";
});