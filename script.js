document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // Simulasi loading screen agar user bisa melihat animasi "Memuat Store"
    // Dibuat singkat agar tetap snappy
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Trigger haptic feedback ringan jika di mobile (opsional)
            if (window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        }, 1200); // 1.2 detik cukup untuk kesan premium
    });
});

// Efek suara click pixel (Opsional - Jika ingin ditambahkan nanti)
// Untuk performa, kita fokus pada visual saja saat ini.