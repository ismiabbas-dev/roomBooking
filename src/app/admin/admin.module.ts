import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './admin-routing.module';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [UserDashboardComponent, AdminDashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class AdminModule {}
