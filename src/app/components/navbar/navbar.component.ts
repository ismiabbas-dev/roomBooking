import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router) {
    this.role = this.auth.getRole();
  }

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
