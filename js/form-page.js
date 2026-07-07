/**
 * Rutas y utilidades para formularios en página dedicada (no modal).
 */
(function() {
    'use strict';

    var FORM_PAGE_PATHS = {
        longevity: 'longevidad.html',
        'hormonal-mujer': 'hormonal-mujer.html',
        'hormonal-hombre': 'hormonal-hombre.html',
        tfg: 'index.html'
    };

    function getFormPageId() {
        return document.body.getAttribute('data-form-page') || null;
    }

    function isFormPage() {
        return !!getFormPageId();
    }

    function resolvePageUrl(relativePath) {
        try {
            return new URL(relativePath, window.location.href).toString();
        } catch (e) {
            return relativePath;
        }
    }

    function getFormPageUrl(formId) {
        var path = FORM_PAGE_PATHS[formId];
        if (!path) return window.location.href;
        if (formId === 'tfg') {
            var url = resolvePageUrl(path);
            var u = new URL(url);
            u.searchParams.set('form', 'tfg');
            u.hash = 'formulario';
            return u.toString();
        }
        return resolvePageUrl(path);
    }

    function goToHome(anchor) {
        var url = resolvePageUrl('index.html');
        if (anchor) url += anchor.charAt(0) === '#' ? anchor : '#' + anchor;
        window.location.href = url;
    }

    window.CamsaFormPage = {
        paths: FORM_PAGE_PATHS,
        getFormPageId: getFormPageId,
        isFormPage: isFormPage,
        getFormPageUrl: getFormPageUrl,
        goToHome: goToHome,
        resolvePageUrl: resolvePageUrl
    };
})();
