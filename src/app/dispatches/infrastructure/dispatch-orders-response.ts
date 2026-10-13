import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface DispatchOrderResource extends BaseResource {
  id: number;
  dispatchHubId: number;
  breweryType: string;
  breweryId: string;
  breweryName: string;
  assignedTonnage: number;
  dispatchedAt: string;
}

export interface DispatchOrdersResponse extends BaseResponse {
  dispatchOrders: DispatchOrderResource[];
}
