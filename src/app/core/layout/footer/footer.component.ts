import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>© 2026 PCgameX — Tu tienda de hardware gamer</p>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a2e;
      color: rgba(255,255,255,0.6);
      text-align: center;
      padding: 16px;
      font-size: 0.875rem;
    }
  `]
})
export class FooterComponent {}
