import { Routes } from '@angular/router';
import { LoginComponent } from './components/back-office/login/login.component';
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
import { ListingReassignBetweenAgentsComponent } from './components/back-office-agent/listing-reassign-between-agents/listing-reassign-between-agents.component';
import { ListingReassignToAgentComponent } from './components/back-office-agent/listing-reassign-to-agent/listing-reassign-to-agent.component';
import { FrontPageComponent } from './components/front-office/front-page/front-page.component';
import { ViewListingsComponent } from './components/front-office/view-listings/view-listings.component';
import { LoginUserComponent } from './components/front-office/login-user/login-user.component';
import { RegisterComponent } from './components/front-office/register/register.component';
import { UserProfileComponent } from './components/front-office/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/front-office/edit-user-profile/edit-user-profile.component';
import { AgentAddressListComponent } from './components/back-office/agent-address-list/agent-address-list.component';
import { AgentContactListComponent } from './components/back-office/agent-contact-list/agent-contact-list.component';
import { AppointmentNewComponent } from './components/back-office-appointment/appointment-new/appointment-new.component';
import { AppointmentListComponent } from './components/back-office-appointment/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './components/back-office-appointment/appointment-edit/appointment-edit.component';
import { ParticipantListComponent } from './components/back-office-appointment/participant-list/participant-list.component';
import { ParticipantNewComponent } from './components/back-office-appointment/participant-new/participant-new.component';
import { StaffListComponent } from './components/back-office-staff/staff-list/staff-list.component';
import { StaffNewComponent } from './components/back-office-staff/staff-new/staff-new.component';
import { StaffNewAccountComponent } from './components/back-office-staff/staff-new-account/staff-new-account.component';
import { StaffEditComponent } from './components/back-office-staff/staff-edit/staff-edit.component';
import { UserNewComponent } from './components/back-office-user/user-new/user-new.component';
import { UserListComponent } from './components/back-office-user/user-list/user-list.component';
import { UserEditComponent } from './components/back-office-user/user-edit/user-edit.component';
import { UserNewAccountComponent } from './components/back-office-user/user-new-account/user-new-account.component';
import { UserEditAccountComponent } from './components/back-office-user/user-edit-account/user-edit-account.component';
import { StaffEditAccountComponent } from './components/back-office-staff/staff-edit-account/staff-edit-account.component';
import { DetailListingComponent } from './components/front-office/detail-listing/detail-listing.component';
import { FavoritesComponent } from './components/front-office/favorites/favorites.component';
import { canActivateEmployee, canActivateSupervisor, canActivateAgent, canActivateAdmin, canActivateUser } from './components/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'front-page', pathMatch: 'full'
  },
  {
    path: 'front-page', component: FrontPageComponent, children: [
      { path: '', redirectTo: 'view-listings', pathMatch: 'full' },
      { path: 'view-listings', component: ViewListingsComponent },
      { path: 'detail-listing/:id', component: DetailListingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login-user', component: LoginUserComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [canActivateUser] },
      { path: 'edit-user-profile', component: EditUserProfileComponent, canActivate: [canActivateUser] },
      { path: 'favorites', component: FavoritesComponent, canActivate: [canActivateUser] }
    ]
  },
  {
    path: 'main-page', component: MainPageComponent, canActivate: [canActivateEmployee], children:
      [
        { path: '', redirectTo: 'agent-list', pathMatch: 'full' },
        { path: 'agent-list', component: AgentListComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new', component: AgentNewComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new/:id', component: AgentNewComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new-account/:id', component: AgentNewAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new-account/:id/:continue', component: AgentNewAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new-address/:id', component: AgentNewAddressComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-new-contact/:id', component: AgentNewContactComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-edit/:id', component: AgentEditComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-edit-account/:id', component: AgentEditAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-edit-address/:idAgent/:idAddress', component: AgentEditAddressComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-edit-contact/:idAgent/:idContact', component: AgentEditContactComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-address-list/:id', component: AgentAddressListComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-contact-list/:id', component: AgentContactListComponent, canActivate: [canActivateSupervisor] },
        { path: 'agent-reassign/:id', component: AgentReassignComponent, canActivate: [canActivateSupervisor] },
        { path: 'listing-list', component: ListingListComponent, canActivate: [canActivateAgent] },
        { path: 'listing-new', component: ListingNewComponent, canActivate: [canActivateAgent] },
        { path: 'listing-edit/:id', component: ListingEditComponent, canActivate: [canActivateAgent] },
        { path: 'listing-self-reassign/:idAgent/:idListing', component: ListingSelfReassignComponent, canActivate: [canActivateSupervisor] },
        { path: 'listing-reassign-between-agents/:idAgent/:idListing', component: ListingReassignBetweenAgentsComponent, canActivate: [canActivateSupervisor] },
        { path: 'listing-reassign-to-agent/:id', component: ListingReassignToAgentComponent, canActivate: [canActivateSupervisor] },
        { path: 'appointment-list', component: AppointmentListComponent, canActivate: [canActivateEmployee] },
        { path: 'appointment-new', component: AppointmentNewComponent, canActivate: [canActivateEmployee] },
        { path: 'appointment-edit/:id', component: AppointmentEditComponent, canActivate: [canActivateEmployee] },
        { path: 'participant-list/:id', component: ParticipantListComponent, canActivate: [canActivateEmployee] },
        { path: 'participant-new/:id', component: ParticipantNewComponent, canActivate: [canActivateEmployee] },
        { path: 'staff-list', component: StaffListComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-new', component: StaffNewComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-new/:id', component: StaffNewComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-new-account/:id', component: StaffNewAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-new-account/:id/:continue', component: StaffNewAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-edit/:id', component: StaffEditComponent, canActivate: [canActivateSupervisor] },
        { path: 'staff-edit-account/:id', component: StaffEditAccountComponent, canActivate: [canActivateSupervisor] },
        { path: 'user-list', component: UserListComponent, canActivate: [canActivateAdmin] },
        { path: 'user-new', component: UserNewComponent, canActivate: [canActivateAdmin] },
        { path: 'user-new/:id', component: UserNewComponent, canActivate: [canActivateAdmin] },
        { path: 'user-edit/:id', component: UserEditComponent, canActivate: [canActivateAdmin] },
        { path: 'user-new-account/:id', component: UserNewAccountComponent, canActivate: [canActivateAdmin] },
        { path: 'user-new-account/:id/:continue', component: UserNewAccountComponent, canActivate: [canActivateAdmin] },
        { path: 'user-edit-account/:id', component: UserEditAccountComponent, canActivate: [canActivateAdmin] }

      ]
  }
];
