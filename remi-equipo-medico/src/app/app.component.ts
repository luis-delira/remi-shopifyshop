import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WhatsappButtonComponent } from './shared/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'remi-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
