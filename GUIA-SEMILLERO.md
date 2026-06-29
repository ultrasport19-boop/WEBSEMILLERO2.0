# El Semillero — Guía de la web colaborativa automática (PRO+)

La web se actualiza **sola**: las profes/apoderados suben fotos y videos y
aparecen en la página, **con las caras centradas automáticamente**.

```
  [Suben a Drive o desde subir.html]  →  [Apps Script: caras + avisos]  →  [Web en GitHub Pages]
            (por categoría)                  (automático cada 15 min)            (se actualiza sola)
```

## Archivos del paquete
```
semillero-web/
  index.html              ← la página (súbela a GitHub Pages)
  subir.html              ← página para que suban fotos sin entrar a Drive
  logo.png  favicon.png   ← escudo y ícono
  og-image.jpg            ← imagen al compartir el link
  icon-192.png icon-512.png  manifest.webmanifest  sw.js   ← app instalable (PWA)
  GUIA-SEMILLERO.md       ← esta guía
  apps-script/
    Codigo.gs  appsscript.json
```

---

## 1. Carpetas en Drive
1. Carpeta raíz, p.ej. **“El Semillero - Material”**.
2. Una subcarpeta **por categoría** (su nombre es la etiqueta de la web):
   `Sub-6`, `Sub-8`, `Sub-10`, `Sub-12`, `Sub-14`, `Arqueros`…
3. Comparte la raíz con las profes como *Editor*.
4. Tu `ID_CARPETA_RAIZ` ya viene puesto en `apps-script/Codigo.gs`.

## 2. Apps Script
1. Abre <https://script.google.com> → tu proyecto.
2. Pega `apps-script/Codigo.gs` en el código.
3. Pega `apps-script/appsscript.json` en el manifiesto (⚙️ Configuración → *Mostrar appsscript.json*).

## 3. Centrado por caras (recomendado, gratis hasta 1.000 fotos/mes)
1. <https://console.cloud.google.com> → crea/elige un proyecto.
2. **APIs y servicios → Biblioteca → Cloud Vision API → Habilitar**.
3. **Credenciales → Crear → Clave de API** → cópiala.
4. Pégala en `Codigo.gs`: `const VISION_API_KEY = 'TU_CLAVE';`

> Vacío = la web usa un encuadre superior por defecto (igual se ven las cabezas).

## 4. Avisos por correo (opcional)
En `Codigo.gs`, pon tu correo: `const EMAIL_AVISO = 'directora@correo.cl';`
Recibirás un aviso cuando entren fotos nuevas y un **resumen cada lunes**.

## 5. Dejarlo 100% automático
1. En Apps Script ejecuta **`instalarDisparador`** una sola vez y acepta permisos.
2. Listo: cada 15 min procesa caras de fotos nuevas (una sola vez c/u) y envía avisos.

## 6. Publicar la App Web
1. **Implementar → Nueva implementación → App web**.
2. *Ejecutar como*: **Yo**. *Acceso*: **Cualquier persona**.
3. Copia la URL `/exec`.
4. Pégala en `index.html` (variable `API`) **y** en `subir.html` (variable `API`).
   (Ya viene tu URL actual; si reimplementas y cambia, actualízala en ambos.)

## 7. Publicar la página (GitHub Pages)
1. Sube **todos** los archivos de `semillero-web/` juntos al repositorio.
2. **Settings → Pages → Branch: main / root → Save**.
3. ¡Publicado!

## 8. Último ajuste para compartir y SEO
En `index.html` reemplaza **`TU-DOMINIO`** por tu dirección real (p.ej.
`usuario.github.io/repo`) en las etiquetas `og:image`, `og:url` y en los datos
de Google (JSON-LD). Así el link muestra vista previa con imagen.

También edita en `index.html` la sección **“horarios”** (tabla) con tus días y
horas reales, y la sección **“logros”** con tus números.

---

## Novedades de esta versión PRO+
- 🎯 **Centrado por caras** (Cloud Vision) + mosaico según orientación.
- 🔄 **Auto-actualización** sin recargar.
- 🏟️ **Pantalla de carga** con el escudo + **carga progresiva** (blur-up).
- 🔎 **Buscador** y **orden** (recientes / antiguas / por categoría).
- ⬇️ **Descargar / compartir** cada foto desde el visor.
- 🧩 **Sección de categorías** con botón de inscripción por WhatsApp.
- 🗺️ **Horarios + mapa** y sección de **logros**.
- 📲 **App instalable (PWA)** con ícono del escudo y modo offline.
- 📤 **subir.html**: apoderados suben sin entrar a Drive.
- 📧 **Avisos** al subir fotos + **resumen semanal**.
- 🔗 **Compartir con vista previa** (Open Graph) + **SEO local** (datos de Google).
- 💧 **Marca de agua** con el escudo en fotos y visor.

## Solución de problemas
| Síntoma | Solución |
|---|---|
| “No pudimos cargar la galería” | App Web no publicada para *cualquiera* (paso 6) |
| No centra las caras | Falta `VISION_API_KEY` o el disparador (pasos 3 y 5) |
| subir.html no sube | Pega la URL `/exec` también en `subir.html` |
| El link no muestra preview | Reemplaza `TU-DOMINIO` (paso 8) |
| No llegan correos | Pon `EMAIL_AVISO` y reinstala el disparador |
