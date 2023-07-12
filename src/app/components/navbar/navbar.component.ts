import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title = 'Room Reservation System';
  role: string = 'admin';

  public isCollapsed = false;

  constructor(private auth: AuthService) {
    this.role = this.auth.getRole();
  }

  ngOnInit(): void {}
}
