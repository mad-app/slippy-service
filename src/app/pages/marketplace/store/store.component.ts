import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService, PurchaseService } from '../../../@core/services';
import { SlippyApp } from '../../../@core/data/slippy_data/app'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'slp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  apps: Observable<SlippyApp[]>;

  constructor(
    private app: AppService,
    private purchase: PurchaseService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.apps = this.app.getAll();
  }

  buy(appName: string) {
    const body = {
      user : "mockname",
      app : appName
    }

    const data = this.purchase.buy(body);
    data.subscribe((d:any) => {
      if (d.ok == true) {
        this.router.navigateByUrl('/pages/marketplace/dashboard');
      }
      else {
        this.snackBar.open("You already bought this app", undefined,
        {panelClass: ['custom-class'], duration: 2000});
      }
    });
  }
}
