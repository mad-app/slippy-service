import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../../@core/services';
import { SlippyApp } from '../../../@core/data/slippy_data/app';

@Component({
  selector: 'slp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  username: string = 'mockname';
  apps: Observable<SlippyApp[]>;


  constructor(
    private api: PurchaseService,
    private route: ActivatedRoute,
    private router: Router) {
    this.apps = api.getMyApp(this.username);
  }

  ngOnInit() {
    this.apps = this.api.getMyApp(this.username);
  }

  onLoadApp(app: SlippyApp) {
    this.router.navigate(['/pages/marketplace/load-app'], {
      relativeTo: this.route,
      queryParams: {
        appName: app.name,
      },
    });
  }
}
