/**
 * Compartir enlace directo a un cuestionario / calculadora (?form=...).
 * Abre WhatsApp para elegir contacto (móvil y escritorio vía WhatsApp Web).
 */
(function() {
    'use strict';

    var FORM_META = {
        longevity: {
            titleEs: 'Cuestionario de hábitos y longevidad',
            titleEn: 'Habits and longevity questionnaire'
        },
        'hormonal-mujer': {
            titleEs: 'Cuestionario hormonal — Mujer',
            titleEn: 'Hormonal questionnaire — Women'
        },
        'hormonal-hombre': {
            titleEs: 'Cuestionario hormonal — Hombre',
            titleEn: 'Hormonal questionnaire — Men'
        },
        tfg: {
            titleEs: 'Calculadora de salud renal',
            titleEn: 'Kidney health calculator'
        }
    };

    function getLang() {
        if (typeof window.getPreferredLang === 'function') return window.getPreferredLang();
        return document.documentElement.lang === 'en' ? 'en' : 'es';
    }

    function lbl(es, en) {
        return getLang() === 'en' ? en : es;
    }

    function getFormMeta(formId) {
        return FORM_META[formId] || null;
    }

    function getFormShareUrl(formId) {
        var url = new URL(window.location.href);
        url.search = '';
        url.hash = '';
        url.searchParams.set('form', formId);
        return url.toString();
    }

    function getFormShareText(formId) {
        var meta = getFormMeta(formId);
        var title = meta
            ? (getLang() === 'en' ? meta.titleEn : meta.titleEs)
            : lbl('Formulario CAMSA', 'CAMSA form');
        var url = getFormShareUrl(formId);
        return lbl(
            'Te comparto este formulario de Clínica CAMSA para que lo completes:\n*' + title + '*\n\n',
            'I\'m sharing this CAMSA Clinic form for you to complete:\n*' + title + '*\n\n'
        ) + url;
    }

    function showShareToast(message) {
        var existing = document.getElementById('form-share-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'form-share-toast';
        toast.className = 'form-share-toast';
        toast.setAttribute('role', 'status');
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(function() {
            toast.classList.add('form-share-toast--visible');
        });

        setTimeout(function() {
            toast.classList.remove('form-share-toast--visible');
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3200);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function(resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                resolve();
            } catch (e) {
                reject(e);
            } finally {
                document.body.removeChild(ta);
            }
        });
    }

    function openWhatsAppShare(text) {
        var url = 'https://wa.me/?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function shareFormLink(formId) {
        if (!getFormMeta(formId)) return;
        openWhatsAppShare(getFormShareText(formId));
    }

    function scrollToFormularioSection() {
        var section = document.getElementById('formulario');
        if (!section) return;
        var header = document.querySelector('.header');
        var headerHeight = header ? header.offsetHeight : 0;
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }

    function openFormFromDeepLink(formId) {
        switch (formId) {
            case 'longevity':
                if (typeof window.showLongevityModal === 'function') window.showLongevityModal();
                break;
            case 'hormonal-mujer':
                if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.open === 'function') {
                    window.HormonalQuestionnaires.open('mujer');
                }
                break;
            case 'hormonal-hombre':
                if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.open === 'function') {
                    window.HormonalQuestionnaires.open('hombre');
                }
                break;
            case 'tfg':
                if (window.TfgCalculator && typeof window.TfgCalculator.open === 'function') {
                    window.TfgCalculator.open();
                }
                break;
            default:
                return false;
        }
        return true;
    }

    function cleanFormParamFromUrl() {
        if (!window.history.replaceState) return;
        var url = new URL(window.location.href);
        if (!url.searchParams.has('form')) return;
        url.searchParams.delete('form');
        var next = url.pathname + (url.search || '') + url.hash;
        window.history.replaceState({}, '', next);
    }

    function initDeepLink() {
        var params = new URLSearchParams(window.location.search);
        var formId = params.get('form');
        if (!formId || !getFormMeta(formId)) return;

        scrollToFormularioSection();
        setTimeout(function() {
            if (openFormFromDeepLink(formId)) {
                cleanFormParamFromUrl();
            }
        }, 450);
    }

    function bindShareButtons() {
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-form-share]');
            if (!btn) return;
            e.preventDefault();
            shareFormLink(btn.getAttribute('data-form-share'));
        });
    }

    function getShareBtnCopy() {
        return {
            label: lbl('Compartir cuestionario', 'Share questionnaire'),
            title: lbl(
                'Comparte el enlace del cuestionario por WhatsApp para que otra persona lo complete.',
                'Share the questionnaire link via WhatsApp so someone else can complete it.'
            )
        };
    }

    function getResultsBtnCopy() {
        return {
            label: lbl('Enviar resultados', 'Send results'),
            title: lbl(
                'Envía tus respuestas completadas a la clínica por WhatsApp.',
                'Send your completed answers to the clinic via WhatsApp.'
            )
        };
    }

    function applyActionButton(btn, copy) {
        if (!btn || !copy) return;
        btn.classList.remove('btn-longevity-action--dual');
        btn.setAttribute('title', copy.title);
        btn.textContent = copy.label;
    }

    function renderShareButton(formId) {
        var copy = getShareBtnCopy();
        return '<button type="button" class="btn-longevity-action btn-longevity-compartir" ' +
            'data-form-share="' + formId + '" title="' + copy.title.replace(/"/g, '&quot;') + '">' +
            copy.label + '</button>';
    }

    function renderResultsButton(extraAttrs) {
        var copy = getResultsBtnCopy();
        return '<button type="button" class="btn-longevity-action btn-longevity-enviar" ' +
            (extraAttrs || '') + ' title="' + copy.title.replace(/"/g, '&quot;') + '">' +
            copy.label + '</button>';
    }

    function getShareButtonLabel() {
        return getShareBtnCopy().label;
    }

    function init() {
        bindShareButtons();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDeepLink);
        } else {
            initDeepLink();
        }
    }

    window.CamsaFormShare = {
        getShareUrl: getFormShareUrl,
        getShareText: getFormShareText,
        share: shareFormLink,
        getShareBtnCopy: getShareBtnCopy,
        getResultsBtnCopy: getResultsBtnCopy,
        renderShareButton: renderShareButton,
        renderResultsButton: renderResultsButton,
        applyActionButton: applyActionButton,
        applyShareButton: function(btn) { applyActionButton(btn, getShareBtnCopy()); },
        applyResultsButton: function(btn) { applyActionButton(btn, getResultsBtnCopy()); },
        getButtonLabel: getShareButtonLabel,
        copyLink: function(formId) {
            var text = getFormShareText(formId);
            return copyToClipboard(text).then(function() {
                showShareToast(lbl(
                    'Enlace copiado. Pégalo en WhatsApp u otra app para compartirlo.',
                    'Link copied. Paste it in WhatsApp or another app to share.'
                ));
            });
        }
    };

    init();
})();
