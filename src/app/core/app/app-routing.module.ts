import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuardService } from '../authentication/auth-guard.service';


const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    canActivateChild : [AuthGuardService],
    loadChildren : () => import('src/app/web/web.module').then(m => m.WebModule),
    data: { preload: true },
    resolve: {
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
