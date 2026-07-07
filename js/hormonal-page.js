/**
 * Cuestionario hormonal en página dedicada.
 */
(function() {
    'use strict';

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
                if (pendingWhatsAppSource && window.CamsaFormPersistence && typeof window.CamsaFormPersistence.clearHormonalProgress === 'function') {
                    var id = pendingWhatsAppSource.replace('hormonal-', '');
                    if (id) window.CamsaFormPersistence.clearHormonalProgress(id);
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

    function init() {
        var pageId = document.body.getAttribute('data-form-page');
        if (!pageId || pageId.indexOf('hormonal-') !== 0) return;
        initWhatsAppModal();
        var hormonalId = pageId === 'hormonal-mujer' ? 'mujer' : 'hombre';
        if (window.CamsaFormPersistence && typeof window.CamsaFormPersistence.onHormonalPageOpened === 'function') {
            window.CamsaFormPersistence.onHormonalPageOpened(hormonalId);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
