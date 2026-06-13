# Matriz de Trazabilidad (RTM)
**ID Documento:** RTM-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Matriz URS -> Diseño -> Prueba
| URS ID | Requisito resumido | Diseño/Implementación | Caso de prueba sugerido | Evidencia esperada |
|---|---|---|---|---|
| URS-F-002 | Envío solicitud por WhatsApp con confirmación | `main.js` (`buildWhatsAppUrl`, modal confirm) | TC-WA-001 | Captura modal + URL generada |
| URS-F-004 | Cuestionario 20 preguntas + score | `index.html` + `main.js` cálculo | TC-LONG-001 | Puntaje correcto en casos patrón |
| URS-F-005 | Guardar resultado en imagen | `html2canvas` en `main.js` | TC-LONG-IMG-001 | Archivo PNG generado |
| URS-F-007 | ES/EN disponible | `i18n.js` diccionario `t` | TC-I18N-001 | Cambio visible de textos |
| URS-F-008 | Detección automática de idioma | `getPreferredLang()` | TC-I18N-AUTO-001 | Idioma inicial conforme navegador |
| URS-F-009 | Persistencia idioma | `localStorage(camsa-lang)` | TC-I18N-PERSIST-001 | Idioma conservado al recargar |
| URS-F-010 | Cambio de imágenes por idioma | `assets.js` + `i18n.js` switch `data-rs` | TC-I18N-IMG-001 | Imágenes EN/ES correctas |
| URS-UI-002 | Selector no obstruye menú móvil | `styles.css` media queries | TC-RESP-001 | Menú hamburguesa funcional |
| URS-C-001 | Confirmación antes de salida de datos | Modal WhatsApp | TC-COMP-001 | Bloqueo hasta aceptación |

## 2. Cobertura actual estimada
- Cobertura funcional manual: media-alta.
- Cobertura automatizada: no evidenciada en alcance actual.
- Recomendación: incorporar checklist de smoke por release.

## 3. Política de actualización de RTM
- Actualizar RTM por cada cambio funcional.
- No aprobar despliegue sin mapeo URS afectadas y pruebas asociadas.

