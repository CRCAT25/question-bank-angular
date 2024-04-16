import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PQuestionbankComponent } from './p-app/p-personnel/p-questionbank/p-questionbank.component';
import { PPersonnelComponent } from './p-app/p-personnel/p-personnel.component';
import { PCompetencyComponent } from './p-app/p-personnel/p-competency/p-competency.component';
import { PCompetencyDictionaryComponent } from './p-app/p-personnel/p-competency-dictionary/p-competency-dictionary.component';
import { PConfigComponent } from './p-app/p-config/p-config.component';
import { PDashboardComponent } from './p-app/p-dashboard/p-dashboard.component';
import { PShoppingComponent } from './p-app/p-shopping/p-shopping.component';
import { PMarketingComponent } from './p-app/p-marketing/p-marketing.component';
import { PEcommerceComponent } from './p-app/p-ecommerce/p-ecommerce.component';
import { PBusinessComponent } from './p-app/p-business/p-business.component';
import { PCoordinationComponent } from './p-app/p-coordination/p-coordination.component';
import { PListPersonnelComponent } from './p-app/p-personnel/p-list-personnel/p-list-personnel.component';

const routes: Routes = [
  {path: 'cau-hinh', component: PConfigComponent},
  {path: 'dashboard', component: PDashboardComponent},
  {path: 'mua-hang', component: PShoppingComponent},
  {path: 'dieu-phoi', component: PCoordinationComponent},
  {path: 'marketing', component: PMarketingComponent},
  {path: 'ecommerce', component: PEcommerceComponent},
  {path: 'kinh-doanh', component: PBusinessComponent},
  {
    path: 'nhan-su', component: PPersonnelComponent,
    children: [
      { path: 'danh-sach-nhan-su', component: PListPersonnelComponent },
      { path: 'khung-nang-luc', component: PCompetencyComponent },
      { path: 'tu-dien-nang-luc', component: PCompetencyDictionaryComponent },
      { path: 'ngan-hang-cau-hoi', component: PQuestionbankComponent },
      { path: '', redirectTo: 'ngan-hang-cau-hoi', pathMatch: 'full'},
    ]
  },
  { path: '', redirectTo: 'nhan-su', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
