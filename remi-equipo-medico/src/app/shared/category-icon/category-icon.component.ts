import { Component, Input } from '@angular/core';

import { CategorySlug } from '../../core/models/product.model';

@Component({
  selector: 'remi-category-icon',
  standalone: true,
  template: `
    @switch (icon) {
      @case ('oxigenoterapia') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8c-3 4-4 8-4 12 0 5 3 8 3 13a5 5 0 0 1-5 5" />
          <path d="M30 8c-3 4-4 8-4 12 0 5 3 8 3 13a5 5 0 0 1-5 5" />
          <circle cx="14" cy="10" r="2.6" />
          <circle cx="26" cy="10" r="2.6" />
          <path d="M9 40h24" />
        </svg>
      }
      @case ('apnea-del-sueno') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M31 8a15 15 0 1 0 10 26 12 12 0 0 1-10-26Z" />
          <path d="M6 38l3-3 3 3 3-3" />
        </svg>
      }
      @case ('ortopedia') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="30" r="9" />
          <path d="M27 30h9M30 12l-8 18M30 12h6M22 12h4" />
          <circle cx="36" cy="14" r="3" />
        </svg>
      }
      @case ('equipo-medico') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="14" width="32" height="22" rx="4" />
          <path d="M8 22h32" />
          <path d="M24 8v6M24 26v6M20 30h8" />
        </svg>
      }
      @case ('reguladores') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="20" cy="18" r="10" />
          <path d="M20 12v6l4 3" />
          <path d="M20 28v6M14 40h12" />
        </svg>
      }
      @case ('renta') {
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="10" width="32" height="30" rx="4" />
          <path d="M8 18h32M16 6v8M32 6v8" />
          <path d="M17 27l4 4 8-8" />
        </svg>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        width: 100%;
        height: 100%;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CategoryIconComponent {
  @Input({ required: true }) icon!: CategorySlug;
}
