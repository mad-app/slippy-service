import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplaceComponent } from './marketplace.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAppComponent } from './create-app/create-app.component';
import { StoreComponent } from './store/store.component';
import { LoadAppComponent } from './dashboard/load-app/load-app.component';

const routes: Routes = [{
  path: '',
  component: MarketplaceComponent,
  children:
  [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'create-app',
      component: CreateAppComponent,
    },
    {
      path: 'load-app',
      component: LoadAppComponent,
    },
    {
      path: 'store',
      component: StoreComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule { }
