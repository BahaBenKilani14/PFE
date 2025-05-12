//profile-traiteur.component.ts
import { Component, OnInit } from '@angular/core';
import { PlatService } from '../services/plat.service';
import { TraiteurHomeComponent } from "../traiteur-home/traiteur-home.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-traiteur',
  standalone: true,
  templateUrl: './profile-traiteur.component.html',
  styleUrls: ['./profile-traiteur.component.scss'],
  imports: [TraiteurHomeComponent, CommonModule]
})
export class ProfileTraiteurComponent implements OnInit {

  plats: any[] = [];
  traiteurId: number = 1; // à récupérer dynamiquement après (via Auth par ex)

  constructor(private platService: PlatService) {}

  ngOnInit(): void {
    this.getMesPlats();
  }

  getMesPlats() {
    this.platService.getPlatsByTraiteur(this.traiteurId).subscribe({
      next: (data) => {
        this.plats = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plats', err);
      }
    });
  }

}
