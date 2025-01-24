// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent , SweetAlert2Module],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected property name
})
export class AppComponent {
  title = 'Product Management App';
}
