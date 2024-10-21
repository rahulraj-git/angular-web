import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPageComponent } from 'src/pages/header-page/header-page.component';
import { MainComponent } from 'src/components/main/main.component';
import { CarouselComponent } from 'src/components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    MainComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
