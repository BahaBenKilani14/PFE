import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plat } from '../../models/plat.model';  // Assuming Plat is your model for the Plat object

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private apiUrl = 'http://localhost:3000/api/plat/create-plats';
  private API_URL_GET = 'http://localhost:3000/api/plat/list-plats';

  constructor(private httpClient: HttpClient) {}

  createPlat(plat: Plat): Observable<any> {
    return this.httpClient.post(this.apiUrl, plat);
  }

  getPlats(): Observable<Plat[]> {
    return this.httpClient.get<Plat[]>(this.API_URL_GET);
  }
}



