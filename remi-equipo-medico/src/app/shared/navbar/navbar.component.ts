import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'remi-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly links = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
