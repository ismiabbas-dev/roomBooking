import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
];
@NgModule({
  declarations: [
    UserDashboardComponent,
    AdminDashboardComponent,
    AdminBookingComponent,
    AdminRoomComponent,
    AdminUserComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
