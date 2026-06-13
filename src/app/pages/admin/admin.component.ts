import { Component, inject } from '@angular/core';
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
  


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    MatSnackBarModule, ReactiveFormsModule, CurrencyPipe, UpperCasePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  productService = inject(ProductService);
  dialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  fb = inject(FormBuilder);

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

  openForm(product?: IProduct) {
    this.showForm = true;
    if (product) {
      this.editingId = product.id;
      this.form.patchValue({ ...product, specs: product.specs.join(', ') });
    } else {
      this.editingId = null;
      this.form.reset({ category: 'gpu', price: 0, stock: 0, available: true,
        image: 'https://placehold.co/400x300/1a1a2e/00d4ff?text=Producto' });
    }
  }

  closeForm() { this.showForm = false; this.editingId = null; }

  save() {
    if (this.form.invalid) return;
    const val = this.form.getRawValue();
    const data = { ...val, specs: (val.specs || '').split(',').map((s: string) => s.trim()).filter(Boolean) } as any;
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
      data: { title: 'Eliminar producto', message: `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.` }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.delete(product.id);
        this.snackbar.open('Producto eliminado', 'OK', { duration: 2000 });
      }
    });
  }
}