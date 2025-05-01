import { Routes } from '@angular/router';
import { LoginComponent } from './components/back-office/login/login.component';
import { HomeComponent } from './components/front-office/home/home.component';
import { MainPageComponent } from './components/back-office/main-page/main-page.component';
import { UserListComponent } from './components/back-office/user-list/user-list.component';
import { UserNewComponent } from './components/back-office/user-new/user-new.component';
import { UserEditComponent } from './components/back-office/user-edit/user-edit.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path:'main-page', component: MainPageComponent,children:
        [
          {path:'', redirectTo:'user-list', pathMatch:'full'},
          {path:'user-list', component: UserListComponent},
          {path:'user-new', component: UserNewComponent},
          {path:'user-edit/:id', component: UserEditComponent}
        ]}
];
