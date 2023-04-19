import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SimpleCRMComponent } from './simple-crm/simple-crm.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent},
  {path: 'simpleCRM', component: SimpleCRMComponent, 
  canActivate: [AuthGuard],
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: 'employee/:employeeId', component: EmployeeDetailComponent},
    {path: 'not-found', component: PageNotFoundComponent},
  ]},
  {path: '**', redirectTo: 'simpleCRM/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
