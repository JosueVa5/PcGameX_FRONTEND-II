import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

// Estructura que devuelve DummyJSON
interface IDummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IDummyListResponse {
  products: IDummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // Convierte un producto de DummyJSON a nuestra interfaz IProduct
  private mapToProduct(d: IDummyProduct): IProduct {
    return {
      id: d.id,
      name: d.title,
      category: d.category,
      price: d.price,
      stock: d.stock,
      available: d.stock > 0,
      description: d.description,
      specs: d.brand ? [d.brand, d.category] : [d.category],
      image: d.thumbnail,
      brand: d.brand ?? 'Sin marca',
    };
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IDummyListResponse>(`${this.apiUrl}?limit=0`)
      .pipe(map(res => res.products.map(p => this.mapToProduct(p))));
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IDummyProduct>(`${this.apiUrl}/${id}`)
      .pipe(map(p => this.mapToProduct(p)));
  }

  getByCategory(category: string): Observable<IProduct[]> {
    if (category === 'all') return this.getAll();
    return this.http.get<IDummyListResponse>(`${this.apiUrl}/category/${category}`)
      .pipe(map(res => res.products.map(p => this.mapToProduct(p))));
  }

  create(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post<IDummyProduct>(`${this.apiUrl}/add`, {
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }).pipe(map(p => this.mapToProduct(p)));
  }

  update(id: number, product: Partial<IProduct>): Observable<IProduct> {
    return this.http.put<IDummyProduct>(`${this.apiUrl}/${id}`, {
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }).pipe(map(p => this.mapToProduct(p)));
  }

  delete(id: number): Observable<IProduct> {
    return this.http.delete<IDummyProduct>(`${this.apiUrl}/${id}`)
      .pipe(map(p => this.mapToProduct(p)));
  }
}