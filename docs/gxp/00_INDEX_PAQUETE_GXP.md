# Paquete Documental GxP  
**Proyecto:** Frontend Web Clínica CAMSA (landing con formularios, modales, i18n ES/EN y envío por WhatsApp)  
**Estado:** Borrador controlado para revisión y aprobación  
**Fecha:** 2026-03-20  
**Propietario documental:** Dueño de Proceso / QA  

## 1. Objetivo del paquete
Este paquete consolida la documentación mínima y extendida para control GxP de un sistema web de interacción con pacientes potenciales, incluyendo:
- Información promocional y de contacto.
- Captura de datos del formulario de solicitud de protocolo.
- Cuestionario de longevidad con cálculo de puntaje.
- Envío de información por WhatsApp con confirmación explícita.
- Gestión de idioma ES/EN y recursos visuales por idioma.

## 2. Alcance del sistema documentado
- **Incluido:** `index.html`, `css/styles.css`, `js/main.js`, `js/i18n.js`, `js/assets.js`, `img/*`.
- **Incluido:** comportamiento UI, integridad funcional del flujo de formularios, trazabilidad de cambios funcionales recientes.
- **No incluido:** backend propio, base de datos, autenticación real de pacientes, infraestructura de servidor, cifrado en tránsito a nivel HTTP (asumido por hosting).

## 3. Estructura del paquete documental
1. `01_URS_REQUERIMIENTOS_USUARIO.md`  
2. `02_FS_ESPECIFICACION_FUNCIONAL.md`  
3. `03_DS_ESPECIFICACION_DISENO_TECNICO.md`  
4. `04_RISK_ASSESSMENT_GXP.md`  
5. `05_TRAZABILIDAD_MATRIZ_RTMS.md`  
6. `06_PLAN_VALIDACION_Y_PRUEBAS.md`  
7. `07_REGISTRO_DE_CAMBIOS_Y_RAZONES.md`  
8. `08_SOP_OPERACION_Y_MANTENIMIENTO.md`  
9. `09_GESTION_DATOS_INTEGRIDAD_ALCOA.md`  
10. `10_ANEXO_INVENTARIO_MODULOS_Y_ELEMENTOS.md`  

## 4. Criterios GxP aplicados
- Enfoque basado en riesgo.
- Trazabilidad requisito ↔ diseño ↔ prueba ↔ evidencia.
- Control documental y control de cambios.
- Definición de roles y responsabilidades.
- Integridad de datos (ALCOA+).
- Reproducibilidad de pruebas.

## 5. Roles y responsabilidades (RACI resumido)
- **Owner de proceso (Negocio):** define URS, aprueba alcance funcional.
- **QA/CSV:** define estrategia de validación, ejecuta revisión de cumplimiento, aprueba liberación.
- **Desarrollo Frontend:** implementa cambios, mantiene evidencia técnica y corrige desviaciones.
- **Responsable de Seguridad/Privacidad:** define lineamientos de tratamiento de datos personales.
- **Operación/Webmaster:** despliegue controlado y monitoreo post-liberación.

## 6. Estado actual de madurez documental
- Existe implementación funcional y en evolución.
- El presente paquete establece base de control para formalizar:
  - Aprobaciones.
  - Evidencias de prueba.
  - Bitácora de desviaciones.
  - Plan de retiro/rollback.

## 7. Aprobaciones (plantilla)
- **Preparó:** __________________ Fecha: __________  
- **Revisó QA:** _______________ Fecha: __________  
- **Aprobó Dueño de Proceso:** _________ Fecha: __________  
- **Aprobó TI/CSV:** ___________ Fecha: __________  

