import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';
import {DispatchOrderAssembler} from './dispatch-order-assembler';

export class DispatchOrdersApiEndpoint extends BaseApiEndpoint<
  DispatchOrder,
  DispatchOrderResource,
  DispatchOrdersResponse,
  DispatchOrderAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchOrdersEndpointPath}`,
      new DispatchOrderAssembler()
    );
  }
}
