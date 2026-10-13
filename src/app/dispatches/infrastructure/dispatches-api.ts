import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchHubsApiEndpoint} from './dispatch-hubs-api-endpoint';
import {DispatchOrdersApiEndpoint} from './dispatch-orders-api-endpoint';

@Injectable({providedIn: 'root'})
export class DispatchesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly dispatchHubsEndpoint = new DispatchHubsApiEndpoint(this.http);
  private readonly dispatchOrdersEndpoint = new DispatchOrdersApiEndpoint(this.http);

  getDispatchHubs(): Observable<DispatchHub[]> {
    return this.dispatchHubsEndpoint.getAll();
  }

  getDispatchOrders(): Observable<DispatchOrder[]> {
    return this.dispatchOrdersEndpoint.getAll();
  }

  createDispatchOrder(dispatchOrder: DispatchOrder): Observable<DispatchOrder> {
    return this.dispatchOrdersEndpoint.create(dispatchOrder);
  }
}
