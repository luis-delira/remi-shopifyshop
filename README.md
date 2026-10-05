# REMI Equipo Médico

Tienda en línea de REMI Equipo Médico (Aguascalientes, México): venta y renta de
equipo médico — oxigenoterapia, apnea del sueño, camas hospitalarias, tanques y
ventilación mecánica.

- **Tienda:** `remi-equipo-medico.myshopify.com`
- **Tema en vivo:** `185792626988` — "REMI Equipo Médico"
- **Sitio anterior del cliente:** https://remiequipomedico.com/

---

## Qué hay en el repositorio

| Carpeta | Qué es |
|---|---|
| `remi-shopify-theme/` | El tema de Shopify. Es el proyecto activo. |
| `remi-equipo-medico/` | Sitio en Angular, primera versión del proyecto. Se dejó de trabajar al optar por Shopify; se conserva como referencia. |
| `logos-originales/` | Archivos tal como los entregó el cliente, antes de procesarlos, más los scripts que generan las versiones que usa el tema. |
| `3d/` | Fotos de producto y material de origen. |
| `listado-productos.docx` | Listado original de productos del cliente. |

`Fondos.psd` no está versionado: son 18 MB que no hacen falta para desplegar.
Vive en el Drive del cliente.

---

## Antes de tocar nada: traer el tema en vivo

**Esto es lo más importante del repositorio.**

El cliente puede entrar al editor de temas de Shopify y cambiar textos, imágenes
y ajustes. Shopify guarda esos cambios en `config/settings_data.json` y en
`templates/*.json` **del tema en vivo, no de este repositorio**.

Si editas código y haces `push` sin traer antes esos cambios, le borras todo lo
que haya configurado.

```bash
cd remi-shopify-theme
shopify theme pull --theme 185792626988
```

Traer, revisar qué cambió, commitear eso, y ya entonces editar.

## Desplegar

```bash
cd remi-shopify-theme
shopify theme check
shopify theme push --theme 185792626988 --allow-live
```

`theme check` debe terminar en cero incidencias antes de subir.

## Vista previa local

```bash
cd remi-shopify-theme
shopify theme dev --theme 185792626988 --port 9292
```

Queda en http://127.0.0.1:9292 ya autenticado, sin pedir la contraseña de la
tienda.

---

## Decisiones pendientes del cliente

Lo que falta no es código: son decisiones que solo el cliente puede tomar.
Conviene resolverlas antes de quitar la contraseña de la tienda.

### Riesgo legal (PROFECO)

- **Precios tachados.** Los precios de comparación de todo el catálogo fueron
  generados durante el desarrollo, no los proporcionó el cliente. Anunciar un
  precio anterior que nunca existió es publicidad engañosa. **Hay que
  confirmarlos o quitarlos.**
- **Cuenta regresiva de promociones.** La fecha de la ventana de promociones del
  carrusel es un marcador de prueba. Un contador que anuncia un plazo que no
  corresponde a una promoción real es el mismo problema. Se configura en el
  editor de temas, sección Hero, bloque "Ventana de promociones".

### Permisos de terceros

- **Logos de clínicas.** La sección después de las reseñas muestra los logos de
  Centro Médico La Salud, Clínica La Central, Hospitales MAC, Clínica y
  Maternidad Casa Blanca y Clínica San Telmo. Hace falta autorización por
  escrito de cada una, y confirmar que el texto describe la relación real.
- **Imágenes de producto.** Varias se tomaron de promedicaloxygen.mx. Los
  derechos de uso están sin verificar.

### Contenido incompleto

- **Políticas de reembolso, envío y términos** están vacías; sus enlaces del
  menú dan 404. Se crean desde Configuración → Políticas, con "Crear desde
  plantilla".
- **Horario de atención:** el texto actual es un marcador, no un dato
  confirmado. Va en dos lugares (el texto visible y el formato para Google).
- **Testimonios:** tres son de ejemplo y deben sustituirse por reseñas reales.
- **Ventiladores "SIN COSTO"** (VELA, AVEA, Philips V60, Astral 150) siguen en
  borrador en espera de precio.
- **Selector de moneda** está programado pero oculto: necesita un mercado en USD
  en Configuración → Mercados.

---

## Notas técnicas

- Las imágenes del tema se sirven en varios tamaños con `srcset`. Los originales
  sin comprimir están en `logos-originales/`, junto con los scripts de Python
  que generan las versiones publicadas (`carrusel-1-vertical.py`,
  `clinicas/clinicas.py`).
- El carrusel del Hero tiene cuatro ventanas. Todas miden lo mismo: en escritorio
  manda la primera, en pantallas chicas la más alta. El banner se adapta a ese
  alto recortando solo por arriba, nunca por los lados, donde está su texto.
- El tema no usa framework ni compilación: Liquid, un CSS y un JS. Se edita y se
  sube.
