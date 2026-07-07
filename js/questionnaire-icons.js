/**
 * Iconografía por bloque/hormona — Font Awesome 6 (CDN).
 */
(function() {
    'use strict';

    /** @type {Record<string, string>} Clase Font Awesome por clave de bloque */
    var FA_ICONS = {
        datos: 'fa-clipboard-user',
        estrogenos: 'fa-venus',
        cortisol: 'fa-sun',
        dhea: 'fa-brain',
        hgh: 'fa-arrow-trend-up',
        progesterona: 'fa-moon',
        insulina: 'fa-syringe',
        ciclo_trh: 'fa-calendar-days',
        pregnenolona: 'fa-share-nodes',
        melatonina: 'fa-cloud-moon',
        tiroides: 'fa-heart-pulse',
        testosterona: 'fa-mars',
        aldosterona: 'fa-droplet',
        'long-datos': 'fa-user',
        'long-comida': 'fa-utensils',
        'long-movimiento': 'fa-person-walking',
        'long-sueno': 'fa-bed',
        'long-metabolico': 'fa-heart-pulse',
        'long-estres': 'fa-face-frown',
        'long-social': 'fa-users',
        'long-tabaco': 'fa-smoking-ban',
        'long-peso': 'fa-scale-balanced',
        'long-chequeos': 'fa-stethoscope',
        default: 'fa-circle-info'
    };

    var LONGEVITY_STEP_ICONS = [
        'long-datos',
        'long-comida',
        'long-movimiento',
        'long-sueno',
        'long-metabolico',
        'long-estres',
        'long-social',
        'long-tabaco',
        'long-peso',
        'long-chequeos'
    ];

    function getFaClass(iconKey) {
        return FA_ICONS[iconKey] || FA_ICONS.default;
    }

    function renderIconHtml(iconKey) {
        return '<i class="fa-solid ' + getFaClass(iconKey) + '" aria-hidden="true"></i>';
    }

    function renderIconBadge(iconKey, sizeClass) {
        var cls = 'q-block-icon q-block-icon--' + iconKey + (sizeClass ? ' ' + sizeClass : '');
        return '<span class="' + cls + '" data-icon-key="' + iconKey + '">' + renderIconHtml(iconKey) + '</span>';
    }

    function renderBlockHeading(options) {
        var iconKey = options.iconKey || 'default';
        var titleClass = options.titleClass || 'longevity-section-title';
        var attrs = options.titleAttrs || '';
        var title = options.title || '';
        var note = options.note || '';
        var tag = options.tag || 'h4';

        var html =
            '<div class="q-block-heading q-block-heading--' + iconKey + '">' +
            renderIconBadge(iconKey, options.iconSizeClass) +
            '<div class="q-block-heading-text">' +
            '<' + tag + ' class="' + titleClass + '"' + attrs + '>' + title + '</' + tag + '>';
        if (note) {
            html += '<p class="hormonal-section-note q-block-heading-note">' + note + '</p>';
        }
        html += '</div></div>';
        return html;
    }

    function decorateTitleElement(titleEl, iconKey) {
        if (!titleEl || titleEl.closest('.q-block-heading')) return;

        var key = iconKey || 'default';
        var wrap = document.createElement('div');
        wrap.className = 'q-block-heading q-block-heading--' + key;

        var iconSpan = document.createElement('span');
        iconSpan.className = 'q-block-icon q-block-icon--' + key;
        iconSpan.setAttribute('data-icon-key', key);
        iconSpan.innerHTML = renderIconHtml(key);

        var textWrap = document.createElement('div');
        textWrap.className = 'q-block-heading-text';

        var note = titleEl.nextElementSibling;
        if (note && note.classList.contains('hormonal-section-note')) {
            titleEl.parentNode.insertBefore(wrap, titleEl);
            textWrap.appendChild(titleEl);
            textWrap.appendChild(note);
        } else {
            titleEl.parentNode.insertBefore(wrap, titleEl);
            textWrap.appendChild(titleEl);
        }

        wrap.appendChild(iconSpan);
        wrap.appendChild(textWrap);
    }

    function decorateWizardSteps(wizardRoot) {
        if (!wizardRoot) return;
        var steps = wizardRoot.querySelectorAll('.q-wizard-step');
        steps.forEach(function(step, idx) {
            var iconKey;
            if (step.getAttribute('data-section-id')) {
                iconKey = step.getAttribute('data-section-id');
            } else if (step.classList.contains('q-wizard-step--datos')) {
                iconKey = step.querySelector('.hormonal-datos') ? 'datos' : 'long-datos';
            } else if (wizardRoot.id === 'longevity-wizard') {
                iconKey = LONGEVITY_STEP_ICONS[idx] || 'default';
            } else {
                iconKey = 'default';
            }

            var title = step.querySelector(
                '.hormonal-hormone-title, .hormonal-datos-title, .longevity-section-title'
            );
            if (title) decorateTitleElement(title, iconKey);
        });
    }

    window.QuestionnaireIcons = {
        renderIconHtml: renderIconHtml,
        renderIconBadge: renderIconBadge,
        renderBlockHeading: renderBlockHeading,
        decorateTitleElement: decorateTitleElement,
        decorateWizardSteps: decorateWizardSteps,
        getIconKey: function(sectionId) {
            return FA_ICONS[sectionId] ? sectionId : 'default';
        }
    };
})();
