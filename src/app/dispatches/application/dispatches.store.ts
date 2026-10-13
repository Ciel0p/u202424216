import {inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchesApi} from '../infrastructure/dispatches-api';

@Injectable({providedIn: 'root'})
export class DispatchesStore {
  private readonly dispatchesApi = inject(DispatchesApi);

  private readonly dispatchHubsSignal = signal<DispatchHub[]>([]);
  readonly dispatchHubs = this.dispatchHubsSignal.asReadonly();

  private readonly dispatchOrdersSignal = signal<DispatchOrder[]>([]);
  readonly dispatchOrders = this.dispatchOrdersSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadDispatchHubs();
    this.loadDispatchOrders();
  }

  getDispatchOrdersByHubId(dispatchHubId: number): DispatchOrder[] {
    return this.dispatchOrders().filter(order => order.dispatchHubId === dispatchHubId);
  }

  getTotalDispatchedTonnage(dispatchHubId: number): number {
    return this.getDispatchOrdersByHubId(dispatchHubId)
      .reduce((total, order) => total + order.assignedTonnage, 0);
  }

  getAvailableTonnageCapacity(dispatchHubId: number): number {
    const dispatchHub = this.dispatchHubs().find(hub => hub.id === dispatchHubId);
    return dispatchHub ? dispatchHub.maxTonnage - this.getTotalDispatchedTonnage(dispatchHubId) : 0;
  }

  getDispatchHubByBreweryType(breweryType: BreweryType): DispatchHub | undefined {
    return this.dispatchHubs().find(hub => hub.breweryType === breweryType);
  }

  canAssignTonnage(dispatchHubId: number, assignedTonnage: number): boolean {
    return assignedTonnage > 0 && assignedTonnage <= this.getAvailableTonnageCapacity(dispatchHubId);
  }

  addDispatchOrder(dispatchOrder: DispatchOrder): boolean {
    if (!this.canAssignTonnage(dispatchOrder.dispatchHubId, dispatchOrder.assignedTonnage)) {
      this.errorSignal.set('Assigned tonnage exceeds the available tonnage capacity');
      return false;
    }
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.dispatchesApi.createDispatchOrder(dispatchOrder).pipe(retry(2)).subscribe({
      next: createdOrder => {
        this.dispatchOrdersSignal.update(orders => [...orders, createdOrder]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create dispatch order'));
        this.loadingSignal.set(false);
      }
    });
    return true;
  }

  private loadDispatchHubs(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.dispatchesApi.getDispatchHubs().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchHubs => {
        this.dispatchHubsSignal.set(dispatchHubs);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch hubs'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadDispatchOrders(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.dispatchesApi.getDispatchOrders().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchOrders => {
        this.dispatchOrdersSignal.set(dispatchOrders);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch orders'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
