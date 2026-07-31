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
- **Página «Mi Setup»**: `src/data/setup.en.json` y `setup.es.json`. Una
  sección **sin `items` no se renderiza**, así que se puede dejar a medias sin
  que salga un hueco vacío. La sección `workstation` está así a propósito:
  rellénala con tu equipo real.
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
2. **`deploy.yml`** — solo si CI pasó: descarga ese artifact y lo copia a la
   raíz web. **No recompila**, así que publica exactamente lo validado.
   Corre en un **runner self-hosted** dentro de SYFHome, que sale hacia fuera
   a por los trabajos: no hace falta abrir ningún puerto ni tener IP fija.
3. **`pages.yml`** — copia de revisión en GitHub Pages, con
   `PUBLIC_NOINDEX=true` para no competir en buscadores con producción.

El destino es `/var/www/waseidev.net`, que es el volumen del contenedor
`webstatic` definido en `syfhome-config`. Si cambias esa ruta allí, hay que
cambiarla también en `deploy.yml` o el sitio dejará de actualizarse.

Se sincroniza el **contenido** con `rsync`, nunca se reemplaza el directorio:
es un bind mount de Docker, y un `mv` dejaría al contenedor apuntando al inodo
viejo, sirviendo la versión anterior para siempre.

### Configuración necesaria en el repo

En Settings → Pages, **Source: GitHub Actions**. Mientras esté en modo rama,
GitHub lanza su constructor de Jekyll, que no sabe compilar Astro y falla en
cada push.

En Settings → Actions → General, **Require approval for all outside
collaborators**. El repo es público y el runner corre en una máquina personal:
sin esta opción, un PR desde un fork podría ejecutar código en ella.

El runner se declara en `nixos/modulos/github-runner.nix` del repo
`syfhome-config`. Ya no hacen falta los secretos `SERVER_IP`, `SERVER_USER`
ni `SSH_PRIVATE_KEY`; se pueden borrar.

### Si el deploy se queda en cola

Significa que el runner no está conectado. En el servidor:

```bash
systemctl status github-runner-waseidev
journalctl -u github-runner-waseidev -n 50
```

Y en Settings → Actions → Runners debería aparecer como _Idle_.

## Licencia

MIT
