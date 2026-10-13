import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';

export class DispatchOrderAssembler implements BaseAssembler<DispatchOrder, DispatchOrderResource, DispatchOrdersResponse> {
  toEntitiesFromResponse(response: DispatchOrdersResponse): DispatchOrder[] {
    return response.dispatchOrders.map(resource => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: DispatchOrderResource): DispatchOrder {
    return new DispatchOrder({
      id: resource.id,
      dispatchHubId: resource.dispatchHubId,
      breweryType: resource.breweryType as BreweryType,
      breweryId: resource.breweryId,
      breweryName: resource.breweryName,
      assignedTonnage: resource.assignedTonnage,
      dispatchedAt: new Date(resource.dispatchedAt)
    });
  }

  toResourceFromEntity(entity: DispatchOrder): DispatchOrderResource {
    const resource = {
      dispatchHubId: entity.dispatchHubId,
      breweryType: entity.breweryType,
      breweryId: entity.breweryId,
      breweryName: entity.breweryName,
      assignedTonnage: entity.assignedTonnage,
      dispatchedAt: entity.dispatchedAt.toISOString()
    };
    return (entity.id ? {id: entity.id, ...resource} : resource) as DispatchOrderResource;
  }
}
