import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-traiteur-home',
  templateUrl: './traiteur-home.component.html',
  styleUrls: ['./traiteur-home.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class TraiteurHomeComponent {
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    // On pourra améliorer après (auth service, etc.)
    // Pour l’instant simple redirection
    this.router.navigate(['/login']);
  }
}
