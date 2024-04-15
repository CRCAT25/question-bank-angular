import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PHeaderComponent } from './p-app/p-layout/p-header/p-header.component';
import { PNavbarComponent } from './p-app/p-layout/p-navbar/p-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PStatusComponent } from './p-lib/components/p-status/p-status.component';
import { PPersonnelComponent } from './p-app/p-personnel/p-personnel.component';
import { PQuestionbankComponent } from './p-app/p-personnel/p-questionbank/p-questionbank.component';

@NgModule({
  declarations: [
    AppComponent,
    PHeaderComponent,
    PNavbarComponent,
    PQuestionbankComponent,
    PStatusComponent,
    PPersonnelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
