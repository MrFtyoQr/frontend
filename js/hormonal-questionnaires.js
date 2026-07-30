/**
 * UI y lógica de tests hormonales (mujer / hombre).
 * Reutiliza estilos del modal de longevidad; escala 0–4; totales por sección.
 */
(function() {
    'use strict';

    var resultsById = {};
    var questionIndexById = {};

    function getLang() {
        if (typeof window.getPreferredLang === 'function') return window.getPreferredLang();
        var htmlLang = document.documentElement.lang;
        return htmlLang === 'en' ? 'en' : 'es';
    }

    function normalizeQuestions() {
        var EN = window.HORMONAL_QUESTIONS_EN;
        if (!EN || !window.HORMONAL_QUESTIONNAIRES) return;
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(qId) {
            var config = window.HORMONAL_QUESTIONNAIRES[qId];
            var enSections = EN[qId];
            if (!enSections) return;
            config.sections.forEach(function(section) {
                var enList = enSections[section.id];
                if (!enList) return;
                section.questions = section.questions.map(function(q, i) {
                    var es = typeof q === 'string' ? q : q.es;
                    return { es: es, en: enList[i] || es };
                });
            });
        });
    }

    function questionText(q) {
        if (typeof q === 'string') return q;
        if (q && typeof q === 'object') {
            return getLang() === 'en' ? (q.en || q.es) : q.es;
        }
        return '';
    }

    function t(config, keyEs, keyEn) {
        return getLang() === 'en' ? (config[keyEn] || config[keyEs]) : config[keyEs];
    }

    function tScale(item) {
        return getLang() === 'en' ? item.en : item.es;
    }

    function buildQuestionIndex() {
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(qId) {
            var config = window.HORMONAL_QUESTIONNAIRES[qId];
            var list = [];
            config.sections.forEach(function(section, sIdx) {
                section.questions.forEach(function(qItem, qIdx) {
                    list.push({
                        sectionIndex: sIdx,
                        sectionId: section.id,
                        questionIndex: qIdx,
                        text: questionText(qItem),
                        name: config.prefix + '_q' + (list.length + 1)
                    });
                });
            });
            questionIndexById[qId] = list;
        });
    }

    function fieldId(prefix, fieldKey) {
        return prefix + '-' + fieldKey;
    }

    function lbl(es, en) {
        return getLang() === 'en' ? en : es;
    }

    function renderSectionHeading(iconKey, title, titleClass, titleAttrs, note) {
        if (window.QuestionnaireIcons) {
            return window.QuestionnaireIcons.renderBlockHeading({
                iconKey: iconKey,
                title: title,
                titleClass: titleClass,
                titleAttrs: titleAttrs || '',
                note: note || '',
                iconSizeClass: iconKey === 'datos' ? 'q-block-icon--sm' : ''
            });
        }
        var html = '<h4 class="' + titleClass + '"' + (titleAttrs || '') + '>' + title + '</h4>';
        if (note) html += '<p class="hormonal-section-note">' + note + '</p>';
        return html;
    }

    function renderDatosGrid(prefix) {
        var id = function(key) { return fieldId(prefix, key); };
        var tomaName = prefix + '-toma-hormonas';

        return (
            '<div class="longevity-datos hormonal-datos form-datos-block hormonal-datos--compact" data-hormonal-section="0">' +
            renderSectionHeading(
                'datos',
                lbl('Datos generales', 'General information'),
                'longevity-section-title hormonal-datos-title',
                '',
                ''
            ) +
            '<p class="hormonal-datos-intro">' + lbl(
                'Opcional. Ayudan a personalizar tu resumen.',
                'Optional. Helps personalize your summary.'
            ) + '</p>' +

            '<div class="hormonal-datos-group hormonal-datos-group--flush">' +
            '<div class="hormonal-field-grid form-datos-grid hormonal-field-grid--ident">' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Nombre completo', 'Full name') + '</span>' +
            '<input type="text" id="' + id('nombre') + '" class="hormonal-input-control form-datos-control" autocomplete="name">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Fecha nac.', 'Birth date') + '</span>' +
            '<input type="date" id="' + id('fnac') + '" class="hormonal-input-control form-datos-control" data-hormonal-fnac="' + prefix + '" max="' + new Date().toISOString().slice(0, 10) + '">' +
            '</label>' +
            '<label class="hormonal-field hormonal-field--compact">' +
            '<span class="hormonal-field-label">' + lbl('Edad', 'Age') + '</span>' +
            '<input type="text" id="' + id('edad') + '" readonly class="hormonal-input-control form-datos-control hormonal-input-readonly" inputmode="numeric" aria-readonly="true" tabindex="-1" title="' + lbl('Calculada automáticamente', 'Calculated automatically') + '">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Ocupación', 'Occupation') + '</span>' +
            '<input type="text" id="' + id('ocupacion') + '" class="hormonal-input-control form-datos-control">' +
            '</label>' +
            '</div></div>' +

            '<div class="hormonal-datos-group hormonal-datos-group--flush">' +
            '<div class="hormonal-field-grid form-datos-grid hormonal-field-grid--4">' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Peso', 'Weight') + '</span>' +
            '<input type="text" id="' + id('peso') + '" class="hormonal-input-control form-datos-control" placeholder="' + lbl('65 kg', '65 kg') + '">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Talla', 'Height') + '</span>' +
            '<input type="text" id="' + id('talla') + '" class="hormonal-input-control form-datos-control" placeholder="' + lbl('1.65 m', '5 ft 5 in') + '">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Dormir', 'Bedtime') + '</span>' +
            '<input type="time" id="' + id('hora-dormir') + '" class="hormonal-input-control form-datos-control">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Levantarse', 'Wake up') + '</span>' +
            '<input type="time" id="' + id('hora-levantar') + '" class="hormonal-input-control form-datos-control">' +
            '</label>' +
            '</div></div>' +

            '<div class="hormonal-datos-group hormonal-datos-group--hormonas hormonal-datos-group--inline">' +
            '<div class="hormonal-datos-inline-row">' +
            '<span class="hormonal-datos-inline-label">' + lbl('¿Toma hormonas o suplementos?', 'Taking hormones or supplements?') + '</span>' +
            '<div class="hormonal-choice-row hormonal-choice-row--inline" role="radiogroup" aria-label="' + lbl('Toma hormonas', 'Takes hormones') + '">' +
            '<label class="hormonal-choice-pill">' +
            '<input type="radio" class="hormonal-choice-input" name="' + tomaName + '" value="No" data-hormonal-toma="' + prefix + '">' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span>' +
            '<span class="hormonal-choice-text">' + lbl('No', 'No') + '</span></label>' +
            '<label class="hormonal-choice-pill">' +
            '<input type="radio" class="hormonal-choice-input" name="' + tomaName + '" value="Sí" data-hormonal-toma="' + prefix + '">' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span>' +
            '<span class="hormonal-choice-text">' + lbl('Sí', 'Yes') + '</span></label>' +
            '</div></div>' +
            '<div class="hormonal-hormonas-detail" id="' + prefix + '-hormonas-detail" hidden>' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('¿Cuáles?', 'Which ones?') + '</span>' +
            '<input type="text" id="' + id('cuales-hormonas') + '" class="hormonal-input-control form-datos-control" placeholder="' + lbl('Ej. progesterona, DHEA…', 'e.g. progesterone, DHEA…') + '">' +
            '</label></div></div>' +

            '<div class="hormonal-datos-group hormonal-datos-group--flush">' +
            '<div class="hormonal-field-grid form-datos-grid hormonal-field-grid--2">' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Enfermedades / diagnósticos', 'Conditions / diagnoses') + '</span>' +
            '<input type="text" id="' + id('enfermedades') + '" class="hormonal-input-control form-datos-control">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Medicamentos', 'Medications') + '</span>' +
            '<input type="text" id="' + id('medicamentos') + '" class="hormonal-input-control form-datos-control">' +
            '</label>' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Teléfono / WhatsApp', 'Phone / WhatsApp') + '</span>' +
            '<input type="tel" id="' + id('contacto') + '" class="hormonal-input-control form-datos-control" autocomplete="tel">' +
            '</label>' +
            '</div></div></div>'
        );
    }

    function renderScaleLegend() {
        var items = window.HORMONAL_SCALE.map(function(s) {
            return '<span class="hormonal-scale-item">' + tScale(s) + '</span>';
        }).join('');
        return (
            '<div class="hormonal-scale-legend" role="note">' +
            '<p class="hormonal-legend-title">' + lbl('Cómo responder cada pregunta', 'How to answer each question') + '</p>' +
            '<p class="hormonal-legend-desc">' + lbl(
                'Elige qué tan seguido te ocurre lo que describes: de 0 (nunca) a 4 (casi siempre).',
                'Choose how often what you describe happens: from 0 (never) to 4 (almost always).'
            ) + '</p>' +
            '<div class="hormonal-scale-items">' + items + '</div></div>'
        );
    }

    function renderCompactScaleLegend() {
        var items = window.HORMONAL_SCALE.map(function(s) {
            var label = tScale(s);
            var parts = label.split(/\s*[—–-]\s*/);
            var num = parts[0] || s.value;
            var word = parts.slice(1).join(' ') || '';
            return '<span class="hormonal-scale-inline-item"><strong class="hormonal-scale-inline-num">' +
                num + '</strong> <span class="hormonal-scale-inline-word">' + word + '</span></span>';
        }).join('');
        return '<div class="hormonal-scale-inline" role="note" aria-label="' +
            lbl('Escala de respuesta', 'Answer scale') + '">' + items + '</div>';
    }

    function updateHormonalTotals(id) {
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        var root = getHormonalRoot(id);
        if (!config || !root) return;

        var grand = 0;
        config.sections.forEach(function(section, sIdx) {
            var step = root.querySelector('.hormonal-hormone-step[data-hormonal-section="' + sIdx + '"]');
            var sectionTotal = 0;
            if (step) {
                step.querySelectorAll('input[type="radio"]:checked').forEach(function(inp) {
                    sectionTotal += parseInt(inp.value, 10) || 0;
                });
            }
            grand += sectionTotal;
            var valEl = root.querySelector('[data-section-total-value="' + sIdx + '"]');
            if (valEl) valEl.textContent = String(sectionTotal);
        });

        var grandEl = root.querySelector('#hormonal-grand-total-' + id + ' .hormonal-grand-total-value');
        if (grandEl) grandEl.textContent = String(grand);
    }

    function bindTotalsListeners(id) {
        var root = getHormonalRoot(id);
        if (!root || root.dataset.totalsBound === '1') return;
        root.dataset.totalsBound = '1';
        root.addEventListener('change', function(e) {
            if (e.target && e.target.matches('input[type="radio"][name*="_q"]')) {
                updateHormonalTotals(id);
            }
        });
    }

    function bindAllTotalsListeners() {
        var pageId = getPageHormonalId();
        if (pageId) {
            bindTotalsListeners(pageId);
        } else {
            Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
                bindTotalsListeners(key);
            });
        }
    }

    function calcAgeFromBirthdate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('-');
        if (parts.length !== 3) return '';
        var birth = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        if (isNaN(birth.getTime())) return '';
        var today = new Date();
        var age = today.getFullYear() - birth.getFullYear();
        var m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age >= 0 && age <= 120 ? String(age) : '';
    }

    function bindDatosInteractions(prefix) {
        var fnac = document.getElementById(fieldId(prefix, 'fnac'));
        var edad = document.getElementById(fieldId(prefix, 'edad'));
        if (fnac && edad) {
            fnac.addEventListener('change', function() {
                edad.value = calcAgeFromBirthdate(fnac.value);
            });
            fnac.addEventListener('input', function() {
                edad.value = calcAgeFromBirthdate(fnac.value);
            });
        }

        var detail = document.getElementById(prefix + '-hormonas-detail');
        var cuales = document.getElementById(fieldId(prefix, 'cuales-hormonas'));
        document.querySelectorAll('input[data-hormonal-toma="' + prefix + '"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
                var isYes = radio.value === 'Sí' && radio.checked;
                if (detail) {
                    if (isYes) detail.removeAttribute('hidden');
                    else detail.setAttribute('hidden', '');
                }
                if (!isYes && cuales) cuales.value = '';
            });
        });
    }

    function bindAllDatosInteractions() {
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
            bindDatosInteractions(window.HORMONAL_QUESTIONNAIRES[key].prefix);
        });
    }

    function renderQuestionSteps(config) {
        var html = '';
        var qNum = 0;
        config.sections.forEach(function(section, sIdx) {
            var title = getLang() === 'en' ? section.titleEn : section.titleEs;
            var maxScore = section.questions.length * 4;
            var optionalClass = section.optional ? ' q-wizard-step--optional hormonal-section--optional' : '';
            html += '<div class="q-wizard-step q-wizard-step--section hormonal-hormone-step' + optionalClass +
                '" data-hormonal-section="' + sIdx + '" data-section-id="' + section.id + '">';
            var note = section.noteEs
                ? (getLang() === 'en' ? (section.noteEn || section.noteEs) : section.noteEs)
                : '';
            html += renderSectionHeading(
                section.id,
                title,
                'hormonal-hormone-title hormonal-section-title' +
                    (section.optional ? ' hormonal-section--optional' : ''),
                ' data-hormonal-section="' + sIdx + '"',
                note
            );
            html += renderCompactScaleLegend();
            html += '<div class="hormonal-q-list">';
            section.questions.forEach(function(qItem, localIdx) {
                qNum++;
                var name = config.prefix + '_q' + qNum;
                var text = questionText(qItem);
                html += '<fieldset class="hormonal-q-row hormonal-fieldset" data-q="' + qNum +
                    '" data-section="' + sIdx + '" data-question="' + escapeAttr(text) + '">';
                html += '<legend class="hormonal-q-legend">' + (localIdx + 1) + '. ' + text + '</legend>';
                html += '<div class="hormonal-q-row-inner">';
                html += '<p class="hormonal-q-text"><span class="hormonal-q-num">' + (localIdx + 1) +
                    '.</span> ' + text + '</p>';
                html += '<div class="hormonal-q-scale" role="group" aria-label="' + escapeAttr(text) + '">';
                window.HORMONAL_SCALE.forEach(function(scale) {
                    var label = tScale(scale);
                    html += '<label class="hormonal-scale-btn" title="' + escapeAttr(label) + '">';
                    html += '<input type="radio" class="hormonal-scale-input" name="' + name +
                        '" value="' + scale.value + '" data-answer="' + escapeAttr(label) + '">';
                    html += '<span class="hormonal-scale-btn-face">' + scale.value + '</span></label>';
                });
                html += '</div></div></fieldset>';
            });
            html += '</div>';
            html += '<div class="hormonal-section-total" data-section-index="' + sIdx + '">';
            html += '<span class="hormonal-section-total-label">' + lbl('TOTAL', 'TOTAL') + ' ' + title +
                ' (' + lbl('máx', 'max') + ' ' + maxScore + ')</span>';
            html += '<span class="hormonal-section-total-value" data-section-total-value="' + sIdx + '">0</span>';
            html += '</div></div>';
        });
        return html;
    }

    function renderWizardShell(config, prefix) {
        var qw = window.QuestionnaireWizard;
        var progress = qw ? qw.buildProgressHtml() : '';
        var nav = qw ? qw.buildNavHtml() : '';
        return (
            '<div class="q-wizard" id="hormonal-wizard-' + config.id + '">' +
            progress +
            '<div class="q-wizard-steps">' +
            '<div class="q-wizard-step q-wizard-step--datos" data-hormonal-section="0">' +
            renderDatosGrid(prefix) +
            '</div>' +
            renderQuestionSteps(config) +
            '</div>' +
            nav +
            '<div class="hormonal-grand-total" id="hormonal-grand-total-' + config.id + '" aria-live="polite">' +
            '<span class="hormonal-grand-total-label">' +
            lbl('TOTAL GENERAL (todas las hormonas)', 'GRAND TOTAL (all hormones)') +
            '</span>' +
            '<strong class="hormonal-grand-total-value">0</strong>' +
            '</div>' +
            '</div>'
        );
    }

    var hormonalWizards = {};

    function initHormonalWizard(id, initialStep) {
        if (!window.QuestionnaireWizard) return null;
        var root = document.getElementById('hormonal-wizard-' + id);
        if (!root) return null;

        if (hormonalWizards[id]) {
            hormonalWizards[id].steps = Array.prototype.slice.call(root.querySelectorAll('.q-wizard-step'));
            if (typeof initialStep === 'number') {
                hormonalWizards[id].goToStep(initialStep, true);
            }
            return hormonalWizards[id];
        }

        hormonalWizards[id] = window.QuestionnaireWizard.create({
            root: root,
            initialStep: typeof initialStep === 'number' ? initialStep : 0,
            resultEl: document.getElementById('hormonal-result-' + id),
            onFinish: function() {
                finalizeQuestionnaire(id);
            },
            onStepChange: function() {
                if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onHormonalWizardStep === 'function') {
                    window.CamsaFormPersistence.onHormonalWizardStep(id);
                }
            }
        });
        return hormonalWizards[id];
    }

    function renderQuestions(config) {
        return renderQuestionSteps(config);
    }

    function escapeAttr(str) {
        return String(str).replace(/"/g, '&quot;');
    }

    function renderFormInner(config) {
        var id = config.id;
        var prefix = config.prefix;
        var modalId = 'modal-hormonal-' + id;

        return (
            '<div id="hormonal-recovery-banner-' + id + '" class="form-recovery-banner form-recovery-banner--modal" role="status" hidden>' +
            '<p class="form-recovery-message"></p>' +
            '<div class="form-recovery-actions">' +
            '<button type="button" class="form-recovery-btn form-recovery-btn--primary" data-hormonal-recovery-continue="' + id + '">' +
            lbl('Continuar donde lo dejé', 'Continue where I left off') + '</button>' +
            '<button type="button" class="form-recovery-btn form-recovery-btn--secondary" data-hormonal-recovery-discard="' + id + '">' +
            lbl('Descartar y empezar de nuevo', 'Discard and start over') + '</button>' +
            '</div></div>' +
            '<p id="hormonal-recovery-indicator-' + id + '" class="form-recovery-indicator" role="status" hidden>' +
            lbl('Progreso recuperado. Sus respuestas se restauraron automáticamente.', 'Progress restored. Your answers were recovered automatically.') +
            '</p>' +
            '<h3 id="' + modalId + '-title" class="longevity-title">' + t(config, 'modalTitleEs', 'modalTitleEn') + '</h3>' +
            '<p class="longevity-subtitle">' + t(config, 'modalSubtitleEs', 'modalSubtitleEn') + '</p>' +
            renderWizardShell(config, prefix) +
            '<div id="hormonal-result-' + id + '" class="longevity-result hormonal-result" hidden>' +
            '<div id="hormonal-result-card-' + id + '" class="longevity-result-card">' +
            '<h4 class="longevity-result-title hormonal-result-title">' + t(config, 'resultTitleEs', 'resultTitleEn') + '</h4>' +
            '<p class="hormonal-result-subtitle">' + lbl(
                'Resumen por hormona. Amarillo o rojo: posibles síntomas a comentar con tu médico.',
                'Summary per hormone. Yellow or red: possible symptoms to discuss with your doctor.'
            ) + '</p>' +
            '<div class="hormonal-result-meta" id="hormonal-result-meta-' + id + '"></div>' +
            '<div class="hormonal-result-totals" id="hormonal-result-totals-' + id + '"></div>' +
            '<p class="longevity-result-clinic hormonal-result-clinic">' + t(config, 'resultClinicEs', 'resultClinicEn') + '</p>' +
            '</div>' +
            '<div class="longevity-result-actions">' +
            '<button type="button" class="btn-longevity-action btn-longevity-imagen" data-hormonal-imagen="' + id + '">' +
            lbl('Guardar imagen', 'Save image') + '</button>' +
            (window.CamsaFormShare ? window.CamsaFormShare.renderShareButton('hormonal-' + id) :
                '<button type="button" class="btn-longevity-action btn-longevity-compartir" data-form-share="hormonal-' + id + '">Enviar enlace</button>') +
            (window.CamsaFormShare ? window.CamsaFormShare.renderResultsButton('data-hormonal-enviar="' + id + '"') :
                '<button type="button" class="btn-longevity-action btn-longevity-enviar" data-hormonal-enviar="' + id + '">Enviar resultados</button>') +
            (window.CamsaFormPersistence ? window.CamsaFormPersistence.renderRestartButton('data-hormonal-restart="' + id + '"') :
                '<button type="button" class="btn-longevity-action btn-longevity-restart" data-hormonal-restart="' + id + '"><span data-i18n="form_btn_restart">Realizar nuevamente</span></button>') +
            '</div></div>'
        );
    }

    function renderModal(config) {
        var id = config.id;
        var modalId = 'modal-hormonal-' + id;

        var wrapper = document.createElement('div');
        wrapper.id = modalId;
        wrapper.className = 'modal-overlay modal-longevity modal-hormonal';
        wrapper.setAttribute('role', 'dialog');
        wrapper.setAttribute('aria-modal', 'true');
        wrapper.setAttribute('aria-labelledby', modalId + '-title');
        wrapper.setAttribute('hidden', '');

        wrapper.innerHTML =
            '<div class="modal-longevity-backdrop modal-hormonal-backdrop" data-hormonal-id="' + id + '" aria-hidden="true"></div>' +
            '<div class="modal-longevity-box">' +
            '<button type="button" class="modal-longevity-close" data-hormonal-close="' + id + '" aria-label="Cerrar">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
            '<div class="modal-longevity-scroll">' +
            renderFormInner(config) +
            '</div></div>';

        return wrapper;
    }

    function collectDatos(prefix) {
        var datos = {
            nombre: '', fnac: '', edad: '', ocupacion: '', peso: '', talla: '',
            'toma-hormonas': '', 'cuales-hormonas': '', 'hora-dormir': '', 'hora-levantar': '',
            enfermedades: '', medicamentos: '', contacto: ''
        };
        Object.keys(datos).forEach(function(key) {
            var el = document.getElementById(fieldId(prefix, key));
            if (el) datos[key] = el.value.trim();
        });
        var tomaRadio = document.querySelector('input[name="' + prefix + '-toma-hormonas"]:checked');
        if (tomaRadio) datos['toma-hormonas'] = tomaRadio.value;
        return datos;
    }

    function computeResults(config) {
        var qList = questionIndexById[config.id];
        var sectionsOut = [];
        var answers = [];

        config.sections.forEach(function(section, sIdx) {
            var max = section.questions.length * 4;
            sectionsOut.push({
                id: section.id,
                title: getLang() === 'en' ? section.titleEn : section.titleEs,
                total: 0,
                max: max,
                answered: 0,
                optional: !!section.optional
            });
        });

        qList.forEach(function(q, idx) {
            var selected = document.querySelector('input[name="' + q.name + '"]:checked');
            if (!selected) return;
            var pts = parseInt(selected.value, 10);
            var sIdx = q.sectionIndex;
            sectionsOut[sIdx].total += pts;
            sectionsOut[sIdx].answered += 1;
            answers.push({
                num: idx + 1,
                sectionId: sectionsOut[sIdx].id,
                sectionTitle: sectionsOut[sIdx].title,
                question: q.text,
                answer: selected.getAttribute('data-answer') || selected.value,
                points: pts
            });
        });

        var grandTotal = sectionsOut.reduce(function(sum, s) { return sum + s.total; }, 0);
        var grandMax = sectionsOut.reduce(function(sum, s) { return sum + s.max; }, 0);
        sectionsOut.forEach(function(s) {
            if (window.HormonalEvaluation) {
                s.evaluation = window.HormonalEvaluation.evaluateSection(
                    s.id, s.total, config.id, s.answered, s.optional
                );
            }
        });
        return {
            sections: sectionsOut,
            answers: answers,
            grandTotal: grandTotal,
            grandMax: grandMax,
            datos: collectDatos(config.prefix)
        };
    }

    function renderResultTotals(config, result) {
        var container = document.getElementById('hormonal-result-totals-' + config.id);
        if (!container) return;

        var metaEl = document.getElementById('hormonal-result-meta-' + config.id);
        if (metaEl) {
            var patient = result.datos.nombre || lbl('Sin nombre', 'No name');
            var dateStr = new Date().toLocaleDateString(getLang() === 'en' ? 'en-US' : 'es-MX', {
                year: 'numeric', month: '2-digit', day: '2-digit'
            });
            metaEl.textContent = lbl('Paciente', 'Patient') + ': ' + patient + ' · ' +
                lbl('Fecha', 'Date') + ': ' + dateStr;
        }

        var rowsHtml = '';
        sortResultSections(result.sections).forEach(function(s) {
            if (s.optional && s.answered === 0) return;
            var ev = s.evaluation;
            if (!ev && window.HormonalEvaluation) {
                ev = window.HormonalEvaluation.evaluateSection(s.id, s.total, config.id, s.answered, s.optional);
            }
            if (!ev) ev = { level: 'none', scoreLabel: String(s.total), label: '—', showSymptoms: false, symptomsBrief: '' };

            var level = resolveResultLevel(ev);
            var statusHtml =
                '<span class="hormonal-result-badge hormonal-result-badge--' + level + '">' +
                '<span class="hormonal-result-dot" aria-hidden="true"></span>' +
                escapeHtml(ev.label) + '</span>';

            var briefCell = '—';
            if (s.optional) {
                briefCell = '<span class="hormonal-result-symptoms-na">—</span>';
            } else if (ev.showSymptoms && ev.symptoms) {
                briefCell = escapeHtml(ev.symptoms);
            } else if (level === 'green') {
                briefCell = '<span class="hormonal-result-symptoms-na">—</span>';
            }

            rowsHtml +=
                '<tr class="hormonal-result-compact-row hormonal-result-compact-row--' + level + '">' +
                '<td class="hormonal-result-compact-name" data-label="' + lbl('Hormona', 'Hormone') + '">' +
                '<span class="hormonal-result-name-cell">' +
                (window.QuestionnaireIcons
                    ? window.QuestionnaireIcons.renderIconBadge(s.id, 'q-block-icon--xs')
                    : '') +
                '<span>' + escapeHtml(s.title) + '</span></span></td>' +
                '<td class="hormonal-result-compact-score" data-label="' + lbl('Puntos', 'Points') + '">' +
                escapeHtml(ev.scoreLabel) + '</td>' +
                '<td class="hormonal-result-compact-status" data-label="' + lbl('Estado', 'Status') + '">' +
                statusHtml + '</td>' +
                '<td class="hormonal-result-compact-brief" data-label="' + lbl('Síntomas asociados', 'Associated symptoms') + '">' +
                briefCell + '</td></tr>';
        });

        var trafficCounts = countTrafficLevels(result.sections, config.id);

        container.innerHTML =
            renderTrafficPieChart(trafficCounts) +
            '<div class="hormonal-result-compact-wrap">' +
            '<table class="hormonal-result-compact-table">' +
            '<colgroup>' +
            '<col class="hormonal-result-col-name">' +
            '<col class="hormonal-result-col-score">' +
            '<col class="hormonal-result-col-status">' +
            '<col class="hormonal-result-col-brief">' +
            '</colgroup>' +
            '<thead><tr>' +
            '<th scope="col">' + lbl('Hormona', 'Hormone') + '</th>' +
            '<th scope="col">' + lbl('Pts', 'Pts') + '</th>' +
            '<th scope="col">' + lbl('Estado', 'Status') + '</th>' +
            '<th scope="col">' + lbl('Síntomas asociados', 'Associated symptoms') + '</th>' +
            '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>' +
            '<p class="hormonal-result-grand">' + lbl('Total:', 'Total:') +
            ' <strong>' + result.grandTotal + '</strong></p>';
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function sortResultSections(sections) {
        return sections.slice().sort(function(a, b) {
            if (a.optional && !b.optional) return 1;
            if (!a.optional && b.optional) return -1;
            return 0;
        });
    }

    function resolveResultLevel(ev) {
        if (!ev || !ev.level) return 'neutral';
        if (ev.level === 'green' || ev.level === 'yellow' || ev.level === 'red') return ev.level;
        if (ev.level === 'optional') return 'optional';
        return 'neutral';
    }

    function countTrafficLevels(sections, configId) {
        var counts = { green: 0, yellow: 0, red: 0 };
        sortResultSections(sections).forEach(function(s) {
            if (s.optional || s.answered === 0) return;
            var ev = s.evaluation;
            if (!ev && window.HormonalEvaluation) {
                ev = window.HormonalEvaluation.evaluateSection(s.id, s.total, configId, s.answered, s.optional);
            }
            var level = resolveResultLevel(ev);
            if (level === 'green' || level === 'yellow' || level === 'red') {
                counts[level] += 1;
            }
        });
        return counts;
    }

    function polarToCartesian(cx, cy, r, angleDeg) {
        var rad = (angleDeg - 90) * Math.PI / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad)
        };
    }

    function buildPieSlicePath(cx, cy, r, startAngle, sweepAngle) {
        if (sweepAngle <= 0) return '';
        if (sweepAngle >= 359.999) {
            return 'M ' + cx + ' ' + cy +
                ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
        }
        var start = polarToCartesian(cx, cy, r, startAngle);
        var end = polarToCartesian(cx, cy, r, startAngle + sweepAngle);
        var largeArc = sweepAngle > 180 ? 1 : 0;
        return 'M ' + cx + ' ' + cy +
            ' L ' + start.x + ' ' + start.y +
            ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y + ' Z';
    }

    function renderTrafficPieChart(counts) {
        var total = counts.green + counts.yellow + counts.red;
        if (total === 0) {
            return '<div class="hormonal-result-chart hormonal-result-chart--empty" role="img" aria-label="' +
                lbl('Sin hormonas evaluadas', 'No hormones evaluated') + '">' +
                '<p class="hormonal-result-chart__empty">' +
                lbl('Sin hormonas evaluadas', 'No hormones evaluated') + '</p></div>';
        }

        var slices = [
            { key: 'green', color: '#2e7d32' },
            { key: 'yellow', color: '#f9a825' },
            { key: 'red', color: '#c62828' }
        ];
        var angle = 0;
        var paths = '';
        slices.forEach(function(slice) {
            var value = counts[slice.key];
            if (!value) return;
            var sweep = (value / total) * 360;
            paths += '<path d="' + buildPieSlicePath(50, 50, 42, angle, sweep) +
                '" fill="' + slice.color + '"></path>';
            angle += sweep;
        });

        var legend = slices.map(function(slice) {
            var labels = {
                green: lbl('Verde — Satisfactorio', 'Green — Satisfactory'),
                yellow: lbl('Amarillo — Alterado', 'Yellow — Altered'),
                red: lbl('Rojo — Deficiente', 'Red — Deficient')
            };
            return '<li class="hormonal-result-chart__legend-item hormonal-result-chart__legend-item--' + slice.key + '">' +
                '<span class="hormonal-result-chart__swatch" aria-hidden="true"></span>' +
                '<span class="hormonal-result-chart__legend-label">' + labels[slice.key] + '</span>' +
                '<strong class="hormonal-result-chart__legend-count">' + counts[slice.key] + '</strong></li>';
        }).join('');

        return '<div class="hormonal-result-chart" role="img" aria-label="' +
            escapeHtml(lbl('Resumen semáforo', 'Traffic-light summary')) + '">' +
            '<p class="hormonal-result-chart__title">' +
            lbl('Resumen semáforo', 'Traffic-light summary') + '</p>' +
            '<div class="hormonal-result-chart__body">' +
            '<div class="hormonal-result-chart__pie">' +
            '<svg viewBox="0 0 100 100" aria-hidden="true">' + paths + '</svg>' +
            '</div>' +
            '<ul class="hormonal-result-chart__legend">' + legend + '</ul>' +
            '</div></div>';
    }

    function restartQuestionnaire(id) {
        delete resultsById[id];
        var totalsEl = document.getElementById('hormonal-result-totals-' + id);
        if (totalsEl) totalsEl.innerHTML = '';
        var metaEl = document.getElementById('hormonal-result-meta-' + id);
        if (metaEl) metaEl.innerHTML = '';
        updateHormonalTotals(id);
    }

    function finalizeQuestionnaire(id) {
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        if (!config) return;
        var result = computeResults(config);
        resultsById[id] = result;
        renderResultTotals(config, result);
        var block = document.getElementById('hormonal-result-' + id);
        if (block) {
            block.removeAttribute('hidden');
            block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        var wizard = document.getElementById('hormonal-wizard-' + id);
        if (wizard) wizard.setAttribute('hidden', '');
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onHormonalFinalized === 'function') {
            window.CamsaFormPersistence.onHormonalFinalized(id);
        }
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindRestartButtons === 'function') {
            window.CamsaFormPersistence.bindRestartButtons();
        }
    }

    function buildWhatsAppMessage(id) {
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        var result = resultsById[id];
        if (!config || !result) return '';

        var title = t(config, 'whatsappTitleEs', 'whatsappTitleEn');
        var lineas = ['*' + title + '*', '', '*' + lbl('Datos generales', 'General information') + '*'];
        var labels = {
            nombre: lbl('Nombre', 'Name'),
            fnac: lbl('Fecha de nacimiento', 'Date of birth'),
            edad: lbl('Edad', 'Age'),
            ocupacion: lbl('Ocupación', 'Occupation'),
            peso: lbl('Peso', 'Weight'),
            talla: lbl('Talla', 'Height'),
            'toma-hormonas': lbl('¿Toma hormonas o suplementos?', 'Takes hormones or supplements?'),
            'cuales-hormonas': lbl('¿Cuáles?', 'Which ones?'),
            'hora-dormir': lbl('Hora de dormir', 'Bedtime'),
            'hora-levantar': lbl('Hora de levantarse', 'Wake time'),
            enfermedades: lbl('Enfermedades', 'Conditions'),
            medicamentos: lbl('Medicamentos', 'Medications'),
            contacto: lbl('Contacto', 'Contact')
        };
        Object.keys(labels).forEach(function(key) {
            lineas.push(labels[key] + ': ' + (result.datos[key] || '—'));
        });
        lineas.push('');
        lineas.push('*' + lbl('Cuadro comparativo — semáforo por hormona', 'Comparative chart — traffic light by hormone') + '*');
        sortResultSections(result.sections).forEach(function(s) {
            if (s.optional && s.answered === 0) return;
            var ev = s.evaluation;
            if (!ev && window.HormonalEvaluation) {
                ev = window.HormonalEvaluation.evaluateSection(s.id, s.total, id, s.answered, s.optional);
            }
            if (!ev) return;
            lineas.push('• *' + s.title + ':* ' + ev.scoreLabel + ' pts — *' + ev.label + '*');
            if (!s.optional && ev.showSymptoms && ev.symptoms) {
                lineas.push('  _' + lbl('Síntomas asociados', 'Associated symptoms') + ':_ ' + ev.symptoms);
            }
        });
        lineas.push('');
        lineas.push('*' + lbl('Total general (suma de puntos)', 'Grand total (sum of points)') + ':* ' +
            result.grandTotal + ' / ' + result.grandMax);
        lineas.push('');
        lineas.push('*' + lbl('Respuestas', 'Answers') + '*');
        var qList = questionIndexById[id] || [];
        qList.forEach(function(q, idx) {
            var selected = document.querySelector('input[name="' + q.name + '"]:checked');
            var sec = config.sections[q.sectionIndex];
            var sectionTitle = sec ? (getLang() === 'en' ? sec.titleEn : sec.titleEs) : '';
            lineas.push('*P' + (idx + 1) + '.* (' + sectionTitle + ') ' + q.text);
            if (selected) {
                lineas.push('→ ' + (selected.getAttribute('data-answer') || selected.value) +
                    ' (' + (parseInt(selected.value, 10) || 0) + ')');
            } else {
                lineas.push('→ ' + lbl('Sin respuesta', 'No answer'));
            }
        });
        return lineas.join('\n');
    }

    function buildWhatsAppUrl(id) {
        var msg = buildWhatsAppMessage(id);
        if (!msg) return null;
        var num = (typeof window.__rs === 'function' && window.__rs('fw')) ? window.__rs('fw') : '527443514149';
        return 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
    }

    /**
     * Convierte texto con viñetas o saltos de línea del formulario principal a lista separada por comas.
     */
    function formatListAsCommaSeparated(text) {
        if (!text) return '';
        var lines = text.split(/\r?\n/).map(function(line) {
            return line.replace(/^[\s•\-–*]+/, '').trim();
        }).filter(function(line) {
            return line.length > 0;
        });
        if (lines.length <= 1 && text.indexOf('\n') === -1 && text.indexOf(',') !== -1) {
            return text.trim();
        }
        return lines.join(', ');
    }

    /**
     * Rellena datos generales del test hormonal desde #protocolo-form si los campos están vacíos.
     */
    function prefillFromProtocolForm(prefix) {
        var pairs = [
            { from: 'nombre', to: 'nombre' },
            { from: 'telefono', to: 'contacto' },
            { from: 'diagnostico', to: 'enfermedades', format: 'comma' },
            { from: 'medicamentos', to: 'medicamentos', format: 'comma' }
        ];

        pairs.forEach(function(pair) {
            var src = document.getElementById(pair.from);
            var dst = document.getElementById(fieldId(prefix, pair.to));
            if (!src || !dst || !src.value.trim() || dst.value.trim()) return;
            var value = src.value.trim();
            if (pair.format === 'comma') {
                value = formatListAsCommaSeparated(value);
            }
            dst.value = value;
        });
    }

    function getHormonalRoot(id) {
        var pageRoot = document.getElementById('hormonal-page-root');
        if (pageRoot && pageRoot.getAttribute('data-hormonal-id') === id) return pageRoot;
        return document.getElementById('modal-hormonal-' + id);
    }

    function getPageHormonalId() {
        var pageId = document.body.getAttribute('data-form-page');
        if (pageId === 'hormonal-mujer') return 'mujer';
        if (pageId === 'hormonal-hombre') return 'hombre';
        return null;
    }

    function openPage(id) {
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        if (!config) return;
        prefillFromProtocolForm(config.prefix);
        var fnacEl = document.getElementById(fieldId(config.prefix, 'fnac'));
        var edadEl = document.getElementById(fieldId(config.prefix, 'edad'));
        if (fnacEl && edadEl && fnacEl.value) edadEl.value = calcAgeFromBirthdate(fnacEl.value);
        var wizard = document.getElementById('hormonal-wizard-' + id);
        var resultBlock = document.getElementById('hormonal-result-' + id);
        if (wizard && resultBlock && resultBlock.hasAttribute('hidden')) {
            wizard.removeAttribute('hidden');
        }
        initHormonalWizard(id);
        updateHormonalTotals(id);
    }

    function openModal(id) {
        var modal = document.getElementById('modal-hormonal-' + id);
        if (!modal) return;
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        prefillFromProtocolForm(config.prefix);
        var fnacEl = document.getElementById(fieldId(config.prefix, 'fnac'));
        var edadEl = document.getElementById(fieldId(config.prefix, 'edad'));
        if (fnacEl && edadEl && fnacEl.value) edadEl.value = calcAgeFromBirthdate(fnacEl.value);
        modal.removeAttribute('hidden');
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        var wizard = document.getElementById('hormonal-wizard-' + id);
        var resultBlock = document.getElementById('hormonal-result-' + id);
        if (wizard && resultBlock && resultBlock.hasAttribute('hidden')) {
            wizard.removeAttribute('hidden');
        }
        initHormonalWizard(id);
        updateHormonalTotals(id);
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onHormonalModalOpened === 'function') {
            window.CamsaFormPersistence.onHormonalModalOpened(id);
        }
    }

    function mountPage(id) {
        var pageRoot = document.getElementById('hormonal-page-root');
        if (!pageRoot || pageRoot.getAttribute('data-hormonal-id') !== id) return;
        var config = window.HORMONAL_QUESTIONNAIRES[id];
        if (!config) return;
        pageRoot.innerHTML = renderFormInner(config);
        openPage(id);
        bindTotalsListeners(id);
        updateHormonalTotals(id);
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindRestartButtons === 'function') {
            window.CamsaFormPersistence.bindRestartButtons();
        }
    }

    function closeModal(id) {
        var modal = document.getElementById('modal-hormonal-' + id);
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(function() {
            modal.setAttribute('hidden', '');
            var anyOpen = document.querySelector('.modal-hormonal.active, .modal-longevity.active');
            if (!anyOpen) document.body.style.overflow = '';
        }, 300);
    }

    function closeAnyActiveHormonalModal() {
        document.querySelectorAll('.modal-hormonal.active').forEach(function(modal) {
            var id = modal.id.replace('modal-hormonal-', '');
            closeModal(id);
        });
    }

    var HORMONAL_EXPORT_WIDTH = 1120;

    function prepareHormonalResultForExport(doc, cardId) {
        var clone = doc.getElementById(cardId);
        if (clone) {
            clone.classList.add('hormonal-result-card--export');
            clone.style.width = HORMONAL_EXPORT_WIDTH + 'px';
            clone.style.maxWidth = HORMONAL_EXPORT_WIDTH + 'px';
        }
        doc.querySelectorAll('.hormonal-result-compact-wrap').forEach(function(wrap) {
            wrap.style.overflow = 'visible';
        });
        doc.querySelectorAll('.hormonal-result-compact-table').forEach(function(table) {
            table.style.minWidth = (HORMONAL_EXPORT_WIDTH - 48) + 'px';
            table.style.width = '100%';
        });
    }

    function captureHormonalResultImage(card) {
        return html2canvas(card, {
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false,
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: HORMONAL_EXPORT_WIDTH,
            onclone: function(doc) {
                prepareHormonalResultForExport(doc, card.id);
            }
        });
    }

    function bindEvents() {
        document.querySelectorAll('[data-hormonal-open]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                openModal(btn.getAttribute('data-hormonal-open'));
            });
        });

        document.querySelectorAll('[data-hormonal-close]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                closeModal(btn.getAttribute('data-hormonal-close'));
            });
        });

        document.querySelectorAll('.modal-hormonal-backdrop').forEach(function(backdrop) {
            backdrop.addEventListener('click', function() {
                closeModal(backdrop.getAttribute('data-hormonal-id'));
            });
        });

        document.querySelectorAll('[data-hormonal-enviar]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.getAttribute('data-hormonal-enviar');
                if (!resultsById[id]) return;
                var url = buildWhatsAppUrl(id);
                if (!url) return;
                if (typeof window.setPendingWhatsApp === 'function') {
                    window.setPendingWhatsApp(url, 'hormonal-' + id);
                }
            });
        });

        document.querySelectorAll('[data-hormonal-imagen]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.getAttribute('data-hormonal-imagen');
                if (!resultsById[id] || typeof html2canvas !== 'function') return;
                var card = document.getElementById('hormonal-result-card-' + id);
                if (!card) return;
                captureHormonalResultImage(card).then(function(canvas) {
                    var link = document.createElement('a');
                    var nombre = (resultsById[id].datos && resultsById[id].datos.nombre)
                        ? resultsById[id].datos.nombre.replace(/\s+/g, '_') : 'test_hormonal';
                    link.download = 'test_hormonal_' + id + '_' + nombre + '.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                }).catch(function(e) {
                    console.error('Error al generar imagen hormonal', e);
                });
            });
        });
    }

    function updateDatosLabels(prefix) {
        var map = [
            ['nombre', lbl('Nombre completo', 'Full name')],
            ['fnac', lbl('Fecha nac.', 'Birth date')],
            ['edad', lbl('Edad', 'Age')],
            ['ocupacion', lbl('Ocupación', 'Occupation')],
            ['peso', lbl('Peso', 'Weight')],
            ['talla', lbl('Talla', 'Height')],
            ['cuales-hormonas', lbl('¿Cuáles?', 'Which ones?')],
            ['hora-dormir', lbl('Dormir', 'Bedtime')],
            ['hora-levantar', lbl('Levantarse', 'Wake up')],
            ['enfermedades', lbl('Enfermedades / diagnósticos', 'Conditions / diagnoses')],
            ['medicamentos', lbl('Medicamentos', 'Medications')],
            ['contacto', lbl('Teléfono / WhatsApp', 'Phone / WhatsApp')]
        ];
        map.forEach(function(row) {
            var el = document.getElementById(fieldId(prefix, row[0]));
            if (!el) return;
            var wrap = el.closest('.hormonal-field');
            if (!wrap) return;
            var lab = wrap.querySelector('.hormonal-field-label');
            if (lab) lab.textContent = row[1];
        });
        var pesoInp = document.getElementById(fieldId(prefix, 'peso'));
        var tallaInp = document.getElementById(fieldId(prefix, 'talla'));
        if (pesoInp) pesoInp.placeholder = lbl('65 kg', '65 kg');
        if (tallaInp) tallaInp.placeholder = lbl('1.65 m', '5 ft 5 in');
        if (document.getElementById(fieldId(prefix, 'cuales-hormonas'))) {
            document.getElementById(fieldId(prefix, 'cuales-hormonas')).placeholder =
                lbl('Ej. progesterona, DHEA…', 'e.g. progesterone, DHEA…');
        }
        var modal = getHormonalRoot(prefix === 'hmujer' ? 'mujer' : 'hombre');
        if (modal) {
            var inlineLabel = modal.querySelector('.hormonal-datos-inline-label');
            if (inlineLabel) {
                inlineLabel.textContent = lbl('¿Toma hormonas o suplementos?', 'Taking hormones or supplements?');
            }
        }
    }

    function refreshQuestionsBlock(config) {
        var wizard = document.getElementById('hormonal-wizard-' + config.id);
        if (!wizard) return;
        var stepsWrap = wizard.querySelector('.q-wizard-steps');
        if (!stepsWrap) return;

        var saved = {};
        wizard.querySelectorAll('input[type="radio"]:checked').forEach(function(inp) {
            saved[inp.name] = inp.value;
        });

        var currentStep = hormonalWizards[config.id] ? hormonalWizards[config.id].getCurrentStep() : 0;

        stepsWrap.querySelectorAll('.q-wizard-step--section').forEach(function(step) {
            step.remove();
        });
        var datosStep = stepsWrap.querySelector('.q-wizard-step--datos');
        if (datosStep) {
            datosStep.insertAdjacentHTML('afterend', renderQuestionSteps(config));
        }

        Object.keys(saved).forEach(function(name) {
            var inp = wizard.querySelector('input[name="' + name + '"][value="' + saved[name] + '"]');
            if (inp) inp.checked = true;
        });

        delete hormonalWizards[config.id];
        initHormonalWizard(config.id, currentStep);
        updateHormonalTotals(config.id);
    }

    function refreshModalChrome() {
        if (!window.HORMONAL_QUESTIONNAIRES) return;
        buildQuestionIndex();
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(id) {
            var config = window.HORMONAL_QUESTIONNAIRES[id];
            var root = getHormonalRoot(id);
            if (!root) return;

            var titleEl = root.querySelector('.longevity-title');
            if (titleEl) titleEl.textContent = t(config, 'modalTitleEs', 'modalTitleEn');
            var subEl = root.querySelector('.longevity-subtitle');
            if (subEl) subEl.textContent = t(config, 'modalSubtitleEs', 'modalSubtitleEn');
            var intro = root.querySelector('.hormonal-datos-intro');
            if (intro) intro.textContent = lbl(
                'Opcional. Ayudan a personalizar tu resumen.',
                'Optional. Helps personalize your summary.'
            );
            var datosTitle = root.querySelector('.hormonal-datos-title');
            if (datosTitle) datosTitle.textContent = lbl('Datos generales', 'General information');

            updateDatosLabels(config.prefix);

            config.sections.forEach(function(section, sIdx) {
                var secTitle = root.querySelector('.hormonal-hormone-title[data-hormonal-section="' + sIdx + '"]');
                if (secTitle) secTitle.textContent = getLang() === 'en' ? section.titleEn : section.titleEs;
                if (section.noteEs) {
                    var stepEl = root.querySelector('.q-wizard-step[data-hormonal-section="' + sIdx + '"]');
                    var noteEl = stepEl ? stepEl.querySelector('.hormonal-section-note') : null;
                    if (noteEl) noteEl.textContent = getLang() === 'en' ? (section.noteEn || section.noteEs) : section.noteEs;
                }
                var totalLabel = root.querySelector('.hormonal-section-total[data-section-index="' + sIdx + '"] .hormonal-section-total-label');
                if (totalLabel) {
                    var title = getLang() === 'en' ? section.titleEn : section.titleEs;
                    var maxScore = section.questions.length * 4;
                    totalLabel.textContent = lbl('TOTAL', 'TOTAL') + ' ' + title +
                        ' (' + lbl('máx', 'max') + ' ' + maxScore + ')';
                }
            });

            root.querySelectorAll('.hormonal-scale-inline').forEach(function(el) {
                el.outerHTML = renderCompactScaleLegend();
            });

            var grandLabel = root.querySelector('.hormonal-grand-total-label');
            if (grandLabel) {
                grandLabel.textContent = lbl('TOTAL GENERAL (todas las hormonas)', 'GRAND TOTAL (all hormones)');
            }

            var wizardRoot = document.getElementById('hormonal-wizard-' + id);
            if (wizardRoot) {
                var prevBtn = wizardRoot.querySelector('.q-wizard-btn-prev');
                if (prevBtn) prevBtn.textContent = lbl('Anterior', 'Previous');
                if (hormonalWizards[id]) hormonalWizards[id].updateProgress();
            }

            var resultTitle = root.querySelector('.hormonal-result-title');
            if (resultTitle) resultTitle.textContent = t(config, 'resultTitleEs', 'resultTitleEn');
            var resultSub = root.querySelector('.hormonal-result-subtitle');
            if (resultSub) resultSub.textContent = lbl(
                'Resumen por hormona. Amarillo o rojo: posibles síntomas a comentar con tu médico.',
                'Summary per hormone. Yellow or red: possible symptoms to discuss with your doctor.'
            );
            var resultClinic = root.querySelector('.hormonal-result-clinic');
            if (resultClinic) resultClinic.textContent = t(config, 'resultClinicEs', 'resultClinicEn');

            var imgBtn = root.querySelector('[data-hormonal-imagen]');
            var shareBtn = root.querySelector('[data-form-share="hormonal-' + id + '"]');
            var envBtn = root.querySelector('[data-hormonal-enviar]');
            if (imgBtn) imgBtn.textContent = lbl('Guardar imagen', 'Save image');
            if (window.CamsaFormShare) {
                if (shareBtn) window.CamsaFormShare.applyShareButton(shareBtn);
                if (envBtn) window.CamsaFormShare.applyResultsButton(envBtn);
            }

            var closeBtn = root.querySelector('[data-hormonal-close]');
            if (closeBtn) closeBtn.setAttribute('aria-label', lbl('Cerrar', 'Close'));

            refreshQuestionsBlock(config);
            updateHormonalTotals(id);

            if (resultsById[id]) {
                var result = resultsById[id];
                var qList = questionIndexById[id] || [];
                result.sections.forEach(function(s, idx) {
                    var sec = config.sections[idx];
                    if (sec) s.title = getLang() === 'en' ? sec.titleEn : sec.titleEs;
                    if (window.HormonalEvaluation) {
                        s.evaluation = window.HormonalEvaluation.evaluateSection(
                            s.id, s.total, id, s.answered, s.optional
                        );
                    }
                });
                result.answers.forEach(function(a, i) {
                    var q = qList[i];
                    if (!q) return;
                    a.question = q.text;
                    var sec = config.sections[q.sectionIndex];
                    if (sec) a.sectionTitle = getLang() === 'en' ? sec.titleEn : sec.titleEs;
                });
                renderResultTotals(config, result);
            }
        });
    }

    function mountModals() {
        var root = document.getElementById('hormonal-modals-root');
        if (!root) return;
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
            root.appendChild(renderModal(window.HORMONAL_QUESTIONNAIRES[key]));
        });
    }

    function init() {
        if (!window.HORMONAL_QUESTIONNAIRES) return;
        normalizeQuestions();
        buildQuestionIndex();
        var pageId = getPageHormonalId();
        if (pageId) {
            mountPage(pageId);
        } else {
            mountModals();
        }
        bindEvents();
        bindAllDatosInteractions();
        bindAllTotalsListeners();
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindRestartButtons === 'function') {
            window.CamsaFormPersistence.bindRestartButtons();
        }
    }

    window.HormonalQuestionnaires = {
        open: openModal,
        openPage: openPage,
        mountPage: mountPage,
        close: closeModal,
        closeAnyActive: closeAnyActiveHormonalModal,
        finalize: finalizeQuestionnaire,
        restart: restartQuestionnaire,
        initWizard: initHormonalWizard,
        getWizardStep: function(id) {
            return hormonalWizards[id] ? hormonalWizards[id].getCurrentStep() : 0;
        },
        updateTotals: updateHormonalTotals,
        refreshLanguage: refreshModalChrome,
        rebuild: function() {
            normalizeQuestions();
            hormonalWizards = {};
            if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.resetHormonalBindState === 'function') {
                window.CamsaFormPersistence.resetHormonalBindState();
            }
            var root = document.getElementById('hormonal-modals-root');
            if (root) root.innerHTML = '';
            buildQuestionIndex();
            mountModals();
            bindEvents();
            bindAllDatosInteractions();
            bindAllTotalsListeners();
            if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindHormonal === 'function') {
                Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
                    window.CamsaFormPersistence.bindHormonal(key);
                });
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
