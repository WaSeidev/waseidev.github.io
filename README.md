# waseidev.net — Portafolio de Walther A. Seidel M.

Sitio personal bilingüe (inglés / español) con Astro 7 y Tailwind 4.
Producción: [waseidev.net](https://waseidev.net).

## Comandos

| Comando                | Acción                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Instala las dependencias                           |
| `npm run dev`          | Servidor de desarrollo en `localhost:4321`         |
| `npm run build`        | Compila el sitio a `./dist/`                       |
| `npm run preview`      | Sirve el build local antes de desplegar            |
| `npm run check`        | Comprueba tipos con `astro check`                  |
| `npm run lint`         | ESLint sobre `.astro` y `.ts`                      |
| `npm run format`       | Formatea con Prettier                              |
| `npm run format:check` | Verifica el formato sin escribir (lo que corre CI) |

## Cómo funciona el bilingüe

Cada ruta se escribe **una sola vez** en `src/pages/[lang]/`. Un
`getStaticPaths` compartido (`getLocalePaths` en `src/i18n/utils.ts`) emite el
mismo archivo para los dos idiomas, así que `about.astro` genera `/en/about` y
`/es/about`. Antes existían `src/pages/en/` y `src/pages/es/` en paralelo.

Los textos de interfaz están en `src/i18n/en.json` y `es.json`. `es.json` se
tipa contra `en.json`, de modo que **si falta una clave el build falla** en
`npm run check`.

Los slugs se unificaron (`/es/about` en vez de `/es/acerca`) para que una sola
página sirva a ambos idiomas. Las rutas antiguas siguen funcionando mediante
`redirects` en `astro.config.mjs`.

### Contenido

- **Datos del CV**: `src/data/cv.en.json` y `cv.es.json`, en formato
  [JSON Resume](https://jsonresume.org/). Es la única fuente del currículum,
  la home y las metaetiquetas.
- **Blog y proyectos**: Markdown en `src/content/blog/` y `src/content/projects/`.
  El idioma se indica con `lang: en|es` en el frontmatter, y `draft: true`
  excluye la entrada del build.

## El currículum imprimible

`/{lang}/cv` es una página web normal que, al imprimirla, sale como **una sola
hoja A4**. El botón «Descargar en PDF» abre el diálogo del navegador; con
«Guardar como PDF» se obtiene exactamente lo mismo que saldría por impresora.
No hay ninguna librería de PDF ni un archivo que mantener aparte.

Dos mandos controlan que quepa en una página:

- `--print-scale` en `src/styles/global.css` (hoy `0.86`) comprime todo el
  documento proporcionalmente. **Si añades experiencia y se desborda a una
  segunda hoja, baja este valor antes de tocar nada más.**
- `printLimit` en `<Experience>` (hoy `6`) define cuántos empleos entran en el
  papel. La web siempre los muestra todos; el resto lleva `print:hidden`.

Para comprobarlo sin abrir el navegador:

```bash
npm run build && npm run preview
# en otra terminal
chrome --headless --no-pdf-header-footer \
  --print-to-pdf=cv.pdf http://localhost:4321/es/cv
pdfinfo cv.pdf | grep Pages   # debe decir 1
```

## Despliegue

Tres workflows encadenados en `.github/workflows/`:

1. **`ci.yml`** — en cada PR y push a `main`: formato, lint, tipos y build.
   Sube el `dist/` como artifact.
2. **`deploy.yml`** — solo si CI pasó: descarga ese artifact y lo envía por SCP
   al servidor. **No recompila**, así que publica exactamente lo validado.
   El destino es `/home/waseidel/web/waseidev.net`, que es el volumen del
   contenedor `webstatic` definido en `syfhome-config`. Si cambias esa ruta
   allí, hay que cambiarla también aquí o el sitio dejará de actualizarse.
3. **`pages.yml`** — copia de revisión en GitHub Pages, con
   `PUBLIC_NOINDEX=true` para no competir en buscadores con producción.

### Configuración necesaria en el repo

Secretos (Settings → Secrets and variables → Actions → Secrets):

- `SERVER_IP`, `SERVER_USER`, `SSH_PRIVATE_KEY`

Variables opcionales:

- `SSH_PORT` si SSH no escucha en el 22.

Y en Settings → Pages, **Source: GitHub Actions**. Mientras esté en modo rama,
GitHub lanza su constructor de Jekyll, que no sabe compilar Astro y falla en
cada push.

### Si el SCP falla con `unable to authenticate`

Significa que la clave de `SSH_PRIVATE_KEY` no está autorizada en el servidor.
Se regenera así:

```bash
# En tu máquina: par de claves dedicado al deploy, sin passphrase
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/deploy_waseidev -N ""

# Autorizar la pública en el servidor
ssh-copy-id -i ~/.ssh/deploy_waseidev.pub USUARIO@SERVIDOR

# Comprobar que entra sin pedir contraseña
ssh -i ~/.ssh/deploy_waseidev USUARIO@SERVIDOR 'echo ok'
```

Luego copia el contenido **completo** de la clave privada
(`cat ~/.ssh/deploy_waseidev`, incluidas las líneas `BEGIN`/`END`) en el
secreto `SSH_PRIVATE_KEY`.

## Licencia

MIT
