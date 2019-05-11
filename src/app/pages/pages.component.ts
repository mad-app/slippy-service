import { Component } from '@angular/core';

import { menuItems } from './pages-menu';
import { TranslateService } from '../@core/services/translate.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'slp-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[];

  constructor(private translate: TranslateService) {
    this.menu = menuItems(translate.data);
  }

}
