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
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
];

@NgModule({
  declarations: [BookingsComponent, RoomsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbToastModule],
  exports: [RouterModule],
})
export class UserModule {}
