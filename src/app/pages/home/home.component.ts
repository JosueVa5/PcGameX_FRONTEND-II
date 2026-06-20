import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  featured: IProduct[] = [];

  categories = [
    { id: 'smartphones', label: 'Smartphones', icon: 'smartphone' },
    { id: 'laptops', label: 'Laptops', icon: 'laptop' },
    { id: 'tablets', label: 'Tablets', icon: 'tablet' },
    { id: 'mobile-accessories', label: 'Accesorios', icon: 'headphones' },
  ];

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.featured = products.slice(0, 4);
    });
  }
}