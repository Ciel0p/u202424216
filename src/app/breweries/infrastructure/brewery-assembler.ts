import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesResponse, BreweryResource} from './breweries-response';

export class BreweryAssembler implements BaseAssembler<Brewery, BreweryResource, BreweriesResponse> {
  toEntitiesFromResponse(response: BreweriesResponse): Brewery[] {
    return response.breweries.map(resource => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: BreweryResource): Brewery {
    return new Brewery({
      id: resource.id,
      name: resource.name,
      breweryType: resource.brewery_type as BreweryType
    });
  }

  toResourceFromEntity(entity: Brewery): BreweryResource {
    return {
      id: entity.id,
      name: entity.name,
      brewery_type: entity.breweryType
    };
  }
}
