# FS - Especificación Funcional
**ID Documento:** FS-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Arquitectura funcional por módulo

## 1.1 Módulo Presentación (`index.html`)
- Secciones: Hero, Protocolo, Pacientes, Formulario, Footer.
- Modales:
  - Confirmación WhatsApp.
  - Cuestionario de longevidad.
  - Experiencias (video).

## 1.2 Módulo Estilos (`css/styles.css`)
- Layout responsive.
- Comportamiento visual de CTA, tarjetas y modales.
- Estilos del selector de idioma y estados activo/inactivo.

## 1.3 Módulo Lógica principal (`js/main.js`)
- Eventos de formularios.
- Ensamble de mensajes WhatsApp.
- Gestión de modales y accesibilidad de cierre.
- Cálculo de `Longevity Score`.
- Exportación del resultado como imagen.
- Aplicación de recursos seguros (`applySecureAssets`).

## 1.4 Módulo Internacionalización (`js/i18n.js`)
- Diccionario ES/EN.
- Detección automática de idioma.
- Persistencia de preferencia.
- Aplicación de traducción en texto, placeholders, labels y modal.
- Cambio de recursos visuales por idioma.

## 1.5 Módulo Recursos (`js/assets.js`)
- Mapeo ofuscado de rutas de imagen, video y links.
- Exposición de función `window.__rs(key)` para resolver recursos en runtime.

## 2. Flujos funcionales críticos

## 2.1 Flujo: Solicitud de protocolo
1. Usuario llena formulario anclado en sección Formulario.
2. Al `submit`, se arma mensaje estructurado para WhatsApp.
3. Se abre modal de confirmación.
4. Si acepta, se abre WhatsApp con mensaje prellenado.
5. Usuario adjunta archivos manualmente en WhatsApp si aplica.

## 2.2 Flujo: Cuestionario de longevidad
1. Usuario abre modal de cuestionario.
2. Captura datos generales y respuestas.
3. Al finalizar, sistema calcula puntaje total.
4. Se interpreta resultado según rangos configurados.
5. Usuario puede guardar imagen o enviar por WhatsApp.

## 2.3 Flujo: Selección/detección de idioma
1. Al cargar, se consulta `localStorage` (`camsa-lang`).
2. Si no existe, se detecta por `navigator.language`.
3. Se aplica idioma y se persiste preferencia.
4. Al pulsar botón ES/EN, se reaplica idioma y recursos asociados.

## 3. Reglas funcionales específicas
- Validación básica por `required` en campos críticos.
- Rango de puntaje longevidad: 0 a 100 (según sumatoria de ítems).
- Interpretación por umbrales:
  - >=90, >=80, >=70, >=60, <60.
- En modal WhatsApp siempre se solicita autorización explícita.

## 4. Dependencias funcionales
- GSAP para efectos visuales.
- `html2canvas` para captura de imagen del resultado.
- `wa.me` para envío de mensajes.
- YouTube embed para contenido de video.

## 5. Manejo de errores funcionales (actual)
- Validaciones defensivas por presencia de nodos (`if (el)`).
- Fallback de idioma a español si clave inválida.
- Fallback de recursos con `window.__rs`.
- Logs de consola en fallos de captura de imagen.

