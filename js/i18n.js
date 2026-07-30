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
            formulario_description: 'Cuéntanos qué te preocupa y envía tu solicitud. Como apoyo adicional, ponemos a tu disposición herramientas complementarias, como cuestionarios de longevidad, evaluaciones de hábitos de vida y una calculadora de función renal. Su uso es completamente opcional y está pensado para enriquecer tu valoración.',
            card_longevidad_title: 'Cuestionario de hábitos y longevidad',
            card_longevidad_text: 'Preguntas sencillas sobre cómo duermes, qué comes, cómo te mueves y qué haces para cuidarte. Al terminar obtienes una puntuación que resume tu estilo de vida.',
            card_longevidad_li1: 'No necesitas llenar antes el formulario de arriba.',
            card_longevidad_li2: 'Si ya enviaste tu solicitud, esto ayuda a que el equipo te conozca mejor.',
            card_longevidad_btn: 'Empezar cuestionario',
            form_page_back: 'Volver al inicio',
            tests_promo_fab: 'Realiza un test de salud',
            tests_promo_fab_sub: 'Gratis',
            tests_promo_fab_sub2: 'Resultados al instante',
            tests_promo_badge: 'Evalúate',
            tests_promo_title: '¿Cómo está tu salud hoy?',
            tests_promo_subtitle: 'Cuestionarios gratuitos para ti o un familiar. Resultado al instante.',
            tests_promo_long: 'Hábitos y longevidad',
            tests_promo_horm_mujer: 'Hormonal — Mujer',
            tests_promo_horm_hombre: 'Hormonal — Hombre',
            tests_promo_tfg: 'Salud renal',
            tests_promo_cta: 'Empezar cuestionario',
            tests_promo_cta_all: 'Ver todos los tests',
            tests_promo_here: 'Aquí',
            hormonal_chart_title: 'Resumen semáforo',
            hormonal_chart_green: 'Verde — Satisfactorio',
            hormonal_chart_yellow: 'Amarillo — Alterado',
            hormonal_chart_red: 'Rojo — Deficiente',
            hormonal_chart_empty: 'Sin hormonas evaluadas',
            card_horm_mujer_title: 'Cuestionario hormonal — Mujer',
            card_horm_mujer_text: 'Preguntas sobre cómo te sientes en el día a día: energía, sueño, ánimo, cambios del ciclo y más. No reemplaza una consulta médica; sirve para orientar la conversación con tu doctor.',
            card_horm_mujer_li1: 'Temas como cansancio, estrés, tiroides, menopausia y otros, en lenguaje cotidiano.',
            card_horm_mujer_li2: 'Hay preguntas opcionales sobre tu menstruación o tratamientos hormonales, si aplica.',
            card_horm_hombre_title: 'Cuestionario hormonal — Hombre',
            card_horm_hombre_text: 'Preguntas sobre energía, sueño, ánimo, peso y otros síntomas habituales. No es un diagnóstico: ayuda a ver qué conviene revisar con un especialista.',
            card_horm_hombre_li1: 'Incluye temas como estrés, libido, presión y metabolismo, explicados de forma sencilla.',
            card_horm_hombre_li2: 'Puedes usarlo aunque ya llenaste el cuestionario de hábitos o el formulario de arriba.',
            card_horm_btn: 'Empezar cuestionario',
            card_tfg_title: 'Calculadora de salud renal',
            card_tfg_text: 'Si tienes un análisis de sangre con creatinina, aquí puedes estimar qué tan bien están filtrando tus riñones y ver una explicación clara del resultado.',
            card_tfg_li1: 'Solo necesitas tu edad, sexo y el número de creatinina de tu laboratorio.',
            card_tfg_li2: 'Te mostramos el resultado con colores y en palabras fáciles de entender.',
            card_tfg_btn: 'Abrir calculadora',
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
            long_title: 'Cuestionario de hábitos y longevidad',
            long_subtitle: 'Responde con sinceridad sobre tu día a día. No hay respuestas buenas o malas: al final verás una puntuación de 0 a 100 que resume tus hábitos. Tu médico puede usarla como punto de partida.',
            long_datos_title: 'Tus datos (opcional)',
            long_datos_intro: 'Sirven para identificarte en el resultado. Puedes pasar directo a las preguntas si lo prefieres.',
            long_ph_nombre: 'Nombre',
            long_ph_edad: 'Edad',
            long_ph_fecha: 'Fecha',
            long_ph_profesion: 'Profesión',
            long_ph_contacto: 'WhatsApp',
            long_sexo_placeholder: 'Sexo',
            long_sexo_m: 'Masculino',
            long_sexo_f: 'Femenino',
            long_sexo_o: 'Otro',
            long_sec1: '1. Cómo comes (20 pts)',
            long_sec2: '2. Movimiento (15 pts)',
            long_sec3: '3. Sueño (10 pts)',
            long_sec4: '4. Metabólico (20 pts)',
            long_sec5: '5. Estrés (10 pts)',
            long_sec6: '6. Apoyo social (5 pts)',
            long_sec7: '7. Tabaco y alcohol (10 pts)',
            long_sec8: '8. Peso corporal (5 pts)',
            long_sec9: '9. Chequeos (5 pts)',
            long_q1: '1. Frutas y verduras al día (ej. manzana, jitomate, ensalada)',
            long_q1_a1: '5 o más',
            long_q1_a2: '3 a 4',
            long_q1_a3: '2 o menos',
            long_q2: '2. Alimentos ultraprocesados (ej. comida rápida, refrescos, botanas)',
            long_q2_a1: 'Menos de 1 vez/semana',
            long_q2_a2: '2 a 4 veces/semana',
            long_q2_a3: 'Diario',
            long_q3: '3. Proteína de calidad (ej. pescado, pollo, huevo, frijoles)',
            long_q3_a1: 'En cada comida',
            long_q3_a2: '1 a 2 veces/día',
            long_q3_a3: 'Menos de 1 vez/día',
            long_q4: '4. Grasas saludables (ej. aguacate, aceite de oliva, nueces)',
            long_q4_a1: 'Diario',
            long_q4_a2: '3 a 4 veces/semana',
            long_q4_a3: 'Rara vez',
            long_q5: '5. Ejercicio aeróbico semanal (ej. caminar, nadar, bicicleta)',
            long_q5_a1: '150 min o más',
            long_q5_a2: '90 a 149 min',
            long_q5_a3: 'Menos de 90 min',
            long_q6: '6. Ejercicio de fuerza (ej. pesas, bandas elásticas)',
            long_q6_a1: '2+ veces/semana',
            long_q6_a2: '1 vez/semana',
            long_q6_a3: 'No hago fuerza',
            long_q7: '7. Horas sentado al día',
            long_q7_a1: 'Menos de 6 h',
            long_q7_a2: '6 a 8 h',
            long_q7_a3: 'Más de 8 h',
            long_q8: '8. Horas de sueño por noche',
            long_q8_a1: '7 a 8 h',
            long_q8_a2: '6 o 9 h',
            long_q8_a3: 'Menos de 6 h',
            long_q9: '9. Calidad del sueño',
            long_q9_a1: 'Reparador',
            long_q9_a2: 'A veces interrumpido',
            long_q9_a3: 'Insomnio o mal sueño',
            long_q10: '10. Presión arterial (último control médico)',
            long_q10_a1: '< 120/80',
            long_q10_a2: '120 a 139',
            long_q10_a3: '140+',
            long_q11: '11. Glucosa en ayuno (análisis de sangre)',
            long_q11_a1: '< 100 mg/dL',
            long_q11_a2: '100-125 mg/dL',
            long_q11_a3: '126+ mg/dL',
            long_q12: '12. Colesterol (según tu doctor o estudio)',
            long_q12_a1: 'Normal',
            long_q12_a2: 'Alteración leve',
            long_q12_a3: 'Colesterol alto',
            long_q13: '13. Inflamación — PCR (proteína C reactiva, en sangre)',
            long_q13_a1: 'Baja',
            long_q13_a2: 'Moderada',
            long_q13_a3: 'Alta',
            long_q14: '14. Estrés diario',
            long_q14_a1: 'Bajo',
            long_q14_a2: 'Moderado',
            long_q14_a3: 'Alto',
            long_q15: '15. Manejo del estrés (ej. caminar, meditar, platicar)',
            long_q15_a1: 'Sí, regular',
            long_q15_a2: 'A veces',
            long_q15_a3: 'No uso estrategias',
            long_q16: '16. Apoyo social (familia o amigos cercanos)',
            long_q16_a1: 'Fuerte',
            long_q16_a2: 'Moderado',
            long_q16_a3: 'Limitado',
            long_q17: '17. Tabaco',
            long_q17_a1: 'Nunca fumé',
            long_q17_a2: 'Exfumador',
            long_q17_a3: 'Fumador actual',
            long_q18: '18. Alcohol (copas por semana)',
            long_q18_a1: 'Moderado o nulo',
            long_q18_a2: 'Frecuente',
            long_q18_a3: 'Alto',
            long_q19: '19. Peso corporal — IMC (según tu médico)',
            long_q19_a1: 'Normal',
            long_q19_a2: 'Sobrepeso',
            long_q19_a3: 'Obesidad',
            long_q20: '20. Chequeos anuales (doctor y laboratorio)',
            long_q20_a1: 'Sí',
            long_q20_a2: 'A veces',
            long_q20_a3: 'No',
            long_btn_finalizar: 'Ver mi puntuación',
            long_result_title: 'Tu resumen de hábitos',
            long_score_label: 'Longevity Score',
            long_score_clinic: 'Clínica CAMSA',
            long_score_max: 'de 100',
            long_tier_90: 'Perfil óptimo',
            long_tier_80: 'Preventiva sólida',
            long_tier_70: 'Mejora posible',
            long_tier_60: 'Atención preventiva',
            long_tier_0: 'Priorizar cambios',
            long_result_note: 'Orientación general. No sustituye una consulta ni estudios de laboratorio.',
            long_result_clinic: 'Clínica CAMSA · Medicina Regenerativa y Longevidad',
            long_btn_imagen: 'Guardar imagen',
            long_btn_compartir: 'Compartir cuestionario',
            long_btn_compartir_title: 'Comparte el enlace del cuestionario por WhatsApp para que otra persona lo complete.',
            long_btn_enviar: 'Enviar resultados',
            long_btn_enviar_title: 'Envía tus respuestas completadas a la clínica por WhatsApp.',
            form_btn_restart: 'Realizar nuevamente',
            form_btn_restart_title: 'Borrar lo guardado y empezar de nuevo (para ti o un familiar).',
            long_aria_close: 'Cerrar cuestionario',
            long_int_90: '¡Muy bien! Tus hábitos van encaminados a una buena calidad de vida.',
            long_int_80: 'Vas por buen camino. Sigue reforzando lo que ya haces bien.',
            long_int_70: 'Hay margen de mejora. Pequeños cambios pueden marcar diferencia.',
            long_int_60: 'Conviene revisar hábitos con tu médico y plantear un plan preventivo.',
            long_int_0: 'Es importante priorizar cambios de estilo de vida y valoración médica.',
            persist_continue: 'Continuar donde lo dejé',
            persist_discard: 'Descartar y empezar de nuevo',
            persist_restored: 'Progreso recuperado. Sus respuestas se restauraron automáticamente.'
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
            formulario_description: 'Tell us what concerns you and send your request. As additional support, we offer complementary tools such as longevity questionnaires, lifestyle habit assessments, and a kidney function calculator. Their use is completely optional and is designed to enrich your evaluation.',
            card_longevidad_title: 'Habits and longevity questionnaire',
            card_longevidad_text: 'Simple questions about how you sleep, eat, move, and take care of yourself. When you finish, you get a score that summarizes your lifestyle.',
            card_longevidad_li1: 'You do not need to fill out the form above first.',
            card_longevidad_li2: 'If you already sent your request, this helps our team know you better.',
            card_longevidad_btn: 'Start questionnaire',
            form_page_back: 'Back to home',
            tests_promo_fab: 'Take a health test',
            tests_promo_fab_sub: 'Free',
            tests_promo_fab_sub2: 'Instant results',
            tests_promo_badge: 'Take the test',
            tests_promo_title: 'How is your health today?',
            tests_promo_subtitle: 'Free questionnaires for you or a family member. Instant results.',
            tests_promo_long: 'Habits & longevity',
            tests_promo_horm_mujer: 'Hormonal — Women',
            tests_promo_horm_hombre: 'Hormonal — Men',
            tests_promo_tfg: 'Kidney health',
            tests_promo_cta: 'Start questionnaire',
            tests_promo_cta_all: 'See all tests',
            tests_promo_here: 'Here',
            hormonal_chart_title: 'Traffic-light summary',
            hormonal_chart_green: 'Green — Satisfactory',
            hormonal_chart_yellow: 'Yellow — Altered',
            hormonal_chart_red: 'Red — Deficient',
            hormonal_chart_empty: 'No hormones evaluated',
            card_horm_mujer_title: 'Hormonal questionnaire — Women',
            card_horm_mujer_text: 'Questions about how you feel day to day: energy, sleep, mood, cycle changes, and more. This is not a diagnosis; it helps guide the conversation with your doctor.',
            card_horm_mujer_li1: 'Topics like tiredness, stress, thyroid, menopause, and more in everyday language.',
            card_horm_mujer_li2: 'Optional questions about your period or hormone treatments, if they apply to you.',
            card_horm_hombre_title: 'Hormonal questionnaire — Men',
            card_horm_hombre_text: 'Questions about energy, sleep, mood, weight, and other common symptoms. This is not a diagnosis; it helps see what is worth reviewing with a specialist.',
            card_horm_hombre_li1: 'Topics like stress, libido, blood pressure, and metabolism explained in plain terms.',
            card_horm_hombre_li2: 'You can use it even if you already completed the habits questionnaire or the form above.',
            card_horm_btn: 'Start questionnaire',
            card_tfg_title: 'Kidney health calculator',
            card_tfg_text: 'If you have a blood test with creatinine, you can estimate how well your kidneys are filtering and see a clear explanation of the result.',
            card_tfg_li1: 'You only need your age, sex, and the creatinine number from your lab report.',
            card_tfg_li2: 'We show the result with colors and easy-to-understand wording.',
            card_tfg_btn: 'Open calculator',
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
            long_title: 'Habits and longevity questionnaire',
            long_subtitle: 'Answer honestly about your daily life. There are no right or wrong answers: at the end you will see a score from 0 to 100 that summarizes your habits. Your doctor can use it as a starting point.',
            long_datos_title: 'Your details (optional)',
            long_datos_intro: 'Used to identify you on the result. You can skip to the questions if you prefer.',
            long_ph_nombre: 'Name',
            long_ph_edad: 'Age',
            long_ph_fecha: 'Date',
            long_ph_profesion: 'Occupation',
            long_ph_contacto: 'WhatsApp',
            long_sexo_placeholder: 'Gender',
            long_sexo_m: 'Male',
            long_sexo_f: 'Female',
            long_sexo_o: 'Other',
            long_sec1: '1. How you eat (20 pts)',
            long_sec2: '2. Movement (15 pts)',
            long_sec3: '3. Sleep (10 pts)',
            long_sec4: '4. Metabolic (20 pts)',
            long_sec5: '5. Stress (10 pts)',
            long_sec6: '6. Social support (5 pts)',
            long_sec7: '7. Tobacco and alcohol (10 pts)',
            long_sec8: '8. Body weight (5 pts)',
            long_sec9: '9. Check-ups (5 pts)',
            long_q1: '1. Fruits and vegetables daily (e.g. apple, salad)',
            long_q1_a1: '5 or more',
            long_q1_a2: '3 to 4',
            long_q1_a3: '2 or fewer',
            long_q2: '2. Ultra-processed foods (e.g. fast food, soda, chips)',
            long_q2_a1: 'Less than once/week',
            long_q2_a2: '2-4 times/week',
            long_q2_a3: 'Daily',
            long_q3: '3. Quality protein (e.g. fish, chicken, egg, beans)',
            long_q3_a1: 'Every meal',
            long_q3_a2: '1-2 times/day',
            long_q3_a3: 'Less than once/day',
            long_q4: '4. Healthy fats (e.g. avocado, olive oil, nuts)',
            long_q4_a1: 'Daily',
            long_q4_a2: '3-4 times/week',
            long_q4_a3: 'Rarely',
            long_q5: '5. Weekly aerobic exercise (e.g. walking, swimming, cycling)',
            long_q5_a1: '150+ min',
            long_q5_a2: '90-149 min',
            long_q5_a3: 'Under 90 min',
            long_q6: '6. Strength exercise (e.g. weights, resistance bands)',
            long_q6_a1: '2+ times/week',
            long_q6_a2: 'Once/week',
            long_q6_a3: 'No strength training',
            long_q7: '7. Hours sitting daily',
            long_q7_a1: 'Under 6 h',
            long_q7_a2: '6-8 h',
            long_q7_a3: 'Over 8 h',
            long_q8: '8. Sleep hours per night',
            long_q8_a1: '7-8 h',
            long_q8_a2: '6 or 9 h',
            long_q8_a3: 'Under 6 h',
            long_q9: '9. Sleep quality',
            long_q9_a1: 'Restorative',
            long_q9_a2: 'Sometimes interrupted',
            long_q9_a3: 'Insomnia or poor sleep',
            long_q10: '10. Blood pressure (last check-up)',
            long_q10_a1: '< 120/80',
            long_q10_a2: '120-139',
            long_q10_a3: '140+',
            long_q11: '11. Fasting glucose (blood test)',
            long_q11_a1: '< 100 mg/dL',
            long_q11_a2: '100-125 mg/dL',
            long_q11_a3: '126+ mg/dL',
            long_q12: '12. Cholesterol (per doctor or lab result)',
            long_q12_a1: 'Normal',
            long_q12_a2: 'Mild alteration',
            long_q12_a3: 'High cholesterol',
            long_q13: '13. Inflammation — CRP (blood test)',
            long_q13_a1: 'Low',
            long_q13_a2: 'Moderate',
            long_q13_a3: 'High',
            long_q14: '14. Daily stress',
            long_q14_a1: 'Low',
            long_q14_a2: 'Moderate',
            long_q14_a3: 'High',
            long_q15: '15. Stress management (e.g. walking, meditation, talking)',
            long_q15_a1: 'Yes, regularly',
            long_q15_a2: 'Sometimes',
            long_q15_a3: 'No strategies',
            long_q16: '16. Social support (family or close friends)',
            long_q16_a1: 'Strong',
            long_q16_a2: 'Moderate',
            long_q16_a3: 'Limited',
            long_q17: '17. Tobacco',
            long_q17_a1: 'Never smoked',
            long_q17_a2: 'Former smoker',
            long_q17_a3: 'Current smoker',
            long_q18: '18. Alcohol (drinks per week)',
            long_q18_a1: 'Moderate or none',
            long_q18_a2: 'Frequent',
            long_q18_a3: 'High',
            long_q19: '19. Body weight — BMI (per your doctor)',
            long_q19_a1: 'Normal',
            long_q19_a2: 'Overweight',
            long_q19_a3: 'Obesity',
            long_q20: '20. Annual check-ups (doctor and lab tests)',
            long_q20_a1: 'Yes',
            long_q20_a2: 'Sometimes',
            long_q20_a3: 'No',
            long_btn_finalizar: 'See my score',
            long_result_title: 'Your habits summary',
            long_score_label: 'Longevity Score',
            long_score_clinic: 'CAMSA Clinic',
            long_score_max: 'of 100',
            long_tier_90: 'Optimal profile',
            long_tier_80: 'Solid prevention',
            long_tier_70: 'Room to improve',
            long_tier_60: 'Preventive attention',
            long_tier_0: 'Prioritize changes',
            long_result_note: 'General guidance only. Does not replace a medical visit or lab tests.',
            long_result_clinic: 'CAMSA Clinic · Regenerative Medicine and Longevity',
            long_btn_imagen: 'Save image',
            long_btn_compartir: 'Share questionnaire',
            long_btn_compartir_title: 'Share the questionnaire link via WhatsApp so someone else can complete it.',
            long_btn_enviar: 'Send results',
            long_btn_enviar_title: 'Send your completed answers to the clinic via WhatsApp.',
            form_btn_restart: 'Take again',
            form_btn_restart_title: 'Clear saved answers and start over (for you or a family member).',
            long_aria_close: 'Close questionnaire',
            long_int_90: 'Excellent! Your habits are on track for good quality of life.',
            long_int_80: 'You are on the right path. Keep reinforcing what you already do well.',
            long_int_70: 'There is room to improve. Small changes can make a difference.',
            long_int_60: 'Worth reviewing habits with your doctor and planning prevention.',
            long_int_0: 'Prioritize lifestyle changes and a medical evaluation.',
            persist_continue: 'Continue where I left off',
            persist_discard: 'Discard and start over',
            persist_restored: 'Progress restored. Your answers were recovered automatically.'
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
        localStorage.setItem(STORAGE_KEY, lang);

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

        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-title');
            if (L[key] !== undefined) el.setAttribute('title', L[key]);
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

        // Cuestionario de longevidad (página dedicada o modal legacy)
        var longevityRoot = document.getElementById('longevity-form-root') || document.getElementById('modal-longevity');
        if (longevityRoot && L.long_title) {
            var titleEl = document.getElementById('modal-longevity-title');
            if (titleEl) titleEl.textContent = L.long_title;
            var subEl = longevityRoot.querySelector('.longevity-subtitle');
            if (subEl) subEl.textContent = L.long_subtitle;
            var datosTitles = longevityRoot.querySelectorAll('.longevity-datos .longevity-section-title');
            if (datosTitles.length) datosTitles[0].textContent = L.long_datos_title;
            var datosIntro = longevityRoot.querySelector('.longevity-datos-intro');
            if (datosIntro && L.long_datos_intro) datosIntro.textContent = L.long_datos_intro;
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
            var sectionTitles = longevityRoot.querySelectorAll('.q-wizard-step--section .longevity-section-title, .longevity-questions .longevity-section-title');
            var secKeys = ['long_sec1', 'long_sec2', 'long_sec3', 'long_sec4', 'long_sec5', 'long_sec6', 'long_sec7', 'long_sec8', 'long_sec9'];
            sectionTitles.forEach(function(h, i) {
                if (L[secKeys[i]]) h.textContent = L[secKeys[i]];
            });
            for (var q = 1; q <= 20; q++) {
                var fs = longevityRoot.querySelector('.longevity-fieldset[data-q="' + q + '"]');
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
            var resultTitle = longevityRoot.querySelector('.longevity-result-title');
            if (resultTitle && L.long_result_title) resultTitle.textContent = L.long_result_title;
            var scoreLabel = longevityRoot.querySelector('.longevity-score-card__badge-label');
            if (scoreLabel && L.long_score_label) scoreLabel.textContent = L.long_score_label;
            var scoreClinic = longevityRoot.querySelector('.longevity-score-card__clinic-name');
            if (scoreClinic && L.long_score_clinic) scoreClinic.textContent = L.long_score_clinic;
            var scoreMax = longevityRoot.querySelector('.longevity-score-ring__max');
            if (scoreMax && L.long_score_max) scoreMax.textContent = L.long_score_max;
            var resultNote = longevityRoot.querySelector('.longevity-result-note');
            if (resultNote && L.long_result_note) resultNote.textContent = L.long_result_note;
            var resultClinic = longevityRoot.querySelector('.longevity-result-clinic');
            if (resultClinic && L.long_result_clinic) resultClinic.textContent = L.long_result_clinic;
            var btnImg = document.getElementById('btn-longevity-imagen');
            var btnEnv = document.getElementById('btn-longevity-enviar');
            if (btnImg && L.long_btn_imagen) btnImg.textContent = L.long_btn_imagen;
            var btnShare = document.getElementById('btn-longevity-compartir');
            var btnEnv = document.getElementById('btn-longevity-enviar');
            if (window.CamsaFormShare) {
                if (btnShare) window.CamsaFormShare.applyShareButton(btnShare);
                if (btnEnv) window.CamsaFormShare.applyResultsButton(btnEnv);
            } else {
                if (btnShare && L.long_btn_compartir) {
                    btnShare.textContent = L.long_btn_compartir;
                    if (L.long_btn_compartir_title) btnShare.setAttribute('title', L.long_btn_compartir_title);
                }
                if (btnEnv && L.long_btn_enviar) {
                    btnEnv.textContent = L.long_btn_enviar;
                    if (L.long_btn_enviar_title) btnEnv.setAttribute('title', L.long_btn_enviar_title);
                }
            }
            var closeBtn = document.getElementById('modal-longevity-close');
            if (closeBtn && L.long_aria_close) closeBtn.setAttribute('aria-label', L.long_aria_close);
            var resultBlock = longevityRoot.querySelector('#longevity-result');
            if (resultBlock && !resultBlock.hasAttribute('hidden')) {
                var totalEl = document.getElementById('longevity-total');
                var interpEl = document.getElementById('longevity-interpretacion');
                if (totalEl && typeof window.getLongevityInterpretacionText === 'function') {
                    var totalScore = parseInt(totalEl.textContent, 10) || 0;
                    var interp = window.getLongevityInterpretacionText(totalScore, lang);
                    if (typeof window.updateLongevityResultUI === 'function') {
                        window.updateLongevityResultUI(totalScore, interp);
                    } else if (interpEl) {
                        interpEl.textContent = interp;
                    }
                }
            }
            if (window.longevityWizard && typeof window.longevityWizard.updateProgress === 'function') {
                window.longevityWizard.updateProgress();
            }
        }

        if (window.HormonalQuestionnaires && typeof window.HormonalQuestionnaires.refreshLanguage === 'function') {
            window.HormonalQuestionnaires.refreshLanguage();
        }
        if (window.TfgCalculator && typeof window.TfgCalculator.refreshLanguage === 'function') {
            window.TfgCalculator.refreshLanguage();
        }

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

    function getLongevityTierLabelText(total, langOverride) {
        var lang = langOverride || getPreferredLang();
        var L = t[lang];
        if (!L) return '';
        var score = parseInt(total, 10) || 0;
        if (score > 90) return L.long_tier_90 || '';
        if (score >= 80) return L.long_tier_80 || '';
        if (score >= 70) return L.long_tier_70 || '';
        if (score >= 60) return L.long_tier_60 || '';
        return L.long_tier_0 || '';
    }

    function getLongevityInterpretacionText(total, langOverride) {
        var lang = langOverride || getPreferredLang();
        var L = t[lang];
        if (!L) return '';
        if (total > 90) return L.long_int_90 || '';
        if (total >= 80) return L.long_int_80 || '';
        if (total >= 70) return L.long_int_70 || '';
        if (total >= 60) return L.long_int_60 || '';
        return L.long_int_0 || '';
    }

    window.getPreferredLang = getPreferredLang;
    window.getLongevityInterpretacionText = getLongevityInterpretacionText;
    window.getLongevityTierLabelText = getLongevityTierLabelText;
})();
