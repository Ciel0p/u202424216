import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface DispatchHubResource extends BaseResource {
  id: number;
  name: string;
  breweryType: string;
  maxTonnage: number;
}

export interface DispatchHubsResponse extends BaseResponse {
  dispatchHubs: DispatchHubResource[];
}
