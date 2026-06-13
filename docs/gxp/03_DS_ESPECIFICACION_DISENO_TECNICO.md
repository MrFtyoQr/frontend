# DS - Especificación de Diseño Técnico
**ID Documento:** DS-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Componentes técnicos
- **Capa vista:** HTML semántico.
- **Capa presentación:** CSS monolítico modularizado por secciones.
- **Capa comportamiento:** JavaScript vanilla segmentado (`assets`, `main`, `i18n`).

## 2. Contratos internos relevantes
- `window.__rs(key)` -> retorna ruta/valor de recurso.
- `applySecureAssets()` -> aplica recursos con `data-rs`.
- `window.applyLanguage(lang)` -> aplica traducciones y recursos por idioma.
- `window.getLongevityInterpretacionText(total, lang)` -> interpretación por puntaje.

## 3. Diseño i18n
- Objeto `t` con dos namespaces: `es`, `en`.
- Aplicación por atributos:
  - `data-i18n` -> `textContent`.
  - `data-i18n-placeholder` -> `placeholder`.
  - `data-i18n-aria-label` -> `aria-label`.
- Persistencia por `localStorage` usando llave `camsa-lang`.
- Detección por `navigator.language`.

## 4. Diseño de activos visuales por idioma
- Recursos normales (ES): `iv`, `id`, `s1..s6`.
- Recursos EN:
  - `iv_en` -> `card-carouselEN.png`.
  - `id_en` -> `doctorEN.png`.
  - `s1_en..s6_en` -> `01EN..06EN`.
- `i18n` cambia `data-rs` y reaplica assets.

## 5. Diseño del envío por WhatsApp
- Construcción de mensaje multilinea con encabezados y secciones.
- URL final: `https://wa.me/<numero>?text=<mensaje-encodeado>`.
- Confirmación previa en modal para mitigación de envío accidental.

## 6. Diseño del cuestionario de longevidad
- 20 `fieldset` con radio buttons.
- Cada opción aporta puntaje numérico.
- `longevityResult` encapsula:
  - `total`
  - `interpretacion`
  - `answers[]`
  - `datos{}`

## 7. Consideraciones de mantenibilidad
- Convención de IDs y clases consistente para binding JS.
- Separación clara de responsabilidades por archivo.
- Riesgo técnico: alto acoplamiento DOM-selectors → exige pruebas de regresión visual/funcional tras cambios de HTML.

## 8. Consideraciones de ciberseguridad y privacidad (frontend)
- No persistir datos sensibles en storage local (excepto preferencia idioma).
- Evitar exposición directa de rutas y enlaces sensibles (ofuscación simple en `assets.js`).
- Confirmación explícita antes de salida de datos hacia canal externo (WhatsApp).

