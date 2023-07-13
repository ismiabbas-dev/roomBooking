import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from 'src/app/admin/room-list/room-list.component';
import { BookingComponent } from 'src/app/admin/booking/booking/booking.component';
import { AdminUserComponent } from '../admin-user/admin-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'room',
    pathMatch: 'full',
  },
  {
    path: 'room',
    component: RoomListComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'user',
    component: AdminUserComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardModule {}
