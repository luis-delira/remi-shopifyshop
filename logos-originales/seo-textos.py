# -*- coding: utf-8 -*-
"""
Títulos y descripciones para buscadores.

Reglas que sigo:
  - Título <= 60 caracteres: arriba de eso Google lo corta.
  - Descripción entre 120 y 158: más corta desaprovecha, más larga se trunca.
  - Nada de precios ni plazos de entrega: son los datos que siguen sin
    confirmar. Solo lo verificable (marcas, categorías, sucursales, teléfono).
"""
import io, json, os

SP = os.path.dirname(os.path.abspath(__file__))

COLECCIONES = {
    "concentradores-de-oxigeno": (
        "Concentradores de Oxígeno en Aguascalientes | REMI",
        "Concentradores estacionarios y portátiles de 5 y 10 litros: Philips, "
        "Inogen, DeVilbiss y Yuwell. Venta y renta con asesoría. Envíos a todo México."),
    "apnea-del-sueno": (
        "CPAP y BiPAP para Apnea del Sueño | REMI Aguascalientes",
        "Equipos CPAP y BiPAP ResMed con mascarilla incluida y accesorios para tu "
        "terapia de sueño. Te ayudamos a elegir el adecuado. Envíos a todo México."),
    "camas-hospitalarias-y-colchones": (
        "Camas Hospitalarias y Colchones | REMI Aguascalientes",
        "Camas clínicas manuales y eléctricas con colchón, porta suero y mesa. "
        "Venta y renta para el cuidado en casa. Tres sucursales en Aguascalientes."),
    "tanques-de-oxigeno-y-reguladores": (
        "Tanques de Oxígeno y Reguladores | REMI Aguascalientes",
        "Tanques de oxígeno medicinal portátiles y fijos, con regulador CGA-540, "
        "cánula y vaso humidificador. Venta y renta en Aguascalientes."),
    "ventilacion-mecanica": (
        "Ventilación Mecánica y Alto Flujo | REMI Aguascalientes",
        "Ventiladores, sistemas de alto flujo y consumibles originales para uso "
        "hospitalario y en casa. Asesoría de especialistas. Envíos a todo México."),
}

PAGINAS = {
    "nosotros": (
        "Nosotros | REMI Equipo Médico Aguascalientes",
        "Desde 2016 acompañamos a familias y clínicas de Aguascalientes a elegir el "
        "equipo médico correcto. Tres sucursales y un equipo de 15 personas."),
    "contacto": (
        "Contacto | REMI Equipo Médico Aguascalientes",
        "Escríbenos por WhatsApp o llámanos al 449 311 5440. Te orientamos para "
        "elegir el equipo médico que necesitas y te pasamos tu cotización."),
    "ubicacion": (
        "Sucursales en Aguascalientes | REMI Equipo Médico",
        "Tres sucursales en Aguascalientes: Universidad, Central y Ojocaliente. "
        "Consulta direcciones y cómo llegar a la más cercana."),
    "renta-de-equipo-medico": (
        "Renta de Equipo Médico en Aguascalientes | REMI",
        "Rentamos camas hospitalarias, concentradores, tanques de oxígeno y equipos "
        "de apnea. Cotización a tu medida, sin comprar lo que usarás unas semanas."),
    "testimonios": (
        "Testimonios de clientes | REMI Equipo Médico",
        "Lo que dicen quienes ya compraron o rentaron equipo médico con nosotros en "
        "Aguascalientes y en el resto de México. Deja tu reseña."),
}

# Para pegar a mano: la portada se configura en Preferencias, no por API.
PORTADA = (
    "REMI Equipo Médico | Venta y renta en Aguascalientes",
    "Concentradores de oxígeno, CPAP, camas hospitalarias y tanques. Venta y renta "
    "con asesoría real, tres sucursales en Aguascalientes y envíos a todo México.")

problemas = []
print("%-34s %-5s %-5s" % ("", "tít.", "desc."))
for grupo, datos in (("COLECCIÓN", COLECCIONES), ("PÁGINA", PAGINAS)):
    print("\n--- %s ---" % grupo)
    for handle, (t, d) in datos.items():
        aviso = ""
        if len(t) > 60:
            aviso += "  TÍTULO LARGO"; problemas.append(handle)
        if not (115 <= len(d) <= 158):
            aviso += "  DESC FUERA DE RANGO"; problemas.append(handle)
        print("%-34s %-5d %-5d%s" % (handle[:34], len(t), len(d), aviso))

t, d = PORTADA
print("\n--- PORTADA (a mano) ---")
print("%-34s %-5d %-5d" % ("portada", len(t), len(d)))

io.open(os.path.join(SP, 'seo_textos.json'), 'w', encoding='utf-8').write(
    json.dumps({"colecciones": COLECCIONES, "paginas": PAGINAS, "portada": PORTADA},
               ensure_ascii=False, indent=1))
print("\nproblemas:", problemas or "ninguno")
