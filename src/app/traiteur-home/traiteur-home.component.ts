import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
FormsModule

@Component({
  selector: 'app-traiteur-home',
  templateUrl: './traiteur-home.component.html',
  styleUrls: ['./traiteur-home.component.scss'],
  standalone: true,
  imports: [MatIconModule, RouterModule],
})
export class TraiteurHomeComponent {
  isMobileMenuOpen = false;
  showPlatForm = false; // Variable pour afficher/masquer le formulaire

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  togglePlatForm() {
    this.showPlatForm = !this.showPlatForm; // Permet d'alterner la visibilité du formulaire
  }
}
