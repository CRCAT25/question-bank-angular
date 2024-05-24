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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonNegativeNumberDirective } from './p-lib/directive/NonNegativeNumberDirective.directive';
import { DatepickerComponent } from './p-lib/components/datepicker/datepicker.component';
import { DialogComponent } from './p-lib/components/dialog/dialog.component';
import { PDecentralizationComponent } from './p-app/p-config/p-decentralization/p-decentralization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule, DropDownListModule, DropDownTreesModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { DropDownListDirective } from './p-app/p-config/shared/directives/dropdownlist.directive';
import { DropDownTreeListDirective } from './p-app/p-config/shared/directives/dropdowntreelist.directive';
import { MultiSelectTreeDirective } from './p-app/p-config/shared/directives/multiselecttree.directive';
import { TreeListModule } from '@progress/kendo-angular-treelist';

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
    DialogComponent,
    PDecentralizationComponent,
    DropDownListDirective,
    DropDownTreeListDirective,
    MultiSelectTreeDirective
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
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsModule,
    DropDownListModule,
    DropDownTreesModule,
    DropDownsModule,
    TreeListModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  exports: [
    DropDownListModule,
    DropDownTreesModule,
    DropDownsModule,
  ]
})
export class AppModule { }
