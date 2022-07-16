import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmPageComponent } from './algorithm-page/algorithm-page.component';

const routes: Routes = [
  { path: '', component: AlgorithmPageComponent },
  { path: '**', component: AlgorithmPageComponent },  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
