import {inject, Injectable, signal} from '@angular/core';
import {retry} from 'rxjs';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApi} from '../infrastructure/breweries-api';

@Injectable({providedIn: 'root'})
export class BreweriesStore {
  private readonly breweriesApi = inject(BreweriesApi);

  private readonly breweriesSignal = signal<Brewery[]>([]);
  readonly breweries = this.breweriesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  loadBreweriesByType(breweryType: BreweryType): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.breweriesSignal.set([]);
    this.breweriesApi.getBreweriesByType(breweryType).pipe(retry(2)).subscribe({
      next: breweries => {
        this.breweriesSignal.set(breweries);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load breweries'));
        this.loadingSignal.set(false);
      }
    });
  }

  getBreweryById(id: string): Brewery | undefined {
    return this.breweries().find(brewery => brewery.id === id);
  }

  private formatError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
