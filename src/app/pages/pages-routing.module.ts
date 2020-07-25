import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { TransfersComponent } from './transfers/transfers.component';
import { PaymentsComponent } from './payments/payments.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' } },
      { path: 'transfers', component: TransfersComponent, data: { titulo: 'Transferencias' } },
      { path: 'payments', component: PaymentsComponent, data: { titulo: 'Pagos' } },
      // { path: 'editar-curso/:id', component: EditarCursoComponent, data: { titulo: 'Editar un cursos' }, canActivate: [IsAdminGuard] },
      // { path: 'moodle/:idoferta', component: CapacitacionMoodleComponent, data: { titulo: 'Oferta de capacitacion de Moodle' } },
      // { path: 'progress', component: ProgressComponent, data: { titulo: 'Barras de Progresso' } },
      // { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
      // { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      // { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },
      // { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del sistema' } },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
