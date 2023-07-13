import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'profile',
    component: UserDashboardComponent,
  },
];

@NgModule({
  declarations: [BookingsComponent, RoomsComponent, UserDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbToastModule],
  exports: [RouterModule, CommonModule],
})
export class UserModule {}
