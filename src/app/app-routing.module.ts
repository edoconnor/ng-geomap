import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeomapComponent } from './geomap/geomap.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: GeomapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
