import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  role: string | null = null;
  // Variável para armazenar o papel do usuário
  constructor(private authorization: AuthorizationService, private router: Router) {

    this.role = authorization.getRole();

    if (!this.role || (this.role !== 'Agent' && this.role !== 'Manager' && this.role !== 'Broker'
      && this.role !== 'Staff' && this.role !== 'Admin')) {

      this.router.navigate(['/login']);

      return;
    }
  }

  logout() {
    this.authorization.clearToken();
    this.router.navigate(['/login']); // Redireciona para a página de login ao fazer logout
  }
}
