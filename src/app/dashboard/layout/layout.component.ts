import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidenavOpened = true;
  currentTheme: 'light' | 'dark' = 'light';


  ngOnInit() {
    const saved = localStorage.getItem('theme');
    this.currentTheme = saved === 'dark' ? 'dark' : 'light';
    document.body.classList.add(this.currentTheme);
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(this.currentTheme);
    document.body.classList.add(newTheme);
    this.currentTheme = newTheme;
    localStorage.setItem('theme', newTheme);
  }
}
