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

// Animación de scroll para títulos
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

// Observar todos los h2 y h3
document.querySelectorAll('h2, h3').forEach(heading => {
    observer.observe(heading);
});

// Animación de scroll para items de galería
const galeriaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observar todos los items de galería
document.querySelectorAll('.galeria-item').forEach(item => {
    galeriaObserver.observe(item);
});

// Efecto parallax suave en el banner
window.addEventListener('scroll', () => {
    const banner = document.getElementById('banner-galeria');
    if (banner) {
        const scrolled = window.pageYOffset;
        const bannerHeight = banner.offsetHeight;
        
        if (scrolled < bannerHeight) {
            banner.style.transform = `translateY(${scrolled * 0.5}px)`;
            banner.style.opacity = 1 - (scrolled / bannerHeight);
        }
    }
});

// Scroll suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // No aplicar scroll suave si es solo "#"
        if (href === '#') return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Cerrar el menú móvil si está abierto
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            
            // Scroll suave al elemento
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
