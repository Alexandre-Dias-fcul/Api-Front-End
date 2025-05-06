import { Routes } from '@angular/router';
import { LoginComponent } from './components/back-office/login/login.component';
import { HomeComponent } from './components/front-office/home/home.component';
import { MainPageComponent } from './components/back-office/main-page/main-page.component';
import { AgentListComponent } from './components/back-office/agent-list/agent-list.component';
import { AgentNewComponent } from './components/back-office/agent-new/agent-new.component';
import { AgentEditComponent } from './components/back-office/agent-edit/agent-edit.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main-page', component: MainPageComponent, children:
      [
        { path: '', redirectTo: 'agent-list', pathMatch: 'full' },
        { path: 'agent-list', component: AgentListComponent },
        { path: 'agent-new', component: AgentNewComponent },
        { path: 'agent-edit/:id', component: AgentEditComponent }
      ]
  }
];
