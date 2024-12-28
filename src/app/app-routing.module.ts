import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Adjust the path as per your file structure
import { DetailsCatalogComponent } from 'src/components/details-catalog/details-catalog.component';
import { DetailsCategoryComponent } from 'src/components/details-category/details-category.component';
import { MainComponent } from 'src/components/main/main.component';
import { SizeChartComponent } from 'src/components/size-chart/size-chart.component';
import { AdminDashboardComponent } from 'src/pages/admin-dashboard/admin-dashboard.component';
import { FaqsComponent } from 'src/pages/faqs/faqs.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { PrivacyComponent } from 'src/pages/privacy/privacy.component';
import { ServicesComponent } from 'src/pages/services/services.component';
import { TermsComponent } from 'src/pages/terms/terms.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Default route to MainComponent
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'details-category', component: DetailsCategoryComponent },
  {path: 'details-catalog', component: DetailsCatalogComponent},
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'terms-conditions', component: TermsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'size-chart', component: SizeChartComponent },
  { path: 'services', component: ServicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }