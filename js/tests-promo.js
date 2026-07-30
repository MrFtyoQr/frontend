/**
 * Promo flotante persistente — enlace directo a los tests de salud.
 */
(function() {
    'use strict';

    var PROMO_ID = 'camsa-tests-promo';
    var TESTS_ANCHOR = '#tests';

    function lbl(es, en) {
        return (typeof window.getPreferredLang === 'function' && window.getPreferredLang() === 'en') ? en : es;
    }

    function getTestsSectionUrl() {
        if (window.CamsaFormPage && typeof window.CamsaFormPage.resolvePageUrl === 'function') {
            return window.CamsaFormPage.resolvePageUrl('index.html' + TESTS_ANCHOR);
        }
        var path = (window.location.pathname || '').split('/').pop() || 'index.html';
        if (path === '' || path === 'index.html') {
            return TESTS_ANCHOR;
        }
        return 'index.html' + TESTS_ANCHOR;
    }

    function injectPromo() {
        if (document.getElementById(PROMO_ID)) return;

        var href = getTestsSectionUrl();
        var root = document.createElement('aside');
        root.id = PROMO_ID;
        root.className = 'tests-promo';
        root.setAttribute('role', 'complementary');
        root.setAttribute('aria-label', lbl('Ir a los tests de salud', 'Go to health tests'));

        root.innerHTML =
            '<a class="tests-promo__link" href="' + href + '">' +
            '<span class="tests-promo__pulse" aria-hidden="true"></span>' +
            '<span class="tests-promo__text">' +
            '<span class="tests-promo__title" data-i18n="tests_promo_fab">Realiza un test de salud</span>' +
            '<span class="tests-promo__subs">' +
            '<span class="tests-promo__sub" data-i18n="tests_promo_fab_sub">Gratis</span>' +
            '<span class="tests-promo__sub" data-i18n="tests_promo_fab_sub2">Resultados al instante</span>' +
            '</span>' +
            '</span>' +
            '<span class="tests-promo__arrow" aria-hidden="true"><i class="fa-solid fa-chevron-left"></i></span>' +
            '</a>';

        document.body.appendChild(root);
    }

    function refreshLabels() {
        if (typeof window.applyLanguage === 'function' && typeof window.getPreferredLang === 'function') {
            window.applyLanguage(window.getPreferredLang());
        }
    }

    function init() {
        injectPromo();
        refreshLabels();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CamsaTestsPromo = { refresh: refreshLabels };
})();
