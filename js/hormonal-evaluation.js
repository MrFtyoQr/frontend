/**
 * Evaluación por semáforo (verde / amarillo / rojo) según cuadro comparativo CAMSA.
 * Escalas: general (mayoría de hormonas), progesterona e insulina.
 */
(function() {
    'use strict';

    var SCALE_TYPES = {
        general: 'general',
        progesterona: 'progesterona',
        insulina: 'insulina'
    };

    var SECTION_SCALE = {
        estrogenos: 'general',
        cortisol: 'general',
        dhea: 'general',
        hgh: 'general',
        melatonina: 'general',
        pregnenolona: 'general',
        tiroides: 'general',
        testosterona: 'general',
        aldosterona: 'general',
        progesterona: 'progesterona',
        insulina: 'insulina'
    };

    var STATUS = {
        green: {
            labelEs: 'Satisfactorio',
            labelEn: 'Satisfactory',
            rangeEs: {
                general: 'Menor 10 puntos',
                progesterona: '4 puntos o menos',
                insulina: 'Menos 5 puntos'
            },
            rangeEn: {
                general: 'Less than 10 points',
                progesterona: '4 points or less',
                insulina: 'Less than 5 points'
            }
        },
        yellow: {
            labelEs: 'Alterado',
            labelEn: 'Altered',
            labelProgEs: 'Posible deficiencia',
            labelProgEn: 'Possible deficiency',
            labelInsEs: 'Posible deficiencia',
            labelInsEn: 'Possible deficiency',
            rangeEs: {
                general: '11 a 20',
                progesterona: '5 a 8',
                insulina: '6 a 10'
            },
            rangeEn: {
                general: '11 to 20',
                progesterona: '5 to 8',
                insulina: '6 to 10'
            }
        },
        red: {
            labelEs: 'Deficiente',
            labelEn: 'Deficient',
            labelProgEs: 'Probable deficiencia',
            labelProgEn: 'Probable deficiency',
            labelInsEs: 'Probable deficiencia',
            labelInsEn: 'Probable deficiency',
            rangeEs: {
                general: 'Más 21',
                progesterona: '9 puntos o más',
                insulina: '11 puntos o más'
            },
            rangeEn: {
                general: 'More than 21',
                progesterona: '9 points or more',
                insulina: '11 points or more'
            }
        }
    };

    var SYMPTOMS = {
        estrogenos: {
            mujer: {
                es: 'Sexo doloroso debido a la falta de lubricación, aumento de infecciones del tracto urinario debido a un adelgazamiento de la uretra, períodos irregulares o ausentes, cambios en el estado de ánimo, sensibilidad en los senos, dolores de cabeza o acentuación de migrañas preexistentes, dificultad para concentrarse, fatiga, depresión.',
                en: 'Painful sex due to lack of lubrication, increased urinary tract infections due to urethral thinning, irregular or absent periods, mood changes, breast tenderness, headaches or worsening of pre-existing migraines, difficulty concentrating, fatigue, depression.'
            }
        },
        tiroides: {
            mujer: {
                es: 'Tendencia al nerviosismo excesivo, insomnio, palpitaciones, cansancio inexplicable, sudoración fácil, mala tolerancia al calor, temblor de manos, aumento o pérdida de peso muy rápido, piel seca, cara y manos hinchadas por la mañana.',
                en: 'Tendency to excessive nervousness, insomnia, palpitations, unexplained tiredness, easy sweating, poor heat tolerance, hand tremors, very rapid weight gain or loss, dry skin, puffy face and hands in the morning.'
            },
            hombre: {
                es: 'Tendencia al nerviosismo excesivo, insomnio, palpitaciones, cansancio inexplicable, sudoración fácil, mala tolerancia al calor o al frío, temblor de manos, aumento o pérdida de peso muy rápido, piel seca, cara y manos hinchadas por la mañana.',
                en: 'Tendency to excessive nervousness, insomnia, palpitations, unexplained tiredness, easy sweating, poor tolerance to heat or cold, hand tremors, very rapid weight gain or loss, dry skin, puffy face and hands in the morning.'
            }
        },
        pregnenolona: {
            mujer: {
                es: 'Mala memoria, presión baja, dolores articulares, estrés, flacidez muscular.',
                en: 'Poor memory, low blood pressure, joint pain, stress, muscle flaccidity.'
            },
            hombre: {
                es: 'Mala memoria, presión baja, dolores articulares, estrés, flacidez muscular, antojo por comidas saladas, pérdida de la libido, pérdida de interés en cosas que comúnmente me gustan hacer.',
                en: 'Poor memory, low blood pressure, joint pain, stress, muscle flaccidity, craving for salty foods, loss of libido, loss of interest in things you usually enjoy.'
            }
        },
        progesterona: {
            mujer: {
                es: 'Irritabilidad, bochornos, menstruación abundante, sensibilidad en los senos, miomas, pérdida de memoria, ansiedad por comer.',
                en: 'Irritability, hot flashes, heavy menstruation, breast tenderness, fibroids, memory loss, anxiety-driven eating.'
            },
            hombre: {
                es: 'Tendencia a calvicie, tendencia a perder vello, crecimiento prostático, disminución en el chorro de la orina, nerviosismo, agitación, ansiedad, cansancio.',
                en: 'Tendency to baldness, hair loss, prostate growth, decreased urine stream, nervousness, agitation, anxiety, tiredness.'
            }
        },
        cortisol: {
            mujer: {
                es: 'Hormona del estrés. Tendencia a depresión, debilidad muscular y/o pérdida de masa muscular, cansancio, pérdida de apetito, falta de concentración, baja azúcar en sangre, ausencia de libido, problemas de alergias.',
                en: 'Stress hormone. Tendency to depression, muscle weakness and/or loss of muscle mass, tiredness, loss of appetite, lack of concentration, low blood sugar, absence of libido, allergy problems.'
            },
            hombre: {
                es: 'Hormona del estrés. Tendencia a depresión, debilidad muscular y/o pérdida de masa muscular, cansancio, pérdida de apetito, falta de concentración, baja azúcar en sangre, ausencia de libido, problemas de alergias.',
                en: 'Stress hormone. Tendency to depression, muscle weakness and/or loss of muscle mass, tiredness, loss of appetite, lack of concentration, low blood sugar, absence of libido, allergy problems.'
            }
        },
        dhea: {
            mujer: {
                es: 'Intolerancia a ruidos, baja de libido, pérdida de masa muscular, resequedad en la piel.',
                en: 'Noise intolerance, low libido, loss of muscle mass, dry skin.'
            },
            hombre: {
                es: 'Intolerancia a ruidos, baja de libido, pérdida de masa muscular, resequedad en la piel, cabello seco, ojos con sensación de sequedad.',
                en: 'Noise intolerance, low libido, loss of muscle mass, dry skin, dry hair, eyes with dryness sensation.'
            }
        },
        hgh: {
            mujer: {
                es: 'Cabello delgado, debilidad muscular, piel seca y delgada, cansancio excesivo, ansiedad.',
                en: 'Thin hair, muscle weakness, dry and thin skin, excessive tiredness, anxiety.'
            },
            hombre: {
                es: 'Cabello delgado, debilidad y pérdida de tono muscular, piel seca y delgada, cansancio excesivo, ansiedad.',
                en: 'Thin hair, muscle weakness and loss of tone, dry and thin skin, excessive tiredness, anxiety.'
            }
        },
        melatonina: {
            mujer: {
                es: 'Cambios en tu estado de ánimo, nerviosismo, insomnio, problemas de memoria, envejecimiento prematuro, cansancio, asociado a hormonas tiroideas.',
                en: 'Mood changes, nervousness, insomnia, memory problems, premature aging, tiredness, associated with thyroid hormones.'
            },
            hombre: {
                es: 'Cambios en tu estado de ánimo, nerviosismo, insomnio, problemas de memoria, envejecimiento prematuro, cansancio, asociado a hormonas tiroideas.',
                en: 'Mood changes, nervousness, insomnia, memory problems, premature aging, tiredness, associated with thyroid hormones.'
            }
        },
        testosterona: {
            mujer: {
                es: 'Insomnio, fatiga, depresión, ansiedad, baja de libido, pérdida de masa muscular, ojos secos, aumento de peso, caída de cabello.',
                en: 'Insomnia, fatigue, depression, anxiety, low libido, loss of muscle mass, dry eyes, weight gain, hair loss.'
            },
            hombre: {
                es: 'Insomnio, fatiga, depresión, ansiedad, baja de libido, pérdida de masa muscular, resequedad ocular, aumento de peso, caída de cabello, sudores y bochornos, cara con más arrugas y flacidez.',
                en: 'Insomnia, fatigue, depression, anxiety, low libido, loss of muscle mass, dry eyes, weight gain, hair loss, sweating and hot flashes, face with more wrinkles and flaccidity.'
            }
        },
        insulina: {
            mujer: {
                es: 'Visión doble o borrosa, latidos cardíacos rápidos o fuertes, irritabilidad o actuar agresivo, nerviosismo, dolor de cabeza, aumento de apetito, temblores, aumento en la sed, dificultad para cicatrizar.',
                en: 'Double or blurred vision, fast or strong heartbeat, irritability or aggressive behavior, nervousness, headache, increased appetite, tremors, increased thirst, difficulty healing.'
            },
            hombre: {
                es: 'Tendencia a visión doble o borrosa, latidos cardíacos rápidos o fuertes, irritabilidad, tendencia a actuar con impulsividad, nerviosismo, dolor de cabeza, aumento de apetito, antojo por alimentos dulces, temblores, aumento en la sed, dificultad para cicatrizar.',
                en: 'Double or blurred vision, fast or strong heartbeat, irritability, impulsive behavior, nervousness, headache, increased appetite, sweet cravings, tremors, increased thirst, difficulty healing.'
            }
        },
        aldosterona: {
            hombre: {
                es: 'Ojos hundidos, arrugas marcadas y profundas, antojo por alimentos salados, presión arterial baja, sensación de mareo al levantarse o con movimientos bruscos, distracción.',
                en: 'Sunken eyes, marked and deep wrinkles, craving for salty foods, low blood pressure, dizziness when standing or with sudden movements, distraction.'
            }
        }
    };

    /** Resumen breve para el paciente (solo alteración / deficiencia). */
    var SYMPTOMS_BRIEF = {
        estrogenos: {
            mujer: {
                es: 'Cambios de ánimo, ciclos irregulares, fatiga, resequedad íntima.',
                en: 'Mood changes, irregular cycles, fatigue, vaginal dryness.'
            }
        },
        tiroides: {
            mujer: {
                es: 'Nerviosismo e insomnio, cansancio, cambios de peso, piel seca.',
                en: 'Nervousness and insomnia, tiredness, weight changes, dry skin.'
            },
            hombre: {
                es: 'Nerviosismo e insomnio, cansancio, cambios de peso, piel seca.',
                en: 'Nervousness and insomnia, tiredness, weight changes, dry skin.'
            }
        },
        pregnenolona: {
            mujer: {
                es: 'Pérdida de memoria, presión baja, dolor articular, estrés.',
                en: 'Memory loss, low blood pressure, joint pain, stress.'
            },
            hombre: {
                es: 'Pérdida de memoria, baja libido, presión baja, estrés.',
                en: 'Memory loss, low libido, low blood pressure, stress.'
            }
        },
        progesterona: {
            mujer: {
                es: 'Irritabilidad, sofocos, menstruación abundante, ansiedad.',
                en: 'Irritability, hot flashes, heavy periods, anxiety.'
            },
            hombre: {
                es: 'Calvicie, próstata agrandada, flujo urinario débil, ansiedad.',
                en: 'Balding, enlarged prostate, weak urine stream, anxiety.'
            }
        },
        cortisol: {
            mujer: {
                es: 'Estrés crónico, fatiga, tendencia depresiva, alergias.',
                en: 'Chronic stress, fatigue, depressive tendency, allergies.'
            },
            hombre: {
                es: 'Estrés crónico, fatiga, tendencia depresiva, alergias.',
                en: 'Chronic stress, fatigue, depressive tendency, allergies.'
            }
        },
        dhea: {
            mujer: {
                es: 'Baja libido, intolerancia al ruido, flacidez muscular, piel seca.',
                en: 'Low libido, noise intolerance, muscle flaccidity, dry skin.'
            },
            hombre: {
                es: 'Baja libido, intolerancia al ruido, flacidez muscular, piel/cabello seco.',
                en: 'Low libido, noise intolerance, muscle flaccidity, dry skin/hair.'
            }
        },
        hgh: {
            mujer: {
                es: 'Cabello fino, pérdida de tono muscular, piel seca, fatiga extrema.',
                en: 'Thin hair, loss of muscle tone, dry skin, extreme fatigue.'
            },
            hombre: {
                es: 'Cabello fino, pérdida de tono muscular, piel seca, fatiga extrema.',
                en: 'Thin hair, loss of muscle tone, dry skin, extreme fatigue.'
            }
        },
        melatonina: {
            mujer: {
                es: 'Insomnio, cambios de ánimo, olvidos, fatiga al despertar.',
                en: 'Insomnia, mood changes, forgetfulness, fatigue on waking.'
            },
            hombre: {
                es: 'Insomnio, cambios de ánimo, olvidos, fatiga al despertar.',
                en: 'Insomnia, mood changes, forgetfulness, fatigue on waking.'
            }
        },
        testosterona: {
            mujer: {
                es: 'Baja libido, fatiga, cambios de ánimo, pérdida muscular.',
                en: 'Low libido, fatigue, mood changes, muscle loss.'
            },
            hombre: {
                es: 'Baja libido, fatiga, bochornos, pérdida muscular.',
                en: 'Low libido, fatigue, hot flashes, muscle loss.'
            }
        },
        insulina: {
            mujer: {
                es: 'Antojo de dulces, sed excesiva, visión borrosa, cicatrización lenta.',
                en: 'Sweet cravings, excessive thirst, blurred vision, slow healing.'
            },
            hombre: {
                es: 'Antojo de dulces, sed excesiva, visión borrosa, cicatrización lenta.',
                en: 'Sweet cravings, excessive thirst, blurred vision, slow healing.'
            }
        },
        aldosterona: {
            hombre: {
                es: 'Antojo de sal, presión baja, mareos al levantarse, arrugas marcadas.',
                en: 'Salt cravings, low blood pressure, dizziness on standing, deep wrinkles.'
            }
        }
    };

    function getLang() {
        return (typeof window.getPreferredLang === 'function' && window.getPreferredLang() === 'en') ? 'en' : 'es';
    }

    function lbl(es, en) {
        return getLang() === 'en' ? en : es;
    }

    function getScaleType(sectionId) {
        return SECTION_SCALE[sectionId] || null;
    }

    function classifyScore(scaleType, total) {
        if (scaleType === 'progesterona') {
            if (total <= 4) return 'green';
            if (total <= 8) return 'yellow';
            return 'red';
        }
        if (scaleType === 'insulina') {
            if (total <= 5) return 'green';
            if (total <= 10) return 'yellow';
            return 'red';
        }
        if (total <= 10) return 'green';
        if (total <= 20) return 'yellow';
        return 'red';
    }

    function statusLabel(statusKey, scaleType) {
        var block = STATUS[statusKey];
        if (!block) return '';
        if (statusKey === 'yellow' || statusKey === 'red') {
            if (scaleType === 'progesterona') {
                return lbl(block.labelProgEs, block.labelProgEn);
            }
            if (scaleType === 'insulina') {
                return lbl(block.labelInsEs, block.labelInsEn);
            }
        }
        return lbl(block.labelEs, block.labelEn);
    }

    function statusRange(statusKey, scaleType) {
        var block = STATUS[statusKey];
        if (!block) return '';
        var lang = getLang();
        var ranges = lang === 'en' ? block.rangeEn : block.rangeEs;
        return ranges[scaleType] || ranges.general;
    }

    function getSymptoms(sectionId, questionnaireId) {
        var entry = SYMPTOMS[sectionId];
        if (!entry) return '';
        var gender = entry[questionnaireId] || entry.mujer || entry.hombre;
        if (!gender) return '';
        return getLang() === 'en' ? gender.en : gender.es;
    }

    function getSymptomsBrief(sectionId, questionnaireId) {
        var entry = SYMPTOMS_BRIEF[sectionId];
        if (!entry) return '';
        var gender = entry[questionnaireId] || entry.mujer || entry.hombre;
        if (!gender) return '';
        return getLang() === 'en' ? gender.en : gender.es;
    }

    function evaluateSection(sectionId, total, questionnaireId, answered, optional) {
        if (optional) {
            return {
                level: 'optional',
                scaleType: null,
                label: lbl('Opcional', 'Optional'),
                rangeLabel: '—',
                scoreLabel: answered > 0 ? String(total) : '—',
                showSymptoms: false,
                symptoms: '',
                symptomsBrief: ''
            };
        }

        if (answered === 0) {
            return {
                level: 'none',
                scaleType: null,
                label: lbl('Sin evaluar', 'Not evaluated'),
                rangeLabel: '—',
                scoreLabel: '—',
                showSymptoms: false,
                symptoms: '',
                symptomsBrief: ''
            };
        }

        var scaleType = getScaleType(sectionId);
        if (!scaleType) {
            return {
                level: 'none',
                scaleType: null,
                label: lbl('Sin escala', 'No scale'),
                rangeLabel: '—',
                scoreLabel: String(total),
                showSymptoms: false,
                symptoms: '',
                symptomsBrief: ''
            };
        }

        var level = classifyScore(scaleType, total);
        var showSymptoms = level === 'yellow' || level === 'red';
        var brief = showSymptoms ? getSymptomsBrief(sectionId, questionnaireId) : '';

        return {
            level: level,
            scaleType: scaleType,
            label: statusLabel(level, scaleType),
            rangeLabel: statusRange(level, scaleType),
            scoreLabel: String(total),
            showSymptoms: showSymptoms,
            symptoms: showSymptoms ? getSymptoms(sectionId, questionnaireId) : '',
            symptomsBrief: brief
        };
    }

    window.HormonalEvaluation = {
        evaluateSection: evaluateSection,
        classifyScore: classifyScore,
        getScaleType: getScaleType
    };
})();
