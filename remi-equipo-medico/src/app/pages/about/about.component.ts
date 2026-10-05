import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'remi-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly values = [
    {
      title: 'Confianza',
      text: 'Cada equipo que ofrecemos cumple con estándares de calidad y garantía real.',
    },
    {
      title: 'Cercanía',
      text: 'Asesoramos a cada cliente como si fuera un familiar, sin tecnicismos innecesarios.',
    },
    {
      title: 'Compromiso',
      text: 'Cumplimos tiempos de entrega y damos seguimiento después de la compra.',
    },
    {
      title: 'Mejora continua',
      text: 'Actualizamos nuestro catálogo con la tecnología médica más reciente.',
    },
  ];

  readonly locations = [
    {
      name: 'Sucursal Centro',
      address: 'Av. Universidad 123, Col. Centro, Aguascalientes, Ags.',
    },
    {
      name: 'Sucursal Poniente',
      address: 'Blvd. José María Chávez 456, Aguascalientes, Ags.',
    },
    {
      name: 'Sucursal Norte',
      address: 'Av. Aguascalientes Norte 789, Aguascalientes, Ags.',
    },
  ];

  readonly milestones = [
    { year: '2013', text: 'Iniciamos operaciones en Aguascalientes con equipo de ortopedia.' },
    { year: '2017', text: 'Ampliamos el catálogo a oxigenoterapia y apnea del sueño.' },
    { year: '2020', text: 'Lanzamos el servicio de renta de equipo médico en la ciudad.' },
    { year: '2024', text: 'Iniciamos envíos a todo México con presencia en 3 sucursales.' },
  ];
}
