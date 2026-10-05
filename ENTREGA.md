# Entrega de la tienda al cliente

Checklist para cerrar el proyecto y transferir la tienda de desarrollo
`remi-equipo-medico.myshopify.com` (creada desde Shopify Partners) a la clienta.

**El orden importa.** Hay pasos que no se pueden deshacer y otros que bloquean
la transferencia si se hacen antes de tiempo. Seguir las fases en secuencia.

---

## Lo que se revisó en la tienda el 2026-10-05

Esto está mal configurado hoy y hay que corregirlo antes de entregar:

| Qué | Cómo está | Cómo debe quedar |
|---|---|---|
| Nombre de la tienda | `remi-equipo-medico` | `REMI Equipo Médico` |
| País de la dirección | **Estados Unidos** | México |
| Dirección fiscal | vacía | la de la clienta |
| Correo de la tienda | el de la agencia | el de la clienta |
| Precios con IVA | **no incluido** | decisión de la clienta (ver Fase 1) |
| Formato de moneda | `$ {{amount}}` | `$ {{amount}} MXN` |

El nombre y el país salen en los correos de pedido, en el pago y en los
comprobantes. El país en "Estados Unidos" además afecta impuestos y puede
estorbar al activar los pagos.

---

## Fase 0 — Decisiones que solo puede tomar la clienta

Nada de lo demás debe arrancar antes de resolver esto. Los dos primeros son
riesgo legal, no detalles.

- [ ] **Precios tachados.** Los precios de comparación de todo el catálogo se
      generaron durante el desarrollo; la clienta nunca los confirmó. Anunciar
      un precio anterior que no se cobró es publicidad engañosa (PROFECO).
      Confirmar los reales o quitarlos.
- [ ] **Cuenta regresiva de promociones.** La fecha en el carrusel es un
      marcador de prueba. O corresponde a una promoción real con esa fecha, o
      se vacía el campo y el reloj desaparece.
      Editor de temas → Hero → "Ventana de promociones".
- [ ] **Permiso de las cinco clínicas** cuyos logos aparecen después de las
      reseñas, y confirmar que el texto describe la relación real.
- [ ] **Derechos de las fotos** tomadas de promedicaloxygen.mx.
- [ ] **Horario de atención** real (hoy es un texto inventado). Va en dos
      lugares: el texto visible y el formato que lee Google.
- [ ] **Testimonios**: los tres actuales son de ejemplo.
- [ ] **Ventiladores "SIN COSTO"** (VELA, AVEA, Philips V60, Astral 150):
      siguen en borrador esperando precio.

---

## Fase 1 — Configuración de la tienda (la hace la agencia, antes de transferir)

### Identidad y datos del negocio
- [ ] Configuración → Detalles de la tienda: nombre `REMI Equipo Médico`
- [ ] Dirección: México, Aguascalientes, la de la sucursal principal
- [ ] Teléfono y correo de contacto **de la clienta** (hoy son de la agencia)
- [ ] Zona horaria: Centro de México
- [ ] Formato de moneda: agregar `MXN` para que no se confunda con dólares

### Políticas (bloquean Google Shopping si faltan)
- [ ] Configuración → Políticas → "Crear desde plantilla" para reembolso, envío
      y términos. Hoy los tres enlaces del menú "Otros" dan 404, y Google
      Merchant Center rechaza cuentas sin políticas visibles.
- [ ] Revisar que la plantilla diga lo que la clienta realmente ofrece

### Impuestos
- [ ] Decidir si los precios **incluyen IVA** o se agrega en el pago. Hoy están
      configurados como *no incluido*, lo que en México no es lo habitual para
      venta al público: el cliente ve un precio y paga otro.
- [ ] Verificar con la contadora de la clienta qué tasa aplica a cada
      categoría. Parte del material médico tiene tratamiento distinto al 16 %
      general. **Esto no lo define la agencia.**

### Envíos
- [ ] Zonas y tarifas reales: local en Aguascalientes y nacional
- [ ] Decidir si hay envío gratis a partir de cierto monto
- [ ] Confirmar que las tarifas cubren el costo real de equipo voluminoso
      (camas, concentradores, tanques)

### Ubicaciones
- [ ] Dar de alta las tres sucursales como ubicaciones, si van a manejar
      inventario por sucursal o recoger en tienda

### Correos automáticos
- [ ] Configuración → Notificaciones: revisar que los correos de pedido salgan
      en español y con el logo correcto
- [ ] Correo del remitente: el de la clienta

### Facturación (CFDI)
- [ ] Shopify no emite CFDI de forma nativa. Si la clienta vende a clínicas
      —que sí van a pedir factura— hace falta una app de facturación conectada
      al SAT, o un proceso manual. **Definirlo antes de lanzar**, no después
      del primer pedido de un hospital.

### Revisión final del tema
- [ ] `shopify theme pull` para traer lo que se haya configurado en el editor
- [ ] `shopify theme check` en cero incidencias
- [ ] Commit y push al repositorio

---

## Fase 2 — Transferencia de la tienda

### Antes de iniciarla

- [ ] **No activar Shopify Payments.** Si está activo —incluso en modo
      prueba— la transferencia falla. Lo mismo con Shopify Balance, Credit o
      Capital. La clienta lo activa **después**, con sus datos fiscales y su
      cuenta bancaria, que es como debe ser.
- [ ] Confirmar que la dirección de la tienda ya es de México (Fase 1). La
      documentación de Shopify lo pide expresamente cuando la clienta está en
      otro país que el socio.
- [ ] Agregar a la clienta como miembro del personal y pedirle que complete su
      parte del registro.

### La transferencia

1. Panel de Shopify Partners → **Tiendas**
2. Junto a la tienda, **Acciones** → **Transferir propiedad**
3. Elegir a la clienta en la lista de propietarios elegibles
4. **Transferir tienda**

Lo que pasa después:

- Le llega un correo con instrucciones para crear su cuenta y **elegir un plan**
- La tienda queda **en pausa** hasta que acepte
- Tiene **siete días** para completar su parte
- **No se puede revertir**
- Después de transferida, la tienda ya no es elegible para promociones ni
  pruebas gratuitas

### Tu acceso después

- [ ] **Pedir a la clienta una cuenta de colaborador antes de transferir.** La
      documentación de Shopify no es consistente sobre cuánto acceso conserva
      el socio: en un lado dice que sigues como colaborador, en otro que la
      tienda sale de tu organización. No lo dejes al azar — si vas a dar
      soporte, que te invite explícitamente desde Configuración → Usuarios.

---

## Fase 3 — Lo que solo puede hacer la clienta

- [ ] **Elegir y pagar el plan** con su tarjeta
- [ ] **Activar Shopify Payments** con sus datos fiscales y cuenta bancaria.
      En México permite tarjetas Visa, Mastercard, UnionPay y American Express
      en pesos, Apple Pay, Google Pay, Shop Pay, **meses sin intereses** y
      **OXXO**. Los meses sin intereses importan: para un concentrador de
      $20,000 o un CPAP de $19,500 cambian la decisión de compra.
- [ ] Decidir si además quiere PayPal o transferencia
- [ ] **Dominio.** Ya tiene `remiequipomedico.com` con el sitio anterior.
      Conectarlo implica cambiar los DNS y dar de baja el sitio viejo. Hacerlo
      en horario de poco tráfico y confirmar que el correo del dominio, si lo
      usa, no se vea afectado — es el error clásico al mover DNS.
- [ ] **Fichas de Google Business Profile** de las tres sucursales (gratis, y es
      lo que más rinde para un negocio local)

---

## Fase 4 — Salir del modo privado

Solo cuando la Fase 0 esté resuelta.

- [ ] Quitar la contraseña de la tienda (Configuración → Preferencias)
- [ ] Hacer un **pedido de prueba real** de principio a fin: pago, correo de
      confirmación, factura
- [ ] Verificar que los correos lleguen a la clienta, no a la agencia
- [ ] Revisar la tienda en un teléfono de verdad, no solo en el emulador
- [ ] Enviar el sitio a Google Search Console y verificar el sitemap

---

## Fase 5 — Cierre del proyecto

### Accesos que deben quedar en manos de la clienta

- [ ] Propiedad de la tienda Shopify
- [ ] Registrador del dominio
- [ ] Google Business Profile
- [ ] Correo del negocio
- [ ] Redes sociales

Vale la pena dejarlo por escrito: quién es dueño de qué. Es la fuente más común
de problemas meses después, cuando alguien se va o se pierde una contraseña.

### Documentación

- [ ] Entregar el acceso al repositorio o una copia del código
- [ ] Explicar qué se puede editar desde el editor de temas sin tocar código:
      textos del Hero, las cuatro ventanas del carrusel, productos destacados,
      categorías, testimonios, logos, datos de contacto
- [ ] Advertir que si contrata a alguien más para tocar el código, ese alguien
      debe hacer `shopify theme pull` antes de subir nada, o le borra lo que
      haya configurado

### Capacitación

- [ ] Sesión con la clienta: cargar un producto, cambiar un precio, ver un
      pedido, responder un mensaje, agregar un testimonio
- [ ] Definir qué soporte sigue habiendo después de la entrega y bajo qué
      términos

---

## Referencias

- [Transferir tiendas de desarrollo a clientes](https://help.shopify.com/en/partners/dashboard/managing-stores/hand-off-development-stores)
- [Transferir la propiedad de una tienda](https://help.shopify.com/en/partners/building-stores-for-merchants/transferring-store-ownership)
- [Shopify Payments en México — métodos de pago](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/mexico/payment-methods)
