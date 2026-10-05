# REMI Equipo Médico — sitio web (Angular)

Rediseño en Angular del sitio de venta y renta de equipo médico REMI (Aguascalientes).

## Requisitos

- Node.js 18.19+ o 20.x (LTS)
- npm 9+

Esta máquina no tiene Node.js instalado, así que el proyecto se generó a mano y no se pudo
ejecutar `npm install` ni probar el build. Instala Node.js desde https://nodejs.org antes de
continuar.

## Puesta en marcha

```bash
npm install
npm start
```

La app queda disponible en `http://localhost:4200`.

## Estructura

- `src/app/pages` — páginas: inicio, productos, nosotros, contacto.
- `src/app/shared` — navbar, footer, botón de WhatsApp, ícono de categoría.
- `src/app/core` — modelo y servicio de productos/categorías (datos de ejemplo).
- `src/styles.scss` — tokens de diseño (colores, tipografías, botones, tarjetas de producto).

## Paleta

- Azul clínico `#0b5ea6` — confianza, marca principal.
- Teal salud `#0e9d8f` — bienestar, acentos secundarios.
- Naranja cálido `#ff7a3d` — llamadas a la acción.
