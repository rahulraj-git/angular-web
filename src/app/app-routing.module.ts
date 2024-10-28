import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Adjust the path as per your file structure
import { MainComponent } from 'src/components/main/main.component';
import { AdminDashboardComponent } from 'src/pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from 'src/pages/login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Default route to MainComponent
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }