import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../interfaces/product.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: IProduct;
  @Output() addFavorite = new EventEmitter<IProduct>();

  favoritesService = inject(FavoritesService);

  onToggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggle(this.product);
    this.addFavorite.emit(this.product);
  }
}