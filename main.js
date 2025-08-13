/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/* === IMAGE CLICK ZOOM + DRAG + PINCH === */
const img = document.querySelector('.img-clickable');
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('imgModalContent');
const closeBtn = document.querySelector('.img-modal-close');

let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

// PC: klik gambar buka modal
if (img) {
    img.addEventListener('click', () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
        scale = 1;
        translateX = translateY = 0;
        modalImg.style.transform = `translate(0px,0px) scale(1)`;
    });
}

// Tutup modal
closeBtn.addEventListener('click', () => modal.style.display = "none");
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = "none"; });

// === PC Zoom pakai scroll ===
modalImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// === PC Drag gambar ===
modalImg.addEventListener('mousedown', (e) => {
    if (scale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImg.style.cursor = "grabbing";
        e.preventDefault();
    }
});
window.addEventListener('mousemove', (e) => {
    if (isDragging && scale > 1) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
});
window.addEventListener('mouseup', () => {
    isDragging = false;
    modalImg.style.cursor = scale > 1 ? "grab" : "default";
});

// === HP: Pinch Zoom ===
let initialDistance = 0;
modalImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        initialDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
    } else if (e.touches.length === 1 && scale > 1) {
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        isDragging = true;
    }
}, { passive: false });

modalImg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        let newDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        let zoomChange = newDistance / initialDistance;
        scale = Math.min(Math.max(1, scale * zoomChange), 3);
        initialDistance = newDistance;
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
}, { passive: false });

modalImg.addEventListener('touchend', () => {
    isDragging = false;
});
