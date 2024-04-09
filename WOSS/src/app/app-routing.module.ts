import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './home/pages/index/index.component';
import { SimulacaoComponent } from './home/pages/simulacao/simulacao.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/index',pathMatch: 'full'
  },
  {
    path: 'index', component: IndexComponent
  },
  {
    path: 'simulacao', component: SimulacaoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
