import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';

// Definición de tipo para las categorías
interface Category {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Inyección del servicio de productos
  private productService = inject(ProductService);

  // Lista de categorías disponibles
  categories: Category[] = [
    { id: 'gpu', label: 'Tarjetas Gráficas', icon: 'settings' },
    { id: 'cpu', label: 'Procesadores', icon: 'memory' },
    { id: 'ram', label: 'Memorias RAM', icon: 'storage' },
    { id: 'storage', label: 'Almacenamiento', icon: 'sd_storage' },
    { id: 'motherboard', label: 'Placas Madre', icon: 'developer_board' },
    { id: 'psu', label: 'Fuentes de Poder', icon: 'power' }
  ];

  // Array para almacenar los productos destacados
  featured: IProduct[] = [];

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene todos los productos y selecciona los primeros 4 como destacados
    this.featured = this.productService.getAll().slice(0, 4);
  }
}
