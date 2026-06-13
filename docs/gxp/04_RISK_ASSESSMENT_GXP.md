# Evaluación de Riesgos GxP (Risk Assessment)
**ID Documento:** RA-FE-CAMSA-001  
**Versión:** 1.0  
**Metodología:** Severidad (S) x Ocurrencia (O) x Detectabilidad (D)

## 1. Criterios de clasificación
- **S:** 1 (baja) a 5 (crítica).
- **O:** 1 (rara) a 5 (frecuente).
- **D:** 1 (fácil detectar) a 5 (difícil detectar).
- **RPN:** S*O*D.

## 2. Matriz de riesgos principal
| ID | Riesgo | Impacto GxP | S | O | D | RPN | Control actual | Acción recomendada |
|---|---|---|---:|---:|---:|---:|---|---|
| R-01 | Envío de datos personales sin consentimiento | Privacidad/compliance | 5 | 2 | 2 | 20 | Modal de confirmación | Mantener evidencia de prueba de modal |
| R-02 | Error en traducción que altere significado clínico | Información al usuario | 4 | 3 | 3 | 36 | Diccionario centralizado | Revisión bilingüe formal por negocio |
| R-03 | Falla de i18n que impida cambio de idioma | Usabilidad / exactitud informativa | 3 | 3 | 3 | 27 | Fallback a ES y guardado local | Prueba automática por smoke test |
| R-04 | Cambio de HTML rompe selectores JS | Funcionalidad crítica | 4 | 3 | 2 | 24 | Checks `if (el)` | Checklist de regresión tras cada release |
| R-05 | Mensaje WhatsApp incompleto | Calidad de datos enviados | 4 | 2 | 3 | 24 | Plantilla estructurada | Verificación de contenido en pruebas |
| R-06 | Resultados de score incorrectos | Decisión preliminar errónea | 5 | 2 | 3 | 30 | Fórmula explícita | Casos de prueba de borde y suma |
| R-07 | Botón/selector tapa navegación móvil | Riesgo operacional UI | 2 | 3 | 2 | 12 | Ajustes responsive | Pruebas manuales por breakpoints |
| R-08 | Dependencia externa (YouTube/WhatsApp/CDN) no disponible | Disponibilidad parcial | 2 | 3 | 3 | 18 | Fallback parcial | Monitorización post despliegue |

## 3. Riesgos residuales
- Uso de canal externo WhatsApp para transporte de datos depende de política de privacidad y consentimiento informado.
- No existe backend de custodia de datos en alcance actual; implica dependencia de comportamiento del usuario y del canal externo.

## 4. Controles requeridos para aceptación GxP
- Evidencia de ejecución de pruebas funcionales críticas (UAT/OQ-lite).
- Aprobación formal de textos ES/EN por negocio + QA.
- Registro de cambios y aprobación previa a producción.
- Procedimiento de rollback documentado.

