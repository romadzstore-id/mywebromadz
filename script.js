document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");

    // Simulasi loading agar animasi bar selesai (sesuai durasi CSS 1.5s)
    setTimeout(() => {
        // Fade out
        loadingScreen.style.opacity = "0";
        
        // Hapus dari DOM setelah transisi opacity selesai agar tidak menutupi klik
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500); // 500ms sesuai durasi transition di CSS
        
    }, 1500); // Waktu tunggu sedikit lebih lama dari animasi bar
});

// Efek tambahan: Mencegah link di-drag (agar lebih terasa seperti aplikasi/game)
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});