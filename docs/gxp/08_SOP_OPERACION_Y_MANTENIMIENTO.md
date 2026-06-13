# SOP - Operación, Mantenimiento y Soporte
**ID Documento:** SOP-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Operación diaria
- Verificar disponibilidad de sitio.
- Validar carga de recursos críticos (`img`, `js`, `css`, CDNs).
- Verificar funcionamiento de:
  - Selector de idioma.
  - Formularios.
  - Modal de confirmación.
  - Enlaces WhatsApp.

## 2. Checklist pre-liberación
- Cambios aprobados por QA/Negocio.
- RTM actualizado.
- Plan de prueba ejecutado y evidenciado.
- Sin defectos críticos/altos.
- Plan rollback documentado.

## 3. Checklist post-liberación
- Smoke test en producción:
  - Navegación.
  - ES/EN.
  - Envío de protocolo.
  - Cuestionario y resultado.
- Registro de incidentes primeras 24-72h.

## 4. Gestión de incidentes
- Clasificación:
  - Crítico: envío/consentimiento fallido.
  - Alto: i18n inconsistente en formularios.
  - Medio: defecto visual sin bloquear flujo.
  - Bajo: texto/estilo menor.
- Requiere ticket, impacto, workaround, ETA.

## 5. Mantenimiento preventivo
- Revisión trimestral de enlaces externos.
- Revisión semestral de textos regulatorios/comerciales ES/EN.
- Revisión de dependencias CDN y políticas de versión.

## 6. Respaldo y rollback
- Mantener tag/commit de release estable.
- Rollback inmediato en caso de:
  - Riesgo de privacidad.
  - Error en envío de datos.
  - Inconsistencia crítica de contenido.

## 7. Control de accesos y cambios
- Solo personal autorizado modifica repositorio/productivo.
- Todo cambio requiere revisión de par (peer review) y aprobación QA.

