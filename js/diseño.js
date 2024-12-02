document.addEventListener("DOMContentLoaded", () => {
    // Animación de imágenes en el "Hero Section" (movimiento y escala)
    const heroImages = document.querySelectorAll('.hero-image');
    
    heroImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.5s ease-in-out';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });

    // Animación de deslizamiento en el scroll (para secciones)
    const sections = document.querySelectorAll('.scroll-section');
    const options = {
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Botones con animación de rebote (hover)
    const buttons = document.querySelectorAll('.btn-animated');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('btn-bounce');
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-bounce');
        });
    });

    // Desplazamiento suave al hacer clic en los enlaces
    const scrollLinks = document.querySelectorAll('a.scroll-to');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
});
