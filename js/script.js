// Toggle navbar menu (sudah ada)
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Toggle dropdown untuk mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const parent = toggle.parentElement;
        if (window.innerWidth <= 880) {
            e.preventDefault();
            parent.classList.toggle('open');

            // Tutup dropdown lain jika dibuka
            document.querySelectorAll('.dropdown').forEach(drop => {
                if (drop !== parent) {
                    drop.classList.remove('open');
                }
            });
        }
    });
});
