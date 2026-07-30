/**
 * Definición de cuestionarios hormonales (escala 0–4 por pregunta, semáforo por hormona).
 */
(function() {
    'use strict';

    /** Escala de frecuencia compartida (0 = Nunca … 4 = Extremadamente frecuente) */
    window.HORMONAL_SCALE = [
        { value: '0', es: '0 — Nunca', en: '0 — Never' },
        { value: '1', es: '1 — Casi nunca', en: '1 — Almost never' },
        { value: '2', es: '2 — Algunas ocasiones', en: '2 — Sometimes' },
        { value: '3', es: '3 — Constantemente', en: '3 — Constantly' },
        { value: '4', es: '4 — Extremadamente frecuente', en: '4 — Extremely often' }
    ];

    window.HORMONAL_QUESTIONNAIRES = {
        mujer: {
            id: 'mujer',
            prefix: 'hmujer',
            cardTitleEs: 'Test hormonal — Mujer',
            cardTitleEn: 'Hormonal test — Women',
            cardTextEs: 'Evalúa síntomas asociados a posibles deficiencias hormonales. Escala de 0 a 4 por pregunta y total por hormona.',
            cardTextEn: 'Assess symptoms related to possible hormonal deficiencies. Scale 0–4 per question and total per hormone.',
            modalTitleEs: 'Cuestionario hormonal — Mujer',
            modalTitleEn: 'Hormonal questionnaire — Women',
            modalSubtitleEs: 'Una hormona a la vez: elige del 0 al 4 qué tan seguido te ocurre cada síntoma. No sustituye una consulta médica.',
            modalSubtitleEn: 'One hormone at a time: choose 0–4 for how often each symptom happens. This does not replace a medical visit.',
            whatsappTitleEs: 'CUESTIONARIO HORMONAL MUJER - CLÍNICA CAMSA',
            whatsappTitleEn: 'WOMEN HORMONAL QUESTIONNAIRE - CAMSA CLINIC',
            resultTitleEs: 'Tu resumen — Cuestionario hormonal mujer',
            resultTitleEn: 'Your summary — Women\'s hormonal questionnaire',
            resultClinicEs: 'Clínica CAMSA · Orientación para conversar con tu médico',
            resultClinicEn: 'CAMSA Clinic · Guidance to discuss with your doctor',
            sections: [
                {
                    id: 'estrogenos',
                    titleEs: 'ESTRÓGENOS',
                    titleEn: 'ESTROGENS',
                    questions: [
                        'He notado que se me cae el cabello',
                        'Aumento de arrugas en los labios o peri bucal',
                        'Mis senos están flácidos o caídos',
                        'Aumento del vello facial',
                        'Mis ojos se irritan fácilmente, o con sensación de resequedad',
                        'Sufro de bochornos (calor, sudoración, escalofríos, ansiedad)',
                        'Siento que paso el día cansada',
                        'Me siento deprimida',
                        '¿Mi flujo menstrual es moderado? (0 es moderado, 4 nulo)',
                        'Mis ciclos menstruales ¿son irregulares? ¿Demasiado cortos o largos?',
                        'Si no tienes el periodo: ¿Sientes ganas de hacer el amor?'
                    ]
                },
                {
                    id: 'cortisol',
                    titleEs: 'CORTISOL',
                    titleEn: 'CORTISOL',
                    questions: [
                        'Noto mi cara más delgada',
                        'Me dicen que estoy demasiado delgada',
                        'Mi presión arterial es baja (menor 100/60 mmHg)',
                        'Mi corazón late rápidamente',
                        'Sufro problemas en la piel: eritema, psoriasis, eczemas u otros',
                        'Me siento cansada',
                        'Sufro problemas digestivos',
                        'Se me antoja constantemente el azúcar y/o la sal',
                        'Me confundo con facilidad o me desoriento.',
                        'Tengo síntomas de alergias: Asma, flujo nasal y otros síntomas'
                    ]
                },
                {
                    id: 'dhea',
                    titleEs: 'DHEA',
                    titleEn: 'DHEA',
                    questions: [
                        'Mi deseo sexual (libido) está baja',
                        'Mi cabello está seco',
                        'El ruido me molesta',
                        'El grado de flacidez en mis músculos es (0 nada, 4 muy flácido)',
                        'Durante la excitación sexual mi cuerpo tiene mal olor',
                        'Mi abdomen está engordando',
                        'En la zona púbica, mi nivel de grasa es: (0 acolchado, 4 plano)',
                        'La cantidad de vello en mis axilas es: (0 mucho, 4 nada)',
                        'En la zona púbica, mi volumen de vello es: (0 mucho, 4 nada)',
                        'Mis ojos y mi piel están secos'
                    ]
                },
                {
                    id: 'hgh',
                    titleEs: 'HORMONA DE CRECIMIENTO',
                    titleEn: 'GROWTH HORMONE',
                    questions: [
                        'Mi cabello está delgadito',
                        'Mis encías se están separando (o ya se han separado)',
                        'Mis músculos están flojos (flácidos)',
                        'Después de la actividad física, me cuesta recuperarme',
                        'Últimamente no quiero salir, tiendo a aislarme',
                        'Mis pómulos se han hundido',
                        'En mi abdomen ha crecido una llantita',
                        'Mi piel es seca y delgada',
                        'Me siento agotada, exhausta',
                        'Me siento continuamente, preocupada y ansiosa'
                    ]
                },
                {
                    id: 'progesterona',
                    titleEs: 'PROGESTERONA',
                    titleEn: 'PROGESTERONE',
                    questions: [
                        'Dentro de mi anatomía, soy de senos grandes',
                        '¿Te sientes ansiosa?',
                        '¿Tienes el sueño ligero?',
                        '¿Te sientes nerviosa?'
                    ]
                },
                {
                    id: 'insulina',
                    titleEs: 'INSULINA',
                    titleEn: 'INSULIN',
                    questions: [
                        'Como dulces y azúcares',
                        'Tengo dificultad para cicatrizar',
                        'Como durante el día y durante la noche',
                        'Siempre tengo sed',
                        'Mi estómago y mis glúteos están esqueléticos'
                    ]
                },
                {
                    id: 'pregnenolona',
                    titleEs: 'PREGNENOLONA',
                    titleEn: 'PREGNENOLONE',
                    questions: [
                        'Pierdo la memoria',
                        'Se me antojan las comidas saladas',
                        'Me duelen las articulaciones',
                        'Mi presión está baja (menor 100/60 mmHg)',
                        'Me cuesta mucho trabajo manejar el estrés',
                        'Orino abundantemente y de color pálido',
                        'Ya no veo los colores tan brillantes como antes',
                        'Mis músculos están flácidos',
                        'El arte ya no me interesa',
                        'Mi vello en las axilas y en el pubis es: (0 mucho vello, 4 sin vello)'
                    ]
                },
                {
                    id: 'melatonina',
                    titleEs: 'MELATONINA',
                    titleEn: 'MELATONIN',
                    questions: [
                        'Me veo más vieja de lo que soy',
                        'Utilizo ayuda para dormir(fármacos) y además fumo y bebo alcohol',
                        'Me cuesta dormir por la noche',
                        'No tolero el desfase de horario',
                        'Durante la noche, me despierto con facilidad',
                        'Y no puedo volver a dormir si despierto en la noche',
                        'Siento que estoy al revés del mundo, me despierto tarde y me acuesto tarde',
                        'Mientras trato de dormir, mi mente está ocupada con pensamientos nerviosos',
                        'Mis pies se calientan demasiado durante la noche',
                        'Al levantarme, no me siento descansada'
                    ]
                },
                {
                    id: 'tiroides',
                    titleEs: 'HORMONA TIROIDEA',
                    titleEn: 'THYROID HORMONE',
                    questions: [
                        'El grado frío que tolero es (0 nada, 4 intolerante)',
                        'Siempre tengo fríos los pies y manos',
                        'Subo de peso muy rápido',
                        'Me cuesta mucho levantarme por las mañanas',
                        'Por las mañanas, mis articulaciones están rígidas',
                        'Siento que todo funciona a cámara lenta',
                        'Aun cuando descanso, me siento cansada',
                        'Tengo la piel seca',
                        'Estoy constipada',
                        'Por las mañanas, mi cara y mis párpados están hinchados'
                    ]
                },
                {
                    id: 'testosterona',
                    titleEs: 'TESTOSTERONA',
                    titleEn: 'TESTOSTERONE',
                    questions: [
                        'Mis senos están engordando',
                        'Tengo sudores y bochornos',
                        'Constantemente estoy cansada',
                        'He perdido la confianza en mí misma y dudo constantemente',
                        'Mi desempeño sexual es más pobre que de costumbre',
                        'Mi cara está más arrugada y flácida',
                        'Las ganas de hacer el amor han disminuido',
                        'Habitualmente me siento cansada',
                        'He perdido tono muscular (los siento más flácidos)',
                        'Mi abdomen tiende a engordar'
                    ]
                },
                {
                    id: 'ciclo_trh',
                    titleEs: 'Menstruación y tratamientos hormonales (opcional)',
                    titleEn: 'Period and hormone treatments (optional)',
                    noteEs: 'Solo si aún tienes menstruación o estás en tratamiento hormonal prescrito por tu médico.',
                    noteEn: 'Only if you still have periods or are on hormone treatment prescribed by your doctor.',
                    optional: true,
                    questions: [
                        'Antes de mi periodo estoy agresiva e irritable',
                        'Y pierdo el control',
                        'Y mi bajo vientre está hinchado',
                        'Y mis senos están hinchados, sensibles o adoloridos',
                        'Mis periodos son continuamente dolorosos',
                        'Y pesados'
                    ]
                }
            ]
        },
        hombre: {
            id: 'hombre',
            prefix: 'hhombre',
            cardTitleEs: 'Test hormonal — Hombre',
            cardTitleEn: 'Hormonal test — Men',
            cardTextEs: 'Evalúa síntomas asociados a posibles deficiencias hormonales. Escala de 0 a 4 por pregunta y total por hormona.',
            cardTextEn: 'Assess symptoms related to possible hormonal deficiencies. Scale 0–4 per question and total per hormone.',
            modalTitleEs: 'Cuestionario hormonal — Hombre',
            modalTitleEn: 'Hormonal questionnaire — Men',
            modalSubtitleEs: 'Una hormona a la vez: elige del 0 al 4 qué tan seguido te ocurre cada síntoma. No sustituye una consulta médica.',
            modalSubtitleEn: 'One hormone at a time: choose 0–4 for how often each symptom happens. This does not replace a medical visit.',
            whatsappTitleEs: 'CUESTIONARIO HORMONAL HOMBRE - CLÍNICA CAMSA',
            whatsappTitleEn: 'MEN HORMONAL QUESTIONNAIRE - CAMSA CLINIC',
            resultTitleEs: 'Tu resumen — Cuestionario hormonal hombre',
            resultTitleEn: 'Your summary — Men\'s hormonal questionnaire',
            resultClinicEs: 'Clínica CAMSA · Orientación para conversar con tu médico',
            resultClinicEn: 'CAMSA Clinic · Guidance to discuss with your doctor',
            sections: [
                {
                    id: 'cortisol',
                    titleEs: 'CORTISOL',
                    titleEn: 'CORTISOL',
                    questions: [
                        'Noto mi cara más delgada',
                        'Me dicen que estoy demasiado delgado',
                        'Mi presión arterial es baja (menor 100/60 mmHg)',
                        'Mi corazón late rápidamente',
                        'Sufro problemas en la piel: eritema, psoriasis, eczemas u otros',
                        'Me siento cansado',
                        'Sufro problemas digestivos',
                        'Se me antoja constantemente el azúcar y/o la sal',
                        'Me confundo con facilidad o me desoriento.',
                        'Tengo síntomas de alergias: Asma, flujo nasal y otros síntomas'
                    ]
                },
                {
                    id: 'dhea',
                    titleEs: 'DHEA',
                    titleEn: 'DHEA',
                    questions: [
                        'Mi deseo sexual (libido) está baja',
                        'Mi cabello está seco',
                        'El ruido me molesta',
                        'El grado de flacidez en mis músculos es (0 nada, 4 muy flácido)',
                        'Durante la excitación sexual mi cuerpo tiene mal olor',
                        'Mi abdomen está engordando',
                        'En la zona púbica, mi nivel de grasa es: (0 acolchado, 4 plano)',
                        'La cantidad de vello en mis axilas es: (0 mucho, 4 nada)',
                        'En la zona púbica, mi volumen de vello es: (0 mucho, 4 nada)',
                        'Mis ojos y mi piel están secos'
                    ]
                },
                {
                    id: 'hgh',
                    titleEs: 'HORMONA DE CRECIMIENTO',
                    titleEn: 'GROWTH HORMONE',
                    questions: [
                        'Mi cabello está delgadito',
                        'Mis encías se están separando (o ya se han separado)',
                        'Mis músculos están flácidos',
                        'Después de la actividad física, me cuesta recuperarme',
                        'Últimamente no quiero salir, tiendo a aislarme',
                        'Mis pómulos se han hundido',
                        'En mi abdomen ha crecido una llantita',
                        'Mi piel es seca y delgada',
                        'Me siento agotado, exhausto',
                        'Me siento continuamente, preocupado y ansioso'
                    ]
                },
                {
                    id: 'melatonina',
                    titleEs: 'MELATONINA',
                    titleEn: 'MELATONIN',
                    questions: [
                        'Me veo más viejo de lo que soy',
                        'Utilizo ayuda para dormir(fármacos) y además fumo y bebo alcohol',
                        'Me cuesta dormir por la noche',
                        'No tolero el desfase de horario',
                        'Durante la noche, me despierto con facilidad',
                        'Y no puedo volver a dormir si despierto en la noche',
                        'Siento que estoy al revés del mundo, me despierto tarde y meacuesto tarde',
                        'Mientras trato de dormir, mi mente está ocupada con pensamientos nerviosos',
                        'Mis pies se calientan demasiado durante la noche',
                        'Al levantarme, no me siento descansado'
                    ]
                },
                {
                    id: 'pregnenolona',
                    titleEs: 'PREGNENOLONA',
                    titleEn: 'PREGNENOLONE',
                    questions: [
                        'Pierdo la memoria',
                        'Se me antojan las comidas saladas',
                        'Me duelen las articulaciones',
                        'Mi presión está baja (menor 100/60 mmHg)',
                        'Me cuesta mucho trabajo manejar el estrés',
                        'Orino abundantemente y de color pálido',
                        'Ya no veo los colores tan brillantes como antes',
                        'Mis músculos están flácidos',
                        'He perdido interés en lo que me encantaba',
                        'Mi vello en las axilas y en el pubis es: (0 mucho vello, 4 sin vello)'
                    ]
                },
                {
                    id: 'tiroides',
                    titleEs: 'HORMONA TIROIDEA',
                    titleEn: 'THYROID HORMONE',
                    questions: [
                        'El grado frío que tolero es (0 nada, 4 intolerante)',
                        'Siempre tengo fríos los pies y manos',
                        'Subo de peso muy rápido',
                        'Me cuesta mucho levantarme por las mañanas',
                        'Por las mañanas, mis articulaciones están rígidas',
                        'Siento que todo funciona a cámara lenta',
                        'Aun cuando descanso, me siento cansado',
                        'Tengo la piel seca',
                        'Estoy constipado',
                        'Por las mañanas, mi cara y mis párpados están hinchados'
                    ]
                },
                {
                    id: 'testosterona',
                    titleEs: 'TESTOSTERONA',
                    titleEn: 'TESTOSTERONE',
                    questions: [
                        'Mis senos están engordando',
                        'Tengo sudores y bochornos',
                        'Me canso fácilmente con la actividad física',
                        'He perdido la confianza en mí mismo y dudo constantemente',
                        'Mi desempeño sexual es más pobre que de costumbre',
                        'Mi cara está más arrugada y flácida',
                        'Las ganas de hacer el amor han disminuido',
                        'He perdido tono muscular (los siento más flácidos)',
                        'Habitualmente me siento cansado',
                        'Mi abdomen tiende a engordar'
                    ]
                },
                {
                    id: 'aldosterona',
                    titleEs: 'ALDOSTERONA',
                    titleEn: 'ALDOSTERONE',
                    questions: [
                        'Tengo los ojos hundidos',
                        'Mis arrugas están marcadas y profundas',
                        'Orino muchas veces al día',
                        'Tengo antojo de comida salada',
                        'Mi presión es baja (menor 100/60 mmHg)',
                        'Me mareo cuando me levanto',
                        'Tengo dificultad para enfocar la mirada en objetos cuando me levanto',
                        'Me siento mucho mejor acostado que de pie',
                        'No escucho bien',
                        'Continuamente estoy distraído, estoy aquí y en otro mundo'
                    ]
                },
                {
                    id: 'progesterona',
                    titleEs: 'PROGESTERONA',
                    titleEn: 'PROGESTERONE',
                    questions: [
                        'Tengo calvicie de patrón masculino',
                        'Mis pechos están engordando',
                        'Mi tórax y espalda tienen mucho pelo',
                        'Mi próstata está crecida',
                        'Mi chorro de orina está disminuyendo, necesito más tiempo para orinar',
                        'Mis amigos cercanos se quejan de que estoy nervioso y agitado',
                        'Siento ansiedad',
                        'Pierdo mi control',
                        'Mis hombros se sienten tensos a la hora de dormir',
                        'Duermo ligeramente y poco descansado'
                    ]
                },
                {
                    id: 'insulina',
                    titleEs: 'INSULINA',
                    titleEn: 'INSULIN',
                    questions: [
                        'Como dulces y azúcares',
                        'Tengo dificultad para cicatrizar',
                        'Como durante el día y durante la noche',
                        'Siempre tengo sed',
                        'Mi estómago y mis glúteos están esqueléticos'
                    ]
                }
            ]
        }
    };

})();
