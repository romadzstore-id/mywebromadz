// Data links yang akan ditampilkan
const linksData = [
    {
        id: 1,
        title: "WhatsApp",
        subtitle: "Hubungi saya via WhatsApp",
        url: "https://wa.me/6283171889478",
        icon: "W",
        color: "#25D366"
    },
    {
        id: 2,
        title: "Telegram",
        subtitle: "Pesan langsung di Telegram",
        url: "https://t.me/rmddz",
        icon: "T",
        color: "#0088cc"
    },
    {
        id: 3,
        title: "Testimoni Telegram",
        subtitle: "Lihat testimoni di channel Telegram",
        url: "https://t.me/rmddztrust",
        icon: "★",
        color: "#8a2be2"
    },
    {
        id: 4,
        title: "Testimoni WhatsApp",
        subtitle: "Channel testimoni WhatsApp",
        url: "https://whatsapp.com/channel/0029VbBBd4M3mFXzClY8983Q",
        icon: "★",
        color: "#25D366"
    },
    {
        id: 5,
        title: "Marketplace Group 1",
        subtitle: "Groups Marketplace WhatsApp",
        url: "https://chat.whatsapp.com/DMlW3e4CdZ71ICRQA2HZ4n",
        icon: "M1",
        color: "#6a5acd"
    },
    {
        id: 6,
        title: "Marketplace Group 2",
        subtitle: "Groups Marketplace WhatsApp",
        url: "https://chat.whatsapp.com/JsDqyCZDHnxIJi8ciU0GPF",
        icon: "M2",
        color: "#9370db"
    },
    {
        id: 7,
        title: "Marketplace Group 3",
        subtitle: "Groups Marketplace WhatsApp",
        url: "https://chat.whatsapp.com/CvAQThReFiLFO2IcBH8X7m",
        icon: "M3",
        color: "#8a2be2"
    },
    {
        id: 8,
        title: "Marketplace Group 4",
        subtitle: "Groups Marketplace WhatsApp",
        url: "https://chat.whatsapp.com/JohNc0ty7RYKuAGPNOuYuU",
        icon: "M4",
        color: "#9932cc"
    },
    {
        id: 9,
        title: "Marketplace Group 5",
        subtitle: "Groups Marketplace WhatsApp",
        url: "https://chat.whatsapp.com/HHQu02C1ZRX4eQFE7rkjpd",
        icon: "M5",
        color: "#ba55d3"
    },
    {
        id: 10,
        title: "Khusus Stok Group",
        subtitle: "Groups khusus stok barang",
        url: "https://chat.whatsapp.com/EtVz7hjYiE8DJvIMIgfzGP",
        icon: "S",
        color: "#32cd32"
    }
];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const linksList = document.getElementById('links-list');
const linksCount = document.getElementById('links-count');
const clickEffect = document.getElementById('click-effect');
const avatarImage = document.getElementById('avatar-image');

// Initialize the application
function initApp() {
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        generateLinks();
        setupEventListeners();
        updateLinksCount();
        
        // Add some interactive effects after load
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 500);
    }, 1500);
}

// Generate links from data
function generateLinks() {
    linksData.forEach(link => {
        const linkElement = createLinkElement(link);
        linksList.appendChild(linkElement);
    });
}

// Create individual link element
function createLinkElement(link) {
    const linkItem = document.createElement('a');
    linkItem.href = link.url;
    linkItem.className = 'link-item';
    linkItem.target = '_blank';
    linkItem.rel = 'noopener noreferrer';
    linkItem.dataset.id = link.id;
    
    linkItem.innerHTML = `
        <div class="link-content">
            <div class="link-icon" style="background-color: ${link.color}20; border-color: ${link.color}40;">
                <span style="color: ${link.color}; font-weight: 700;">${link.icon}</span>
            </div>
            <div class="link-text">
                <div class="link-title">${link.title}</div>
                <div class="link-subtitle">${link.subtitle}</div>
            </div>
            <div class="link-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8-8-8z"/>
                </svg>
            </div>
        </div>
    `;
    
    return linkItem;
}

// Update links count
function updateLinksCount() {
    linksCount.textContent = linksData.length;
}

// Create click effect at position
function createClickEffect(x, y) {
    clickEffect.style.left = `${x}px`;
    clickEffect.style.top = `${y}px`;
    clickEffect.style.opacity = '0.7';
    clickEffect.style.transform = 'scale(1)';
    
    setTimeout(() => {
        clickEffect.style.opacity = '0';
        clickEffect.style.transform = 'scale(3)';
    }, 300);
}

// Setup event listeners
function setupEventListeners() {
    // Link click effects
    document.querySelectorAll('.link-item').forEach(link => {
        link.addEventListener('click', function(e) {
            // Create click effect
            createClickEffect(e.clientX, e.clientY);
            
            // Add active state
            this.classList.add('active');
            
            // Remove active state after animation
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
            
            // Track click (simulated)
            console.log(`Link clicked: ${this.querySelector('.link-title').textContent}`);
        });
    });
    
    // Add click effect to avatar
    avatarImage.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
        
        // Add a fun rotation effect
        this.style.transform = 'scale(1.05) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 300);
        setTimeout(() => {
            this.style.transform = '';
        }, 600);
    });
    
    // Add random pixel animation to header
    const title = document.querySelector('.pixel-text');
    title.addEventListener('mouseenter', function() {
        this.style.animation = 'text-glow 0.5s ease-in-out 3';
    });
    
    title.addEventListener('animationend', function() {
        this.style.animation = '';
    });
    
    // Add subtle background animation
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${x * 20}% ${y * 20}%`;
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const links = document.querySelectorAll('.link-item');
        const currentFocus = document.activeElement;
        let currentIndex = Array.from(links).indexOf(currentFocus);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % links.length;
            links[currentIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + links.length) % links.length;
            links[currentIndex].focus();
        } else if (e.key === 'Enter' && currentFocus.classList.contains('link-item')) {
            // Trigger click effect at center of element
            const rect = currentFocus.getBoundingClientRect();
            createClickEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add service worker simulation for offline capability (simulated)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This is a simulation - in a real app you would register a service worker
        console.log('Pixel Links ready for offline use (simulated)');
    });
}

// Add viewport animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelector('.container').style.transform = `translateY(${rate}px)`;
});

// Handle page visibility change for better UX
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible again
        document.querySelector('.title').style.animation = 'none';
        setTimeout(() => {
            document.querySelector('.title').style.animation = '';
        }, 10);
    }
});