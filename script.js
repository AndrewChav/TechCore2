const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const submenuItems = document.querySelectorAll('.has-submenu');

// Toggle menú hamburguesa
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Toggle submenús en mobile
submenuItems.forEach(item => {
    const link = item.querySelector('a');
    
    link.addEventListener('click', (e) => {
        // Solo prevenir default en mobile
        if (window.innerWidth < 768) {
            e.preventDefault();
            item.classList.toggle('active');
        }
    });
});

// Cerrar menú al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        submenuItems.forEach(item => item.classList.remove('active'));
    }
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

function toggleExpand(header) {
    const expandable = header.parentElement;
    expandable.classList.toggle('active');
}
