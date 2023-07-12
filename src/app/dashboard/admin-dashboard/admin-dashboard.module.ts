import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from 'src/app/room-list/room-list.component';

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
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardModule {}
