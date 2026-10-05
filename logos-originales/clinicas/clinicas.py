# -*- coding: utf-8 -*-
"""
Pasa los logos de las clinicas al mismo tratamiento que los de proveedores:
negro puro sobre fondo transparente y 120 px de alto.

El alfa se estima por cobertura de tinta sobre blanco: para cada pixel se toma
el canal que mas se aleja del blanco y se normaliza con el pixel mas cubierto
de la imagen. Asi un logo claro (el verde de MAC) no sale desvanecido.
"""
from PIL import Image
import numpy as np
import os

SP = os.path.dirname(os.path.abspath(__file__))
ORIG = os.path.join(SP, 'logos')
DEST = r'C:/Users/delan/Desktop/RemiWeb/remi-shopify-theme/assets'
ALTO = 120

# archivo, nombre de salida, recorte opcional (izq, arriba, der, abajo) en fracciones
# Gamma < 1 engrosa la tinta. Hace falta en los logos de trazo claro o con
# degradados: en silueta, un gris medio se ve desvanecido junto a uno solido.
FUENTES = [
    ('lasalud.png',             'clinica-la-salud',   None,                      0.62, 0.10),
    ('fb-ClinicaLaCentral.jpg', 'clinica-la-central', (0.06, 0.06, 0.94, 0.94),  0.70, 0.34),
    ('mac-og.png',              'clinica-mac',        (0.20, 0.12, 0.80, 0.90),  0.70, 0.10),
    ('casablanca.png',          'clinica-casa-blanca', None,                     1.00, 0.10),
    ('fb-clinicasantelmo.jpg',  'clinica-san-telmo',  (0.04, 0.04, 0.96, 0.96),  0.45, 0.10),
]


def a_negro(ruta, recorte, gamma, piso):
    im = Image.open(ruta)
    if recorte:
        w, h = im.size
        im = im.crop((int(w * recorte[0]), int(h * recorte[1]),
                      int(w * recorte[2]), int(h * recorte[3])))

    tiene_alfa = im.mode in ('RGBA', 'LA', 'P') and 'transparency' in im.info or im.mode == 'RGBA'
    im = im.convert('RGBA')
    a = np.asarray(im).astype(float)
    rgb, alfa_orig = a[..., :3], a[..., 3] / 255.0

    # Lo transparente ya era fondo; lo demas se mide contra blanco.
    sobre_blanco = rgb * alfa_orig[..., None] + 255.0 * (1 - alfa_orig[..., None])
    cobertura = 255.0 - sobre_blanco.min(2)
    tope = np.percentile(cobertura, 99.9)
    alfa = np.clip(cobertura / max(tope, 1.0), 0, 1)

    # Fuera el ruido de compresion del fondo (los JPEG de Facebook lo traen) y,
    # cuando el logo tiene sombreado 3D, tambien el halo gris que deja.
    alfa = np.clip((alfa - piso) / max(0.95 - piso, 0.05), 0, 1)
    if gamma != 1.0:
        alfa = alfa ** gamma

    salida = np.zeros(alfa.shape + (4,), dtype=np.uint8)
    salida[..., 3] = (alfa * 255).round().astype(np.uint8)
    return Image.fromarray(salida, 'RGBA')


for archivo, nombre, recorte, gamma, piso in FUENTES:
    im = a_negro(os.path.join(ORIG, archivo), recorte, gamma, piso)
    caja = im.getbbox()
    if caja:
        im = im.crop(caja)
    ancho = max(1, int(round(im.width * ALTO / float(im.height))))
    im = im.resize((ancho, ALTO), Image.LANCZOS)

    destino = os.path.join(DEST, nombre + '.png')
    im.save(destino, optimize=True)
    print('%-22s %4d x %3d   %6d bytes   (origen %s)' % (
        nombre + '.png', ancho, ALTO, os.path.getsize(destino), archivo))
