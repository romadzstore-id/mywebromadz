document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // Smooth fade out untuk loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Menghilangkan context menu default (opsional, untuk feel "App")
    // Dihilangkan jika ingin tetap standar browser
    /*
    document.addEventListener('contextmenu', event => event.preventDefault());
    */

    // Tambahkan feedback getar saat tombol ditekan (Hanya Android)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            if (window.navigator.vibrate) {
                window.navigator.vibrate(10);
            }
        });
    });
});