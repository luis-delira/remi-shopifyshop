# -*- coding: utf-8 -*-
"""
Version vertical del banner de REMI para telefonos.

No se vuelve a tipografiar nada: el texto se recorta del banner original y se
reacomoda, asi que la tipografia, los pesos y los colores son los mismos. Lo
unico que cambia es el reacomodo de los renglones y el encuadre de la foto.

El original tiene dos tamanos de letra (el renglon de arriba es mas grande y
ligero, el de abajo mas chico y negrita); esa jerarquia se conserva aplicando
una sola escala a todas las piezas.
"""
from PIL import Image
import numpy as np
import os

SRC = r'C:/Users/delan/Desktop/RemiWeb/logos-originales/carrusel-1-original.jpeg'
LOGO = r'C:/Users/delan/Desktop/RemiWeb/remi-shopify-theme/assets/logo.png'
SALIDA = os.path.dirname(os.path.abspath(__file__))

W_OUT, H_OUT = 1080, 2100
ALTO_FOTO = 1080          # encuadre cuadrado del quirofano
MARGEN = 60
ANCHO_TEXTO = W_OUT - 2 * MARGEN          # 960

FONDO_BARRA = (230, 234, 237)
FONDO_CAJA = (88, 138, 161)

im = Image.open(SRC).convert('RGB')
rgb = np.asarray(im).astype(float)
lum = rgb @ [0.2126, 0.7152, 0.0722]

# --- piezas de texto -------------------------------------------------------
# (x0, x1, banda_y, desplazamiento_de_la_linea_base dentro de la banda)
BANDA_1 = (1250, 1322)   # renglon grande y ligero
BANDA_2 = (1322, 1382)   # renglon chico y negrita
BASE_1 = 1304 - BANDA_1[0]
BASE_2 = 1366 - BANDA_2[0]

RENGLONES = [
    ('LAS HERRAMIENTAS',       464, 1199, BANDA_1, BASE_1),
    ('QUE TU',                1225, 1491, BANDA_1, BASE_1),
    ('EQUIPO PROFESIONAL',     556, 1226, BANDA_2, BASE_2),
    ('NECESITA. SOLO EN REMI.', 1248, 2001, BANDA_2, BASE_2),
]


def recortar_tinta(x0, x1, y0, y1):
    """Devuelve la pieza como RGBA, quitando el fondo de la barra.

    El canal alfa sale del contraste contra el fondo, asi que se conserva el
    suavizado de los bordes de las letras en lugar de recortarlas duro.
    """
    sub_l = lum[y0:y1, x0:x1]
    sub_c = rgb[y0:y1, x0:x1]
    fondo = np.percentile(sub_l, 96)
    tinta = np.percentile(sub_l, 3)
    alfa = np.clip((fondo - sub_l) / max(fondo - tinta, 1.0), 0, 1)
    # La barra del original es semitransparente y deja ver el piso detras: sin
    # este corte, cada pieza arrastraria un rectangulo fantasma con las lineas
    # de los azulejos. El rango 0.14-0.86 conserva el suavizado de las letras.
    alfa = np.clip((alfa - 0.14) / 0.72, 0, 1)
    color = sub_c[sub_l <= np.percentile(sub_l, 12)].mean(0)
    salida = np.zeros(sub_l.shape + (4,), dtype=np.uint8)
    salida[..., 0], salida[..., 1], salida[..., 2] = color.round().astype(np.uint8)
    salida[..., 3] = (alfa * 255).round().astype(np.uint8)
    return Image.fromarray(salida, 'RGBA')


# Una sola escala para todas las piezas: el renglon mas ancho manda.
mas_ancho = max(x1 - x0 for _, x0, x1, _, _ in RENGLONES)
ESCALA = ANCHO_TEXTO / float(mas_ancho)

piezas = []
for texto, x0, x1, (by0, by1), base in RENGLONES:
    p = recortar_tinta(x0, x1, by0, by1)
    nw, nh = int(round(p.width * ESCALA)), int(round(p.height * ESCALA))
    piezas.append({'txt': texto, 'img': p.resize((nw, nh), Image.LANCZOS),
                   'base': base * ESCALA})

# --- caja azul: texto blanco ----------------------------------------------
CX0, CX1, CY0, CY1 = 2180, 2815, 1248, 1378
sub_l = lum[CY0:CY1, CX0:CX1]
alfa = np.clip((sub_l - 129.0) / (255.0 - 129.0), 0, 1)
alfa = np.clip((alfa - 0.14) / 0.72, 0, 1)
caja_txt = np.zeros(sub_l.shape + (4,), dtype=np.uint8)
caja_txt[..., :3] = 255
caja_txt[..., 3] = (alfa * 255).round().astype(np.uint8)
caja_txt = Image.fromarray(caja_txt, 'RGBA')
esc_caja = (W_OUT - 2 * 110) / float(caja_txt.width)
caja_txt = caja_txt.resize((int(caja_txt.width * esc_caja),
                            int(caja_txt.height * esc_caja)), Image.LANCZOS)

# --- medidas del panel -----------------------------------------------------
# La foto va en recorte cuadrado y el panel se queda con el resto. El sobrante
# se reparte entre el aire de arriba y el que precede a la caja azul, para que
# el panel respire en vez de amontonarse.
GAPS = [40, 18, 30, 16]        # arriba del logo y de cada renglon a partir del 2o
PAD_CAJA = 34
ALTO_CAJA = caja_txt.height + 2 * PAD_CAJA
ALTO_LOGO = 170

alto_panel = H_OUT - ALTO_FOTO
alto_texto = sum(p['img'].height for p in piezas) + sum(GAPS[1:])
fijo = ALTO_LOGO + GAPS[0] + alto_texto + ALTO_CAJA
sobrante = alto_panel - fijo
TOP = int(sobrante * 0.42)
ANTES_CAJA = sobrante - TOP
print('panel %d  foto %d  sobrante %d (top %d, antes de caja %d)  escala texto %.3f'
      % (alto_panel, ALTO_FOTO, sobrante, TOP, ANTES_CAJA, ESCALA))

# --- foto: recorte cuadrado centrado en la cama ----------------------------
ALTO_FUENTE = 1189                       # la foto termina donde empieza la barra
ancho_corte = ALTO_FUENTE                # cuadrado
centro = 1250
fx0 = max(0, centro - ancho_corte // 2)
fx1 = min(im.width, fx0 + ancho_corte)
fx0 = fx1 - ancho_corte
alto_foto = ALTO_FOTO
foto = im.crop((fx0, 0, fx1, ALTO_FUENTE)).resize((W_OUT, alto_foto), Image.LANCZOS)
print('foto recortada x %d..%d de %d' % (fx0, fx1, im.width))

# --- composicion -----------------------------------------------------------
lienzo = Image.new('RGB', (W_OUT, H_OUT), FONDO_BARRA)
lienzo.paste(foto, (0, 0))

logo = Image.open(LOGO).convert('RGBA')
logo = logo.resize((ALTO_LOGO, ALTO_LOGO), Image.LANCZOS)
y = alto_foto + TOP
lienzo.paste(logo, ((W_OUT - ALTO_LOGO) // 2, y), logo)
y += ALTO_LOGO + GAPS[0]

for i, p in enumerate(piezas):
    if i:
        y += GAPS[i]
    lienzo.paste(p['img'], ((W_OUT - p['img'].width) // 2, y), p['img'])
    y += p['img'].height

y += ANTES_CAJA
caja = Image.new('RGB', (W_OUT, ALTO_CAJA), FONDO_CAJA)
caja.paste(caja_txt, ((W_OUT - caja_txt.width) // 2, PAD_CAJA), caja_txt)
lienzo.paste(caja, (0, y))
print('caja de %d a %d (lienzo %d)' % (y, y + ALTO_CAJA, H_OUT))

destino = os.path.join(SALIDA, 'vertical.png')
lienzo.save(destino)
print('listo:', destino, lienzo.size)
