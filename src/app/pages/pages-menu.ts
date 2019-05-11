import { NbMenuItem } from '@nebular/theme';

export function menuItems(lang:any) {
  const MENU_ITEMS: NbMenuItem[] = [
    {
      title: lang.menu.dashboard,
      icon: 'nb-e-commerce',
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: lang.menu.testing,
      icon: 'nb-home',
      link: '/pages/load-testing',
    },
    {
      title: lang.menu.marketplace.v,
      icon: 'nb-compose',
      children: [
        {
          title: lang.menu.marketplace.submenu.new,
          link: '/pages/marketplace/create-app',
        },
        {
          title: lang.menu.marketplace.submenu.my_app,
          link: '/pages/marketplace/dashboard',
        },
        {
          title: lang.menu.marketplace.submenu.store,
          link: '/pages/marketplace/store',
        },
      ],
    },
  ];

  return MENU_ITEMS;
}
