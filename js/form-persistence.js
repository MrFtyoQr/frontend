/**
 * Persistencia de progreso de formularios en localStorage (solo navegador).
 * - Cuestionario de longevidad: respuestas, sección actual, fecha de actualización.
 * - Cuestionarios hormonales (mujer / hombre): datos, respuestas, sección y resultado.
 * - Solicitud de protocolo: campos de texto.
 * Maneja indisponibilidad de localStorage sin romper la aplicación.
 */
(function() {
    'use strict';

    var STORAGE_KEY_LONGEVITY = 'camsa-longevity-progress';
    var STORAGE_KEY_HORMONAL_MUJER = 'camsa-hormonal-mujer-progress';
    var STORAGE_KEY_HORMONAL_HOMBRE = 'camsa-hormonal-hombre-progress';
    var STORAGE_KEY_PROTOCOL = 'camsa-protocolo-progress';
    var SCHEMA_VERSION = 1;
    var SAVE_DEBOUNCE_MS = 400;

    var longevitySaveTimer = null;
    var protocolSaveTimer = null;
    var currentLongevitySectionIndex = 0;
    var longevityRestoredThisSession = false;
    var longevityWizardBound = false;

    var hormonalSaveTimers = { mujer: null, hombre: null };
    var currentHormonalSectionIndex = { mujer: 0, hombre: 0 };
    var hormonalRestoredThisSession = { mujer: false, hombre: false };
    var hormonalBound = { mujer: false, hombre: false };

    var HORMONAL_DATOS_KEYS = [
        'nombre', 'fnac', 'edad', 'ocupacion', 'peso', 'talla',
        'toma-hormonas', 'cuales-hormonas', 'hora-dormir', 'hora-levantar',
        'enfermedades', 'medicamentos', 'contacto'
    ];

    /**
     * Comprueba si localStorage está disponible (modo privado, cuota, políticas del navegador).
     */
    function isStorageAvailable() {
        try {
            var testKey = '__camsa_ls_test__';
            localStorage.setItem(testKey, '1');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    function safeGetItem(key) {
        if (!isStorageAvailable()) return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('[form-persistence] No se pudo leer localStorage:', e);
            return null;
        }
    }

    function safeSetItem(key, value) {
        if (!isStorageAvailable()) return false;
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn('[form-persistence] No se pudo guardar en localStorage:', e);
            return false;
        }
    }

    function safeRemoveItem(key) {
        if (!isStorageAvailable()) return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('[form-persistence] No se pudo eliminar de localStorage:', e);
        }
    }

    function parseStoredJson(raw) {
        if (!raw) return null;
        try {
            var data = JSON.parse(raw);
            if (!data || data.version !== SCHEMA_VERSION) return null;
            return data;
        } catch (e) {
            console.warn('[form-persistence] JSON inválido en almacenamiento:', e);
            return null;
        }
    }

    function getTranslation(key, fallbackEs, fallbackEn) {
        var lang = typeof window.getPreferredLang === 'function' ? window.getPreferredLang() : 'es';
        if (lang === 'en' && fallbackEn) return fallbackEn;
        return fallbackEs;
    }

    // ——— Cuestionario de longevidad ———

    function collectLongevityAnswers() {
        var answers = {};
        for (var i = 1; i <= 20; i++) {
            var selected = document.querySelector('input[name="q' + i + '"]:checked');
            if (selected) answers['q' + i] = selected.value;
        }
        return answers;
    }

    function collectLongevityDatos() {
        var ids = ['long-nombre', 'long-edad', 'long-sexo', 'long-fecha', 'long-profesion', 'long-contacto'];
        var datos = {};
        ids.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) datos[id] = el.value;
        });
        return datos;
    }

    function getLongevityWizardStep() {
        if (window.longevityWizard && typeof window.longevityWizard.getCurrentStep === 'function') {
            return window.longevityWizard.getCurrentStep();
        }
        return currentLongevitySectionIndex;
    }

    function getHormonalWizardStep(id) {
        if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.getWizardStep === 'function') {
            return window.HormonalQuestionnaires.getWizardStep(id);
        }
        return currentHormonalSectionIndex[id] || 0;
    }

    function buildLongevityPayload() {
        var resultHidden = document.getElementById('longevity-result');
        var step = getLongevityWizardStep();
        return {
            version: SCHEMA_VERSION,
            updatedAt: new Date().toISOString(),
            currentSectionIndex: step,
            wizardStep: step,
            datos: collectLongevityDatos(),
            answers: collectLongevityAnswers(),
            resultVisible: !!(resultHidden && !resultHidden.hasAttribute('hidden')),
            resultTotal: document.getElementById('longevity-total') ? document.getElementById('longevity-total').textContent : null,
            resultInterpretacion: document.getElementById('longevity-interpretacion')
                ? document.getElementById('longevity-interpretacion').textContent
                : null
        };
    }

    function saveLongevityProgress() {
        var payload = buildLongevityPayload();
        var hasDatos = false;
        Object.keys(payload.datos).forEach(function(k) {
            if (payload.datos[k] && String(payload.datos[k]).trim()) hasDatos = true;
        });
        var hasContent = Object.keys(payload.answers).length > 0 || hasDatos;
        if (!hasContent && !payload.resultVisible) {
            return;
        }
        safeSetItem(STORAGE_KEY_LONGEVITY, JSON.stringify(payload));
    }

    function scheduleLongevitySave() {
        if (longevitySaveTimer) clearTimeout(longevitySaveTimer);
        longevitySaveTimer = setTimeout(saveLongevityProgress, SAVE_DEBOUNCE_MS);
    }

    /**
     * Convierte el modal de longevidad en wizard por bloques (datos + secciones).
     */
    function initLongevityWizard() {
        if (!window.QuestionnaireWizard) return;
        var modal = document.getElementById('modal-longevity');
        if (!modal) return;

        if (!document.getElementById('longevity-wizard')) {
            window.QuestionnaireWizard.wrapLongevityModal(modal);
        }

        if (window.longevityWizard) return;

        window.longevityWizard = window.QuestionnaireWizard.create({
            root: '#longevity-wizard',
            resultEl: document.getElementById('longevity-result'),
            onFinish: function() {
                if (typeof window.finalizeLongevityQuestionnaire === 'function') {
                    window.finalizeLongevityQuestionnaire();
                }
            },
            onStepChange: function(step) {
                currentLongevitySectionIndex = step;
                scheduleLongevitySave();
            },
            validateStep: function(idx, step) {
                if (step.classList.contains('q-wizard-step--datos')) return true;
                return null;
            }
        });
    }

    function goToLongevityWizardStep(index) {
        initLongevityWizard();
        if (window.longevityWizard) {
            window.longevityWizard.goToStep(index, true);
            currentLongevitySectionIndex = index;
        }
    }

    function applyLongevityData(data) {
        if (!data) return;

        if (data.datos) {
            Object.keys(data.datos).forEach(function(id) {
                var el = document.getElementById(id);
                if (el && data.datos[id] !== undefined && data.datos[id] !== null) {
                    el.value = data.datos[id];
                }
            });
        }

        if (data.answers) {
            Object.keys(data.answers).forEach(function(name) {
                var value = data.answers[name];
                var input = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
                if (input) input.checked = true;
            });
        }

        if (typeof data.wizardStep === 'number') {
            currentLongevitySectionIndex = data.wizardStep;
        } else if (typeof data.currentSectionIndex === 'number') {
            currentLongevitySectionIndex = data.currentSectionIndex;
        }

        if (data.resultVisible && data.resultTotal !== null && data.resultTotal !== undefined) {
            var totalEl = document.getElementById('longevity-total');
            var interpEl = document.getElementById('longevity-interpretacion');
            var resultBlock = document.getElementById('longevity-result');
            if (totalEl) totalEl.textContent = data.resultTotal;
            if (interpEl && data.resultInterpretacion) interpEl.textContent = data.resultInterpretacion;
            if (resultBlock) resultBlock.removeAttribute('hidden');
            var wiz = document.getElementById('longevity-wizard');
            if (wiz) wiz.setAttribute('hidden', '');
        } else {
            initLongevityWizard();
            goToLongevityWizardStep(currentLongevitySectionIndex);
        }
    }

    function scrollToLongevitySection(index) {
        goToLongevityWizardStep(index);
    }

    function showLongevityRecoveryBanner(savedData) {
        var banner = document.getElementById('longevity-recovery-banner');
        if (!banner || !savedData) return;

        var dateStr = '';
        if (savedData.updatedAt) {
            try {
                dateStr = new Date(savedData.updatedAt).toLocaleString();
            } catch (e) {
                dateStr = savedData.updatedAt;
            }
        }

        var msg = banner.querySelector('.form-recovery-message');
        if (msg) {
            msg.textContent = getTranslation(
                'persist_long_found',
                'Se encontró una sesión previa del cuestionario' + (dateStr ? ' (última actualización: ' + dateStr + ').' : '.'),
                'A previous questionnaire session was found' + (dateStr ? ' (last updated: ' + dateStr + ').' : '.')
            );
        }

        banner.removeAttribute('hidden');
        banner.classList.add('form-recovery-banner--visible');
    }

    function hideLongevityRecoveryBanner() {
        var banner = document.getElementById('longevity-recovery-banner');
        if (banner) {
            banner.setAttribute('hidden', '');
            banner.classList.remove('form-recovery-banner--visible');
        }
    }

    function flashRecoveryIndicator(elementId) {
        var indicator = document.getElementById(elementId);
        if (!indicator) return;
        indicator.removeAttribute('hidden');
        indicator.classList.add('form-recovery-indicator--visible');
        setTimeout(function() {
            indicator.classList.remove('form-recovery-indicator--visible');
            indicator.setAttribute('hidden', '');
        }, 5000);
    }

    function showRecoveryIndicator() {
        flashRecoveryIndicator('longevity-recovery-indicator');
    }

    function restoreLongevitySession(options) {
        var raw = safeGetItem(STORAGE_KEY_LONGEVITY);
        var data = parseStoredJson(raw);
        if (!data) return false;

        applyLongevityData(data);

        if (options && options.openModal && typeof window.showLongevityModal === 'function') {
            window.showLongevityModal();
            setTimeout(function() {
                scrollToLongevitySection(data.currentSectionIndex || 0);
                showRecoveryIndicator();
            }, 350);
        } else if (options && options.scrollWhenOpen) {
            scrollToLongevitySection(data.currentSectionIndex || 0);
            showRecoveryIndicator();
        }

        longevityRestoredThisSession = true;
        return true;
    }

    function clearLongevityProgress() {
        safeRemoveItem(STORAGE_KEY_LONGEVITY);
        hideLongevityRecoveryBanner();
        longevityRestoredThisSession = false;
        ['longevity-card-recovery-hint', 'longevity-recovery-indicator'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.setAttribute('hidden', '');
                el.classList.remove('form-recovery-indicator--visible');
            }
        });
    }

    function bindLongevityPersistence() {
        var modal = document.getElementById('modal-longevity');
        if (!modal || longevityWizardBound) return;

        longevityWizardBound = true;
        initLongevityWizard();

        var fields = modal.querySelectorAll(
            '#long-nombre, #long-edad, #long-sexo, #long-fecha, #long-profesion, #long-contacto, ' +
            '.longevity-fieldset input[type="radio"]'
        );
        fields.forEach(function(el) {
            el.addEventListener('change', scheduleLongevitySave);
            el.addEventListener('input', scheduleLongevitySave);
        });

        var saved = parseStoredJson(safeGetItem(STORAGE_KEY_LONGEVITY));
        if (saved) {
            applyLongevityData(saved);
            showLongevityRecoveryBanner(saved);
            longevityRestoredThisSession = true;
            flashRecoveryIndicator('longevity-card-recovery-hint');
        }

        var btnContinue = document.getElementById('longevity-recovery-continue');
        var btnDiscard = document.getElementById('longevity-recovery-discard');
        if (btnContinue) {
            btnContinue.addEventListener('click', function() {
                hideLongevityRecoveryBanner();
                restoreLongevitySession({ openModal: true, scrollWhenOpen: true });
            });
        }
        if (btnDiscard) {
            btnDiscard.addEventListener('click', function() {
                clearLongevityProgress();
                resetLongevityFormFields();
            });
        }
    }

    // ——— Cuestionarios hormonales (mujer / hombre) ———

    function getHormonalStorageKey(id) {
        if (id === 'mujer') return STORAGE_KEY_HORMONAL_MUJER;
        if (id === 'hombre') return STORAGE_KEY_HORMONAL_HOMBRE;
        return null;
    }

    function getHormonalPrefix(id) {
        if (!window.HORMONAL_QUESTIONNAIRES || !window.HORMONAL_QUESTIONNAIRES[id]) return null;
        return window.HORMONAL_QUESTIONNAIRES[id].prefix;
    }

    function getHormonalModal(id) {
        return document.getElementById('modal-hormonal-' + id);
    }

    function fieldIdHormonal(prefix, key) {
        return prefix + '-' + key;
    }

    function collectHormonalDatos(prefix) {
        var datos = {};
        HORMONAL_DATOS_KEYS.forEach(function(key) {
            var el = document.getElementById(fieldIdHormonal(prefix, key));
            if (el) datos[key] = el.value;
        });
        var tomaRadio = document.querySelector('input[name="' + prefix + '-toma-hormonas"]:checked');
        if (tomaRadio) datos['toma-hormonas'] = tomaRadio.value;
        return datos;
    }

    function collectHormonalAnswers(modal, prefix) {
        var answers = {};
        if (!modal) return answers;
        modal.querySelectorAll('input[type="radio"][name^="' + prefix + '_q"]:checked').forEach(function(inp) {
            answers[inp.name] = inp.value;
        });
        return answers;
    }

    function hasHormonalDatosContent(datos) {
        var has = false;
        Object.keys(datos).forEach(function(k) {
            if (datos[k] && String(datos[k]).trim()) has = true;
        });
        return has;
    }

    function buildHormonalPayload(id) {
        var prefix = getHormonalPrefix(id);
        var modal = getHormonalModal(id);
        var resultBlock = document.getElementById('hormonal-result-' + id);
        var step = getHormonalWizardStep(id);
        return {
            version: SCHEMA_VERSION,
            updatedAt: new Date().toISOString(),
            currentSectionIndex: step,
            wizardStep: step,
            datos: prefix ? collectHormonalDatos(prefix) : {},
            answers: prefix && modal ? collectHormonalAnswers(modal, prefix) : {},
            resultVisible: !!(resultBlock && !resultBlock.hasAttribute('hidden'))
        };
    }

    function saveHormonalProgress(id) {
        var key = getHormonalStorageKey(id);
        if (!key) return;
        var payload = buildHormonalPayload(id);
        var hasContent = Object.keys(payload.answers).length > 0 ||
            hasHormonalDatosContent(payload.datos) ||
            payload.resultVisible;
        if (!hasContent) return;
        safeSetItem(key, JSON.stringify(payload));
    }

    function scheduleHormonalSave(id) {
        if (hormonalSaveTimers[id]) clearTimeout(hormonalSaveTimers[id]);
        hormonalSaveTimers[id] = setTimeout(function() {
            saveHormonalProgress(id);
        }, SAVE_DEBOUNCE_MS);
    }

    function goToHormonalWizardStep(id, index) {
        if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.initWizard === 'function') {
            window.HormonalQuestionnaires.initWizard(id, index);
            currentHormonalSectionIndex[id] = index;
        }
    }

    function syncHormonalHormonasDetail(prefix, datos) {
        var detail = document.getElementById(prefix + '-hormonas-detail');
        var cuales = document.getElementById(fieldIdHormonal(prefix, 'cuales-hormonas'));
        var isYes = datos['toma-hormonas'] === 'Sí';
        if (detail) {
            if (isYes) detail.removeAttribute('hidden');
            else detail.setAttribute('hidden', '');
        }
        if (!isYes && cuales) cuales.value = '';
    }

    function applyHormonalData(id, data) {
        if (!data) return;
        var prefix = getHormonalPrefix(id);
        if (!prefix) return;

        if (data.datos) {
            HORMONAL_DATOS_KEYS.forEach(function(key) {
                var el = document.getElementById(fieldIdHormonal(prefix, key));
                if (el && data.datos[key] !== undefined && data.datos[key] !== null) {
                    el.value = data.datos[key];
                }
            });
            if (data.datos['toma-hormonas']) {
                var tomaVal = data.datos['toma-hormonas'];
                var radio = document.querySelector(
                    'input[name="' + prefix + '-toma-hormonas"][value="' + tomaVal + '"]'
                );
                if (radio) radio.checked = true;
                syncHormonalHormonasDetail(prefix, data.datos);
            }
            var fnac = document.getElementById(fieldIdHormonal(prefix, 'fnac'));
            var edad = document.getElementById(fieldIdHormonal(prefix, 'edad'));
            if (fnac && edad && fnac.value && typeof window.HormonalQuestionnaires !== 'undefined') {
                fnac.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        if (data.answers) {
            Object.keys(data.answers).forEach(function(name) {
                var value = data.answers[name];
                var input = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
                if (input) input.checked = true;
            });
        }

        if (typeof data.wizardStep === 'number') {
            currentHormonalSectionIndex[id] = data.wizardStep;
        } else if (typeof data.currentSectionIndex === 'number') {
            currentHormonalSectionIndex[id] = data.currentSectionIndex;
        }

        if (data.resultVisible &&
            window.HormonalQuestionnaires &&
            typeof window.HormonalQuestionnaires.finalize === 'function') {
            window.HormonalQuestionnaires.finalize(id);
        } else if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.initWizard === 'function') {
            window.HormonalQuestionnaires.initWizard(id, currentHormonalSectionIndex[id] || 0);
        }
        if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.updateTotals === 'function') {
            window.HormonalQuestionnaires.updateTotals(id);
        }
    }

    function scrollToHormonalSection(id, index) {
        goToHormonalWizardStep(id, index);
    }

    function showHormonalRecoveryBanner(id, savedData) {
        var banner = document.getElementById('hormonal-recovery-banner-' + id);
        if (!banner || !savedData) return;

        var dateStr = '';
        if (savedData.updatedAt) {
            try {
                dateStr = new Date(savedData.updatedAt).toLocaleString();
            } catch (e) {
                dateStr = savedData.updatedAt;
            }
        }

        var label = id === 'mujer'
            ? getTranslation('persist_horm_mujer_found', 'Se encontró un cuestionario hormonal (mujer) sin terminar', 'An unfinished women\'s hormonal questionnaire was found')
            : getTranslation('persist_horm_hombre_found', 'Se encontró un cuestionario hormonal (hombre) sin terminar', 'An unfinished men\'s hormonal questionnaire was found');

        var msg = banner.querySelector('.form-recovery-message');
        if (msg) {
            msg.textContent = label + (dateStr ? ' (última actualización: ' + dateStr + ').' : '.');
        }

        banner.removeAttribute('hidden');
        banner.classList.add('form-recovery-banner--visible');
    }

    function hideHormonalRecoveryBanner(id) {
        var banner = document.getElementById('hormonal-recovery-banner-' + id);
        if (banner) {
            banner.setAttribute('hidden', '');
            banner.classList.remove('form-recovery-banner--visible');
        }
    }

    function clearHormonalProgress(id) {
        var key = getHormonalStorageKey(id);
        if (key) safeRemoveItem(key);
        hideHormonalRecoveryBanner(id);
        hormonalRestoredThisSession[id] = false;
        var cardHint = document.getElementById('hormonal-' + id + '-card-recovery-hint');
        var indicator = document.getElementById('hormonal-recovery-indicator-' + id);
        [cardHint, indicator].forEach(function(el) {
            if (el) {
                el.setAttribute('hidden', '');
                el.classList.remove('form-recovery-indicator--visible');
            }
        });
    }

    function resetHormonalFormFields(id) {
        var modal = getHormonalModal(id);
        var prefix = getHormonalPrefix(id);
        if (!modal || !prefix) return;

        modal.querySelectorAll('input[type="text"], input[type="tel"], input[type="date"], input[type="time"]').forEach(function(el) {
            el.value = '';
        });
        modal.querySelectorAll('input[type="radio"]').forEach(function(r) { r.checked = false; });
        syncHormonalHormonasDetail(prefix, { 'toma-hormonas': 'No' });
        var result = document.getElementById('hormonal-result-' + id);
        if (result) result.setAttribute('hidden', '');
        var wizard = document.getElementById('hormonal-wizard-' + id);
        if (wizard) wizard.removeAttribute('hidden');
        currentHormonalSectionIndex[id] = 0;
        goToHormonalWizardStep(id, 0);
    }

    function restoreHormonalSession(id, options) {
        var key = getHormonalStorageKey(id);
        var data = parseStoredJson(safeGetItem(key));
        if (!data) return false;

        applyHormonalData(id, data);

        if (options && options.openModal && window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.open === 'function') {
            window.HormonalQuestionnaires.open(id);
            setTimeout(function() {
                scrollToHormonalSection(id, data.currentSectionIndex || 0);
                flashRecoveryIndicator('hormonal-recovery-indicator-' + id);
            }, 350);
        } else if (options && options.scrollWhenOpen) {
            scrollToHormonalSection(id, data.currentSectionIndex || 0);
            flashRecoveryIndicator('hormonal-recovery-indicator-' + id);
        }

        hormonalRestoredThisSession[id] = true;
        return true;
    }

    function resetHormonalBindState(id) {
        if (id) {
            hormonalBound[id] = false;
            currentHormonalSectionIndex[id] = 0;
        } else {
            ['mujer', 'hombre'].forEach(function(i) { resetHormonalBindState(i); });
        }
    }

    function bindHormonalPersistence(id) {
        if (hormonalBound[id]) return;
        var modal = getHormonalModal(id);
        var prefix = getHormonalPrefix(id);
        if (!modal || !prefix) return;

        hormonalBound[id] = true;

        modal.addEventListener('change', function() {
            scheduleHormonalSave(id);
        });
        modal.addEventListener('input', function() {
            scheduleHormonalSave(id);
        });

        var key = getHormonalStorageKey(id);
        var saved = parseStoredJson(safeGetItem(key));
        if (saved) {
            applyHormonalData(id, saved);
            showHormonalRecoveryBanner(id, saved);
            hormonalRestoredThisSession[id] = true;
            flashRecoveryIndicator('hormonal-' + id + '-card-recovery-hint');
        } else if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.initWizard === 'function') {
            window.HormonalQuestionnaires.initWizard(id, 0);
        }

        var btnContinue = modal.querySelector('[data-hormonal-recovery-continue="' + id + '"]');
        var btnDiscard = modal.querySelector('[data-hormonal-recovery-discard="' + id + '"]');
        if (btnContinue) {
            btnContinue.addEventListener('click', function() {
                hideHormonalRecoveryBanner(id);
                restoreHormonalSession(id, { openModal: true, scrollWhenOpen: true });
            });
        }
        if (btnDiscard) {
            btnDiscard.addEventListener('click', function() {
                clearHormonalProgress(id);
                resetHormonalFormFields(id);
            });
        }
    }

    function resetLongevityFormFields() {
        var modal = document.getElementById('modal-longevity');
        if (!modal) return;
        modal.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], select').forEach(function(el) {
            if (el.id === 'long-fecha') return;
            el.value = el.tagName === 'SELECT' ? '' : '';
        });
        modal.querySelectorAll('input[type="radio"]').forEach(function(r) { r.checked = false; });
        var result = document.getElementById('longevity-result');
        if (result) result.setAttribute('hidden', '');
        var wiz = document.getElementById('longevity-wizard');
        if (wiz) wiz.removeAttribute('hidden');
        currentLongevitySectionIndex = 0;
        goToLongevityWizardStep(0);
    }

    // ——— Formulario de protocolo ———

    function collectProtocolFields() {
        var ids = ['nombre', 'telefono', 'preocupaciones', 'diagnostico', 'medicamentos', 'estudios'];
        var fields = {};
        ids.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) fields[id] = el.value;
        });
        return fields;
    }

    function isDefaultEstudiosValue(value) {
        var estudiosEl = document.getElementById('estudios');
        if (!estudiosEl || !value) return false;
        var placeholders = [
            estudiosEl.getAttribute('value'),
            'Últimos estudios realizados: (Deberán ser adjuntados manualmente por WhatsApp)',
            'Latest studies: (Must be attached manually via WhatsApp)'
        ];
        return placeholders.indexOf(value) !== -1;
    }

    function saveProtocolProgress() {
        var fields = collectProtocolFields();
        var hasContent = false;
        Object.keys(fields).forEach(function(id) {
            var v = fields[id];
            if (!v || !String(v).trim()) return;
            if (id === 'estudios' && isDefaultEstudiosValue(v)) return;
            hasContent = true;
        });
        if (!hasContent) return;

        safeSetItem(STORAGE_KEY_PROTOCOL, JSON.stringify({
            version: SCHEMA_VERSION,
            updatedAt: new Date().toISOString(),
            fields: fields
        }));
    }

    function scheduleProtocolSave() {
        if (protocolSaveTimer) clearTimeout(protocolSaveTimer);
        protocolSaveTimer = setTimeout(saveProtocolProgress, SAVE_DEBOUNCE_MS);
    }

    function applyProtocolData(data) {
        if (!data || !data.fields) return;
        Object.keys(data.fields).forEach(function(id) {
            var el = document.getElementById(id);
            if (el && data.fields[id] !== undefined) el.value = data.fields[id];
        });
    }

    function showProtocolRecoveryBanner(savedData) {
        var banner = document.getElementById('protocol-recovery-banner');
        if (!banner || !savedData) return;

        var dateStr = '';
        if (savedData.updatedAt) {
            try {
                dateStr = new Date(savedData.updatedAt).toLocaleString();
            } catch (e) {
                dateStr = savedData.updatedAt;
            }
        }

        var msg = banner.querySelector('.form-recovery-message');
        if (msg) {
            msg.textContent = getTranslation(
                'persist_prot_found',
                'Se encontró una solicitud de protocolo sin enviar' + (dateStr ? ' (última actualización: ' + dateStr + ').' : '.'),
                'An unsent protocol request was found' + (dateStr ? ' (last updated: ' + dateStr + ').' : '.')
            );
        }

        banner.removeAttribute('hidden');
        banner.classList.add('form-recovery-banner--visible');
    }

    function hideProtocolRecoveryBanner() {
        var banner = document.getElementById('protocol-recovery-banner');
        if (banner) {
            banner.setAttribute('hidden', '');
            banner.classList.remove('form-recovery-banner--visible');
        }
    }

    function clearProtocolProgress() {
        safeRemoveItem(STORAGE_KEY_PROTOCOL);
        hideProtocolRecoveryBanner();
    }

    function bindProtocolPersistence() {
        var form = document.getElementById('protocolo-form');
        if (!form) return;

        var inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(function(el) {
            if (el.type === 'file') return;
            el.addEventListener('input', scheduleProtocolSave);
            el.addEventListener('change', scheduleProtocolSave);
        });

        var saved = parseStoredJson(safeGetItem(STORAGE_KEY_PROTOCOL));
        if (saved) {
            applyProtocolData(saved);
            showProtocolRecoveryBanner(saved);
        }

        var btnContinue = document.getElementById('protocol-recovery-continue');
        var btnDiscard = document.getElementById('protocol-recovery-discard');
        if (btnContinue) {
            btnContinue.addEventListener('click', function() {
                hideProtocolRecoveryBanner();
                var section = document.getElementById('formulario');
                if (section) {
                    var header = document.querySelector('.header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({
                        top: section.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
                flashRecoveryIndicator('protocol-recovery-indicator');
            });
        }
        if (btnDiscard) {
            btnDiscard.addEventListener('click', function() {
                clearProtocolProgress();
                var defaultEstudios = getTranslation(
                    'estudios_placeholder',
                    'Últimos estudios realizados: (Deberán ser adjuntados manualmente por WhatsApp)',
                    'Latest studies: (Must be attached manually via WhatsApp)'
                );
                ['nombre', 'telefono', 'preocupaciones', 'diagnostico', 'medicamentos'].forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.value = '';
                });
                var estudios = document.getElementById('estudios');
                if (estudios) estudios.value = defaultEstudios;
            });
        }
    }

    function initFormPersistence() {
        bindProtocolPersistence();
        bindLongevityPersistence();
        ['mujer', 'hombre'].forEach(function(hormonalId) {
            bindHormonalPersistence(hormonalId);
        });
    }

    // API pública para main.js
    window.CamsaFormPersistence = {
        clearLongevityProgress: clearLongevityProgress,
        clearProtocolProgress: clearProtocolProgress,
        clearHormonalProgress: clearHormonalProgress,
        saveLongevityProgress: saveLongevityProgress,
        saveHormonalProgress: saveHormonalProgress,
        bindHormonal: bindHormonalPersistence,
        resetHormonalBindState: resetHormonalBindState,
        onLongevityModalOpened: function() {
            initLongevityWizard();
            if (longevityRestoredThisSession) {
                var saved = parseStoredJson(safeGetItem(STORAGE_KEY_LONGEVITY));
                if (saved && !saved.resultVisible) {
                    setTimeout(function() {
                        goToLongevityWizardStep(saved.wizardStep ?? saved.currentSectionIndex ?? 0);
                    }, 200);
                }
            }
        },
        onLongevityFinalized: function() {
            scheduleLongevitySave();
        },
        onHormonalWizardStep: function(id) {
            currentHormonalSectionIndex[id] = getHormonalWizardStep(id);
            scheduleHormonalSave(id);
        },
        onHormonalModalOpened: function(id) {
            if (hormonalRestoredThisSession[id]) {
                var key = getHormonalStorageKey(id);
                var saved = parseStoredJson(safeGetItem(key));
                if (saved && !saved.resultVisible) {
                    setTimeout(function() {
                        goToHormonalWizardStep(id, saved.wizardStep ?? saved.currentSectionIndex ?? 0);
                    }, 200);
                }
            }
        },
        onHormonalFinalized: function(id) {
            scheduleHormonalSave(id);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormPersistence);
    } else {
        initFormPersistence();
    }
})();
