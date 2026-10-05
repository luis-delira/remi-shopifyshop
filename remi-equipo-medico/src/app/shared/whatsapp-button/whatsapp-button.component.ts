import { Component } from '@angular/core';

@Component({
  selector: 'remi-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss',
})
export class WhatsappButtonComponent {
  readonly href =
    'https://wa.me/524493115440?text=' +
    encodeURIComponent('Hola, me gustaría más información sobre equipo médico.');
}
