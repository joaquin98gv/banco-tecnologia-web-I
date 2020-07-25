import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogeadoGuard } from './guards/logeado.guard';
import { NoLogeadoGuard } from './guards/no-logeado.guard';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [LogeadoGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLogeadoGuard] },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
