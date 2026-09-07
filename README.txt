PROTOTIPO PWA + WEB SHARE TARGET

Esta carpeta es una copia experimental. NO reemplaza la versión estable original.

Incluye:
- index.html: copia del juego estable con soporte PWA.
- manifest.json: instalación PWA y Web Share Target.
- sw.js: service worker y recepción de archivos compartidos.
- icon-192.png / icon-512.png: iconos de prueba.

IMPORTANTE:
Web Share Target necesita que la PWA esté servida por HTTPS (o localhost durante desarrollo) y esté instalada en Android. Abrir index.html directamente desde el almacenamiento NO activa este flujo.

Prueba prevista:
1. Publicar esta carpeta en un hosting HTTPS estático.
2. Abrir la web en Chrome Android.
3. Instalar la PWA en pantalla de inicio.
4. Desde WhatsApp, compartir un .txt o .js y comprobar si aparece Arena como destino.
5. Al recibirlo, el juego debe intentar instalarlo como mod.
