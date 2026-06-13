# Gestión de Datos e Integridad (ALCOA+)
**ID Documento:** DI-FE-CAMSA-001  
**Versión:** 1.0  

## 1. Datos tratados en el frontend
- Nombre y teléfono de contacto.
- Información de salud autorreportada (síntomas/diagnóstico/medicación).
- Respuestas de cuestionario de longevidad.
- Puntaje e interpretación.

## 2. Flujo de datos
1. Captura en cliente (navegador).
2. Transformación a mensaje estructurado.
3. Confirmación explícita de envío.
4. Derivación a canal externo (WhatsApp).

## 3. ALCOA+ aplicado
- **Atribuible:** Datos ingresados por usuario final.
- **Legible:** Mensajes estructurados y etiquetados.
- **Contemporáneo:** Captura y envío en sesión activa.
- **Original:** Entrada directa del usuario.
- **Accurate:** Requiere pruebas de exactitud de composición de mensajes.
- **Completo:** Incluye campos clave y respuestas.
- **Consistente:** Plantilla fija de mensaje.
- **Duradero:** Persistencia local solo de idioma (no datos clínicos).
- **Disponible:** Datos enviados quedan en canal de comunicación seleccionado.

## 4. Controles actuales de privacidad
- Modal de consentimiento previo al envío.
- Mensaje de advertencia para adjunto manual de estudios.
- No persistencia local de datos de salud sensibles.

## 5. Brechas y recomendaciones
- Definir aviso de privacidad visible previo al formulario.
- Incorporar checkbox de consentimiento explícito (si política lo exige).
- Evaluar necesidad de backend auditado para custodia de información.

