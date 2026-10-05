# REMI Equipo Médico — tema de Shopify

Recreación del mismo diseño (colores, secciones, contenido) del sitio Angular, ahora como
tema de Shopify (Online Store 2.0, Liquid), conectado a productos, colecciones, carrito y
checkout reales. Validado con `shopify theme check` (0 ofensas).

## Requisitos

- Una tienda de Shopify (cualquier plan, incluido el periodo de prueba).
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli): `npm install -g @shopify/cli` (o usar `npx @shopify/cli`).

## Subir el tema

La tienda es `remi-equipo-medico.myshopify.com`.

```bash
shopify theme dev --store remi-equipo-medico.myshopify.com
```

```bash
shopify theme push --store remi-equipo-medico.myshopify.com
```

`theme dev` abre una vista previa en vivo en `http://127.0.0.1:9292` y sincroniza cada
cambio de archivo al tema de *desarrollo*, sin tocar el tema publicado. `theme push` sube
el tema a la tienda.

## Configuración necesaria en el admin de Shopify (una sola vez)

1. **Colecciones** — crea una colección por categoría, con estos *handles* exactos para que
   los enlaces y filtros del tema coincidan:
   - `oxigenoterapia`, `apnea-del-sueno`, `ortopedia`, `equipo-medico`, `reguladores`, `renta`
   - Luego, en **Personalizar tema → Inicio → Cuadrícula de categorías** (y en la página de
     catálogo → **Cuadrícula de productos**), asigna cada bloque a su colección correspondiente
     desde el selector.

2. **Productos** — al crear productos, usa la etiqueta (*tag*) `mas-vendido` o `nuevo` para que
   aparezca la insignia correspondiente en la tarjeta de producto.

3. **Menús** (Navegación en el admin):
   - `main-menu`: Inicio, Productos (→ `/collections/all`), Nosotros (→ página `nosotros`),
     Contacto (→ página `contacto`). Agrega Blog (→ `/blogs/news`) si vas a publicar artículos.
   - `footer`: los mismos enlaces o los que prefieras.

4. **Páginas**:
   - Crea una página con handle `nosotros` y en "Plantilla de página" elige `page.about`.
   - Crea una página con handle `contacto` y en "Plantilla de página" elige `page.contact`.
     El formulario usa el sistema de contacto nativo de Shopify — los mensajes llegan al
     correo de notificaciones de la tienda, sin backend adicional.

5. **Filtros del catálogo** — instala la app gratuita **Search & Discovery** de Shopify y define
   ahí los filtros (marca, precio, disponibilidad, etiquetas). El tema los muestra
   automáticamente en la página de colección, junto con el menú de orden. Si no instalas la app,
   la página sigue funcionando: solo se ve el orden y los atajos por categoría.

6. **Blog** — Shopify crea un blog llamado *News* por defecto. Publica ahí y los artículos usan
   las plantillas `blog` y `article` del tema. Los temas se controlan con las etiquetas del
   artículo. Para permitir comentarios: **Blog → Administrar → Comentarios**.

7. **Ajustes del tema** (Personalizar tema → Configuración del tema) — todo editable sin código:
   - **Tipografía**: fuente de títulos y de textos, tomadas de la librería de Shopify.
   - **Marca y SEO**: nombre del negocio, zona de servicio, horario en formato para Google,
     rango de precios, favicon e imagen para compartir en redes.
   - **Colores**, **Contacto** (teléfono, WhatsApp, correo, horario) y **Redes sociales**.

   > El **horario en formato para Google** es distinto al horario que se muestra en la página.
   > Google necesita `Mo-Fr 09:00-19:00, Sa 09:00-14:00`; el de la página es texto libre.

## Estructura

- `layout/theme.liquid` — documento base: inyecta colores y fuentes como variables CSS,
  carga las fuentes desde el CDN de Shopify y llama a los snippets de SEO.
- `sections/` — cada bloque visual (hero, franja de confianza, categorías, productos
  destacados, por qué elegirnos, marcas, testimonios, CTA, catálogo, producto, nosotros,
  contacto, carrito, blog, artículo, 404, búsqueda). Todas son editables con bloques desde
  el editor de temas.
- `snippets/icon.liquid` — set de íconos SVG propios (mismo estilo que la versión Angular).
- `snippets/product-card.liquid` — tarjeta de producto reutilizada en inicio, catálogo y búsqueda.
- `snippets/responsive-image.liquid` — imágenes con `srcset` para que el navegador baje solo
  el tamaño que necesita.
- `snippets/meta-tags.liquid` — Open Graph y Twitter Card (cómo se ve el enlace al compartirlo).
- `snippets/structured-data.liquid` — JSON-LD: negocio local, producto, artículo, buscador
  del sitio y migas de pan.
- `assets/theme.css` — sistema de diseño completo (mismo que la versión Angular, en CSS plano).
- `assets/theme.js` — menú móvil, galería de producto, cambio de variante y filtros.
- `templates/*.json` — arma cada tipo de página a partir de las secciones.

## Datos del negocio

Todo lo de esta sección se migró desde el sitio anterior, `remiequipomedico.com`, y ya viene
cargado en el tema. Se edita desde **Personalizar tema → Configuración del tema**.

- **Teléfono / WhatsApp**: 449 311 5440 (WhatsApp `5214493115440`)
- **Correo**: contacto@remiequipomedico.com
- **Facebook**: facebook.com/asesoriaremi · **Instagram**: instagram.com/remi_equipos_medicos
- **Sucursales** (página Nosotros → sección Sucursales):
  1. Av. Aguascalientes Oriente #2602
  2. Av. Universidad 316, San Cayetano, C.P. 20010
  3. Av. Siglo XXI 949, Emiliano Zapata, C.P. 20298
- **Proveedores** (inicio → sección Marcas): ResMed, Inogen, Handy, Drive, Companion, Yuwell
- **Cifras de la empresa**: fundada en 2016, 15 profesionales, 3 sucursales.

> El **horario de atención** no está publicado en el sitio anterior, así que el que trae el tema
> es de relleno. Hay que pedírselo al cliente y cargarlo en dos lugares: el texto que se muestra
> (`Configuración → Contacto → Horario`) y el formato que lee Google
> (`Marca y SEO → Horario en formato para Google`).

### Logotipo

El logo vive en `assets/logo.png` (512 px) y `assets/logo-favicon.png` (180 px), así que viaja
con el tema y funciona en una tienda nueva sin configurar nada. Para reemplazarlo sin tocar
código, sube uno en **Configuración del tema → Marca y SEO → Logotipo**: tiene prioridad
sobre el del tema.

El logo es circular y su anillo lleva texto negro, por eso en el pie de página (azul oscuro)
se dibuja sobre un disco blanco. Si algún día se cambia por un logo horizontal o de un solo
color, conviene revisar `.footer__logo-mark` en `assets/theme.css`.

## Tipografía

El diseño original usaba Sora (títulos) y Manrope (textos), cargadas desde Google Fonts.
Ahora ambas salen del CDN de Shopify, lo que es más rápido y evita depender de un tercero:

- **Textos: Manrope** — la misma fuente del diseño original, está en la librería de Shopify.
- **Títulos: Outfit** — Sora no está en la librería de Shopify; Outfit es la más parecida
  (geométrica, del mismo peso visual). Se puede cambiar a cualquier otra desde
  **Configuración del tema → Tipografía**, con vista previa en vivo.

## Qué no incluye (a propósito)

No se generaron plantillas de cuentas de cliente clásicas, ya que Shopify usa cuentas de
cliente alojadas por defecto en tiendas nuevas.
