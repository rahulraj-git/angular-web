import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Adjust the path as per your file structure
import { MainComponent } from 'src/components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Default route to MainComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }