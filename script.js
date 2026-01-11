// Tunggu sampai dokumen dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
    
    // --- LOADING SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hilangkan loading screen setelah halaman siap (delay kecil untuk estetika)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);

    // --- BUTTON HANDLER (Untuk tombol "Hubungi Kami") ---
    // Mengarahkan ke WhatsApp dengan pesan preset
    window.orderProduct = function(productName) {
        const phone = "6281234567890"; // Ganti dengan nomor WA Anda
        const text = `Halo Admin, saya tertarik dengan produk: ${productName}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        
        showToast(`Mengarahkan ke WhatsApp...`);
        setTimeout(() => {
            window.open(url, '_blank');
        }, 1000);
    };

    // --- CUSTOM TOAST NOTIFICATION ---
    window.showToast = function(message) {
        const container = document.getElementById('toast-container');
        
        // Buat elemen toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        
        container.appendChild(toast);

        // Hapus elemen setelah animasi selesai (3 detik)
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    // --- ANIMASI SMOOTH SCROLL (Opsional) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});