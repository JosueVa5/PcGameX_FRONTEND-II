import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private products = signal<IProduct[]>([
    { id: 1, name: 'RTX 4070 Ti Super', category: 'gpu', price: 799, stock: 5, available: true, brand: 'NVIDIA', description: 'Tarjeta gráfica de alto rendimiento para gaming 4K.', specs: ['16GB GDDR6X', 'DLSS 3.5', 'Ray Tracing'], image: 'https://placehold.co/400x300/1a1a2e/00d4ff?text=RTX+4070+Ti' },
    { id: 2, name: 'Ryzen 9 7950X', category: 'cpu', price: 549, stock: 8, available: true, brand: 'AMD', description: 'Procesador de 16 núcleos para workstation y gaming.', specs: ['16 núcleos / 32 hilos', '4.5GHz base', 'AM5'], image: 'https://placehold.co/400x300/1a1a2e/ff6b35?text=Ryzen+9+7950X' },
    { id: 3, name: 'Samsung 990 Pro 2TB', category: 'storage', price: 179, stock: 15, available: true, brand: 'Samsung', description: 'SSD NVMe Gen 4 de máximo rendimiento.', specs: ['2TB', '7450MB/s lectura', 'PCIe 4.0'], image: 'https://placehold.co/400x300/1a1a2e/00ff88?text=990+Pro' },
    { id: 4, name: 'Corsair DDR5 32GB', category: 'ram', price: 129, stock: 20, available: true, brand: 'Corsair', description: 'Memoria DDR5 de alto rendimiento con RGB.', specs: ['32GB (2x16)', '6000MHz', 'RGB'], image: 'https://placehold.co/400x300/1a1a2e/ff00ff?text=DDR5+32GB' },
    { id: 5, name: 'ASUS ROG STRIX B650-E', category: 'motherboard', price: 299, stock: 4, available: true, brand: 'ASUS', description: 'Placa madre AM5 con soporte PCIe 5.0.', specs: ['Socket AM5', 'DDR5', 'WiFi 6E'], image: 'https://placehold.co/400x300/1a1a2e/ffcc00?text=ROG+B650-E' },
    { id: 6, name: 'Cooler Master 850W', category: 'psu', price: 119, stock: 10, available: true, brand: 'Cooler Master', description: 'Fuente modular 80+ Gold de 850W.', specs: ['850W', '80+ Gold', 'Modular'], image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=CM+850W' },
    { id: 7, name: 'RX 7800 XT', category: 'gpu', price: 499, stock: 0, available: false, brand: 'AMD', description: 'GPU AMD para gaming 1440p de alta calidad.', specs: ['16GB GDDR6', 'FSR 3', '2560 MHz'], image: 'https://placehold.co/400x300/1a1a2e/ff3333?text=RX+7800+XT' },
    { id: 8, name: 'Intel Core i7-14700K', category: 'cpu', price: 389, stock: 6, available: true, brand: 'Intel', description: 'CPU Intel de 20 núcleos para gaming y creación.', specs: ['20 núcleos', '5.6GHz boost', 'LGA1700'], image: 'https://placehold.co/400x300/1a1a2e/0088ff?text=i7-14700K' },
  ]);

  getAll() { return this.products(); }

  getById(id: number) { return this.products().find(p => p.id === id); }

  getByCategory(category: string) {
    return category === 'all' ? this.products() : this.products().filter(p => p.category === category);
  }

  create(product: Omit<IProduct, 'id'>) {
    const newId = Math.max(...this.products().map(p => p.id)) + 1;
    this.products.update(list => [...list, { ...product, id: newId }]);
  }

  update(id: number, product: Partial<IProduct>) {
    this.products.update(list => list.map(p => p.id === id ? { ...p, ...product } : p));
  }

  delete(id: number) {
    this.products.update(list => list.filter(p => p.id !== id));
  }
}