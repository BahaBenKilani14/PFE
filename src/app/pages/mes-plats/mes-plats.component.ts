// src/app/mes-plats/mes-plats.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TraiteurHomeComponent } from "../../traiteur-home/traiteur-home.component";

@Component({
  selector: 'app-mes-plats',
  templateUrl: './mes-plats.component.html',
  styleUrls: ['./mes-plats.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TraiteurHomeComponent],
})
export class MesPlatsComponent {
  isMobileMenuOpen = false;

  // ✅ Attributs alignés avec le backend
  newPlat = {
    id: '',
    nom: '',
    description: '',
    prix: '',
    image: '',
    disponible: false
  };

  plats: { id: string; nom: string; description: string; prix: string; image: string; disponible: boolean; }[] = [];

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  ajouterPlat() {
    const platCopie = { ...this.newPlat };
    this.plats.push(platCopie);

    // Réinitialise le formulaire
    this.newPlat = {
      id: '',
      nom: '',
      description: '',
      prix: '',
      image: '',
      disponible: false
    };
  }
}
