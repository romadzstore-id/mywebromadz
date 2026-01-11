document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen
    const loader = document.getElementById("loading-screen");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 1500);

    // 2. Mobile Nav
    const burger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav-links");
    
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        // Animasi icon burger (opsional)
        burger.classList.toggle("toggle");
    });

    // 3. Order Function
    window.order = (product) => {
        const wa = "6283171889478";
        const msg = encodeURIComponent(`Halo Admin Romadz Store, saya ingin memesan: ${product}`);
        window.open(`https://wa.me/${wa}?text=${msg}`, "_blank");
    };

    // 4. Scroll Reveal Effect (Simple)
    const cards = document.querySelectorAll(".b-card, .p-card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "0.6s ease-out";
        observer.observe(card);
    });
});