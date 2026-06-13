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

    function renderDatosGrid(prefix) {
        var id = function(key) { return fieldId(prefix, key); };
        var tomaName = prefix + '-toma-hormonas';

        return (
            '<div class="longevity-datos hormonal-datos" data-hormonal-section="0">' +
            '<h4 class="longevity-section-title hormonal-datos-title">' + lbl('Datos generales', 'General information') + '</h4>' +
            '<p class="hormonal-datos-intro">' + lbl(
                'Estos datos ayudan a personalizar tu resumen. Completa lo que puedas; cuanto más contexto, más útil para tu médico.',
                'These details help personalize your summary. Fill in what you can—the more context, the more useful for your doctor.'
            ) + '</p>' +

            '<div class="hormonal-datos-group">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Identificación', 'Identification') + '</h5>' +
            '<div class="hormonal-field-grid hormonal-field-grid--2 hormonal-field-grid--ident">' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Nombre completo', 'Full name') + '</span>' +
            '<input type="text" id="' + id('nombre') + '" class="hormonal-input-control" autocomplete="name">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Fecha de nacimiento', 'Date of birth') + '</span>' +
            '<input type="date" id="' + id('fnac') + '" class="hormonal-input-control" data-hormonal-fnac="' + prefix + '" max="' + new Date().toISOString().slice(0, 10) + '">' +
            '</label>' +
            '<label class="hormonal-field hormonal-field--compact">' +
            '<span class="hormonal-field-label">' + lbl('Edad', 'Age') + '</span>' +
            '<input type="text" id="' + id('edad') + '" readonly class="hormonal-input-control hormonal-input-readonly" inputmode="numeric" aria-readonly="true" tabindex="-1">' +
            '<span class="hormonal-field-hint">' + lbl('Automática', 'Automatic') + '</span>' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Ocupación', 'Occupation') + '</span>' +
            '<input type="text" id="' + id('ocupacion') + '" class="hormonal-input-control">' +
            '</label>' +
            '</div></div>' +

            '<div class="hormonal-datos-group">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Medidas', 'Measurements') + '</h5>' +
            '<div class="hormonal-field-grid hormonal-field-grid--2">' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Peso', 'Weight') + '</span>' +
            '<input type="text" id="' + id('peso') + '" class="hormonal-input-control" placeholder="' + lbl('Ej. 65 kg', 'e.g. 65 kg') + '">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Talla', 'Height') + '</span>' +
            '<input type="text" id="' + id('talla') + '" class="hormonal-input-control" placeholder="' + lbl('Ej. 1.65 m', 'e.g. 5 ft 5 in') + '">' +
            '</label>' +
            '</div></div>' +

            '<div class="hormonal-datos-group hormonal-datos-group--hormonas">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Medicamentos o suplementos hormonales', 'Hormone medicines or supplements') + '</h5>' +
            '<p class="hormonal-datos-group-desc">' + lbl(
                '¿Tomas actualmente algún medicamento o suplemento relacionado con hormonas (con o sin receta)?',
                'Are you currently taking any medicine or supplement related to hormones (with or without a prescription)?'
            ) + '</p>' +
            '<div class="hormonal-choice-row" role="radiogroup" aria-label="' + lbl('Toma hormonas', 'Takes hormones') + '">' +
            '<label class="hormonal-choice-pill">' +
            '<input type="radio" class="hormonal-choice-input" name="' + tomaName + '" value="No" data-hormonal-toma="' + prefix + '">' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span>' +
            '<span class="hormonal-choice-text">' + lbl('No', 'No') + '</span></label>' +
            '<label class="hormonal-choice-pill">' +
            '<input type="radio" class="hormonal-choice-input" name="' + tomaName + '" value="Sí" data-hormonal-toma="' + prefix + '">' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span>' +
            '<span class="hormonal-choice-text">' + lbl('Sí', 'Yes') + '</span></label>' +
            '</div>' +
            '<div class="hormonal-hormonas-detail" id="' + prefix + '-hormonas-detail" hidden>' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('¿Cuáles hormonas o suplementos?', 'Which hormones or supplements?') + '</span>' +
            '<input type="text" id="' + id('cuales-hormonas') + '" class="hormonal-input-control" placeholder="' + lbl('Ej. progesterona, DHEA, vitamina D…', 'e.g. progesterone, DHEA, vitamin D…') + '">' +
            '</label></div></div>' +

            '<div class="hormonal-datos-group">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Sueño', 'Sleep') + '</h5>' +
            '<div class="hormonal-field-grid hormonal-field-grid--2">' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Hora de dormir', 'Bedtime') + '</span>' +
            '<input type="time" id="' + id('hora-dormir') + '" class="hormonal-input-control">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Hora de levantarse', 'Wake time') + '</span>' +
            '<input type="time" id="' + id('hora-levantar') + '" class="hormonal-input-control">' +
            '</label>' +
            '</div></div>' +

            '<div class="hormonal-datos-group">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Antecedentes y contacto', 'History and contact') + '</h5>' +
            '<div class="hormonal-field-grid">' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Enfermedades o diagnósticos que ya tienes', 'Conditions or diagnoses you already have') + '</span>' +
            '<input type="text" id="' + id('enfermedades') + '" class="hormonal-input-control">' +
            '</label>' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Medicamentos', 'Medications') + '</span>' +
            '<input type="text" id="' + id('medicamentos') + '" class="hormonal-input-control">' +
            '</label>' +
            '<label class="hormonal-field hormonal-field--full">' +
            '<span class="hormonal-field-label">' + lbl('Teléfono / WhatsApp', 'Phone / WhatsApp') + '</span>' +
            '<input type="tel" id="' + id('contacto') + '" class="hormonal-input-control" autocomplete="tel">' +
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
        var modal = document.getElementById('modal-hormonal-' + id);
        if (!config || !modal) return;

        var grand = 0;
        config.sections.forEach(function(section, sIdx) {
            var step = modal.querySelector('.hormonal-hormone-step[data-hormonal-section="' + sIdx + '"]');
            var sectionTotal = 0;
            if (step) {
                step.querySelectorAll('input[type="radio"]:checked').forEach(function(inp) {
                    sectionTotal += parseInt(inp.value, 10) || 0;
                });
            }
            grand += sectionTotal;
            var valEl = modal.querySelector('[data-section-total-value="' + sIdx + '"]');
            if (valEl) valEl.textContent = String(sectionTotal);
        });

        var grandEl = modal.querySelector('#hormonal-grand-total-' + id + ' .hormonal-grand-total-value');
        if (grandEl) grandEl.textContent = String(grand);
    }

    function bindTotalsListeners(id) {
        var modal = document.getElementById('modal-hormonal-' + id);
        if (!modal || modal.dataset.totalsBound === '1') return;
        modal.dataset.totalsBound = '1';
        modal.addEventListener('change', function(e) {
            if (e.target && e.target.matches('input[type="radio"][name*="_q"]')) {
                updateHormonalTotals(id);
            }
        });
    }

    function bindAllTotalsListeners() {
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
            bindTotalsListeners(key);
        });
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
            html += '<h4 class="hormonal-hormone-title hormonal-section-title' +
                (section.optional ? ' hormonal-section--optional' : '') +
                '" data-hormonal-section="' + sIdx + '">' + title + '</h4>';
            if (section.noteEs) {
                var note = getLang() === 'en' ? (section.noteEn || section.noteEs) : section.noteEs;
                html += '<p class="hormonal-section-note" data-hormonal-section="' + sIdx + '">' + note + '</p>';
            }
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
            },
            validateStep: function(idx, step) {
                if (step.classList.contains('q-wizard-step--datos')) return true;
                if (step.classList.contains('q-wizard-step--optional')) return true;
                return null;
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

    function renderModal(config) {
        var id = config.id;
        var prefix = config.prefix;
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
                'Suma por tema. Un número más alto indica que reportaste esos síntomas con más frecuencia.',
                'Total per topic. A higher number means you reported those symptoms more often.'
            ) + '</p>' +
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
            '</div></div></div></div>';

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
                sectionTitle: sectionsOut[sIdx].title,
                question: q.text,
                answer: selected.getAttribute('data-answer') || selected.value,
                points: pts
            });
        });

        var grandTotal = sectionsOut.reduce(function(sum, s) { return sum + s.total; }, 0);
        var grandMax = sectionsOut.reduce(function(sum, s) { return sum + s.max; }, 0);
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

        var html = '';
        result.sections.forEach(function(s) {
            if (s.optional && s.answered === 0) return;
            html += '<div class="hormonal-result-row">';
            html += '<span class="hormonal-result-label">' + s.title + '</span>';
            html += '<span class="hormonal-result-value"><strong>' + s.total + '</strong>';
            html += ' <span class="hormonal-result-max">/ ' + s.max + '</span></span>';
            html += '</div>';
        });
        html += '<p class="hormonal-result-grand">' + lbl('Total general:', 'Grand total:') +
            ' <strong>' + result.grandTotal + '</strong> / ' + result.grandMax + '</p>';
        container.innerHTML = html;
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
        lineas.push('*' + lbl('Totales por tema (escala 0–4)', 'Totals by topic (scale 0–4)') + '*');
        result.sections.forEach(function(s) {
            if (s.optional && s.answered === 0) return;
            lineas.push('• *' + s.title + ':* ' + s.total + ' / ' + s.max);
        });
        lineas.push('');
        lineas.push('*' + lbl('Total general', 'Grand total') + ':* ' + result.grandTotal + ' / ' + result.grandMax);
        lineas.push('');
        lineas.push('*' + lbl('Respuestas', 'Answers') + '*');
        result.answers.forEach(function(a) {
            lineas.push('*P' + a.num + '.* (' + a.sectionTitle + ') ' + a.question);
            lineas.push('→ ' + a.answer + ' (' + a.points + ')');
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
                html2canvas(card).then(function(canvas) {
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
            ['fnac', lbl('Fecha de nacimiento', 'Date of birth')],
            ['edad', lbl('Edad', 'Age'), lbl('Automática', 'Automatic')],
            ['ocupacion', lbl('Ocupación', 'Occupation')],
            ['peso', lbl('Peso', 'Weight')],
            ['talla', lbl('Talla', 'Height')],
            ['cuales-hormonas', lbl('¿Cuáles hormonas o suplementos?', 'Which hormones or supplements?')],
            ['hora-dormir', lbl('Hora de dormir', 'Bedtime')],
            ['hora-levantar', lbl('Hora de levantarse', 'Wake time')],
            ['enfermedades', lbl('Enfermedades o diagnósticos que ya tienes', 'Conditions or diagnoses you already have')],
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
            if (row[2]) {
                var hint = wrap.querySelector('.hormonal-field-hint');
                if (hint) hint.textContent = row[2];
            }
        });
        var pesoInp = document.getElementById(fieldId(prefix, 'peso'));
        var tallaInp = document.getElementById(fieldId(prefix, 'talla'));
        if (pesoInp) pesoInp.placeholder = lbl('Ej. 65 kg', 'e.g. 65 kg');
        if (tallaInp) tallaInp.placeholder = lbl('Ej. 1.65 m', 'e.g. 5 ft 5 in');
        if (document.getElementById(fieldId(prefix, 'cuales-hormonas'))) {
            document.getElementById(fieldId(prefix, 'cuales-hormonas')).placeholder =
                lbl('Ej. progesterona, DHEA, vitamina D…', 'e.g. progesterone, DHEA, vitamin D…');
        }
        var modal = document.getElementById('modal-hormonal-' + (prefix === 'hmujer' ? 'mujer' : 'hombre'));
        if (modal) {
            var groups = modal.querySelectorAll('.hormonal-datos-group-title');
            if (groups[0]) groups[0].textContent = lbl('Identificación', 'Identification');
            if (groups[1]) groups[1].textContent = lbl('Medidas', 'Measurements');
            if (groups[2]) groups[2].textContent = lbl('Medicamentos o suplementos hormonales', 'Hormone medicines or supplements');
            if (groups[3]) groups[3].textContent = lbl('Sueño', 'Sleep');
            if (groups[4]) groups[4].textContent = lbl('Antecedentes y contacto', 'History and contact');
            var desc = modal.querySelector('.hormonal-datos-group--hormonas .hormonal-datos-group-desc');
            if (desc) desc.textContent = lbl(
                '¿Tomas actualmente algún medicamento o suplemento relacionado con hormonas (con o sin receta)?',
                'Are you currently taking any medicine or supplement related to hormones (with or without a prescription)?'
            );
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
            var modal = document.getElementById('modal-hormonal-' + id);
            if (!modal) return;

            var titleEl = modal.querySelector('.longevity-title');
            if (titleEl) titleEl.textContent = t(config, 'modalTitleEs', 'modalTitleEn');
            var subEl = modal.querySelector('.longevity-subtitle');
            if (subEl) subEl.textContent = t(config, 'modalSubtitleEs', 'modalSubtitleEn');
            var intro = modal.querySelector('.hormonal-datos-intro');
            if (intro) intro.textContent = lbl(
                'Estos datos ayudan a personalizar tu resumen. Completa lo que puedas; cuanto más contexto, más útil para tu médico.',
                'These details help personalize your summary. Fill in what you can—the more context, the more useful for your doctor.'
            );
            var datosTitle = modal.querySelector('.hormonal-datos-title');
            if (datosTitle) datosTitle.textContent = lbl('Datos generales', 'General information');

            updateDatosLabels(config.prefix);

            config.sections.forEach(function(section, sIdx) {
                var secTitle = modal.querySelector('.hormonal-hormone-title[data-hormonal-section="' + sIdx + '"]');
                if (secTitle) secTitle.textContent = getLang() === 'en' ? section.titleEn : section.titleEs;
                if (section.noteEs) {
                    var noteEl = modal.querySelector('.hormonal-section-note[data-hormonal-section="' + sIdx + '"]');
                    if (noteEl) noteEl.textContent = getLang() === 'en' ? (section.noteEn || section.noteEs) : section.noteEs;
                }
                var totalLabel = modal.querySelector('.hormonal-section-total[data-section-index="' + sIdx + '"] .hormonal-section-total-label');
                if (totalLabel) {
                    var title = getLang() === 'en' ? section.titleEn : section.titleEs;
                    var maxScore = section.questions.length * 4;
                    totalLabel.textContent = lbl('TOTAL', 'TOTAL') + ' ' + title +
                        ' (' + lbl('máx', 'max') + ' ' + maxScore + ')';
                }
            });

            modal.querySelectorAll('.hormonal-scale-inline').forEach(function(el) {
                el.outerHTML = renderCompactScaleLegend();
            });

            var grandLabel = modal.querySelector('.hormonal-grand-total-label');
            if (grandLabel) {
                grandLabel.textContent = lbl('TOTAL GENERAL (todas las hormonas)', 'GRAND TOTAL (all hormones)');
            }

            var wizardRoot = document.getElementById('hormonal-wizard-' + id);
            if (wizardRoot) {
                var prevBtn = wizardRoot.querySelector('.q-wizard-btn-prev');
                if (prevBtn) prevBtn.textContent = lbl('Anterior', 'Previous');
                if (hormonalWizards[id]) hormonalWizards[id].updateProgress();
            }

            var resultTitle = modal.querySelector('.hormonal-result-title');
            if (resultTitle) resultTitle.textContent = t(config, 'resultTitleEs', 'resultTitleEn');
            var resultSub = modal.querySelector('.hormonal-result-subtitle');
            if (resultSub) resultSub.textContent = lbl(
                'Suma por tema. Un número más alto indica que reportaste esos síntomas con más frecuencia.',
                'Total per topic. A higher number means you reported those symptoms more often.'
            );
            var resultClinic = modal.querySelector('.hormonal-result-clinic');
            if (resultClinic) resultClinic.textContent = t(config, 'resultClinicEs', 'resultClinicEn');

            var imgBtn = modal.querySelector('[data-hormonal-imagen]');
            var shareBtn = modal.querySelector('[data-form-share="hormonal-' + id + '"]');
            var envBtn = modal.querySelector('[data-hormonal-enviar]');
            if (imgBtn) imgBtn.textContent = lbl('Guardar imagen', 'Save image');
            if (window.CamsaFormShare) {
                if (shareBtn) window.CamsaFormShare.applyShareButton(shareBtn);
                if (envBtn) window.CamsaFormShare.applyResultsButton(envBtn);
            }

            var closeBtn = modal.querySelector('[data-hormonal-close]');
            if (closeBtn) closeBtn.setAttribute('aria-label', lbl('Cerrar', 'Close'));

            refreshQuestionsBlock(config);
            updateHormonalTotals(id);

            if (resultsById[id]) {
                var result = resultsById[id];
                var qList = questionIndexById[id] || [];
                result.sections.forEach(function(s, idx) {
                    var sec = config.sections[idx];
                    if (sec) s.title = getLang() === 'en' ? sec.titleEn : sec.titleEs;
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
        if (!root) {
            root = document.createElement('div');
            root.id = 'hormonal-modals-root';
            document.body.appendChild(root);
        }
        Object.keys(window.HORMONAL_QUESTIONNAIRES).forEach(function(key) {
            root.appendChild(renderModal(window.HORMONAL_QUESTIONNAIRES[key]));
        });
    }

    function init() {
        if (!window.HORMONAL_QUESTIONNAIRES) return;
        normalizeQuestions();
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

    window.HormonalQuestionnaires = {
        open: openModal,
        close: closeModal,
        closeAnyActive: closeAnyActiveHormonalModal,
        finalize: finalizeQuestionnaire,
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
