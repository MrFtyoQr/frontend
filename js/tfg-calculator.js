/**
 * Calculadora TFG (CKD-EPI 2021) y clasificación K/DOQI.
 * Modal independiente — cuarta tarjeta de la sección Formulario.
 */
(function() {
    'use strict';

    var lastResult = null;

    function getLang() {
        if (typeof window.getPreferredLang === 'function') return window.getPreferredLang();
        var htmlLang = document.documentElement.lang;
        return htmlLang === 'en' ? 'en' : 'es';
    }

    function lbl(es, en) {
        return getLang() === 'en' ? en : es;
    }

    /**
     * CKD-EPI 2021 — creatinina en mg/dL, edad en años, sexo "F" o "M".
     */
    function calcularTFG(edad, creatinina, sexo) {
        var esMujer = sexo === 'F';
        var k = esMujer ? 0.7 : 0.9;
        var alfa = esMujer ? -0.241 : -0.302;
        var factorSexo = esMujer ? 1.012 : 1;
        var min = Math.min(creatinina / k, 1);
        var max = Math.max(creatinina / k, 1);
        var tfg = 142 *
            Math.pow(min, alfa) *
            Math.pow(max, -1.2) *
            Math.pow(0.9938, edad) *
            factorSexo;
        return Number(tfg.toFixed(1));
    }

    /** Estadios K/DOQI con textos de la tabla institucional (referencia clínica CAMSA). */
    var KDOQI_STAGES = {
        '1': {
            estadio: '1',
            rangoEs: '> 90',
            rangoEn: '> 90',
            nombreEs: 'TFG Normal',
            nombreEn: 'Normal GFR',
            descripcionEs: 'Daño renal y función renal normal o elevada.',
            descripcionEn: 'Kidney damage with normal or increased kidney function.',
            sintomasEs: 'Generalmente no se presentan síntomas.',
            sintomasEn: 'Symptoms are generally not present.',
            color: 's1'
        },
        '2': {
            estadio: '2',
            rangoEs: '60 – 89',
            rangoEn: '60 – 89',
            nombreEs: 'TFG Levemente disminuida',
            nombreEn: 'Mildly decreased GFR',
            descripcionEs: 'Daño renal y disminución leve de la función renal.',
            descripcionEn: 'Kidney damage with mildly decreased kidney function.',
            sintomasEs: 'Pueden no presentarse síntomas. En otras ocasiones: presión arterial alta, niveles elevados de creatinina o urea en sangre, sangre o proteínas en la orina.',
            sintomasEn: 'Symptoms may be absent. Sometimes: high blood pressure, elevated creatinine or BUN, blood or protein in urine.',
            color: 's2'
        },
        '3a': {
            estadio: '3a',
            rangoEs: '45 – 59',
            rangoEn: '45 – 59',
            nombreEs: 'TFG Moderadamente disminuida',
            nombreEn: 'Moderately decreased GFR',
            descripcionEs: 'Disminución moderada de la función renal.',
            descripcionEn: 'Moderate decrease in kidney function.',
            sintomasEs: 'Pueden presentarse síntomas: anemia o trastornos del metabolismo mineral. Pueden iniciar complicaciones. Es importante la prevención del riesgo cardiovascular.',
            sintomasEn: 'Symptoms may appear: anemia or mineral metabolism disorders. Complications may begin. Cardiovascular risk prevention is important.',
            color: 's3a'
        },
        '3b': {
            estadio: '3b',
            rangoEs: '30 – 44',
            rangoEn: '30 – 44',
            nombreEs: 'TFG Moderadamente a severamente disminuida',
            nombreEn: 'Moderately to severely decreased GFR',
            descripcionEs: 'Disminución moderada a severa de la función renal.',
            descripcionEn: 'Moderate to severe decrease in kidney function.',
            sintomasEs: 'Pueden presentarse síntomas: anemia o trastornos del metabolismo mineral. Pueden iniciar complicaciones. Es importante la prevención del riesgo cardiovascular.',
            sintomasEn: 'Symptoms may appear: anemia or mineral metabolism disorders. Complications may begin. Cardiovascular risk prevention is important.',
            color: 's3b'
        },
        '4': {
            estadio: '4',
            rangoEs: '15 – 29',
            rangoEn: '15 – 29',
            nombreEs: 'TFG Severamente disminuida',
            nombreEn: 'Severely decreased GFR',
            descripcionEs: 'Disminución grave de la función renal.',
            descripcionEn: 'Severe decrease in kidney function.',
            sintomasEs: 'Normalmente el especialista sugiere preparación para tratamiento sustitutivo renal: diálisis y/o trasplante de riñón.',
            sintomasEn: 'Specialists usually recommend preparing for renal replacement therapy: dialysis and/or kidney transplant.',
            color: 's4'
        },
        '5': {
            estadio: '5',
            rangoEs: '< 15',
            rangoEn: '< 15',
            nombreEs: 'Falla Renal',
            nombreEn: 'Kidney Failure',
            descripcionEs: 'Enfermedad Renal Terminal (ERT).',
            descripcionEn: 'End-stage renal disease (ESRD).',
            sintomasEs: 'Los riñones han perdido casi toda su capacidad de funcionar con eficacia; puede requerirse diálisis o trasplante. Atención del riesgo cardiovascular.',
            sintomasEn: 'Kidneys have lost most of their ability to function; dialysis or transplant may be needed. Cardiovascular risk attention is required.',
            color: 's5'
        }
    };

    function clasificarTFG(tfg) {
        var key;
        if (tfg > 90) key = '1';
        else if (tfg >= 60) key = '2';
        else if (tfg >= 45) key = '3a';
        else if (tfg >= 30) key = '3b';
        else if (tfg >= 15) key = '4';
        else key = '5';

        var base = KDOQI_STAGES[key];
        var en = getLang() === 'en';
        return {
            estadio: base.estadio,
            rango: en ? base.rangoEn : base.rangoEs,
            nombre: en ? base.nombreEn : base.nombreEs,
            descripcion: en ? base.descripcionEn : base.descripcionEs,
            sintomas: en ? base.sintomasEn : base.sintomasEs,
            color: base.color
        };
    }

    function stageLabel(stage) {
        if (stage.estadio === '3a' || stage.estadio === '3b') {
            return lbl('Estadio', 'Stage') + ' ' + stage.estadio;
        }
        return lbl('Estadio', 'Stage') + ' ' + stage.estadio;
    }

    function renderModal() {
        var root = document.getElementById('tfg-modal-root');
        if (!root) return;

        root.innerHTML =
            '<div id="modal-tfg" class="modal-overlay modal-longevity modal-tfg" role="dialog" aria-modal="true" aria-labelledby="modal-tfg-title" hidden>' +
            '<div class="modal-longevity-backdrop modal-tfg-backdrop" aria-hidden="true"></div>' +
            '<div class="modal-longevity-box">' +
            '<button type="button" class="modal-longevity-close" id="modal-tfg-close" aria-label="Cerrar">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
            '<div class="modal-longevity-scroll">' +
            '<h3 id="modal-tfg-title" class="longevity-title">' + lbl('Calculadora de salud renal', 'Kidney health calculator') + '</h3>' +
            '<p class="longevity-subtitle">' + lbl(
                'Con tu edad, sexo y el valor de creatinina de un análisis de sangre, estimamos qué tan bien trabajan tus riñones. El resultado es orientativo: compártelo con tu médico.',
                'With your age, sex, and creatinine from a blood test, we estimate how well your kidneys are working. The result is for guidance only—share it with your doctor.'
            ) + '</p>' +

            '<div class="tfg-form hormonal-datos">' +
            '<h4 class="longevity-section-title">' + lbl('Tus datos del laboratorio', 'Your lab values') + '</h4>' +
            '<p class="hormonal-datos-intro tfg-datos-intro">' + lbl(
                'La creatinina suele aparecer en tu reporte de análisis de sangre. Si no la tienes a la mano, pide orientación a tu médico antes de usar esta herramienta.',
                'Creatinine is usually on your blood test report. If you do not have it handy, ask your doctor before using this tool.'
            ) + '</p>' +
            '<div class="hormonal-field-grid hormonal-field-grid--2">' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Edad (años)', 'Age (years)') + '</span>' +
            '<input type="number" id="tfg-edad" class="hormonal-input-control" min="1" max="120" step="1" inputmode="numeric">' +
            '</label>' +
            '<label class="hormonal-field">' +
            '<span class="hormonal-field-label">' + lbl('Creatinina en sangre (mg/dL)', 'Blood creatinine (mg/dL)') + '</span>' +
            '<input type="number" id="tfg-creatinina" class="hormonal-input-control" min="0.1" max="20" step="0.01" inputmode="decimal">' +
            '</label>' +
            '</div>' +
            '<div class="hormonal-datos-group hormonal-datos-group--hormonas">' +
            '<h5 class="hormonal-datos-group-title">' + lbl('Sexo', 'Sex') + '</h5>' +
            '<div class="hormonal-choice-row tfg-sexo-row" role="radiogroup">' +
            '<label class="hormonal-choice-pill"><input type="radio" class="hormonal-choice-input" name="tfg-sexo" value="M" checked>' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span><span class="hormonal-choice-text">' + lbl('Masculino', 'Male') + '</span></label>' +
            '<label class="hormonal-choice-pill"><input type="radio" class="hormonal-choice-input" name="tfg-sexo" value="F">' +
            '<span class="hormonal-choice-radio" aria-hidden="true"></span><span class="hormonal-choice-text">' + lbl('Femenino', 'Female') + '</span></label>' +
            '</div></div>' +
            '<p id="tfg-error" class="tfg-error" role="alert" hidden></p>' +
            '</div>' +

            '<button type="button" class="btn-longevity-finalizar" id="btn-tfg-calcular">' +
            lbl('Calcular y ver resultado', 'Calculate and see result') +
            '</button>' +

            '<div id="tfg-result" class="longevity-result tfg-result" hidden>' +
            '<div id="tfg-result-card" class="longevity-result-card tfg-result-card">' +
            '<h4 class="longevity-result-title">' + lbl('Resultado sobre tus riñones', 'Result about your kidneys') + '</h4>' +
            '<p class="tfg-result-clinic-sub">' + lbl(
                'Guía según etapas de enfermedad renal crónica (tabla K/DOQI)',
                'Guide by chronic kidney disease stages (K/DOQI table)'
            ) + '</p>' +
            '<div id="tfg-result-body" class="tfg-result-body"></div>' +
            '<p class="longevity-result-clinic tfg-footnote">' + lbl(
                'Cálculo con fórmula CKD-EPI 2021. La etapa solo aplica si un médico confirmó enfermedad renal por al menos 3 meses. Este resultado no es un diagnóstico: confírmalo con tu doctor y tus estudios.',
                'Calculated with the CKD-EPI 2021 formula. The stage only applies if a doctor confirmed kidney disease for at least 3 months. This is not a diagnosis—confirm with your doctor and your tests.'
            ) + '</p>' +
            '<p class="longevity-result-clinic">Clínica CAMSA · Medicina Regenerativa y Longevidad</p>' +
            '</div>' +
            '<div class="longevity-result-actions">' +
            '<button type="button" class="btn-longevity-action btn-longevity-imagen" id="btn-tfg-imagen">' + lbl('Guardar imagen', 'Save image') + '</button>' +
            (window.CamsaFormShare ? window.CamsaFormShare.renderShareButton('tfg') :
                '<button type="button" class="btn-longevity-action btn-longevity-compartir" data-form-share="tfg">Enviar enlace</button>') +
            (window.CamsaFormShare ? window.CamsaFormShare.renderResultsButton('id="btn-tfg-enviar"') :
                '<button type="button" class="btn-longevity-action btn-longevity-enviar" id="btn-tfg-enviar">Enviar resultados</button>') +
            '</div></div>' +
            '</div></div></div>';
    }

    function renderResultCard(result) {
        var body = document.getElementById('tfg-result-body');
        if (!body) return;
        var c = result.clasificacion;
        body.innerHTML =
            '<div class="tfg-result-highlight tfg-result-highlight--' + c.color + '">' +
            '<p class="tfg-result-value-label">' + lbl('Qué tan bien filtran tus riñones (estimado)', 'How well your kidneys filter (estimate)') + '</p>' +
            '<p class="tfg-result-value"><strong>' + result.tfg + '</strong> <span>ml/min/1.73 m²</span></p>' +
            '</div>' +
            '<div class="tfg-result-stage tfg-result-stage--' + c.color + '">' +
            '<p class="tfg-result-stage-badge">' + stageLabel(c) + ' · ' + c.rango + ' ml/min/1.73 m²</p>' +
            '<h5 class="tfg-result-stage-name">' + c.nombre + '</h5>' +
            '<p class="tfg-result-stage-desc"><strong>' + lbl('Qué significa:', 'What it means:') + '</strong> ' + c.descripcion + '</p>' +
            '<p class="tfg-result-stage-sintomas"><strong>' + lbl('Qué podrías notar y qué hacer:', 'What you might notice and what to do:') + '</strong> ' + c.sintomas + '</p>' +
            '</div>' +
            '<table class="tfg-ref-table" aria-label="' + lbl('Tabla de referencia por etapas', 'Reference table by stage') + '">' +
            '<thead><tr><th>' + lbl('Etapa', 'Stage') + '</th><th>' + lbl('Filtración', 'Filtration') + '</th><th>' + lbl('En palabras sencillas', 'In simple terms') + '</th></tr></thead>' +
            '<tbody>' + buildRefTableRows(c.estadio) + '</tbody></table>' +
            '<figure class="tfg-result-visual">' +
            '<img src="img/tfg.png" alt="' + lbl(
                'Diagrama visual de las etapas de función renal',
                'Visual diagram of kidney function stages'
            ) + '" class="tfg-result-diagram" width="800" height="500" loading="lazy" decoding="async">' +
            '<figcaption class="tfg-result-visual-caption">' + lbl(
                'Referencia visual de las etapas. La fila resaltada en la tabla corresponde a tu estimación.',
                'Visual reference of the stages. The highlighted row in the table matches your estimate.'
            ) + '</figcaption></figure>';
    }

    function buildRefTableRows(activeEstadio) {
        var order = ['1', '2', '3a', '3b', '4', '5'];
        return order.map(function(key) {
            var s = KDOQI_STAGES[key];
            var en = getLang() === 'en';
            var isActive = key === activeEstadio;
            var rowClass = 'tfg-ref-row tfg-ref-row--' + s.color + (isActive ? ' tfg-ref-row--active' : '');
            var stageCell = isActive
                ? '<td><span class="tfg-ref-stage-num">' + s.estadio + '</span>' +
                  '<span class="tfg-ref-you-marker">' + lbl('Tu resultado', 'Your result') + '</span></td>'
                : '<td><span class="tfg-ref-stage-num">' + s.estadio + '</span></td>';
            return '<tr class="' + rowClass + '">' +
                stageCell +
                '<td>' + (en ? s.rangoEn : s.rangoEs) + '</td>' +
                '<td>' + (en ? s.nombreEn : s.nombreEs) + '</td></tr>';
        }).join('');
    }

    function validateInputs() {
        var edad = parseFloat(document.getElementById('tfg-edad').value);
        var creatinina = parseFloat(document.getElementById('tfg-creatinina').value);
        var sexoEl = document.querySelector('input[name="tfg-sexo"]:checked');
        var err = document.getElementById('tfg-error');

        if (!edad || edad < 1 || edad > 120) {
            if (err) { err.textContent = lbl('Ingrese una edad válida entre 1 y 120 años.', 'Enter a valid age between 1 and 120 years.'); err.removeAttribute('hidden'); }
            return null;
        }
        if (!creatinina || creatinina <= 0 || creatinina > 20) {
            if (err) { err.textContent = lbl('Ingrese creatinina sérica válida en mg/dL (ej. 0.7 – 15).', 'Enter valid serum creatinine in mg/dL (e.g. 0.7 – 15).'); err.removeAttribute('hidden'); }
            return null;
        }
        if (!sexoEl) {
            if (err) { err.textContent = lbl('Seleccione el sexo.', 'Select sex.'); err.removeAttribute('hidden'); }
            return null;
        }
        if (err) err.setAttribute('hidden', '');
        return { edad: edad, creatinina: creatinina, sexo: sexoEl.value };
    }

    function runCalculation() {
        var input = validateInputs();
        if (!input) return;

        var tfg = calcularTFG(input.edad, input.creatinina, input.sexo);
        var clasificacion = clasificarTFG(tfg);
        lastResult = {
            tfg: tfg,
            clasificacion: clasificacion,
            inputs: input
        };

        renderResultCard(lastResult);
        var block = document.getElementById('tfg-result');
        if (block) {
            block.removeAttribute('hidden');
            block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function buildWhatsAppMessage() {
        if (!lastResult) return '';
        var c = lastResult.clasificacion;
        var sexoTxt = lastResult.inputs.sexo === 'F' ? lbl('Femenino', 'Female') : lbl('Masculino', 'Male');
        return [
            '*' + lbl('CALCULADORA SALUD RENAL - CLÍNICA CAMSA', 'KIDNEY HEALTH CALCULATOR - CAMSA CLINIC') + '*',
            '*' + lbl('Estimación CKD-EPI 2021', 'CKD-EPI 2021 estimate') + '*',
            '',
            '*Datos:*',
            lbl('Edad', 'Age') + ': ' + lastResult.inputs.edad,
            lbl('Sexo', 'Sex') + ': ' + sexoTxt,
            lbl('Creatinina', 'Creatinine') + ': ' + lastResult.inputs.creatinina + ' mg/dL',
            '',
            '*' + lbl('Filtración estimada', 'Estimated filtration') + ':* ' + lastResult.tfg + ' ml/min/1.73 m²',
            '*' + stageLabel(c) + ':* ' + c.nombre,
            lbl('Rango K/DOQI', 'K/DOQI range') + ': ' + c.rango + ' ml/min/1.73 m²',
            lbl('Descripción', 'Description') + ': ' + c.descripcion,
            lbl('Síntomas y actuación', 'Symptoms and guidance') + ': ' + c.sintomas
        ].join('\n');
    }

    function openModal() {
        var modal = document.getElementById('modal-tfg');
        if (!modal) return;
        prefillFromProtocol();
        modal.removeAttribute('hidden');
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        var modal = document.getElementById('modal-tfg');
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(function() {
            modal.setAttribute('hidden', '');
            var anyOpen = document.querySelector('.modal-tfg.active, .modal-hormonal.active, .modal-longevity.active');
            if (!anyOpen) document.body.style.overflow = '';
        }, 300);
    }

    /** Intenta tomar edad del test hormonal o del formulario principal si existe. */
    function prefillFromProtocol() {
        var edadEl = document.getElementById('tfg-edad');
        if (!edadEl || edadEl.value.trim()) return;

        var sources = [
            document.getElementById('hmujer-edad'),
            document.getElementById('hhombre-edad'),
            document.getElementById('long-edad')
        ];
        for (var i = 0; i < sources.length; i++) {
            if (sources[i] && sources[i].value.trim()) {
                edadEl.value = sources[i].value.trim();
                return;
            }
        }
    }

    function bindEvents() {
        var openBtn = document.getElementById('btn-abrir-tfg');
        if (openBtn) openBtn.addEventListener('click', openModal);

        var closeBtn = document.getElementById('modal-tfg-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        var backdrop = document.querySelector('.modal-tfg-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeModal);

        var calcBtn = document.getElementById('btn-tfg-calcular');
        if (calcBtn) calcBtn.addEventListener('click', runCalculation);

        var imgBtn = document.getElementById('btn-tfg-imagen');
        if (imgBtn) {
            imgBtn.addEventListener('click', function() {
                if (!lastResult || typeof html2canvas !== 'function') return;
                var card = document.getElementById('tfg-result-card');
                if (!card) return;
                html2canvas(card).then(function(canvas) {
                    var link = document.createElement('a');
                    link.download = 'tfg_kdoqi_' + lastResult.tfg + '.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            });
        }

        var waBtn = document.getElementById('btn-tfg-enviar');
        if (waBtn) {
            waBtn.addEventListener('click', function() {
                if (!lastResult) return;
                var msg = buildWhatsAppMessage();
                var num = (typeof window.__rs === 'function' && window.__rs('fw')) ? window.__rs('fw') : '527443514149';
                var url = 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
                if (typeof window.setPendingWhatsApp === 'function') {
                    window.setPendingWhatsApp(url, 'tfg');
                }
            });
        }
    }

    function refreshLanguage() {
        var modal = document.getElementById('modal-tfg');
        if (!modal) return;

        var titleEl = document.getElementById('modal-tfg-title');
        if (titleEl) titleEl.textContent = lbl('Calculadora de salud renal', 'Kidney health calculator');
        var subEl = modal.querySelector('.longevity-subtitle');
        if (subEl) subEl.textContent = lbl(
            'Con tu edad, sexo y el valor de creatinina de un análisis de sangre, estimamos qué tan bien trabajan tus riñones. El resultado es orientativo: compártelo con tu médico.',
            'With your age, sex, and creatinine from a blood test, we estimate how well your kidneys are working. The result is for guidance only—share it with your doctor.'
        );
        var secTitle = modal.querySelector('.tfg-form .longevity-section-title');
        if (secTitle) secTitle.textContent = lbl('Tus datos del laboratorio', 'Your lab values');
        var intro = modal.querySelector('.tfg-datos-intro');
        if (intro) intro.textContent = lbl(
            'La creatinina suele aparecer en tu reporte de análisis de sangre. Si no la tienes a la mano, pide orientación a tu médico antes de usar esta herramienta.',
            'Creatinine is usually on your blood test report. If you do not have it handy, ask your doctor before using this tool.'
        );
        var labels = modal.querySelectorAll('.tfg-form .hormonal-field-label');
        if (labels[0]) labels[0].textContent = lbl('Edad (años)', 'Age (years)');
        if (labels[1]) labels[1].textContent = lbl('Creatinina en sangre (mg/dL)', 'Blood creatinine (mg/dL)');
        var sexoTitle = modal.querySelector('.hormonal-datos-group-title');
        if (sexoTitle) sexoTitle.textContent = lbl('Sexo', 'Sex');
        var sexoTexts = modal.querySelectorAll('.tfg-sexo-row .hormonal-choice-text');
        if (sexoTexts[0]) sexoTexts[0].textContent = lbl('Masculino', 'Male');
        if (sexoTexts[1]) sexoTexts[1].textContent = lbl('Femenino', 'Female');

        var calcBtn = document.getElementById('btn-tfg-calcular');
        if (calcBtn) calcBtn.textContent = lbl('Calcular y ver resultado', 'Calculate and see result');
        var imgBtn = document.getElementById('btn-tfg-imagen');
        var shareBtn = modal.querySelector('[data-form-share="tfg"]');
        var envBtn = document.getElementById('btn-tfg-enviar');
        if (imgBtn) imgBtn.textContent = lbl('Guardar imagen', 'Save image');
        if (window.CamsaFormShare) {
            if (shareBtn) window.CamsaFormShare.applyShareButton(shareBtn);
            if (envBtn) window.CamsaFormShare.applyResultsButton(envBtn);
        }
        var closeBtn = document.getElementById('modal-tfg-close');
        if (closeBtn) closeBtn.setAttribute('aria-label', lbl('Cerrar', 'Close'));

        var resultTitle = modal.querySelector('.longevity-result-title');
        if (resultTitle) resultTitle.textContent = lbl('Resultado sobre tus riñones', 'Result about your kidneys');
        var resultSub = modal.querySelector('.tfg-result-clinic-sub');
        if (resultSub) resultSub.textContent = lbl(
            'Guía según etapas de enfermedad renal crónica (tabla K/DOQI)',
            'Guide by chronic kidney disease stages (K/DOQI table)'
        );
        var footnote = modal.querySelector('.tfg-footnote');
        if (footnote) footnote.textContent = lbl(
            'Cálculo con fórmula CKD-EPI 2021. La etapa solo aplica si un médico confirmó enfermedad renal por al menos 3 meses. Este resultado no es un diagnóstico: confírmalo con tu doctor y tus estudios.',
            'Calculated with the CKD-EPI 2021 formula. The stage only applies if a doctor confirmed kidney disease for at least 3 months. This is not a diagnosis—confirm with your doctor and your tests.'
        );

        if (lastResult) {
            lastResult.clasificacion = clasificarTFG(lastResult.tfg);
            renderResultCard(lastResult);
        }
    }

    function init() {
        renderModal();
        bindEvents();
    }

    window.TfgCalculator = {
        calcularTFG: calcularTFG,
        clasificarTFG: clasificarTFG,
        open: openModal,
        close: closeModal,
        refreshLanguage: refreshLanguage
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
