import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { TestingComponent } from './testing/testing.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { MarketplaceModule } from './marketplace/marketplace.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:
    [
      {
        path: 'dashboard',
        component: ECommerceComponent,
      }, {
        path: 'load-testing',
        component: TestingComponent,
      },
      {
        path:'marketplace',
        loadChildren: () => MarketplaceModule,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
