import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../../services/back-office/authorization.service';
import { agent } from '../../../models/agent';
import { AgentService } from '../../../services/back-office/agent.service';
import { staff } from '../../../models/staff';
import { StaffService } from '../../../services/back-office-staff/staff.service';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  role: string | null = null;
  id: number;
  employee: agent | staff = {
    id: 0,
    name: {
      firstName: '',
      middleNames: [],
      lastName: ''
    },
    dateOfBirth: null,
    gender: '',
    hiredDate: null,
    dateOfTermination: null,
    photoFileName: '',
    role: 0,
    supervisorId: null,
    isActive: true,
  };

  constructor(private authorization: AuthorizationService,
    private agentService: AgentService,
    private staffService: StaffService,
    private router: Router) {

    this.role = authorization.getRole();

    this.id = Number(this.authorization.getId());

    if (!this.role || (this.role !== 'Agent' && this.role !== 'Manager' && this.role !== 'Broker'
      && this.role !== 'Staff' && this.role !== 'Admin')) {

      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o papel não for válido

      return;
    }

    if (!this.id) {
      this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login se o ID não for válido
    }

    this.agentService.getAgentById(this.id).subscribe({
      next: (data) => {
        if (data != null) {

          this.employee = data;
        }
        else {
          this.staffService.getStaffById(this.id).subscribe({
            next: (response) => {
              this.employee = response;
            },
            error: (error) => {
              console.error('Error fetching staff Data:', error);
            }
          })

        }
      },
      error: (err) => {
        console.error('Error fetching agent data:', err); // Log any errors that occur during the fetch
      }
    });

  }

  logout() {
    this.authorization.clearToken();
    this.router.navigate(['/front-page', 'login']); // Redireciona para a página de login ao fazer logout
  }
}
