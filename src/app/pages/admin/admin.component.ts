import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { IProduct } from '../../interfaces/product.interface';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE PARA ngModel

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    MatSnackBarModule, ReactiveFormsModule, CurrencyPipe, UpperCasePipe,
    FormsModule // 👈 Importa FormsModule para usar ngModel en el login
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  // Inyección de servicios
  productService = inject(ProductService);
  dialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  // ============================================================
  // VARIABLES PARA EL LOGIN
  // ============================================================
  showLogin = true;     // Controla si se muestra el login o el panel
  username = '';        // Usuario ingresado
  password = '';        // Contraseña ingresada
  loginError = '';      // Mensaje de error

  // ============================================================
  // VARIABLES DEL PANEL ADMIN
  // ============================================================
  displayedColumns = ['name', 'brand', 'category', 'price', 'stock', 'available', 'actions'];
  editingId: number | null = null;
  showForm = false;
  categories = ['gpu', 'cpu', 'ram', 'storage', 'motherboard', 'psu'];

  form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['gpu', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, Validators.required],
    available: [true],
    description: ['', Validators.required],
    specs: [''],
    image: ['https://placehold.co/400x300/1a1a2e/00d4ff?text=Producto'],
  });

  // ============================================================
  // CICLO DE VIDA
  // ============================================================
  ngOnInit() {
    // Verifica si ya hay una sesión activa
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn === 'true') {
      this.showLogin = false;
    }
  }

  // ============================================================
  // MÉTODOS DEL LOGIN
  // ============================================================
  doLogin() {
    if (this.username === 'admin' && this.password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      this.showLogin = false;
      this.loginError = '';
      this.snackbar.open('Sesión iniciada correctamente', 'OK', { duration: 2000 });
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
      setTimeout(() => this.loginError = '', 3000);
    }
  }

  // ============================================================
  // MÉTODOS DEL PANEL ADMIN
  // ============================================================
  openForm(product?: IProduct) {
    this.showForm = true;
    if (product) {
      this.editingId = product.id;
      this.form.patchValue({ ...product, specs: product.specs.join(', ') });
    } else {
      this.editingId = null;
      this.form.reset({
        category: 'gpu',
        price: 0,
        stock: 0,
        available: true,
        image: 'https://placehold.co/400x300/1a1a2e/00d4ff?text=Producto'
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
  }

  save() {
    if (this.form.invalid) return;
    const val = this.form.getRawValue();
    const data = {
      ...val,
      specs: (val.specs || '').split(',').map((s: string) => s.trim()).filter(Boolean)
    } as any;
    if (this.editingId !== null) {
      this.productService.update(this.editingId, data);
      this.snackbar.open('Producto actualizado', 'OK', { duration: 2000 });
    } else {
      this.productService.create(data);
      this.snackbar.open('Producto creado', 'OK', { duration: 2000 });
    }
    this.closeForm();
  }

  confirmDelete(product: IProduct) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar producto',
        message: `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.delete(product.id);
        this.snackbar.open('Producto eliminado', 'OK', { duration: 2000 });
      }
    });
  }

  // ============================================================
  // LOGOUT
  // ============================================================
  logout() {
    localStorage.removeItem('admin_logged_in');
    this.showLogin = true;
    this.snackbar.open('Sesión cerrada correctamente', 'OK', { duration: 2000 });
    this.router.navigate(['/']);
  }
}
