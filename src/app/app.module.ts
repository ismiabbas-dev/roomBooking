import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbCollapseModule,
  NgbModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomListComponent } from './admin/room-list/room-list.component';
import { BookingComponent } from './admin/booking/booking/booking.component';
import { NgOptimizedImage } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ProfileNewComponent } from './profile-new/profile-new.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    BookingComponent,
    ProfileNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    AdminModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbCollapseModule,
    NgOptimizedImage,
    NgbToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
