import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { CategoryIconComponent } from '../../shared/category-icon/category-icon.component';

@Component({
  selector: 'remi-home',
  standalone: true,
  imports: [RouterLink, CategoryIconComponent, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public products: ProductService) {}

  readonly heroStats = [
    { value: '+12', label: 'años de experiencia' },
    { value: '+8,000', label: 'clientes atendidos' },
    { value: '3', label: 'sucursales en Aguascalientes' },
  ];

  readonly trustPoints = [
    {
      title: 'Pago 100% seguro',
      text: 'Transacciones protegidas con los principales métodos de pago del país.',
      icon: 'shield',
    },
    {
      title: 'Envíos a todo México',
      text: 'Entrega en 2 a 3 días hábiles, con seguimiento de tu pedido.',
      icon: 'truck',
    },
    {
      title: 'Marcas certificadas',
      text: 'Trabajamos con ResMed, Inogen y Handy, líderes en equipo médico.',
      icon: 'award',
    },
    {
      title: 'Asesoría personalizada',
      text: 'Un equipo humano te orienta para elegir el equipo correcto.',
      icon: 'headset',
    },
  ];

  readonly testimonials = [
    {
      name: 'Laura M.',
      role: 'Aguascalientes, AGS',
      text: 'Compré el CPAP para mi papá y la atención fue excelente desde la asesoría hasta la entrega. Se nota que conocen bien los equipos.',
      rating: 5,
    },
    {
      name: 'Roberto S.',
      role: 'Guadalajara, JAL',
      text: 'Rentamos una cama clínica por dos meses y el proceso fue muy sencillo, con entrega puntual y equipo en perfectas condiciones.',
      rating: 5,
    },
    {
      name: 'Diana C.',
      role: 'Ciudad de México, CDMX',
      text: 'El envío llegó antes de lo esperado y el concentrador de oxígeno funciona perfecto. Definitivamente volvería a comprar con ellos.',
      rating: 5,
    },
  ];

  readonly brands = ['ResMed', 'Inogen', 'Handy', 'Philips', 'Drive Medical'];
}
