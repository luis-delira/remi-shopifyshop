import { Injectable } from '@angular/core';

import { Category, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly categories: Category[] = [
    {
      slug: 'oxigenoterapia',
      name: 'Oxigenoterapia',
      description: 'Concentradores portátiles y estacionarios para terapia de oxígeno.',
      icon: 'oxigenoterapia',
    },
    {
      slug: 'apnea-del-sueno',
      name: 'Apnea del Sueño',
      description: 'Equipos CPAP, BiPAP, mascarillas y accesorios para dormir mejor.',
      icon: 'apnea-del-sueno',
    },
    {
      slug: 'ortopedia',
      name: 'Ortopedia',
      description: 'Sillas de ruedas, andaderas, bastones y ayudas para movilidad.',
      icon: 'ortopedia',
    },
    {
      slug: 'equipo-medico',
      name: 'Equipo Médico',
      description: 'Camas clínicas, monitores y equipo esencial para el cuidado en casa.',
      icon: 'equipo-medico',
    },
    {
      slug: 'reguladores',
      name: 'Reguladores',
      description: 'Reguladores de oxígeno de precisión, nuevos y de repuesto.',
      icon: 'reguladores',
    },
    {
      slug: 'renta',
      name: 'Renta en Aguascalientes',
      description: 'Renta de equipo médico por día, semana o mes, con entrega local.',
      icon: 'renta',
    },
  ];

  readonly products: Product[] = [
    {
      id: 1,
      name: 'CPAP AirSense 11',
      brand: 'ResMed',
      category: 'apnea-del-sueno',
      price: 24900,
      image: 'cpap-airsense-11',
      badge: 'Más vendido',
      description: 'Equipo CPAP automático con humidificador integrado y control por app.',
    },
    {
      id: 2,
      name: 'BiPAP AirCurve 11 VAuto',
      brand: 'ResMed',
      category: 'apnea-del-sueno',
      price: 49600,
      image: 'bipap-aircurve-11',
      badge: 'Alta gama',
      description: 'Terapia binivel para casos de apnea moderada a severa y EPOC.',
    },
    {
      id: 3,
      name: 'CPAP AirSense 10',
      brand: 'ResMed',
      category: 'apnea-del-sueno',
      price: 19500,
      image: 'cpap-airsense-10',
      description: 'Terapia CPAP confiable, silenciosa y de fácil configuración.',
    },
    {
      id: 4,
      name: 'Mascarilla nasal AirFit N20',
      brand: 'ResMed',
      category: 'apnea-del-sueno',
      price: 1850,
      image: 'mascarilla-airfit-n20',
      description: 'Mascarilla nasal ligera con sello suave para mayor comodidad nocturna.',
    },
    {
      id: 5,
      name: 'Concentrador portátil One G4',
      brand: 'Inogen',
      category: 'oxigenoterapia',
      price: 62500,
      image: 'concentrador-one-g4',
      badge: 'Portátil',
      description: 'Concentrador de oxígeno ultraligero para terapia dentro y fuera de casa.',
    },
    {
      id: 6,
      name: 'Concentrador estacionario 5L',
      brand: 'ResMed',
      category: 'oxigenoterapia',
      price: 18900,
      image: 'concentrador-estacionario-5l',
      description: 'Flujo continuo de hasta 5 litros por minuto para uso en el hogar.',
    },
    {
      id: 7,
      name: 'Silla de ruedas plegable estándar',
      brand: 'Handy',
      category: 'ortopedia',
      price: 2989,
      image: 'silla-plegable-estandar',
      description: 'Estructura ligera y plegable, ideal para traslados diarios.',
    },
    {
      id: 8,
      name: 'Silla de ruedas eléctrica',
      brand: 'Handy',
      category: 'ortopedia',
      price: 22000,
      image: 'silla-electrica',
      badge: 'Autonomía',
      description: 'Control eléctrico de fácil manejo con batería de larga duración.',
    },
    {
      id: 9,
      name: 'Andadera plegable con asiento',
      brand: 'Handy',
      category: 'ortopedia',
      price: 1650,
      image: 'andadera-asiento',
      description: 'Andadera de aluminio con asiento y freno de seguridad.',
    },
    {
      id: 10,
      name: 'Cama clínica manual 3 posiciones',
      brand: 'REMI',
      category: 'equipo-medico',
      price: 12400,
      image: 'cama-clinica-manual',
      description: 'Cama hospitalaria para el cuidado en casa con barandales incluidos.',
    },
    {
      id: 11,
      name: 'Oxímetro de pulso digital',
      brand: 'REMI',
      category: 'equipo-medico',
      price: 590,
      image: 'oximetro-digital',
      description: 'Medición rápida de saturación de oxígeno y frecuencia cardiaca.',
    },
    {
      id: 12,
      name: 'Regulador de oxígeno de precisión',
      brand: 'ResMed',
      category: 'reguladores',
      price: 2150,
      image: 'regulador-precision',
      description: 'Control preciso de flujo, compatible con tanques estándar.',
    },
  ];

  getFeatured(): Product[] {
    return this.products.filter((p) => !!p.badge).slice(0, 4);
  }

  getByCategory(slug: string | null): Product[] {
    if (!slug || slug === 'todos') return this.products;
    return this.products.filter((p) => p.category === slug);
  }

  getCategory(slug: string) {
    return this.categories.find((c) => c.slug === slug);
  }
}
