// plat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Plat {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
  disponible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private apiUrl = 'http://localhost:3000/api/plat';

  private platsSubject = new BehaviorSubject<any[]>([]);
  plats$ = this.platsSubject.asObservable();

  constructor(private http: HttpClient) { }

  createPlat(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(`${this.apiUrl}/create-plats`, plat);
  }

  getAllPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/list-plats`);
  }

  refreshPlats(traiteurId: number) {
    this.getPlatsByTraiteur(traiteurId).subscribe((plats) => {
      this.platsSubject.next(plats);
    });
  }

  getPlatById(id: number): Observable<Plat> {
    return this.http.get<Plat>(`${this.apiUrl}/${id}/list-plats/:id`);
  }

  getPlatsByTraiteur(traiteurId: number): Observable<Plat[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-plats/:traiteurId`);
  }

  updatePlat(id: number, plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(`${this.apiUrl}/update-plat/:id`, plat);
  }

  deletePlat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-plats/:id`);
  }
}
