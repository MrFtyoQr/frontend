/**
 * Lógica compartida del cuestionario de longevidad (página dedicada).
 */
(function() {
    'use strict';

    var longevityResult = null;

    function getLongevityInterpretacion(total) {
        if (typeof window.getLongevityInterpretacionText === 'function') {
            return window.getLongevityInterpretacionText(total);
        }
        if (total >= 90) return 'Perfil óptimo de longevidad';
        if (total >= 80) return 'Salud preventiva sólida';
        if (total >= 70) return 'Riesgo metabólico moderado';
        if (total >= 60) return 'Requiere intervención preventiva';
        return 'Riesgo cardiometabólico elevado';
    }

    function getLongevityScoreTier(total) {
        var score = parseInt(total, 10);
        if (isNaN(score)) score = 0;
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'moderate';
        if (score >= 60) return 'caution';
        return 'risk';
    }

    function getLongevityTierLabel(total) {
        if (typeof window.getLongevityTierLabelText === 'function') {
            return window.getLongevityTierLabelText(total);
        }
        var score = parseInt(total, 10) || 0;
        if (score >= 90) return 'Perfil óptimo';
        if (score >= 80) return 'Preventiva sólida';
        if (score >= 70) return 'Mejora posible';
        if (score >= 60) return 'Atención preventiva';
        return 'Priorizar cambios';
    }

    var RING_RADIUS = 70;
    var RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

    var RING_COLORS = {
        excellent: '#6a9e3a',
        good: '#b8860b',
        moderate: '#c9922a',
        caution: '#d9792a',
        risk: '#c44a3a'
    };

    function applyRingProgress(progressEl, score, tier) {
        if (!progressEl) return;
        var pct = Math.max(0, Math.min(100, score));
        var color = RING_COLORS[tier] || RING_COLORS.good;
        /* Deja siempre un arco vacío visible cuando el puntaje no es 100 */
        var minGapRatio = 0.07;
        var filled;
        var dash;

        if (pct >= 100) {
            filled = RING_CIRCUMFERENCE;
            dash = filled.toFixed(2);
            progressEl.setAttribute('stroke-dashoffset', '0');
            progressEl.style.strokeDashoffset = '0';
        } else {
            var available = RING_CIRCUMFERENCE * (1 - minGapRatio);
            filled = (pct / 100) * available;
            dash = filled.toFixed(2) + ' ' + RING_CIRCUMFERENCE.toFixed(2);
            progressEl.removeAttribute('stroke-dashoffset');
            progressEl.style.strokeDashoffset = '';
        }

        progressEl.setAttribute('stroke-dasharray', dash);
        progressEl.setAttribute('stroke', color);
        progressEl.style.strokeDasharray = dash;
        progressEl.style.stroke = color;

        var ringWrap = document.getElementById('longevity-score-ring');
        if (ringWrap) {
            ringWrap.classList.toggle('longevity-score-ring--complete', pct >= 100);
        }
    }

    function updateLongevityResultUI(total, interpretacion) {
        var score = parseInt(total, 10);
        if (isNaN(score)) score = 0;
        score = Math.max(0, Math.min(100, score));

        var totalEl = document.getElementById('longevity-total');
        var interpEl = document.getElementById('longevity-interpretacion');
        var tierEl = document.getElementById('longevity-tier-label');
        var progressEl = document.getElementById('longevity-score-ring-progress');
        var cardEl = document.getElementById('longevity-result-card');

        if (totalEl) totalEl.textContent = String(score);
        if (interpEl) interpEl.textContent = interpretacion || getLongevityInterpretacion(score);

        var tier = getLongevityScoreTier(score);
        var tierLabel = getLongevityTierLabel(score);

        if (tierEl) {
            tierEl.textContent = tierLabel;
            tierEl.hidden = !tierLabel;
        }
        if (progressEl) {
            applyRingProgress(progressEl, score, tier);
        }
        if (cardEl) {
            cardEl.classList.remove(
                'longevity-score-card--excellent',
                'longevity-score-card--good',
                'longevity-score-card--moderate',
                'longevity-score-card--caution',
                'longevity-score-card--risk'
            );
            cardEl.classList.add('longevity-score-card--' + tier);
        }
    }

    function lbl(es, en) {
        return (typeof window.getPreferredLang === 'function' && window.getPreferredLang() === 'en') ? en : es;
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
            lineas.push('→ ' + (a.answer || lbl('Sin respuesta', 'No answer')));
            lineas.push('');
        });
        lineas.push('*Puntaje total: ' + longevityResult.total + ' / 100*');
        lineas.push('*Interpretación:* ' + longevityResult.interpretacion);
        return lineas.join('\n');
    }

    function buildLongevityWhatsAppUrl() {
        if (!longevityResult) return null;
        var num = (typeof window.__rs === 'function' && window.__rs('fw')) ? window.__rs('fw') : '527443514149';
        var mensaje = '*ENVÍO DE CUESTIONARIO DE LONGEVIDAD - CLÍNICA CAMSA*' + '\n\n' + buildLongevityMessage();
        return 'https://wa.me/' + num + '?text=' + encodeURIComponent(mensaje);
    }

    function finalizeLongevityQuestionnaire() {
        var total = 0;
        var answers = [];
        for (var i = 1; i <= 20; i++) {
            var name = 'q' + i;
            var fieldset = document.querySelector('.longevity-fieldset[data-q="' + i + '"]');
            var selected = document.querySelector('input[name="' + name + '"]:checked');
            if (!fieldset) continue;
            var question = fieldset.getAttribute('data-question') || fieldset.querySelector('legend').textContent;
            if (selected) {
                var pts = parseInt(selected.value, 10);
                total += pts;
                answers.push({
                    q: i,
                    question: question,
                    answer: selected.getAttribute('data-answer') || selected.value,
                    points: pts
                });
            } else {
                answers.push({
                    q: i,
                    question: question,
                    answer: null,
                    points: null
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
        updateLongevityResultUI(total, interpretacion);
        document.getElementById('longevity-result').removeAttribute('hidden');
        var wiz = document.getElementById('longevity-wizard');
        if (wiz) wiz.setAttribute('hidden', '');
        document.getElementById('longevity-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onLongevityFinalized === 'function') {
            window.CamsaFormPersistence.onLongevityFinalized();
        }
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindRestartButtons === 'function') {
            window.CamsaFormPersistence.bindRestartButtons();
        }
    }

    function clearLongevityResult() {
        longevityResult = null;
    }

    window.finalizeLongevityQuestionnaire = finalizeLongevityQuestionnaire;
    window.buildLongevityWhatsAppUrl = buildLongevityWhatsAppUrl;
    window.updateLongevityResultUI = updateLongevityResultUI;
    window.getLongevityScoreTier = getLongevityScoreTier;
    window.applyLongevityRingProgress = applyRingProgress;
    window.clearLongevityResult = clearLongevityResult;
})();
