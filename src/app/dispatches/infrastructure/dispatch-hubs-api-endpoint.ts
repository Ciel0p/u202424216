import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';
import {DispatchHubAssembler} from './dispatch-hub-assembler';

export class DispatchHubsApiEndpoint extends BaseApiEndpoint<
  DispatchHub,
  DispatchHubResource,
  DispatchHubsResponse,
  DispatchHubAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchHubsEndpointPath}`,
      new DispatchHubAssembler()
    );
  }
}
