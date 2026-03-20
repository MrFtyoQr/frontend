/**
 * i18n: idioma ES/EN con detección automática por navegador y botón en la interfaz.
 * Prioridad: 1) localStorage (elección del usuario), 2) navigator.language.
 */
(function() {
    'use strict';

    var STORAGE_KEY = 'camsa-lang';

    var t = {
        es: {
            nav_inicio: 'Inicio',
            nav_protocolo: 'Protocolo',
            nav_pacientes: 'Pacientes',
            nav_formulario: 'Formulario',
            hero_line1: 'Esta puede ser tu',
            hero_line2: 'mejor década',
            hero_description: 'Regenera tu cuerpo a nivel celular, optimiza tu salud sistémica y extiende tus años de vitalidad con ciencia de vanguardia.',
            hero_cta: 'Solicita un protocolo personalizado',
            plan_text: 'Plan Integral de Medicina Regenerativa y Longevidad con Células Madre',
            carousel_top: 'NO IMPORTA LA EDAD NI LA ENFERMEDAD, PUEDES TENER CALIDAD DE VIDA.',
            carousel_bottom: 'PUEDES TENER CALIDAD DE VIDA. NO IMPORTA LA EDAD NI LA ENFERMEDAD,',
            protocolo_title: 'El camino hacia tu',
            protocolo_title_br: ' calidad de vida',
            protocolo_highlight: 'en 6 pasos',
            protocolo_subtitle: 'Cada fase se adapta al protocolo personalizado de cada paciente',
            cta_testimonios: 'Ver testimonios',
            cta_protocolo: 'Solicita un protocolo personalizado',
            pacientes_title1: 'Extranjeros',
            pacientes_title2: 'confían',
            pacientes_title3: 'en nosotros',
            pacientes_description: 'Nuestros pacientes foráneos confían en nuestros protocolos y viajan desde sus países para mejorar su calidad de vida en Clínica Camsa',
            cta_experiencias: 'Ver experiencias',
            testimonios_title: 'La voz de nuestros',
            testimonios_title_hl: 'pacientes',
            testimonios_subtitle: 'Descubre sus historias y permite que la tuya también forme parte de ellas',
            formulario_title: 'Solicita un protocolo',
            formulario_title_hl: 'personalizado',
            formulario_description: 'Elige cómo quieres comenzar: puedes enviar tu solicitud de protocolo, completar el cuestionario de longevidad o hacer ambos de forma independiente.',
            card_longevidad_title: 'Cuestionario de longevidad',
            card_longevidad_text: 'Evalúa tus hábitos de salud, sueño, nutrición y prevención para obtener tu Longevity Score.',
            card_longevidad_li1: 'Puede llenarse de forma independiente.',
            card_longevidad_li2: 'Complementa de la solicitud de protocolo.',
            card_longevidad_btn: 'Completar cuestionario',
            banner_title: 'SI ERES PACIENTE CAMSA, CONOCE TUS BENEFICIOS EXCLUSIVOS',
            banner_btn: 'Iniciar sesión',
            banner_note: '*Solicita tu acceso en recepción',
            form_legend: '*Campos obligatorios',
            btn_enviar_wa: 'Enviar por WhatsApp',
            modal_confirm_title: 'Confirmar envío',
            modal_confirm_text1: 'La información ingresada será enviada a través de WhatsApp. Se abrirá una conversación con su mensaje listo para enviar.',
            modal_confirm_important: 'Importante:',
            modal_confirm_text2: 'Si enviará documentos de estudios, deberá adjuntarlos manualmente por WhatsApp una vez que haya enviado el mensaje de texto.',
            modal_confirm_question: '¿Autoriza el envío de su información por este medio?',
            modal_cancel: 'Cancelar',
            modal_accept: 'Aceptar y enviar',
            aria_prev: 'Video anterior',
            aria_next: 'Video siguiente',
            estudios_placeholder: 'Últimos estudios realizados: (Deberán ser adjuntados manualmente por WhatsApp)',
            lang_heading: 'Change language',
            lang_es_full: 'Español',
            lang_en_full: 'English',
            ph_nombre: 'Nombre completo*',
            ph_telefono: 'Número de teléfono (WhatsApp)*',
            ph_preocupaciones: '¿Qué le duele, qué le preocupa o qué quisiera mejorar?*\n- Quiero tener más energía\n- Quiero mejorar mi estado de salud\n- Quiero poder disfrutar de mis nietos',
            ph_diagnostico: 'Diagnóstico*\n- Diabetes\n- Hipertensión\n- Lumbalgia',
            ph_medicamentos: 'Lista de medicamentos y suplementos con dosis*\n- Aspirina 100mg\n- Vitamina C 1000mg\n- Citrato de magnesio 500mg',
            long_title: 'Cuestionario de Longevidad',
            long_subtitle: 'Longevity Score (100 puntos). Instrumento de valoración inicial para conocer hábitos de salud relacionados con nutrición, estilo de vida y prevención.',
            long_datos_title: 'Datos generales',
            long_ph_nombre: 'Nombre',
            long_ph_edad: 'Edad',
            long_ph_fecha: 'Fecha',
            long_ph_profesion: 'Profesión',
            long_ph_contacto: 'WhatsApp',
            long_sexo_placeholder: 'Sexo',
            long_sexo_m: 'Masculino',
            long_sexo_f: 'Femenino',
            long_sexo_o: 'Otro',
            long_sec1: '1. Nutrición metabólica (20 puntos)',
            long_sec2: '2. Actividad física (15 puntos)',
            long_sec3: '3. Sueño y recuperación (10 puntos)',
            long_sec4: '4. Salud metabólica (20 puntos)',
            long_sec5: '5. Estrés y salud mental (10 puntos)',
            long_sec6: '6. Conexión social (5 puntos)',
            long_sec7: '7. Hábitos tóxicos (10 puntos)',
            long_sec8: '8. Composición corporal (5 puntos)',
            long_sec9: '9. Prevención y chequeos médicos (5 puntos)',
            long_q1: '1. ¿Cuántas porciones de frutas y verduras consumes al día?',
            long_q1_a1: '5 o más porciones',
            long_q1_a2: '3 a 4 porciones',
            long_q1_a3: '2 o menos porciones',
            long_q2: '2. ¿Con qué frecuencia consumes alimentos ultraprocesados? (Ejemplo: comida rápida, refrescos, botanas empaquetadas)',
            long_q2_a1: 'Menos de 1 vez por semana',
            long_q2_a2: '2 a 4 veces por semana',
            long_q2_a3: 'Diario',
            long_q3: '3. ¿Con qué frecuencia consumes proteína de buena calidad? (Ejemplo: pescado, pollo, huevos, legumbres)',
            long_q3_a1: 'En cada comida',
            long_q3_a2: '1 a 2 veces al día',
            long_q3_a3: 'Menos de 1 vez al día',
            long_q4: '4. ¿Con qué frecuencia consumes grasas saludables? (Ejemplo: aguacate, aceite de oliva, nueces, semillas)',
            long_q4_a1: 'Diario',
            long_q4_a2: '3 a 4 veces por semana',
            long_q4_a3: 'Rara vez',
            long_q5: '5. ¿Cuántos minutos de ejercicio aeróbico realizas por semana? (Ejemplo: caminar rápido, correr, bicicleta, nadar)',
            long_q5_a1: '150 minutos o más',
            long_q5_a2: 'Entre 90 y 149 minutos',
            long_q5_a3: 'Menos de 90 minutos',
            long_q6: '6. ¿Con qué frecuencia realizas ejercicios de fuerza? (Ejemplo: pesas, ligas de resistencia, ejercicios con el propio peso)',
            long_q6_a1: '2 o más veces por semana',
            long_q6_a2: '1 vez por semana',
            long_q6_a3: 'No realizo ejercicios de fuerza',
            long_q7: '7. ¿Cuántas horas pasas sentado al día?',
            long_q7_a1: 'Menos de 6 horas',
            long_q7_a2: 'Entre 6 y 8 horas',
            long_q7_a3: 'Más de 8 horas',
            long_q8: '8. ¿Cuántas horas duermes en promedio por noche?',
            long_q8_a1: '7 a 8 horas',
            long_q8_a2: '6 o 9 horas',
            long_q8_a3: 'Menos de 6 horas',
            long_q9: '9. ¿Cómo describirías la calidad de tu sueño?',
            long_q9_a1: 'Sueño reparador (me despierto descansado)',
            long_q9_a2: 'A veces se interrumpe durante la noche',
            long_q9_a3: 'Tengo insomnio o duermo mal con frecuencia',
            long_q10: '10. Presión arterial',
            long_q10_a1: 'Menor a 120/80',
            long_q10_a2: 'Entre 120 y 139',
            long_q10_a3: '140 o más',
            long_q11: '11. Glucosa en ayuno',
            long_q11_a1: 'Menor a 100 mg/dL',
            long_q11_a2: 'Entre 100 y 125 mg/dL',
            long_q11_a3: '126 mg/dL o más',
            long_q12: '12. Perfil de colesterol',
            long_q12_a1: 'Normal',
            long_q12_a2: 'Alteración leve',
            long_q12_a3: 'Dislipidemia diagnosticada',
            long_q13: '13. Inflamación (PCR ultrasensible)',
            long_q13_a1: 'Baja',
            long_q13_a2: 'Moderada',
            long_q13_a3: 'Alta',
            long_q14: '14. ¿Cómo describirías tu nivel de estrés en la vida diaria?',
            long_q14_a1: 'Bajo',
            long_q14_a2: 'Moderado',
            long_q14_a3: 'Alto',
            long_q15: '15. ¿Utilizas estrategias para manejar el estrés? (Ejemplo: ejercicio, meditación, terapia, respiración)',
            long_q15_a1: 'Sí, de forma regular',
            long_q15_a2: 'A veces',
            long_q15_a3: 'No utilizo estrategias',
            long_q16: '16. ¿Cómo describirías tu red de apoyo social?',
            long_q16_a1: 'Fuerte (familia o amigos cercanos con quienes puedo contar)',
            long_q16_a2: 'Moderada',
            long_q16_a3: 'Limitada',
            long_q17: '17. Consumo de tabaco',
            long_q17_a1: 'Nunca he fumado',
            long_q17_a2: 'Exfumador',
            long_q17_a3: 'Fumador actual',
            long_q18: '18. Consumo de alcohol',
            long_q18_a1: 'Moderado o nulo',
            long_q18_a2: 'Frecuente',
            long_q18_a3: 'Alto',
            long_q19: '19. Índice de masa corporal o porcentaje de grasa',
            long_q19_a1: 'Normal',
            long_q19_a2: 'Sobrepeso',
            long_q19_a3: 'Obesidad',
            long_q20: '20. ¿Realizas chequeos médicos y estudios de laboratorio cada año?',
            long_q20_a1: 'Sí',
            long_q20_a2: 'A veces',
            long_q20_a3: 'No',
            long_btn_finalizar: 'Finalizar cuestionario y obtener resultado',
            long_result_title: 'Resultado final - Longevity Score',
            long_result_score: 'Puntaje total:',
            long_result_clinic: 'Clínica CAMSA - Medicina Regenerativa y Longevidad',
            long_btn_imagen: 'Guardar imagen',
            long_btn_enviar: 'Enviar por WhatsApp',
            long_aria_close: 'Cerrar cuestionario',
            long_int_90: 'Perfil óptimo de longevidad',
            long_int_80: 'Salud preventiva sólida',
            long_int_70: 'Riesgo metabólico moderado',
            long_int_60: 'Requiere intervención preventiva',
            long_int_0: 'Riesgo cardiometabólico elevado'
        },
        en: {
            nav_inicio: 'Home',
            nav_protocolo: 'Protocol',
            nav_pacientes: 'Patients',
            nav_formulario: 'Form',
            hero_line1: 'This could be your',
            hero_line2: 'best decade',
            hero_description: 'Regenerate your body at the cellular level, optimize your systemic health and extend your years of vitality with cutting-edge science.',
            hero_cta: 'Request a personalized protocol',
            plan_text: 'Comprehensive Regenerative Medicine and Longevity Plan with Stem Cells',
            carousel_top: 'AGE AND ILLNESS DON\'T MATTER, YOU CAN HAVE QUALITY OF LIFE.',
            carousel_bottom: 'YOU CAN HAVE QUALITY OF LIFE. AGE AND ILLNESS DON\'T MATTER,',
            protocolo_title: 'The path to your',
            protocolo_title_br: ' quality of life',
            protocolo_highlight: 'in 6 steps',
            protocolo_subtitle: 'Each phase adapts to each patient\'s personalized protocol',
            cta_testimonios: 'Watch testimonials',
            cta_protocolo: 'Request a personalized protocol',
            pacientes_title1: 'International patients',
            pacientes_title2: 'trust',
            pacientes_title3: 'us',
            pacientes_description: 'Our international patients trust our protocols and travel from their countries to improve their quality of life at Clínica Camsa',
            cta_experiencias: 'Watch experiences',
            testimonios_title: 'The voice of our',
            testimonios_title_hl: 'patients',
            testimonios_subtitle: 'Discover their stories and let yours become part of them',
            formulario_title: 'Request a',
            formulario_title_hl: 'personalized protocol',
            formulario_description: 'Choose how you want to start: you can submit your protocol request, complete the longevity questionnaire, or do both independently.',
            card_longevidad_title: 'Longevity questionnaire',
            card_longevidad_text: 'Evaluate your health habits, sleep, nutrition and prevention to get your Longevity Score.',
            card_longevidad_li1: 'Can be completed independently.',
            card_longevidad_li2: 'Complements the protocol request.',
            card_longevidad_btn: 'Complete questionnaire',
            banner_title: 'IF YOU ARE A CAMSA PATIENT, DISCOVER YOUR EXCLUSIVE BENEFITS',
            banner_btn: 'Log in',
            banner_note: '*Request your access at reception',
            form_legend: '*Required fields',
            btn_enviar_wa: 'Send via WhatsApp',
            modal_confirm_title: 'Confirm send',
            modal_confirm_text1: 'The information entered will be sent via WhatsApp. A conversation will open with your message ready to send.',
            modal_confirm_important: 'Important:',
            modal_confirm_text2: 'If you will send study documents, you must attach them manually via WhatsApp after sending the text message.',
            modal_confirm_question: 'Do you authorize sending your information through this channel?',
            modal_cancel: 'Cancel',
            modal_accept: 'Accept and send',
            aria_prev: 'Previous video',
            aria_next: 'Next video',
            estudios_placeholder: 'Latest studies: (Must be attached manually via WhatsApp)',
            lang_heading: 'Cambiar idioma',
            lang_es_full: 'Español',
            lang_en_full: 'English',
            ph_nombre: 'Full name*',
            ph_telefono: 'Phone number (WhatsApp)*',
            ph_preocupaciones: 'What hurts, worries you or would you like to improve?*\n- I want more energy\n- I want to improve my health\n- I want to enjoy time with my grandchildren',
            ph_diagnostico: 'Diagnosis*\n- Diabetes\n- Hypertension\n- Low back pain',
            ph_medicamentos: 'List of medications and supplements with dosage*\n- Aspirin 100mg\n- Vitamin C 1000mg\n- Magnesium citrate 500mg',
            long_title: 'Longevity Questionnaire',
            long_subtitle: 'Longevity Score (100 points). Initial assessment tool to understand health habits related to nutrition, lifestyle and prevention.',
            long_datos_title: 'General information',
            long_ph_nombre: 'Name',
            long_ph_edad: 'Age',
            long_ph_fecha: 'Date',
            long_ph_profesion: 'Occupation',
            long_ph_contacto: 'WhatsApp',
            long_sexo_placeholder: 'Gender',
            long_sexo_m: 'Male',
            long_sexo_f: 'Female',
            long_sexo_o: 'Other',
            long_sec1: '1. Metabolic nutrition (20 points)',
            long_sec2: '2. Physical activity (15 points)',
            long_sec3: '3. Sleep and recovery (10 points)',
            long_sec4: '4. Metabolic health (20 points)',
            long_sec5: '5. Stress and mental health (10 points)',
            long_sec6: '6. Social connection (5 points)',
            long_sec7: '7. Harmful habits (10 points)',
            long_sec8: '8. Body composition (5 points)',
            long_sec9: '9. Prevention and medical check-ups (5 points)',
            long_q1: '1. How many servings of fruits and vegetables do you eat per day?',
            long_q1_a1: '5 or more servings',
            long_q1_a2: '3 to 4 servings',
            long_q1_a3: '2 or fewer servings',
            long_q2: '2. How often do you eat ultra-processed foods? (e.g. fast food, sodas, packaged snacks)',
            long_q2_a1: 'Less than once a week',
            long_q2_a2: '2 to 4 times per week',
            long_q2_a3: 'Daily',
            long_q3: '3. How often do you eat quality protein? (e.g. fish, chicken, eggs, legumes)',
            long_q3_a1: 'At every meal',
            long_q3_a2: '1 to 2 times per day',
            long_q3_a3: 'Less than once a day',
            long_q4: '4. How often do you eat healthy fats? (e.g. avocado, olive oil, nuts, seeds)',
            long_q4_a1: 'Daily',
            long_q4_a2: '3 to 4 times per week',
            long_q4_a3: 'Rarely',
            long_q5: '5. How many minutes of aerobic exercise do you do per week? (e.g. brisk walking, running, cycling, swimming)',
            long_q5_a1: '150 minutes or more',
            long_q5_a2: '90 to 149 minutes',
            long_q5_a3: 'Less than 90 minutes',
            long_q6: '6. How often do you do strength exercises? (e.g. weights, resistance bands, bodyweight)',
            long_q6_a1: '2 or more times per week',
            long_q6_a2: 'Once a week',
            long_q6_a3: 'I do not do strength exercises',
            long_q7: '7. How many hours do you sit per day?',
            long_q7_a1: 'Less than 6 hours',
            long_q7_a2: '6 to 8 hours',
            long_q7_a3: 'More than 8 hours',
            long_q8: '8. How many hours do you sleep on average per night?',
            long_q8_a1: '7 to 8 hours',
            long_q8_a2: '6 or 9 hours',
            long_q8_a3: 'Less than 6 hours',
            long_q9: '9. How would you describe your sleep quality?',
            long_q9_a1: 'Restorative (I wake up rested)',
            long_q9_a2: 'Sometimes interrupted during the night',
            long_q9_a3: 'I have insomnia or sleep poorly often',
            long_q10: '10. Blood pressure',
            long_q10_a1: 'Below 120/80',
            long_q10_a2: 'Between 120 and 139',
            long_q10_a3: '140 or above',
            long_q11: '11. Fasting glucose',
            long_q11_a1: 'Below 100 mg/dL',
            long_q11_a2: 'Between 100 and 125 mg/dL',
            long_q11_a3: '126 mg/dL or above',
            long_q12: '12. Cholesterol profile',
            long_q12_a1: 'Normal',
            long_q12_a2: 'Mild alteration',
            long_q12_a3: 'Diagnosed dyslipidemia',
            long_q13: '13. Inflammation (ultrasensitive CRP)',
            long_q13_a1: 'Low',
            long_q13_a2: 'Moderate',
            long_q13_a3: 'High',
            long_q14: '14. How would you describe your daily stress level?',
            long_q14_a1: 'Low',
            long_q14_a2: 'Moderate',
            long_q14_a3: 'High',
            long_q15: '15. Do you use strategies to manage stress? (e.g. exercise, meditation, therapy, breathing)',
            long_q15_a1: 'Yes, regularly',
            long_q15_a2: 'Sometimes',
            long_q15_a3: 'I do not use strategies',
            long_q16: '16. How would you describe your social support network?',
            long_q16_a1: 'Strong (family or close friends I can count on)',
            long_q16_a2: 'Moderate',
            long_q16_a3: 'Limited',
            long_q17: '17. Tobacco use',
            long_q17_a1: 'I have never smoked',
            long_q17_a2: 'Former smoker',
            long_q17_a3: 'Current smoker',
            long_q18: '18. Alcohol consumption',
            long_q18_a1: 'Moderate or none',
            long_q18_a2: 'Frequent',
            long_q18_a3: 'High',
            long_q19: '19. Body mass index or body fat percentage',
            long_q19_a1: 'Normal',
            long_q19_a2: 'Overweight',
            long_q19_a3: 'Obesity',
            long_q20: '20. Do you have medical check-ups and lab tests every year?',
            long_q20_a1: 'Yes',
            long_q20_a2: 'Sometimes',
            long_q20_a3: 'No',
            long_btn_finalizar: 'Complete questionnaire and get result',
            long_result_title: 'Final result - Longevity Score',
            long_result_score: 'Total score:',
            long_result_clinic: 'Clínica CAMSA - Regenerative Medicine and Longevity',
            long_btn_imagen: 'Save image',
            long_btn_enviar: 'Send via WhatsApp',
            long_aria_close: 'Close questionnaire',
            long_int_90: 'Optimal longevity profile',
            long_int_80: 'Solid preventive health',
            long_int_70: 'Moderate metabolic risk',
            long_int_60: 'Requires preventive intervention',
            long_int_0: 'Elevated cardiometabolic risk'
        }
    };

    function getPreferredLang() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'es' || stored === 'en') return stored;
        var browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browser.indexOf('en') === 0) return 'en';
        return 'es';
    }

    function applyLanguage(lang) {
        lang = (lang === 'en' || lang === 'es') ? lang : 'es';
        var L = t[lang];
        if (!L) L = t.es;
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (L[key] !== undefined) el.textContent = L[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (L[key] !== undefined) el.placeholder = L[key];
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-aria-label');
            if (L[key] !== undefined) el.setAttribute('aria-label', L[key]);
        });

        // Imágenes ES/EN (usan el mapa de recursos en assets.js)
        // Carrusel de texto (card-carousel)
        var cardImg = document.querySelector('.card-image[data-rs]');
        if (cardImg) cardImg.setAttribute('data-rs', lang === 'en' ? 'iv_en' : 'iv');

        // Pacientes (doctor)
        var doctorImg = document.querySelector('.doctor-image[data-rs]');
        if (doctorImg) doctorImg.setAttribute('data-rs', lang === 'en' ? 'id_en' : 'id');

        // Protocolo (pasos 01-06)
        var stepImgs = document.querySelectorAll('.steps-grid .step-image[data-rs]');
        stepImgs.forEach(function(img) {
            var k = img.getAttribute('data-rs');
            if (!k) return;
            if (k === 's1') img.setAttribute('data-rs', lang === 'en' ? 's1_en' : 's1');
            else if (k === 's2') img.setAttribute('data-rs', lang === 'en' ? 's2_en' : 's2');
            else if (k === 's3') img.setAttribute('data-rs', lang === 'en' ? 's3_en' : 's3');
            else if (k === 's4') img.setAttribute('data-rs', lang === 'en' ? 's4_en' : 's4');
            else if (k === 's5') img.setAttribute('data-rs', lang === 'en' ? 's5_en' : 's5');
            else if (k === 's6') img.setAttribute('data-rs', lang === 'en' ? 's6_en' : 's6');
            // Si ya están en _en, también soportar el regreso a ES:
            else if (k === 's1_en') img.setAttribute('data-rs', lang === 'en' ? 's1_en' : 's1');
            else if (k === 's2_en') img.setAttribute('data-rs', lang === 'en' ? 's2_en' : 's2');
            else if (k === 's3_en') img.setAttribute('data-rs', lang === 'en' ? 's3_en' : 's3');
            else if (k === 's4_en') img.setAttribute('data-rs', lang === 'en' ? 's4_en' : 's4');
            else if (k === 's5_en') img.setAttribute('data-rs', lang === 'en' ? 's5_en' : 's5');
            else if (k === 's6_en') img.setAttribute('data-rs', lang === 'en' ? 's6_en' : 's6');
        });

        // Reaplicar recursos a partir de data-rs
        if (typeof window.applySecureAssets === 'function') {
            window.applySecureAssets();
        } else if (typeof window.__rs === 'function') {
            document.querySelectorAll('img[data-rs], source[data-rs]').forEach(function(el) {
                var key = el.getAttribute('data-rs');
                var v = window.__rs(key);
                if (v) el.src = v;
            });
        }

        // Modal WhatsApp (textos que no están en data-i18n porque están en modales)
        var modalTitle = document.getElementById('modal-whatsapp-title');
        if (modalTitle && L.modal_confirm_title) modalTitle.textContent = L.modal_confirm_title;
        var modalTexts = document.querySelectorAll('#modal-whatsapp .modal-text');
        if (modalTexts.length >= 3 && L.modal_confirm_text1 && L.modal_confirm_text2 && L.modal_confirm_question) {
            modalTexts[0].textContent = L.modal_confirm_text1;
            modalTexts[1].innerHTML = (L.modal_confirm_important ? '<strong>' + L.modal_confirm_important + '</strong> ' : '') + L.modal_confirm_text2;
            modalTexts[2].textContent = L.modal_confirm_question;
        }
        var btnCancel = document.querySelector('#modal-whatsapp .modal-btn-cancel');
        var btnConfirm = document.querySelector('#modal-whatsapp .modal-btn-confirm');
        if (btnCancel && L.modal_cancel) btnCancel.textContent = L.modal_cancel;
        if (btnConfirm && L.modal_accept) btnConfirm.textContent = L.modal_accept;

        // Estudios readonly input
        var estudiosInput = document.getElementById('estudios');
        if (estudiosInput && L.estudios_placeholder) estudiosInput.value = L.estudios_placeholder;

        // Modal Cuestionario de Longevidad
        var modalLong = document.getElementById('modal-longevity');
        if (modalLong && L.long_title) {
            var titleEl = document.getElementById('modal-longevity-title');
            if (titleEl) titleEl.textContent = L.long_title;
            var subEl = modalLong.querySelector('.longevity-subtitle');
            if (subEl) subEl.textContent = L.long_subtitle;
            var datosTitles = modalLong.querySelectorAll('.longevity-datos .longevity-section-title');
            if (datosTitles.length) datosTitles[0].textContent = L.long_datos_title;
            var ln = document.getElementById('long-nombre');
            var le = document.getElementById('long-edad');
            var lf = document.getElementById('long-fecha');
            var lp = document.getElementById('long-profesion');
            var lc = document.getElementById('long-contacto');
            if (ln && L.long_ph_nombre) ln.placeholder = L.long_ph_nombre;
            if (le && L.long_ph_edad) le.placeholder = L.long_ph_edad;
            if (lf && L.long_ph_fecha) lf.placeholder = L.long_ph_fecha;
            if (lp && L.long_ph_profesion) lp.placeholder = L.long_ph_profesion;
            if (lc && L.long_ph_contacto) lc.placeholder = L.long_ph_contacto;
            var sexSelect = document.getElementById('long-sexo');
            if (sexSelect) {
                var opts = sexSelect.querySelectorAll('option');
                if (opts.length >= 4) {
                    opts[0].textContent = L.long_sexo_placeholder || '';
                    opts[1].textContent = L.long_sexo_m || '';
                    opts[2].textContent = L.long_sexo_f || '';
                    opts[3].textContent = L.long_sexo_o || '';
                }
            }
            var sectionTitles = modalLong.querySelectorAll('.longevity-questions .longevity-section-title');
            var secKeys = ['long_sec1', 'long_sec2', 'long_sec3', 'long_sec4', 'long_sec5', 'long_sec6', 'long_sec7', 'long_sec8', 'long_sec9'];
            sectionTitles.forEach(function(h, i) {
                if (L[secKeys[i]]) h.textContent = L[secKeys[i]];
            });
            for (var q = 1; q <= 20; q++) {
                var fs = modalLong.querySelector('.longevity-fieldset[data-q="' + q + '"]');
                if (!fs) continue;
                var leg = fs.querySelector('legend');
                if (leg && L['long_q' + q]) {
                    leg.textContent = L['long_q' + q];
                    fs.setAttribute('data-question', L['long_q' + q]);
                }
                var labels = fs.querySelectorAll('label');
                ['_a1', '_a2', '_a3'].forEach(function(suffix, idx) {
                    var key = 'long_q' + q + suffix;
                    if (labels[idx] && L[key]) {
                        var inp = labels[idx].querySelector('input');
                        if (inp) {
                            inp.setAttribute('data-answer', L[key]);
                            var textNode = inp.nextSibling;
                            if (textNode && textNode.nodeType === 3) textNode.textContent = ' ' + L[key];
                            else {
                                while (labels[idx].lastChild !== inp) labels[idx].removeChild(labels[idx].lastChild);
                                labels[idx].appendChild(document.createTextNode(' ' + L[key]));
                            }
                        }
                    }
                });
            }
            var btnFin = document.getElementById('btn-longevity-finalizar');
            if (btnFin && L.long_btn_finalizar) btnFin.textContent = L.long_btn_finalizar;
            var resultTitle = modalLong.querySelector('.longevity-result-title');
            if (resultTitle && L.long_result_title) resultTitle.textContent = L.long_result_title;
            var resultScore = modalLong.querySelector('.longevity-result-score');
            if (resultScore && L.long_result_score) {
                var totalEl = document.getElementById('longevity-total');
                var totalVal = totalEl ? totalEl.textContent : '0';
                resultScore.innerHTML = L.long_result_score + ' <strong id="longevity-total">' + totalVal + '</strong> / 100';
            }
            var resultClinic = modalLong.querySelector('.longevity-result-clinic');
            if (resultClinic && L.long_result_clinic) resultClinic.textContent = L.long_result_clinic;
            var btnImg = document.getElementById('btn-longevity-imagen');
            var btnEnv = document.getElementById('btn-longevity-enviar');
            if (btnImg && L.long_btn_imagen) btnImg.textContent = L.long_btn_imagen;
            if (btnEnv && L.long_btn_enviar) btnEnv.textContent = L.long_btn_enviar;
            var closeBtn = document.getElementById('modal-longevity-close');
            if (closeBtn && L.long_aria_close) closeBtn.setAttribute('aria-label', L.long_aria_close);
            var resultBlock = modalLong.querySelector('#longevity-result');
            if (resultBlock && !resultBlock.hasAttribute('hidden')) {
                var totalEl = document.getElementById('longevity-total');
                var interpEl = document.getElementById('longevity-interpretacion');
                if (totalEl && interpEl && typeof window.getLongevityInterpretacionText === 'function') {
                    var totalScore = parseInt(totalEl.textContent, 10) || 0;
                    interpEl.textContent = window.getLongevityInterpretacionText(totalScore, lang);
                }
            }
        }

        localStorage.setItem(STORAGE_KEY, lang);

        // Actualizar estado del botón de idioma
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            var l = btn.getAttribute('data-lang');
            btn.classList.toggle('active', l === lang);
            btn.setAttribute('aria-pressed', l === lang ? 'true' : 'false');
        });
    }

    window.applyLanguage = applyLanguage;

    function initI18n() {
        var lang = getPreferredLang();
        try {
            applyLanguage(lang);
        } catch (err) {
            console.warn('i18n applyLanguage:', err);
        }

        function findLangBtn(node) {
            var n = node;
            while (n && n !== document.body) {
                if (n.nodeType === 1 && n.classList && n.classList.contains('lang-btn')) return n;
                n = n.parentNode;
            }
            return null;
        }

        document.addEventListener('click', function(e) {
            var btn = findLangBtn(e.target);
            if (!btn) return;
            var l = (btn.getAttribute('data-lang') || '').trim();
            if (l !== 'es' && l !== 'en') return;
            e.preventDefault();
            e.stopPropagation();
            try {
                applyLanguage(l);
            } catch (err) {
                console.warn('i18n applyLanguage:', err);
            }
        }, true);

        var langSwitcher = document.querySelector('.lang-switcher');
        if (langSwitcher) {
            langSwitcher.addEventListener('click', function(e) {
                var btn = findLangBtn(e.target);
                if (!btn) return;
                var l = (btn.getAttribute('data-lang') || '').trim();
                if (l !== 'es' && l !== 'en') return;
                e.preventDefault();
                e.stopPropagation();
                try {
                    applyLanguage(l);
                } catch (err) {
                    console.warn('i18n applyLanguage:', err);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }

    function getLongevityInterpretacionText(total, langOverride) {
        var lang = langOverride || getPreferredLang();
        var L = t[lang];
        if (!L) return '';
        if (total >= 90) return L.long_int_90 || '';
        if (total >= 80) return L.long_int_80 || '';
        if (total >= 70) return L.long_int_70 || '';
        if (total >= 60) return L.long_int_60 || '';
        return L.long_int_0 || '';
    }

    window.getPreferredLang = getPreferredLang;
    window.getLongevityInterpretacionText = getLongevityInterpretacionText;
})();
