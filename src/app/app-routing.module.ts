import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { FormComponent } from './pages/form/form.component';
import { PayNowComponent } from './pages/pay-now/pay-now.component';


const routes: Routes = [
  // { path: "", redirectTo: "landing", pathMatch: "full"},
  { path: "", component: BodyComponent },
  // { path: "masters", component: MastersComponent },
  // { path: "baccalaureate", component: BaccalaureateComponent },
  // { path: "doctoral", component: DoctoralComponent },
  { path: "form", component: FormComponent },
  { path: "pay", component: PayNowComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
