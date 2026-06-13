# URS - Requerimientos de Usuario (GxP)
**ID Documento:** URS-FE-CAMSA-001  
**Versión:** 1.0  
**Estado:** Borrador para aprobación  

## 1. Propósito
Definir requerimientos de usuario para el frontend de Clínica CAMSA que impacta captura y transmisión de información de potenciales pacientes.

## 2. Requerimientos funcionales (URS-F)
- **URS-F-001:** El sistema debe mostrar navegación a secciones `Inicio`, `Protocolo`, `Pacientes`, `Formulario`.
- **URS-F-002:** Debe permitir envío de solicitud de protocolo por WhatsApp previa confirmación explícita.
- **URS-F-003:** Debe capturar campos obligatorios de contacto y situación de salud (nombre, teléfono, preocupaciones, diagnóstico, medicamentos).
- **URS-F-004:** Debe mostrar cuestionario de longevidad con 20 preguntas y cálculo de puntaje.
- **URS-F-005:** Debe permitir exportar el resultado del cuestionario como imagen.
- **URS-F-006:** Debe permitir envío del resultado del cuestionario por WhatsApp.
- **URS-F-007:** Debe soportar idioma Español e Inglés.
- **URS-F-008:** Debe detectar automáticamente idioma preferido si no existe selección previa.
- **URS-F-009:** Debe persistir la selección de idioma entre sesiones.
- **URS-F-010:** Al cambiar a inglés, debe ajustar recursos visuales definidos (cards/doctor/pasos protocolo).

## 3. Requerimientos de interfaz (URS-UI)
- **URS-UI-001:** El selector de idioma debe ser visible y operable en escritorio y móvil.
- **URS-UI-002:** En móvil, el selector no debe obstruir el menú hamburguesa.
- **URS-UI-003:** Los CTA principales deben mantener legibilidad y centrado del texto.
- **URS-UI-004:** Los modales deben tener mecanismos claros de cierre (botón, backdrop, tecla ESC).

## 4. Requerimientos de integridad y cumplimiento (URS-C)
- **URS-C-001:** Cualquier envío de datos personales debe requerir confirmación de usuario.
- **URS-C-002:** El sistema debe indicar cuando archivos de estudios deben adjuntarse manualmente en WhatsApp.
- **URS-C-003:** La información enviada debe contener contexto suficiente para evaluación clínica inicial.
- **URS-C-004:** Debe existir trazabilidad documental de cambios funcionales.
- **URS-C-005:** Deben existir pruebas documentadas de funciones críticas.

## 5. Requerimientos no funcionales (URS-NF)
- **URS-NF-001:** Compatibilidad navegadores modernos (Chrome, Edge, Safari, Firefox recientes).
- **URS-NF-002:** Comportamiento responsive en móvil/tablet/escritorio.
- **URS-NF-003:** Carga de recursos con fallback seguro en caso de falla parcial.
- **URS-NF-004:** Código mantenible, con separación de responsabilidades (`assets`, `i18n`, `main`).

## 6. Criterios de aceptación de negocio
- El usuario final puede completar y enviar cualquiera de los dos flujos (protocolo y longevidad).
- El sistema de idioma cambia textos y elementos visuales sin romper funcionalidades.
- Las acciones sensibles (envío) están protegidas por confirmación.
- La experiencia móvil no presenta obstrucciones de navegación.

## 7. Exclusiones explícitas
- No se almacena historia clínica en base de datos local del sistema.
- No se implementa autenticación clínica real en el flujo actual.
- No se implementa firma electrónica avanzada en este alcance.

