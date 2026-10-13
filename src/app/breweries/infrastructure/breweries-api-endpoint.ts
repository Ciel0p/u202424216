import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesResponse, BreweryResource} from './breweries-response';
import {BreweryAssembler} from './brewery-assembler';

export class BreweriesApiEndpoint extends BaseApiEndpoint<
  Brewery,
  BreweryResource,
  BreweriesResponse,
  BreweryAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.breweriesProviderApiBaseUrl}${environment.breweriesProviderBreweriesEndpointPath}`,
      new BreweryAssembler()
    );
  }

  getByType(breweryType: BreweryType): Observable<Brewery[]> {
    const params = new HttpParams().set('by_type', breweryType);
    return this.http.get<BreweryResource[]>(this.endpointUrl, {params}).pipe(
      map(resources => resources.map(resource => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch breweries'))
    );
  }
}
