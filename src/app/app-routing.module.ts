
import { LoginComponent } from './components/login/login.component';
import { Routes,  RouterModule} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GridComponent } from './components/grid/grid.component';
import { Role } from './models/rols.model';
import { ManagementComponent } from './components/management/management.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'partidas',
    component: GridComponent,
    canActivate: [AuthGuard],
    // data: {roles: [Role.admin]}
  },
  {
    path: 'recursos',
    component: ManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'entidades',
    component: PersonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
