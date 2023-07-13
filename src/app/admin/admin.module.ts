import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    component: AdminDashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
