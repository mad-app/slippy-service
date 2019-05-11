import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../@core/modules/material.module';
import { ThemeModule } from '../../@theme/theme.module';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAppComponent } from './create-app/create-app.component';
import { StoreComponent } from './store/store.component';
import { LoadAppComponent } from './dashboard/load-app/load-app.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MarketplaceComponent, DashboardComponent, CreateAppComponent, StoreComponent, LoadAppComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MaterialModule,
    ThemeModule,
    MatCardModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MarketplaceModule { }
