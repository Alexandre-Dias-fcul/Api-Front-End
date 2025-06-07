import { Routes } from '@angular/router';
import { LoginComponent } from './components/back-office/login/login.component';
import { HomeComponent } from './components/front-office/home/home.component';
import { MainPageComponent } from './components/back-office/main-page/main-page.component';
import { AgentListComponent } from './components/back-office/agent-list/agent-list.component';
import { AgentNewComponent } from './components/back-office/agent-new/agent-new.component';
import { AgentEditComponent } from './components/back-office/agent-edit/agent-edit.component';
import { AgentNewAccountComponent } from './components/back-office/agent-new-account/agent-new-account.component';
import { AgentEditAddressComponent } from './components/back-office/agent-edit-address/agent-edit-address.component';
import { AgentNewAddressComponent } from './components/back-office/agent-new-address/agent-new-address.component';
import { AgentNewContactComponent } from './components/back-office/agent-new-contact/agent-new-contact.component';
import { AgentEditAccountComponent } from './components/back-office/agent-edit-account/agent-edit-account.component';
import { AgentEditContactComponent } from './components/back-office/agent-edit-contact/agent-edit-contact.component';
import { ListingListComponent } from './components/back-office-agent/listing-list/listing-list.component';
import { ListingNewComponent } from './components/back-office-agent/listing-new/listing-new.component';
import { ListingEditComponent } from './components/back-office-agent/listing-edit/listing-edit.component';
import { AgentReassignComponent } from './components/back-office/agent-reassign/agent-reassign.component';
import { ListingSelfReassignComponent } from './components/back-office-agent/listing-self-reassign/listing-self-reassign.component';
import { ListingReassignToAgentComponent } from './components/back-office-agent/listing-reassign-to-agent/listing-reassign-to-agent.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main-page', component: MainPageComponent, children:
      [
        { path: '', redirectTo: 'agent-list', pathMatch: 'full' },
        { path: 'agent-list', component: AgentListComponent },
        { path: 'agent-new', component: AgentNewComponent },
        { path: 'agent-new/:id', component: AgentNewComponent },
        { path: 'agent-new-account/:id', component: AgentNewAccountComponent },
        { path: 'agent-new-address/:id', component: AgentNewAddressComponent },
        { path: 'agent-new-contact/:id', component: AgentNewContactComponent },
        { path: 'agent-edit/:id', component: AgentEditComponent },
        { path: 'agent-edit-account/:id', component: AgentEditAccountComponent },
        { path: 'agent-edit-address/:id', component: AgentEditAddressComponent },
        { path: 'agent-edit-contact/:id', component: AgentEditContactComponent },
        { path: 'listing-list', component: ListingListComponent },
        { path: 'listing-new', component: ListingNewComponent },
        { path: 'listing-edit/:id', component: ListingEditComponent },
        { path: 'agent-reassign/:id', component: AgentReassignComponent },
        { path: 'listing-self-reassign/:id', component: ListingSelfReassignComponent },
        { path: 'listing-reassign-to-agent/:id', component: ListingReassignToAgentComponent }
      ]
  }
];
