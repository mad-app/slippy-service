/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/services/analytics.service';
import { TranslateService } from './@core/services/translate.service';

@Component({
  selector: 'slp-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
