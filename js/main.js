// Botón Adjuntar Archivo - abrir buscador de archivos
const btnAdjuntar = document.querySelector('.btn-adjuntar');
const estudiosFile = document.getElementById('estudios-file');
const estudiosInput = document.getElementById('estudios');

if (btnAdjuntar && estudiosFile) {
    btnAdjuntar.addEventListener('click', function() {
        estudiosFile.click();
    });
}

if (estudiosFile && estudiosInput) {
    estudiosFile.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            estudiosInput.value = this.files[0].name;
        } else {
            estudiosInput.value = '';
        }
    });
}

// Envío del formulario vía WhatsApp con modal de confirmación
var pendingWhatsAppUrl = null;
var longevityResult = null;

function getLongevityInterpretacion(total) {
    if (total >= 90) return 'Perfil óptimo de longevidad';
    if (total >= 80) return 'Salud preventiva sólida';
    if (total >= 70) return 'Riesgo metabólico moderado';
    if (total >= 60) return 'Requiere intervención preventiva';
    return 'Riesgo cardiometabólico elevado';
}

function buildLongevityMessage() {
    if (!longevityResult) return '';
    var lineas = [
        '———',
        '*CUESTIONARIO DE LONGEVIDAD - CLÍNICA CAMSA*',
        '*Longevity Score (100 puntos)*',
        '',
        '*Datos generales*',
        'Nombre: ' + (longevityResult.datos.nombre || '—'),
        'Edad: ' + (longevityResult.datos.edad || '—'),
        'Sexo: ' + (longevityResult.datos.sexo || '—'),
        'Fecha: ' + (longevityResult.datos.fecha || '—'),
        'Profesión: ' + (longevityResult.datos.profesion || '—'),
        'Teléfono o correo: ' + (longevityResult.datos.contacto || '—'),
        ''
    ];
    longevityResult.answers.forEach(function(a) {
        lineas.push('*P' + a.q + '.* ' + a.question);
        lineas.push('→ ' + a.answer);
        lineas.push('');
    });
    lineas.push('*Puntaje total: ' + longevityResult.total + ' / 100*');
    lineas.push('*Interpretación:* ' + longevityResult.interpretacion);
    return lineas.join('\n');
}

function buildWhatsAppUrl() {
    var num = (typeof window.__rs === 'function' && window.__rs('fw')) ? window.__rs('fw') : '527443514149';
    var nombre = document.getElementById('nombre').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var preocupaciones = document.getElementById('preocupaciones').value.trim();
    var diagnostico = document.getElementById('diagnostico').value.trim();
    var medicamentos = document.getElementById('medicamentos').value.trim();
    var estudios = document.getElementById('estudios').value.trim();
    var estudiosFile = document.getElementById('estudios-file');

    var tieneArchivo = false;
    if (estudiosFile && estudiosFile.files && estudiosFile.files.length > 0) {
        tieneArchivo = true;
    }

    var lineas = [
        '*SOLICITUD DE PROTOCOLO - CLÍNICA CAMSA*',
        '',
        '*Nombre:* ' + nombre,
        '*Teléfono (WhatsApp):* ' + telefono,
        '',
        '*¿Qué le duele, preocupa o quisiera mejorar?*',
        preocupaciones,
        '',
        '*Diagnóstico:*',
        diagnostico,
        '',
        '*Lista de medicamentos y suplementos:*',
        medicamentos,
        ''
    ];

    lineas.push('*Últimos estudios:* ');
    if (tieneArchivo) {
        lineas.push('');
        lineas.push('_(Recuerde adjuntar estudios después de enviar este mensaje.)_');
    }

    var mensaje = lineas.join('\n');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(mensaje);
}

function buildLongevityWhatsAppUrl() {
    if (!longevityResult) return null;
    var num = (typeof window.__rs === 'function' && window.__rs('fw')) ? window.__rs('fw') : '527443514149';
    var mensaje = '*ENVÍO DE CUESTIONARIO DE LONGEVIDAD - CLÍNICA CAMSA*' + '\n\n' + buildLongevityMessage();
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(mensaje);
}

function showModal() {
    var modal = document.getElementById('modal-whatsapp');
    if (modal) {
        modal.removeAttribute('hidden');
        modal.offsetHeight;
        modal.classList.add('active');
    }
}

function hideModal() {
    var modal = document.getElementById('modal-whatsapp');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(function() { modal.setAttribute('hidden', ''); }, 300);
    }
    pendingWhatsAppUrl = null;
}

const protocoloForm = document.getElementById('protocolo-form');
if (protocoloForm) {
    protocoloForm.addEventListener('submit', function(e) {
        e.preventDefault();
        pendingWhatsAppUrl = buildWhatsAppUrl();
        showModal();
    });
}

// Modal Cuestionario de Longevidad: abrir/cerrar
function showLongevityModal() {
    var modal = document.getElementById('modal-longevity');
    if (modal) {
        var dateInput = document.getElementById('long-fecha');
        if (dateInput) {
            var today = new Date();
            dateInput.value = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        }
        var nombreInput = document.getElementById('nombre');
        var telefonoInput = document.getElementById('telefono');
        var longNombre = document.getElementById('long-nombre');
        var longContacto = document.getElementById('long-contacto');
        if (longNombre && nombreInput) longNombre.value = nombreInput.value.trim();
        if (longContacto && telefonoInput) longContacto.value = telefonoInput.value.trim();
        modal.removeAttribute('hidden');
        modal.offsetHeight;
        modal.classList.add('active');
    }
}

function hideLongevityModal() {
    var modal = document.getElementById('modal-longevity');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(function() { modal.setAttribute('hidden', ''); }, 300);
    }
}

var btnAbrirLongevity = document.getElementById('btn-abrir-longevity');
if (btnAbrirLongevity) {
    btnAbrirLongevity.addEventListener('click', showLongevityModal);
}

var modalLongevityClose = document.getElementById('modal-longevity-close');
if (modalLongevityClose) {
    modalLongevityClose.addEventListener('click', hideLongevityModal);
}

var modalLongevityBackdrop = document.querySelector('.modal-longevity-backdrop');
if (modalLongevityBackdrop) {
    modalLongevityBackdrop.addEventListener('click', hideLongevityModal);
}

// Cuestionario de longevidad (Paso 2): finalizar y obtener resultado
var btnLongevityFinalizar = document.getElementById('btn-longevity-finalizar');
if (btnLongevityFinalizar) {
    btnLongevityFinalizar.addEventListener('click', function() {
        var total = 0;
        var answers = [];
        for (var i = 1; i <= 20; i++) {
            var name = 'q' + i;
            var fieldset = document.querySelector('.longevity-fieldset[data-q="' + i + '"]');
            var selected = document.querySelector('input[name="' + name + '"]:checked');
            if (fieldset && selected) {
                var pts = parseInt(selected.value, 10);
                total += pts;
                answers.push({
                    q: i,
                    question: fieldset.getAttribute('data-question') || fieldset.querySelector('legend').textContent,
                    answer: selected.getAttribute('data-answer') || selected.value,
                    points: pts
                });
            }
        }
        var interpretacion = getLongevityInterpretacion(total);
        longevityResult = {
            total: total,
            interpretacion: interpretacion,
            answers: answers,
            datos: {
                nombre: document.getElementById('long-nombre') && document.getElementById('long-nombre').value.trim(),
                edad: document.getElementById('long-edad') && document.getElementById('long-edad').value.trim(),
                sexo: document.getElementById('long-sexo') && document.getElementById('long-sexo').value.trim(),
                fecha: document.getElementById('long-fecha') && document.getElementById('long-fecha').value.trim(),
                profesion: document.getElementById('long-profesion') && document.getElementById('long-profesion').value.trim(),
                contacto: document.getElementById('long-contacto') && document.getElementById('long-contacto').value.trim()
            }
        };
        document.getElementById('longevity-total').textContent = total;
        document.getElementById('longevity-interpretacion').textContent = interpretacion;
        document.getElementById('longevity-result').removeAttribute('hidden');
        document.getElementById('longevity-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Guardar imagen del resultado
var btnLongevityImagen = document.getElementById('btn-longevity-imagen');
if (btnLongevityImagen) {
    btnLongevityImagen.addEventListener('click', function() {
        if (!longevityResult || typeof html2canvas !== 'function') return;
        var card = document.getElementById('longevity-result-card');
        if (!card) return;
        html2canvas(card).then(function(canvas) {
            var link = document.createElement('a');
            var nombre = (longevityResult.datos && longevityResult.datos.nombre) ? longevityResult.datos.nombre.replace(/\s+/g, '_') : 'resultado';
            link.download = 'longevity_score_' + nombre + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(function(e) {
            console.error('Error al generar la imagen', e);
        });
    });
}

// Enviar cuestionario por WhatsApp
var btnLongevityEnviar = document.getElementById('btn-longevity-enviar');
if (btnLongevityEnviar) {
    btnLongevityEnviar.addEventListener('click', function() {
        if (!longevityResult) return;
        var url = buildLongevityWhatsAppUrl();
        if (!url) return;
        pendingWhatsAppUrl = url;
        showModal();
    });
}

var modalConfirm = document.querySelector('.modal-btn-confirm');
var modalCancel = document.querySelector('.modal-btn-cancel');

if (modalConfirm) {
    modalConfirm.addEventListener('click', function() {
        if (pendingWhatsAppUrl) {
            window.open(pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
        }
        hideModal();
    });
}

if (modalCancel) {
    modalCancel.addEventListener('click', hideModal);
}

var modalWhatsapp = document.getElementById('modal-whatsapp');
if (modalWhatsapp) {
    modalWhatsapp.addEventListener('click', function(e) {
        if (e.target === this) hideModal();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var mw = document.getElementById('modal-whatsapp');
    var ml = document.getElementById('modal-longevity');
    if (mw && mw.classList.contains('active')) hideModal();
    else if (ml && ml.classList.contains('active')) hideLongevityModal();
});

// Carrusel Shorts: móvil 1 frame; desktop 3 frames (centro + laterales pequeños y blurred)
(function() {
    var track = document.querySelector('.shorts-carousel-track');
    var prevBtn = document.querySelector('.shorts-carousel-prev');
    var nextBtn = document.querySelector('.shorts-carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    var items = track.querySelectorAll('.shorts-carousel-item');
    var total = items.length;
    var currentIndex = 0;
    var desktop = window.matchMedia('(min-width: 769px)');

    function pauseAllShortsVideos() {
        var section = track.closest('.shorts-carousel-section');
        if (!section) return;
        var iframes = section.querySelectorAll('.shorts-carousel-item iframe[src*="youtube.com/embed"]');
        var msg = JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' });
        iframes.forEach(function(iframe) {
            try {
                if (iframe.contentWindow) iframe.contentWindow.postMessage(msg, '*');
            } catch (e) {}
        });
    }

    function updateSlide() {
        prevBtn.style.visibility = total <= 1 ? 'hidden' : 'visible';
        nextBtn.style.visibility = total <= 1 ? 'hidden' : 'visible';

        if (desktop.matches) {
            track.style.transform = 'none';
            var prevIdx = (currentIndex - 1 + total) % total;
            var nextIdx = (currentIndex + 1) % total;
            for (var i = 0; i < total; i++) {
                var el = items[i];
                el.classList.remove('current', 'side');
                if (i === prevIdx) {
                    el.style.order = '0';
                    el.style.width = '200px';
                    el.style.minWidth = '200px';
                    el.classList.add('side');
                } else if (i === currentIndex) {
                    el.style.order = '1';
                    el.style.width = '380px';
                    el.style.minWidth = '380px';
                    el.classList.add('current');
                } else if (i === nextIdx) {
                    el.style.order = '2';
                    el.style.width = '200px';
                    el.style.minWidth = '200px';
                    el.classList.add('side');
                } else {
                    el.style.order = '3';
                    el.style.width = '0';
                    el.style.minWidth = '0';
                    el.style.overflow = 'hidden';
                }
            }
        } else {
            track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
            items.forEach(function(el) {
                el.style.order = '';
                el.style.width = '';
                el.style.minWidth = '';
                el.style.overflow = '';
                el.classList.remove('current', 'side');
            });
        }
    }

    desktop.addEventListener('change', updateSlide);

    prevBtn.addEventListener('click', function() {
        pauseAllShortsVideos();
        currentIndex = (currentIndex - 1 + total) % total;
        updateSlide();
    });

    nextBtn.addEventListener('click', function() {
        pauseAllShortsVideos();
        currentIndex = (currentIndex + 1) % total;
        updateSlide();
    });

    updateSlide();
})();

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

// Smooth scroll para enlaces de navegación (solo menú, no footer/otros)
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
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

// Smooth scroll al carrusel de Shorts (testimonios en video), no al carrusel de texto
document.querySelectorAll('a[href="#testimonios"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById('testimonios');
        if (target) {
            var header = document.querySelector('.header');
            var headerHeight = header ? header.offsetHeight : 0;
            var rect = target.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var targetPosition = rect.top + scrollTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Modal experiencias (mini Short sobre el mapa)
(function() {
    var modal = document.getElementById('modal-experiencias');
    var btnCerrar = modal && modal.querySelector('.modal-experiencias-close');
    var track = modal && modal.querySelector('.modal-experiencias-track');
    var prevBtn = modal && modal.querySelector('.modal-experiencias-prev');
    var nextBtn = modal && modal.querySelector('.modal-experiencias-next');

    function pauseAllModalVideos() {
        if (!modal) return;
        var iframes = modal.querySelectorAll('.modal-experiencias-item iframe[src*="youtube.com/embed"]');
        var msg = JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' });
        iframes.forEach(function(iframe) {
            try {
                if (iframe.contentWindow) iframe.contentWindow.postMessage(msg, '*');
            } catch (e) {}
        });
    }

    var isMobileModal = function() {
        return window.matchMedia('(max-width: 768px)').matches;
    };

    function showModal() {
        if (!modal) return;
        if (isMobileModal()) {
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.right = 'auto';
            modal.style.bottom = 'auto';
            modal.classList.add('modal-experiencias--fullscreen');
        } else {
            var mapa = document.querySelector('.mapa-image');
            if (mapa) {
                var r = mapa.getBoundingClientRect();
                modal.style.position = 'fixed';
                modal.style.top = r.top + 'px';
                modal.style.left = r.left + 'px';
                modal.style.width = r.width + 'px';
                modal.style.height = r.height + 'px';
                modal.style.right = 'auto';
                modal.style.bottom = 'auto';
            } else {
                modal.style.position = '';
                modal.style.top = '';
                modal.style.left = '';
                modal.style.width = '';
                modal.style.height = '';
            }
            modal.classList.remove('modal-experiencias--fullscreen');
        }
        modal.removeAttribute('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (track) track.style.transform = 'translateX(0%)';
        modalExperienciasIndex = 0;
    }

    function hideModal() {
        if (!modal) return;
        pauseAllModalVideos();
        modal.setAttribute('hidden', '');
        modal.classList.remove('active');
        modal.classList.remove('modal-experiencias--fullscreen');
        document.body.style.overflow = '';
        modal.style.position = '';
        modal.style.top = '';
        modal.style.left = '';
        modal.style.width = '';
        modal.style.height = '';
    }

    var modalExperienciasIndex = 0;
    var modalTotal = track ? track.querySelectorAll('.modal-experiencias-item').length : 0;

    function updateModalSlide() {
        if (!track || modalTotal === 0) return;
        track.style.transform = 'translateX(-' + modalExperienciasIndex * 100 + '%)';
    }

    function attachModalOpen() {
        var btnAbrir = document.getElementById('btn-ver-experiencias');
        if (btnAbrir) {
            btnAbrir.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showModal();
            });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachModalOpen);
    } else {
        attachModalOpen();
    }
    if (btnCerrar) btnCerrar.addEventListener('click', hideModal);
    if (modal) modal.addEventListener('click', function(e) {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) hideModal();
    });

    if (prevBtn && track) prevBtn.addEventListener('click', function() {
        pauseAllModalVideos();
        modalExperienciasIndex = (modalExperienciasIndex - 1 + modalTotal) % modalTotal;
        updateModalSlide();
    });
    if (nextBtn && track) nextBtn.addEventListener('click', function() {
        pauseAllModalVideos();
        modalExperienciasIndex = (modalExperienciasIndex + 1) % modalTotal;
        updateModalSlide();
    });
})();

// Aplicar recursos ofuscados (links e imágenes) en runtime
function applySecureAssets() {
    if (typeof window.__rs !== 'function') return;
    document.querySelectorAll('[data-rs]').forEach(function(el) {
        var k = el.getAttribute('data-rs');
        var v = window.__rs(k);
        if (v) {
            if (el.tagName === 'A') {
                el.href = v;
            } else if (el.tagName === 'IMG') {
                el.src = v;
            } else if (el.tagName === 'SOURCE') {
                el.src = v;
                var video = el.closest('video');
                if (video) video.load();
            }
        }
    });
    // En móvil: forzar reproducción del video del botón "Ver testimonios" cuando entra en vista
    var ctaVideo = document.querySelector('.cta-secondary-video');
    if (ctaVideo && window.matchMedia('(max-width: 768px)').matches) {
        var playWhenVisible = function() {
            ctaVideo.play().catch(function() {});
        };
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    ctaVideo.load();
                    playWhenVisible();
                }
            });
        }, { rootMargin: '50px', threshold: 0.1 });
        observer.observe(ctaVideo);
        playWhenVisible();
    }
}

// Control del header según la sección visible
document.addEventListener('DOMContentLoaded', () => {
    applySecureAssets();
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

