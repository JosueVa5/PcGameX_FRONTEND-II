import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ProductCardComponent, FilterBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  searchQuery = '';
  selectedCategory = 'all';
  filtered: IProduct[] = [];

  categories: ICategory[] = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'gpu', label: 'GPU', icon: 'videogame_asset' },
    { id: 'cpu', label: 'CPU', icon: 'memory' },
    { id: 'ram', label: 'RAM', icon: 'storage' },
    { id: 'storage', label: 'Almacenamiento', icon: 'save' },
    { id: 'motherboard', label: 'Placa Madre', icon: 'developer_board' },
    { id: 'psu', label: 'Fuente', icon: 'power' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategory = params['category'];
      this.applyFilters();
    });
  }

  applyFilters() {
    let list = this.productService.getByCategory(this.selectedCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    this.filtered = list;
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }
}