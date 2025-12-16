// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Control del header según la sección visible
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    
    if (header && heroSection) {
        const checkHeaderWidth = () => {
            const heroRect = heroSection.getBoundingClientRect();
            const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
            
            if (isHeroVisible) {
                header.classList.remove('full-width');
            } else {
                header.classList.add('full-width');
            }
        };
        
        // Verificar al cargar la página
        checkHeaderWidth();
        
        // Verificar al hacer scroll
        window.addEventListener('scroll', checkHeaderWidth);
        window.addEventListener('resize', checkHeaderWidth);
    }

    // Efecto shine en el botón CTA con GSAP
    const ctaButton = document.querySelector('.cta-button');

if (ctaButton && typeof gsap !== 'undefined') {
    const shineElement = document.createElement('div');
    shineElement.classList.add('shine-effect');
    ctaButton.appendChild(shineElement);

    let shineTween;

    ctaButton.addEventListener('mouseenter', () => {

        // Cancelar animación anterior si existe
        if (shineTween) shineTween.kill();

        // Resetear posición ANTES de animar
        gsap.set(shineElement, { left: '-100%' });

        // Nueva animación
        shineTween = gsap.to(shineElement, {
            left: '100%',
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
                // Reset al final para asegurar que siempre esté listo
                gsap.set(shineElement, { left: '-100%' });
            }
        });
    });
}

    // Efecto shine en el botón CTA Primary con GSAP
    const ctaPrimary = document.querySelector('.cta-primary');

if (ctaPrimary && typeof gsap !== 'undefined') {
    const shineElementPrimary = document.createElement('div');
    shineElementPrimary.classList.add('shine-effect');
    ctaPrimary.appendChild(shineElementPrimary);

    let shineTweenPrimary;

    ctaPrimary.addEventListener('mouseenter', () => {

        // Cancelar animación anterior si existe
        if (shineTweenPrimary) shineTweenPrimary.kill();

        // Resetear posición ANTES de animar
        gsap.set(shineElementPrimary, { left: '-100%' });

        // Nueva animación
        shineTweenPrimary = gsap.to(shineElementPrimary, {
            left: '100%',
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
                // Reset al final para asegurar que siempre esté listo
                gsap.set(shineElementPrimary, { left: '-100%' });
            }
        });
    });
}

    // Efecto shine en el botón Enviar del formulario con GSAP
    const btnEnviar = document.querySelector('.btn-enviar');

if (btnEnviar && typeof gsap !== 'undefined') {
    const shineElementEnviar = document.createElement('div');
    shineElementEnviar.classList.add('shine-effect');
    btnEnviar.appendChild(shineElementEnviar);

    let shineTweenEnviar;

    btnEnviar.addEventListener('mouseenter', () => {

        // Cancelar animación anterior si existe
        if (shineTweenEnviar) shineTweenEnviar.kill();

        // Resetear posición ANTES de animar
        gsap.set(shineElementEnviar, { left: '-100%' });

        // Nueva animación
        shineTweenEnviar = gsap.to(shineElementEnviar, {
            left: '100%',
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
                // Reset al final para asegurar que siempre esté listo
                gsap.set(shineElementEnviar, { left: '-100%' });
            }
        });
    });
}

    // Efecto shine en el botón CTA Experiencias con GSAP
    const ctaExperiencias = document.querySelector('.cta-experiencias');

if (ctaExperiencias && typeof gsap !== 'undefined') {
    const shineElementExperiencias = document.createElement('div');
    shineElementExperiencias.classList.add('shine-effect');
    ctaExperiencias.appendChild(shineElementExperiencias);

    let shineTweenExperiencias;

    ctaExperiencias.addEventListener('mouseenter', () => {

        // Cancelar animación anterior si existe
        if (shineTweenExperiencias) shineTweenExperiencias.kill();

        // Resetear posición ANTES de animar
        gsap.set(shineElementExperiencias, { left: '-100%' });

        // Nueva animación
        shineTweenExperiencias = gsap.to(shineElementExperiencias, {
            left: '100%',
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
                // Reset al final para asegurar que siempre esté listo
                gsap.set(shineElementExperiencias, { left: '-100%' });
            }
        });
    });
}

    // Animaciones hover para tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Animaciones para imágenes celulares y virus
    if (typeof gsap !== 'undefined') {
        // Célula grande
        const cellLarge = document.querySelector('.cell-large');
        if (cellLarge) {
            // Animación de flotación continua suave
            gsap.to(cellLarge, {
                y: -15,
                duration: 3,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            });

            // Hover: zoom suave
            cellLarge.addEventListener('mouseenter', () => {
                gsap.to(cellLarge, {
                    scale: 1.15,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            cellLarge.addEventListener('mouseleave', () => {
                gsap.to(cellLarge, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }

        // Célula pequeña
        const cellSmall = document.querySelector('.cell-small');
        if (cellSmall) {
            // Animación de flotación continua suave (más lenta)
            gsap.to(cellSmall, {
                y: -10,
                duration: 2.5,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: 0.5
            });

            // Hover: zoom suave
            cellSmall.addEventListener('mouseenter', () => {
                gsap.to(cellSmall, {
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            cellSmall.addEventListener('mouseleave', () => {
                gsap.to(cellSmall, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }

        // Virus
        const virusImage = document.querySelector('.virus-image');
        if (virusImage) {
            // Animación de rotación suave continua
            gsap.to(virusImage, {
                rotation: 360,
                duration: 20,
                ease: 'none',
                repeat: -1
            });

            // Animación de flotación continua
            gsap.to(virusImage, {
                y: -12,
                duration: 2.8,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1
            });

            // Hover: solo zoom
            virusImage.addEventListener('mouseenter', () => {
                gsap.to(virusImage, {
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            virusImage.addEventListener('mouseleave', () => {
                gsap.to(virusImage, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }

        // Pacientes cell overlay
        const pacientesCellOverlay = document.querySelector('.pacientes-cell-overlay');
        if (pacientesCellOverlay) {
            // Animación de flotación continua suave
            gsap.to(pacientesCellOverlay, {
                y: -20,
                duration: 4,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            });

            // Hover: zoom suave
            pacientesCellOverlay.addEventListener('mouseenter', () => {
                gsap.to(pacientesCellOverlay, {
                    scale: 1.15,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            pacientesCellOverlay.addEventListener('mouseleave', () => {
                gsap.to(pacientesCellOverlay, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }
    }
});

