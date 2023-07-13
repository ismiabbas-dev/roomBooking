import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ProfileNewComponent } from '../profile-new/profile-new.component';

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
    component: ProfileNewComponent,
  },
];

@NgModule({
  declarations: [BookingsComponent, RoomsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbToastModule],
})
export class UserModule {}
