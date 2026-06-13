# Anexo - Inventario Detallado de Módulos, Secciones y Elementos
**ID Documento:** ANX-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Inventario por archivo

## 1.1 `index.html`
- Header/nav.
- Sección Hero (mensaje y CTA).
- Sección Protocolo (6 pasos visuales).
- Sección Pacientes + testimonios.
- Sección Formulario:
  - Formulario anclado solicitud protocolo.
  - Card para cuestionario longevidad.
- Modales:
  - Cuestionario longevidad.
  - Confirmación WhatsApp.
  - Experiencias en video.
- Footer y redes.

## 1.2 `js/main.js`
- Gestión formularios y modales.
- Construcción mensajes WhatsApp.
- Lógica de cuestionario y resultado.
- Exportación imagen score.
- Eventos de navegación, carruseles y UI.
- Aplicación de recursos ofuscados.

## 1.3 `js/i18n.js`
- Diccionario ES/EN.
- Detección automática y persistencia.
- Aplicación de traducciones en texto/placeholder/aria.
- Traducción de formulario y modal longevidad.
- Cambio de recursos visuales por idioma.

## 1.4 `js/assets.js`
- Mapa de recursos `R`.
- Resolución segura por clave `data-rs`.

## 1.5 `css/styles.css`
- Estilos globales y variables.
- Layout responsive.
- Estilos CTA, cards, modales.
- Estilos selector idioma y breakpoints móviles.

## 2. Elementos críticos de negocio
- Botón CTA "Solicita un protocolo personalizado".
- Formulario de solicitud.
- Cuestionario de longevidad.
- Confirmación de envío.
- Selector de idioma.

## 3. Elementos críticos de cumplimiento
- Modal de autorización para envío.
- Texto informativo de adjuntos manuales.
- Integridad del contenido enviado.
- Coherencia de traducciones ES/EN.

## 4. Dependencias externas
- CDN GSAP.
- CDN html2canvas.
- YouTube embed.
- WhatsApp wa.me.

## 5. Evidencia mínima recomendada por release
- Capturas de cada sección.
- Evidencia de cambio ES/EN (textos + imágenes).
- Evidencia de envío de cada flujo.
- Checklist responsive (mobile + desktop).

