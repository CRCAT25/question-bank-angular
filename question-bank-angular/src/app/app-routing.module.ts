import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PQuestionbankComponent } from './p-app/p-personnel/p-questionbank/p-questionbank.component';

const routes: Routes = [
  {path: 'nhansu', component: PQuestionbankComponent},
  {path: 'dieuphoi', component: PQuestionbankComponent},
  {path: 'cauhinh', component: PQuestionbankComponent},
  {path: 'dashboard', component: PQuestionbankComponent},
  {path: 'muahang', component: PQuestionbankComponent},
  {path: 'marketing', component: PQuestionbankComponent},
  {path: 'ecommerce', component: PQuestionbankComponent},
  {path: 'kinhdoanh', component: PQuestionbankComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
