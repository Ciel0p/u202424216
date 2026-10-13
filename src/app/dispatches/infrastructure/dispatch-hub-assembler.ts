import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';

export class DispatchHubAssembler implements BaseAssembler<DispatchHub, DispatchHubResource, DispatchHubsResponse> {
  toEntitiesFromResponse(response: DispatchHubsResponse): DispatchHub[] {
    return response.dispatchHubs.map(resource => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: DispatchHubResource): DispatchHub {
    return new DispatchHub({
      id: resource.id,
      name: resource.name,
      breweryType: resource.breweryType as BreweryType,
      maxTonnage: resource.maxTonnage
    });
  }

  toResourceFromEntity(entity: DispatchHub): DispatchHubResource {
    return {
      id: entity.id,
      name: entity.name,
      breweryType: entity.breweryType,
      maxTonnage: entity.maxTonnage
    };
  }
}
