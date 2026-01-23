const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');
const submenuItems = document.querySelectorAll('.has-submenu');

// Toggle menú hamburguesa
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Cerrar menú al hacer clic en overlay
overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
});

// Toggle submenús en mobile
submenuItems.forEach(item => {
    const link = item.querySelector('a');
    
    link.addEventListener('click', (e) => {
        // Solo prevenir default en mobile
        if (window.innerWidth < 800) {
            e.preventDefault();
            item.classList.toggle('active');
        }
    });
});

// Cerrar menú al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        submenuItems.forEach(item => item.classList.remove('active'));
    }
});

// Animación de scroll para h2 y h3
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los h2, h3 y h4 excepto los del hero
document.querySelectorAll('h2:not(#hero h2), h3, h4').forEach(heading => {
    observer.observe(heading);
});