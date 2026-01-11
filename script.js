document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Controller
    const loader = document.getElementById("loading-screen");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 1200);

    // 2. Mobile Nav Toggle
    const burger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav-links");
    if(burger) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("toggle");
        });
    }

    // 3. Scroll Reveal Animation
    const reveal = () => {
        const items = document.querySelectorAll(".reveal");
        items.forEach(item => {
            const windowHeight = window.innerHeight;
            const revealTop = item.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                item.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", reveal);
    reveal(); // Jalankan sekali saat load

    // 4. Custom Toast Notification System
    window.showToast = (message) => {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fas fa-info-circle" style="color:#6366f1"></i> ${message}`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(20px)";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // 5. Handling Order
    window.handleOrder = (productName) => {
        showToast(`Membuka WhatsApp untuk: ${productName}`);
        const phone = "6283171889478";
        const msg = encodeURIComponent(`Halo Romadz Store, saya ingin memesan: ${productName}`);
        setTimeout(() => {
            window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
        }, 1000);
    };
});