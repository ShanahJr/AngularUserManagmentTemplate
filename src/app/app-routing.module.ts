import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './Components/Auth/log-in/log-in.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ForbiddenComponent } from './Components/Auth/forbidden/forbidden.component';

import { AuthGuard } from './Services/Auth/auth.guard';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'LogIn', component: LogInComponent },
  { path: 'LogIn/:id', component: LogInComponent },
  { path: 'Projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'Forbidden', component: ForbiddenComponent },
];

// const routes: Routes = [

//   { path: '', component: LogInComponent },
//   { path: 'LogIn', component: LogInComponent },
//   { path: 'Register', component: RegisterComponent },
//   { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

//   { path: 'AnimeTable', component: AnimeTableComponent, canActivate: [AuthGuard] },
//   { path: 'CreateAnime', component: CreateAnimeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
//   { path: 'EditAnime', component: EditAnimeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

//   { path: 'Forbidden', component: ForbiddenComponent },

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
