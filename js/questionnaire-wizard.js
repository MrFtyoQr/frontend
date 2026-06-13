/**
 * Navegación por bloques con barra de progreso para cuestionarios extensos.
 */
(function() {
    'use strict';

    function lbl(es, en) {
        var lang = typeof window.getPreferredLang === 'function' ? window.getPreferredLang() : 'es';
        return lang === 'en' ? en : es;
    }

    function buildProgressHtml() {
        return (
            '<div class="q-wizard-header">' +
            '<div class="q-wizard-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">' +
            '<div class="q-wizard-progress-track"><div class="q-wizard-progress-fill"></div></div>' +
            '<div class="q-wizard-progress-meta">' +
            '<span class="q-wizard-step-counter"></span>' +
            '<span class="q-wizard-progress-text">0%</span>' +
            '</div></div>' +
            '<p class="q-wizard-error" role="alert" hidden></p>' +
            '</div>'
        );
    }

    function buildNavHtml() {
        return (
            '<div class="q-wizard-nav">' +
            '<button type="button" class="q-wizard-btn q-wizard-btn-prev">' + lbl('Anterior', 'Previous') + '</button>' +
            '<button type="button" class="q-wizard-btn q-wizard-btn-next q-wizard-btn-next--primary">' +
            lbl('Siguiente bloque', 'Next block') + '</button>' +
            '</div>'
        );
    }

    function Wizard(options) {
        this.root = typeof options.root === 'string' ? document.querySelector(options.root) : options.root;
        if (!this.root) return;

        this.steps = Array.prototype.slice.call(this.root.querySelectorAll('.q-wizard-step'));
        this.currentStep = typeof options.initialStep === 'number' ? options.initialStep : 0;
        this.onStepChange = options.onStepChange || null;
        this.onFinish = options.onFinish || null;
        this.validateStep = options.validateStep || null;
        this.resultEl = options.resultEl || null;

        this.progressFill = this.root.querySelector('.q-wizard-progress-fill');
        this.progressText = this.root.querySelector('.q-wizard-progress-text');
        this.stepCounter = this.root.querySelector('.q-wizard-step-counter');
        this.errorEl = this.root.querySelector('.q-wizard-error');
        this.btnPrev = this.root.querySelector('.q-wizard-btn-prev');
        this.btnNext = this.root.querySelector('.q-wizard-btn-next');

        this.bindEvents();
        this.goToStep(this.currentStep, true);
    }

    Wizard.prototype.bindEvents = function() {
        var self = this;
        if (this.btnPrev) {
            this.btnPrev.addEventListener('click', function() {
                self.goToStep(self.currentStep - 1);
            });
        }
        if (this.btnNext) {
            this.btnNext.addEventListener('click', function() {
                if (self.currentStep >= self.steps.length - 1) {
                    if (!self.validateCurrentStep()) return;
                    if (self.onFinish) self.onFinish();
                    return;
                }
                if (!self.validateCurrentStep()) return;
                self.goToStep(self.currentStep + 1);
            });
        }
        this.root.addEventListener('change', function() {
            self.clearError();
            self.updateProgress();
        });
    };

    Wizard.prototype.validateCurrentStep = function() {
        if (this.validateStep) {
            var custom = this.validateStep(this.currentStep, this.steps[this.currentStep]);
            if (custom === true) return true;
            if (typeof custom === 'string') {
                this.showError(custom);
                return false;
            }
            if (custom === false) {
                this.showError(lbl(
                    'Responde todas las preguntas de este bloque para continuar.',
                    'Answer all questions in this block to continue.'
                ));
                return false;
            }
        }

        var step = this.steps[this.currentStep];
        if (!step) return true;
        var fieldsets = step.querySelectorAll('.longevity-fieldset, .hormonal-fieldset');
        if (!fieldsets.length) return true;

        for (var i = 0; i < fieldsets.length; i++) {
            var fs = fieldsets[i];
            var radios = fs.querySelectorAll('input[type="radio"]');
            if (!radios.length) continue;
            if (!fs.querySelector('input[type="radio"]:checked')) {
                this.showError(lbl(
                    'Responde todas las preguntas de este bloque para continuar.',
                    'Answer all questions in this block to continue.'
                ));
                fs.classList.add('q-wizard-fieldset--missing');
                return false;
            }
            fs.classList.remove('q-wizard-fieldset--missing');
        }
        return true;
    };

    Wizard.prototype.showError = function(msg) {
        if (this.errorEl) {
            this.errorEl.textContent = msg;
            this.errorEl.removeAttribute('hidden');
        }
    };

    Wizard.prototype.clearError = function() {
        if (this.errorEl) {
            this.errorEl.textContent = '';
            this.errorEl.setAttribute('hidden', '');
        }
        this.root.querySelectorAll('.q-wizard-fieldset--missing').forEach(function(el) {
            el.classList.remove('q-wizard-fieldset--missing');
        });
    };

    Wizard.prototype.updateProgress = function() {
        var total = this.steps.length;
        var pct = total <= 1 ? 100 : Math.round((this.currentStep / (total - 1)) * 100);

        if (this.progressFill) this.progressFill.style.width = pct + '%';
        if (this.progressText) this.progressText.textContent = pct + '%';
        if (this.stepCounter) {
            this.stepCounter.textContent = lbl('Bloque', 'Block') + ' ' + (this.currentStep + 1) + ' / ' + total;
        }
        if (this.btnPrev) this.btnPrev.disabled = this.currentStep <= 0;
        if (this.btnNext) {
            var isLast = this.currentStep >= total - 1;
            this.btnNext.textContent = isLast
                ? lbl('Ver mi resultado', 'See my result')
                : lbl('Siguiente bloque', 'Next block');
        }
    };

    Wizard.prototype.goToStep = function(index, silent) {
        if (index < 0 || index >= this.steps.length) return;
        this.currentStep = index;
        this.clearError();

        this.steps.forEach(function(step, i) {
            if (i === index) {
                step.removeAttribute('hidden');
                step.classList.add('q-wizard-step--active');
            } else {
                step.setAttribute('hidden', '');
                step.classList.remove('q-wizard-step--active');
            }
        });

        if (this.resultEl) this.resultEl.setAttribute('hidden', '');

        this.updateProgress();

        if (!silent && this.steps[index]) {
            this.steps[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (this.onStepChange) this.onStepChange(this.currentStep, this.steps.length);
    };

    Wizard.prototype.getCurrentStep = function() {
        return this.currentStep;
    };

    Wizard.prototype.reset = function() {
        this.goToStep(0, true);
    };

    function wrapLongevityModal(modal) {
        if (!modal || modal.querySelector('.q-wizard')) return null;

        var datos = modal.querySelector('.longevity-datos');
        var questions = modal.querySelector('.longevity-questions');
        var finishBtn = document.getElementById('btn-longevity-finalizar');
        if (!datos || !questions) return null;

        var wizard = document.createElement('div');
        wizard.className = 'q-wizard';
        wizard.id = 'longevity-wizard';
        wizard.innerHTML = buildProgressHtml();

        var stepsWrap = document.createElement('div');
        stepsWrap.className = 'q-wizard-steps';

        var step0 = document.createElement('div');
        step0.className = 'q-wizard-step q-wizard-step--datos';
        step0.setAttribute('data-wizard-step', '0');
        step0.appendChild(datos);
        stepsWrap.appendChild(step0);

        var nodes = Array.prototype.slice.call(questions.childNodes);
        var currentStep = null;
        nodes.forEach(function(node) {
            if (node.nodeType !== 1) return;
            if (node.classList && node.classList.contains('longevity-section-title')) {
                currentStep = document.createElement('div');
                currentStep.className = 'q-wizard-step q-wizard-step--section';
                currentStep.setAttribute('data-wizard-step', String(stepsWrap.children.length));
                stepsWrap.appendChild(currentStep);
                currentStep.appendChild(node);
            } else if (currentStep) {
                currentStep.appendChild(node);
            }
        });

        wizard.appendChild(stepsWrap);
        wizard.insertAdjacentHTML('beforeend', buildNavHtml());

        questions.parentNode.insertBefore(wizard, questions);
        questions.remove();

        if (finishBtn) finishBtn.setAttribute('hidden', '');

        return wizard;
    }

    window.QuestionnaireWizard = {
        create: function(options) {
            return new Wizard(options);
        },
        buildProgressHtml: buildProgressHtml,
        buildNavHtml: buildNavHtml,
        wrapLongevityModal: wrapLongevityModal,
        lbl: lbl
    };
})();
