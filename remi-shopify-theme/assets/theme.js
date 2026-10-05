document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (nav) {
    // Arriba del todo el encabezado va completo; al bajar se compacta y el menu
    // pasa a la hamburguesa. El umbral evita que parpadee con micro-scrolls.
    var COMPACTAR_DESDE = 60;
    var VOLVER_ARRIBA = 10;
    var esEscritorio = window.matchMedia('(min-width: 901px)');
    var compacto = false;

    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 8);

      if (!compacto && y > COMPACTAR_DESDE) {
        compacto = true;
      } else if (compacto && y <= VOLVER_ARRIBA) {
        compacto = false;
        // Al expandirse en escritorio, el panel ya no tiene sentido abierto.
        if (esEscritorio.matches && links && toggle) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      } else {
        return;
      }

      nav.classList.toggle('is-compact', compacto);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Selector de moneda: se aplica al elegir, sin boton aparte. ---------------- */

  var selectorMoneda = document.querySelector('[data-currency-select]');
  if (selectorMoneda) {
    selectorMoneda.addEventListener('change', function () {
      selectorMoneda.form.submit();
    });
  }

  /* Menus desplegables del encabezado ---------------------------------------- */

  var dropdowns = document.querySelectorAll('[data-dropdown]');

  if (dropdowns.length) {
    var cerrarTodos = function (excepto) {
      dropdowns.forEach(function (item) {
        if (item === excepto) return;
        item.classList.remove('is-open');
        var t = item.querySelector('[data-dropdown-toggle]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    };

    dropdowns.forEach(function (item) {
      var toggle = item.querySelector('[data-dropdown-toggle]');
      if (!toggle) return;

      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        var abierto = item.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        cerrarTodos(item);
      });
    });

    // Clic fuera y Escape cierran el desplegable abierto.
    document.addEventListener('click', function (event) {
      if (!event.target.closest('[data-dropdown]')) cerrarTodos(null);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') cerrarTodos(null);
    });
  }

  /* Cuenta regresiva de promociones ------------------------------------------ */

  document.querySelectorAll('[data-countdown]').forEach(function (reloj) {
    var fin = new Date(reloj.dataset.countdown).getTime();
    if (isNaN(fin)) return;

    var cajas = reloj.querySelector('.promo__count');
    var terminada = reloj.querySelector('[data-countdown-ended]');
    var campos = {};
    reloj.querySelectorAll('[data-unit]').forEach(function (el) {
      campos[el.dataset.unit] = el;
    });

    var dosDigitos = function (n) { return n < 10 ? '0' + n : String(n); };

    var pintar = function () {
      var falta = fin - Date.now();

      if (falta <= 0) {
        if (cajas) cajas.hidden = true;
        if (terminada) terminada.hidden = false;
        clearInterval(tic);
        return;
      }

      var segundos = Math.floor(falta / 1000);
      campos.dias.textContent = Math.floor(segundos / 86400);
      campos.horas.textContent = dosDigitos(Math.floor(segundos / 3600) % 24);
      campos.minutos.textContent = dosDigitos(Math.floor(segundos / 60) % 60);
      campos.segundos.textContent = dosDigitos(segundos % 60);
    };

    var tic = setInterval(pintar, 1000);
    pintar();
  });

  /* Carrusel del hero -------------------------------------------------------- */

  document.querySelectorAll('[data-carousel]').forEach(function (carrusel) {
    var ventanas = carrusel.querySelectorAll('[data-slide]');
    if (ventanas.length < 2) return;

    var pista = carrusel.querySelector('[data-carousel-track]');
    var espera = (parseFloat(carrusel.dataset.autoplay) || 0) * 1000;
    var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    var actual = 0;
    var temporizador = null;

    // Todas las ventanas miden lo mismo, para que el carrusel no crezca y
    // encoja al rotar. En escritorio manda la primera; en celular manda la más
    // alta, porque ahí las de contenido se acercan entre sí y recortar a la
    // primera dejaría a las otras sin espacio.
    // Las ventanas de imagen quedan fuera del cálculo: se estiran al alto que
    // resulte, así que incluirlas sería medirse contra sí mismas.
    var medibles = [];
    ventanas.forEach(function (ventana) {
      if (!ventana.classList.contains('hero-carousel__slide--imagen')) medibles.push(ventana);
    });
    if (!medibles.length) medibles = [ventanas[0]];

    // El alto se mide sobre el contenido, no sobre la ventana: las ventanas se
    // estiran a la pista, así que medirlas a ellas sería medir el resultado
    // anterior y el alto nunca podría bajar.
    var altoNatural = function (ventana) {
      var seccion = ventana.firstElementChild;
      var caja = seccion ? seccion.querySelector('.container') : null;
      if (!caja) return ventana.offsetHeight;
      var estilo = window.getComputedStyle(seccion);
      return caja.offsetHeight +
             parseFloat(estilo.paddingTop) + parseFloat(estilo.paddingBottom);
    };

    var ajustarAlto = function () {
      var alto = 0;
      if (window.innerWidth > 980) {
        alto = altoNatural(medibles[0]);
      } else {
        medibles.forEach(function (ventana) {
          alto = Math.max(alto, altoNatural(ventana));
        });
      }
      pista.style.height = Math.round(alto) + 'px';
    };

    var ir = function (indice) {
      actual = (indice + ventanas.length) % ventanas.length;

      ventanas.forEach(function (ventana, i) {
        var activa = i === actual;
        ventana.classList.toggle('is-active', activa);
        ventana.setAttribute('aria-hidden', activa ? 'false' : 'true');
      });

      ajustarAlto();
    };

    var arrancar = function () {
      if (!espera || sinMovimiento.matches) return;
      detener();
      temporizador = setInterval(function () { ir(actual + 1); }, espera);
    };

    var detener = function () {
      if (temporizador) { clearInterval(temporizador); temporizador = null; }
    };

    // Al usar los controles el avance automático se reinicia, para no cambiar
    // de ventana justo después de que la persona eligió una.
    var manual = function (indice) {
      ir(indice);
      arrancar();
    };

    var prev = carrusel.querySelector('[data-carousel-prev]');
    var next = carrusel.querySelector('[data-carousel-next]');
    if (prev) prev.addEventListener('click', function () { manual(actual - 1); });
    if (next) next.addEventListener('click', function () { manual(actual + 1); });

    carrusel.addEventListener('keydown', function (evento) {
      if (evento.key === 'ArrowLeft') { evento.preventDefault(); manual(actual - 1); }
      if (evento.key === 'ArrowRight') { evento.preventDefault(); manual(actual + 1); }
    });

    // Se detiene mientras alguien lee o navega con el teclado dentro.
    carrusel.addEventListener('mouseenter', detener);
    carrusel.addEventListener('mouseleave', arrancar);
    carrusel.addEventListener('focusin', detener);
    carrusel.addEventListener('focusout', arrancar);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { detener(); } else { arrancar(); }
    });

    // El alto depende del ancho disponible y de las imágenes ya descargadas.
    window.addEventListener('resize', ajustarAlto);
    window.addEventListener('load', ajustarAlto);
    carrusel.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', ajustarAlto);
    });

    ajustarAlto();
    arrancar();
  });

  /* Galería de producto: las miniaturas cambian la imagen grande. ------------- */

  var gallery = document.querySelector('[data-product-gallery]');

  if (gallery) {
    var slides = gallery.querySelectorAll('[data-gallery-slide]');
    var thumbs = gallery.querySelectorAll('[data-gallery-thumb]');

    var showSlide = function (index) {
      slides.forEach(function (slide) {
        slide.classList.toggle('is-active', slide.dataset.gallerySlide === index);
      });
      thumbs.forEach(function (thumb) {
        var isActive = thumb.dataset.galleryThumb === index;
        thumb.classList.toggle('is-active', isActive);
        if (isActive) {
          thumb.setAttribute('aria-current', 'true');
        } else {
          thumb.removeAttribute('aria-current');
        }
      });
    };

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        showSlide(thumb.dataset.galleryThumb);
      });
    });
  }

  /* Producto: al cambiar de variante se actualizan precio, botón y URL. ------- */

  var variantSelect = document.querySelector('[data-variant-select]');

  if (variantSelect) {
    var priceEl = document.querySelector('[data-product-price]');
    var submitEl = document.querySelector('[data-add-to-cart]');

    variantSelect.addEventListener('change', function () {
      var option = variantSelect.options[variantSelect.selectedIndex];
      if (!option) return;

      if (priceEl) {
        var comparePrice = option.dataset.comparePrice;
        priceEl.innerHTML = comparePrice
          ? '<span class="product-card__price--compare">' + comparePrice + '</span>' + option.dataset.price
          : option.dataset.price;
      }

      if (submitEl) {
        var available = option.dataset.available === 'true';
        submitEl.disabled = !available;
        submitEl.textContent = available ? submitEl.dataset.labelAvailable : submitEl.dataset.labelSoldOut;
      }

      var url = new URL(window.location.href);
      url.searchParams.set('variant', option.value);
      window.history.replaceState({}, '', url.toString());
    });
  }

  /* Filtros de colección: se aplican al cambiar, sin botón. ------------------- */

  var facetForm = document.querySelector('[data-facet-form]');

  if (facetForm) {
    var submitFacets = function () {
      var params = new URLSearchParams();

      facetForm.querySelectorAll('[data-facet-input]').forEach(function (input) {
        if (input.type === 'checkbox') {
          if (input.checked) params.append(input.name, input.value);
        } else if (input.value !== '') {
          params.append(input.name, input.value);
        }
      });

      var query = params.toString();
      window.location.href = window.location.pathname + (query ? '?' + query : '');
    };

    facetForm.addEventListener('change', function (event) {
      if (event.target.matches('[data-facet-input]')) submitFacets();
    });

    var panels = facetForm.querySelector('[data-facet-panels]');
    var facetToggle = facetForm.querySelector('[data-facet-toggle]');

    if (panels && facetToggle) {
      panels.hidden = false;
      panels.classList.add('is-collapsible');

      var setPanelsOpen = function (isOpen) {
        panels.classList.toggle('is-open', isOpen);
        facetToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };

      // Si el usuario llega con filtros ya aplicados, el panel arranca abierto.
      setPanelsOpen(panels.hasAttribute('data-facet-open'));

      facetToggle.addEventListener('click', function () {
        setPanelsOpen(!panels.classList.contains('is-open'));
      });
    }
  }
});
