import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CategorySlug } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CategoryIconComponent } from '../../shared/category-icon/category-icon.component';

@Component({
  selector: 'remi-products',
  standalone: true,
  imports: [RouterLink, CategoryIconComponent, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly activeCategory = signal<CategorySlug | 'todos'>('todos');

  readonly filteredProducts = computed(() => this.products.getByCategory(this.activeCategory()));

  constructor(
    public products: ProductService,
    route: ActivatedRoute,
  ) {
    route.queryParamMap.subscribe((params) => {
      const category = params.get('categoria') as CategorySlug | null;
      this.activeCategory.set(category ?? 'todos');
    });
  }

  setCategory(slug: CategorySlug | 'todos'): void {
    this.activeCategory.set(slug);
  }
}
