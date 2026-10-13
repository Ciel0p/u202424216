import {Routes} from '@angular/router';

const dispatchOrderNew = () =>
  import('./views/dispatch-order-new/dispatch-order-new').then(m => m.DispatchOrderNew);

const baseTitle = 'BrewDog Dispatch Logistics Platform';

export const dispatchesRoutes: Routes = [
  {path: 'orders/new', loadComponent: dispatchOrderNew, title: `${baseTitle} - New Dispatch Order`}
];
