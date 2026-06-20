import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, FormsModule, ProductCardComponent, FilterBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  searchQuery = '';
  selectedCategory = 'all';
  allProducts: IProduct[] = [];
  filtered: IProduct[] = [];
  isLoading = false;

  categories: ICategory[] = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'smartphones', label: 'Smartphones', icon: 'smartphone' },
    { id: 'laptops', label: 'Laptops', icon: 'laptop' },
    { id: 'tablets', label: 'Tablets', icon: 'tablet' },
    { id: 'mobile-accessories', label: 'Accesorios', icon: 'headphones' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getByCategory(this.selectedCategory).subscribe({
      next: (products) => {
        this.allProducts = products;
        this.applySearch();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  applySearch() {
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      this.filtered = this.allProducts.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    } else {
      this.filtered = this.allProducts;
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadProducts();
  }
}