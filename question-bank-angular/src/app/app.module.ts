import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PHeaderComponent } from './p-app/p-header/p-header.component';
import { PNavbarComponent } from './p-app/p-navbar/p-navbar.component';
import { PQuestionbankComponent } from './p-app/p-questionbank/p-questionbank.component';

@NgModule({
  declarations: [
    AppComponent,
    PHeaderComponent,
    PNavbarComponent,
    PQuestionbankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
