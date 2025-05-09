// src/app/mes-plats/mes-plats.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TraiteurHomeComponent } from "../../traiteur-home/traiteur-home.component";
import { PlatService } from './plat.service'; // Assuming you have a service to handle API calls
import { HttpClientModule } from '@angular/common/http';

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
    nom: '',
    description: '',
    prix: 0,
    image: '',
    disponible: false
  };

  plats: { nom: string; description: string; prix: number; image: string; disponible: boolean; }[] = [];

  constructor(private router: Router, private platService: PlatService) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  ajouterPlat() {
    // Appelle l'API backend pour ajouter le plat
    this.platService.createPlat(this.newPlat).subscribe({
      next: (createdPlat) => {
        // Si succès, ajoute à la liste locale
        this.plats.push(createdPlat);
        console.log('✅ Plat ajouté avec succès:', createdPlat);
        alert('Plat ajouté avec succès!');
        // Reset form
        this.newPlat = {
          nom: '',
          description: '',
          prix: 0,
          image: '',
          disponible: false
        };
      },
      error: (err) => {
        console.error('Erreur ajout plat:', err);
        alert('Erreur lors de l\'ajout du plat'+ JSON.stringify(err.error));
      }
    });
  }
}
