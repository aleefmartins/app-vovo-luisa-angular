import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserCardComponent } from './views/user-card/user-card.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';

export const routes: Routes = [{
    path: "",
    component: HomeComponent
  },
  {
    path: "userAccount",
    component: UserCardComponent
  },
  {
    path: "userAccount/createuser",
    component: UserCreateComponent
  },
  {
    path: "users",
    component: UserListComponent
  },
  {
    path: "userAccount/user-update/:userId",
    component: UserUpdateComponent
  },
  {
    path: "userAccount/user-delete/:userId",
    component: UserDeleteComponent
  }];
