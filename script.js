// script.js
// Data link sesuai dengan yang diminta
const linkData = [
    {
        name: "WhatsApp",
        url: "https://wa.me/6283171889478",
        type: "whatsapp"
    },
    {
        name: "Telegram",
        url: "https://t.me/rmddz",
        type: "telegram"
    },
    {
        name: "Testimoni Telegram",
        url: "https://t.me/rmddztrust",
        type: "testimoni"
    },
    {
        name: "Testimoni WhatsApp",
        url: "https://whatsapp.com/channel/0029VbBBd4M3mFXzClY8983Q",
        type: "testimoni"
    },
    {
        name: "Groups Marketplace 1",
        url: "https://chat.whatsapp.com/DMlW3e4CdZ71ICRQA2HZ4n",
        type: "marketplace"
    },
    {
        name: "Groups Marketplace 2",
        url: "https://chat.whatsapp.com/JsDqyCZDHnxIJi8ciU0GPF",
        type: "marketplace"
    },
    {
        name: "Groups Marketplace 3",
        url: "https://chat.whatsapp.com/CvAQThReFiLFO2IcBH8X7m",
        type: "marketplace"
    },
    {
        name: "Groups Marketplace 4",
        url: "https://chat.whatsapp.com/JohNc0ty7RYKuAGPNOuYuU",
        type: "marketplace"
    },
    {
        name: "Groups Marketplace 5",
        url: "https://chat.whatsapp.com/HHQu02C1ZRX4eQFE7rkjpd",
        type: "marketplace"
    },
    {
        name: "Groups Khusus Stok",
        url: "https://chat.whatsapp.com/EtVz7hjYiE8DJvIMIgfzGP",
        type: "stock"
    }
];

// Fungsi untuk membuat tombol link
function createLinkButton(link) {
    const button = document.createElement('a');
    button.href = link.url;
    button.className = `link-button ${link.type}`;
    button.textContent = link.name;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    
    return button;
}

// Fungsi untuk menginisialisasi halaman
function initPage() {
    const linksContainer = document.querySelector('.links-container');
    
    // Tambahkan semua tombol link ke container
    linkData.forEach(link => {
        const button = createLinkButton(link);
        linksContainer.appendChild(button);
    });
    
    // Tambahkan efek klik pada semua tombol
    const buttons = document.querySelectorAll('.link-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efek klik
            this.style.transform = 'translateY(4px)';
            this.style.boxShadow = '2px 2px 0 #3a5c2e';
            
            // Reset setelah 150ms
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 150);
            
            // Tracking klik (opsional, bisa diisi dengan analytics)
            console.log(`Link diklik: ${this.textContent}`);
        });
    });
}

// Fungsi untuk menangani loading screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simulasi loading selama 2 detik
    setTimeout(() => {
        // Sembunyikan loading screen
        loadingScreen.classList.add('hidden');
        
        // Tampilkan konten utama
        mainContent.style.opacity = '1';
        
        // Inisialisasi halaman setelah loading selesai
        initPage();
        
        // Hapus loading screen dari DOM setelah animasi selesai
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Mulai loading screen
    handleLoadingScreen();
    
    // Tambahkan efek interaktif untuk panel
    const panel = document.querySelector('.button-panel');
    panel.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    panel.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Tambahkan efek untuk logo frame
    const logoFrame = document.querySelector('.logo-frame');
    logoFrame.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(2deg) scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    logoFrame.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0) scale(1)';
    });
});