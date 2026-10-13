import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApiEndpoint} from './breweries-api-endpoint';

@Injectable({providedIn: 'root'})
export class BreweriesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly breweriesEndpoint = new BreweriesApiEndpoint(this.http);

  getBreweriesByType(breweryType: BreweryType): Observable<Brewery[]> {
    return this.breweriesEndpoint.getByType(breweryType);
  }
}
