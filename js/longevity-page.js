/**
 * Cuestionario de longevidad en página dedicada.
 */
(function() {
    'use strict';

    function prefillLongevityDatos() {
        var dateInput = document.getElementById('long-fecha');
        if (dateInput) {
            var today = new Date();
            dateInput.value = today.getFullYear() + '-' +
                String(today.getMonth() + 1).padStart(2, '0') + '-' +
                String(today.getDate()).padStart(2, '0');
        }
    }

    function initWhatsAppModal() {
        var pendingWhatsAppUrl = null;
        var pendingWhatsAppSource = null;

        function showModal() {
            var modal = document.getElementById('modal-whatsapp');
            if (!modal) return;
            modal.removeAttribute('hidden');
            modal.offsetHeight;
            modal.classList.add('active');
        }

        function hideModal() {
            var modal = document.getElementById('modal-whatsapp');
            if (!modal) return;
            modal.classList.remove('active');
            setTimeout(function() { modal.setAttribute('hidden', ''); }, 300);
            pendingWhatsAppUrl = null;
            pendingWhatsAppSource = null;
        }

        window.setPendingWhatsApp = function(url, source) {
            pendingWhatsAppUrl = url;
            pendingWhatsAppSource = source;
            showModal();
        };

        var confirmBtn = document.querySelector('#modal-whatsapp .modal-btn-confirm');
        var cancelBtn = document.querySelector('#modal-whatsapp .modal-btn-cancel');
        var modal = document.getElementById('modal-whatsapp');

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                if (pendingWhatsAppUrl) window.open(pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
                if (pendingWhatsAppSource === 'longevity' && window.CamsaFormPersistence) {
                    window.CamsaFormPersistence.clearLongevityProgress();
                }
                hideModal();
            });
        }
        if (cancelBtn) cancelBtn.addEventListener('click', hideModal);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) hideModal();
            });
        }
    }

    function bindLongevityActions() {
        var btnFin = document.getElementById('btn-longevity-finalizar');
        if (btnFin) {
            btnFin.addEventListener('click', function() {
                if (typeof window.finalizeLongevityQuestionnaire === 'function') {
                    window.finalizeLongevityQuestionnaire();
                }
            });
        }

        var btnImg = document.getElementById('btn-longevity-imagen');
        if (btnImg) {
            btnImg.addEventListener('click', function() {
                if (typeof html2canvas !== 'function') return;
                var card = document.getElementById('longevity-result-card');
                if (!card) return;
                html2canvas(card, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    logging: false,
                    onclone: function(doc) {
                        var totalEl = doc.getElementById('longevity-total');
                        var progressEl = doc.getElementById('longevity-score-ring-progress');
                        if (!totalEl || !progressEl || typeof window.applyLongevityRingProgress !== 'function') return;
                        var score = parseInt(totalEl.textContent, 10) || 0;
                        var tier = typeof window.getLongevityScoreTier === 'function'
                            ? window.getLongevityScoreTier(score)
                            : 'good';
                        window.applyLongevityRingProgress(progressEl, score, tier);
                    }
                }).then(function(canvas) {
                    var link = document.createElement('a');
                    link.download = 'longevidad_camsa.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            });
        }

        var btnEnv = document.getElementById('btn-longevity-enviar');
        if (btnEnv) {
            btnEnv.addEventListener('click', function() {
                if (typeof window.buildLongevityWhatsAppUrl !== 'function') return;
                var url = window.buildLongevityWhatsAppUrl();
                if (!url) return;
                window.setPendingWhatsApp(url, 'longevity');
            });
        }
    }

    function init() {
        if (!document.getElementById('longevity-form-root')) return;
        prefillLongevityDatos();
        initWhatsAppModal();
        bindLongevityActions();
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.bindRestartButtons === 'function') {
            window.CamsaFormPersistence.bindRestartButtons();
        }
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onLongevityPageOpened === 'function') {
            window.CamsaFormPersistence.onLongevityPageOpened();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
