import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPageComponent } from 'src/pages/header-page/header-page.component';
import { MainComponent } from 'src/components/main/main.component';
import { CarouselComponent } from 'src/components/carousel/carousel.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { MapSectionComponent } from 'src/components/map-section/map-section.component';
import { OurProductsComponent } from 'src/components/our-products/our-products.component';
import { FooterComponent } from 'src/pages/footer/footer.component';
import { CategoriesComponent } from 'src/components/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    MainComponent,
    CarouselComponent,
    MapSectionComponent,
    OurProductsComponent,
    FooterComponent,
    CategoriesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
