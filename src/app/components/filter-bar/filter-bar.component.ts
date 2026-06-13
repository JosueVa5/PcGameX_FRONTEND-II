import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Input() categories: ICategory[] = [];
  @Input() selected: string = 'all';
  @Output() categoryChange = new EventEmitter<string>();

  select(id: string) {
    this.categoryChange.emit(id);
  }
}