import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TraiteurHomeComponent } from './traiteur-home/traiteur-home.component';
import { MesPlatsComponent } from './pages/mes-plats/mes-plats.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  
  { path: 'traiteur-home', component: TraiteurHomeComponent },
  { path: 'traiteur-plats', component: MesPlatsComponent },
];
