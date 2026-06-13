import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule, CurrencyPipe, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService);
  favoritesService = inject(FavoritesService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product: IProduct | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
    if (!this.product) this.router.navigate(['/products']);
  }
}