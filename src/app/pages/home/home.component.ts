import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productService = inject(ProductService);
  featured = this.productService.getAll().slice(0, 4);

  categories = [
    { id: 'gpu', label: 'Tarjetas Gráficas', icon: 'videogame_asset' },
    { id: 'cpu', label: 'Procesadores', icon: 'memory' },
    { id: 'ram', label: 'Memoria RAM', icon: 'storage' },
    { id: 'storage', label: 'Almacenamiento', icon: 'save' },
    { id: 'motherboard', label: 'Placas Madre', icon: 'developer_board' },
    { id: 'psu', label: 'Fuentes', icon: 'power' },
  ];
}