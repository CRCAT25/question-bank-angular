import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PHeaderComponent } from './p-app/p-layout/p-header/p-header.component';
import { PNavbarComponent } from './p-app/p-layout/p-navbar/p-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PPersonnelComponent } from './p-app/p-personnel/p-personnel.component';
import { PQuestionbankComponent } from './p-app/p-personnel/p-questionbank/p-questionbank.component';
import { PCompetencyComponent } from './p-app/p-personnel/p-competency/p-competency.component';
import { PCompetencyDictionaryComponent } from './p-app/p-personnel/p-competency-dictionary/p-competency-dictionary.component';
import { PConfigComponent } from './p-app/p-config/p-config.component';
import { PDashboardComponent } from './p-app/p-dashboard/p-dashboard.component';
import { PShoppingComponent } from './p-app/p-shopping/p-shopping.component';
import { PCoordinationComponent } from './p-app/p-coordination/p-coordination.component';
import { PMarketingComponent } from './p-app/p-marketing/p-marketing.component';
import { PEcommerceComponent } from './p-app/p-ecommerce/p-ecommerce.component';
import { PBusinessComponent } from './p-app/p-business/p-business.component';
import { StatusColorPipe } from './p-lib/pipe/status-color.pipe';
import { ToolIconPipe } from './p-lib/pipe/tool-icon.pipe';
import { ToolIconOutlinePipe } from './p-lib/pipe/tool-icon-outline.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NonNegativeNumberDirective } from './p-lib/directive/NonNegativeNumberDirective.directive';
import { DatepickerComponent } from './p-lib/components/datepicker/datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    PHeaderComponent,
    PNavbarComponent,
    PQuestionbankComponent,
    PPersonnelComponent,
    PCompetencyComponent,
    PCompetencyDictionaryComponent,
    PConfigComponent,
    PDashboardComponent,
    PShoppingComponent,
    PCoordinationComponent,
    PMarketingComponent,
    PEcommerceComponent,
    PBusinessComponent,
    StatusColorPipe,
    ToolIconPipe,
    ToolIconOutlinePipe,
    NonNegativeNumberDirective,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
