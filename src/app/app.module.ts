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
import { ReviewSectionComponent } from 'src/components/review-section/review-section.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    ReviewSectionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
