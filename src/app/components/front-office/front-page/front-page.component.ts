import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-front-page',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {

  role: string | null = null;

  constructor(private authorization: AuthorizationService) {

    this.role = this.authorization.getRole();

  }

  logout() {

    this.authorization.clearToken();

    window.location.reload();
  }

}