import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface BreweryResource extends BaseResource {
  id: string;
  name: string;
  brewery_type: string;
}

export interface BreweriesResponse extends BaseResponse {
  breweries: BreweryResource[];
}
