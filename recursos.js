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

// Animación de scroll para h2, h3 y h4
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

// Animación de entrada para las cards de recursos
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

// Aplicar animación a todas las cards
document.querySelectorAll('.recurso-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});
