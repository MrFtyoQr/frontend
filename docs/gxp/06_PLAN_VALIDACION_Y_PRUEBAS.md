# Plan de Validación y Pruebas (CSV/GxP)
**ID Documento:** VP-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Estrategia de validación
- Enfoque basado en riesgo para funciones críticas de captura/envío de datos.
- Validación por capas:
  - **IQ (implícita):** verificación de despliegue de artefactos estáticos.
  - **OQ:** pruebas funcionales de flujos críticos.
  - **PQ/UAT:** validación por usuario de negocio en entorno representativo.

## 2. Casos mínimos obligatorios

## 2.1 Idioma
- **TC-I18N-001:** Cambiar ES->EN y EN->ES con botones.
- **TC-I18N-002:** Persistencia tras recarga.
- **TC-I18N-003:** Detección inicial por navegador sin `camsa-lang`.
- **TC-I18N-004:** Traducción completa de placeholders y modal longevidad.
- **TC-I18N-005:** Cambio de imágenes por idioma (card, doctor, 6 pasos).

## 2.2 Solicitud de protocolo
- **TC-PROT-001:** Validación de campos obligatorios.
- **TC-PROT-002:** Apertura modal de confirmación al enviar.
- **TC-PROT-003:** Cancelar no abre WhatsApp.
- **TC-PROT-004:** Aceptar abre WhatsApp con contenido esperado.

## 2.3 Cuestionario longevidad
- **TC-LONG-001:** Cálculo puntaje correcto con dataset controlado.
- **TC-LONG-002:** Interpretación correcta por umbral.
- **TC-LONG-003:** Exportar imagen genera archivo.
- **TC-LONG-004:** Enviar por WhatsApp crea mensaje con respuestas.
- **TC-LONG-005:** Traducción de preguntas/opciones afecta mensaje enviado.

## 2.4 Responsive/UI
- **TC-UI-001:** Selector de idioma no bloquea menú móvil.
- **TC-UI-002:** CTA principal con texto centrado en desktop/móvil.
- **TC-UI-003:** Modales cierran por botón, backdrop y ESC.

## 3. Criterios de aceptación de validación
- 100% de casos críticos aprobados.
- 0 defectos críticos/altos abiertos.
- Defectos medios con plan de corrección y fecha.

## 4. Evidencia requerida
- Capturas y/o video de ejecución.
- Bitácora de resultados por caso.
- Registro de defectos con estado.
- Firma de aprobación QA/Negocio.

## 5. Gestión de desviaciones
- Cada desviación requiere:
  - Descripción.
  - Análisis de impacto.
  - Acción correctiva/preventiva (CAPA).
  - Reprueba documentada.

