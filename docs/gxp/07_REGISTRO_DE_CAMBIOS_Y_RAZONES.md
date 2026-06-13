# Registro de Cambios, Razones y Proceso
**ID Documento:** CHG-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Propósito
Mantener trazabilidad de cambios funcionales en términos de **qué**, **por qué**, **riesgo**, **validación** y **resultado**.

## 2. Cambios funcionales recientes relevantes

## CH-001 - Reubicación formulario de protocolo (de card a anclado)
- **Qué cambió:** El formulario "Solicitud de Protocolo" se movió a sección anclada en `#formulario`; se eliminó su modal dedicado.
- **Razón:** Mejorar claridad y acceso directo al flujo principal.
- **Riesgo evaluado:** Medio (impacto en UX y binding de eventos).
- **Controles:** Verificación de `submit`, modal de confirmación, envío WhatsApp.
- **Resultado esperado:** Flujo más directo y menor fricción.

## CH-002 - Selector de idioma ES/EN
- **Qué cambió:** Se incorporó selección de idioma y detección automática.
- **Razón:** Requerimiento de accesibilidad para usuarios de habla inglesa.
- **Riesgo evaluado:** Alto (riesgo de inconsistencia de contenido).
- **Controles:** Diccionario centralizado, persistencia `localStorage`, fallback.
- **Resultado esperado:** Contenido consistente en ambos idiomas.

## CH-003 - Ajustes responsive del selector idioma
- **Qué cambió:** Se reposicionó selector para no interferir con navbar/hamburguesa.
- **Razón:** Defecto de usabilidad en móvil.
- **Riesgo evaluado:** Bajo-medio.
- **Controles:** Prueba visual por breakpoints.
- **Resultado esperado:** Navegación móvil libre de obstrucción.

## CH-004 - Traducción extendida de formularios y modal longevidad
- **Qué cambió:** Se amplió i18n a placeholders, preguntas, opciones y textos de resultado.
- **Razón:** Requerimiento de traducción completa funcional.
- **Riesgo evaluado:** Alto (errores semánticos y de integridad de mensaje).
- **Controles:** Revisión de claves i18n + pruebas de envío WhatsApp.
- **Resultado esperado:** Experiencia bilingüe integral.

## CH-005 - Recurso visual por idioma (ES/EN)
- **Qué cambió:** Se habilitó cambio de imágenes por idioma (card, doctor, pasos protocolo).
- **Razón:** Alineación visual con idioma seleccionado.
- **Riesgo evaluado:** Medio.
- **Controles:** Verificación de `data-rs` + `applySecureAssets`.
- **Resultado esperado:** Coherencia visual y textual por idioma.

## CH-006 - Centrado de texto en CTA principal
- **Qué cambió:** Ajuste CSS a `inline-flex` para centrado consistente.
- **Razón:** Defecto visual reportado.
- **Riesgo evaluado:** Bajo.
- **Controles:** Prueba visual desktop/móvil.

## 3. Proceso estándar de gestión de cambios (SOP resumido)
1. Solicitud de cambio (ticket con justificación).
2. Evaluación de impacto GxP.
3. Aprobación previa (QA + negocio).
4. Implementación controlada.
5. Pruebas y evidencia.
6. Aprobación de liberación.
7. Registro de cierre.

## 4. Plantilla por cambio futuro
- ID cambio:
- Fecha:
- Descripción:
- Motivo de negocio:
- Riesgo/impacto:
- Artefactos afectados:
- Pruebas ejecutadas:
- Resultado:
- Aprobadores:

