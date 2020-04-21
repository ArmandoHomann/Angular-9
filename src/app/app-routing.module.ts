import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { ForexComponent } from './portal/forex/forex.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'portal',  component: PortalComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
