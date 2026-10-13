import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {DecimalPipe} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {BreweriesStore} from '../../../../breweries/application/breweries.store';
import {BREWERY_TYPES, BreweryType} from '../../../../breweries/domain/model/brewery-type';
import {DispatchesStore} from '../../../application/dispatches.store';
import {DispatchOrder} from '../../../domain/model/dispatch-order.entity';

@Component({
  selector: 'app-dispatch-order-new',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner,
    DecimalPipe,
    TranslatePipe
  ],
  templateUrl: './dispatch-order-new.html',
  styleUrl: './dispatch-order-new.css'
})
export class DispatchOrderNew {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly dispatchesStore = inject(DispatchesStore);
  protected readonly breweriesStore = inject(BreweriesStore);

  protected readonly breweryTypes = BREWERY_TYPES;

  protected readonly form = this.formBuilder.group({
    breweryType: new FormControl<BreweryType | null>(null, Validators.required),
    breweryId: new FormControl<string | null>({value: null, disabled: true}, Validators.required),
    assignedTonnage: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)])
  });

  private readonly selectedBreweryType = toSignal(this.form.controls.breweryType.valueChanges, {
    initialValue: null
  });

  private readonly assignedTonnage = toSignal(this.form.controls.assignedTonnage.valueChanges, {
    initialValue: null
  });

  protected readonly dispatchHub = computed(() => {
    const breweryType = this.selectedBreweryType();
    return breweryType ? this.dispatchesStore.getDispatchHubByBreweryType(breweryType) : undefined;
  });

  protected readonly availableTonnageCapacity = computed(() => {
    const dispatchHub = this.dispatchHub();
    return dispatchHub ? this.dispatchesStore.getAvailableTonnageCapacity(dispatchHub.id) : 0;
  });

  protected readonly tonnageExceeded = computed(() => {
    const assignedTonnage = Number(this.assignedTonnage() ?? 0);
    return !!this.dispatchHub() && assignedTonnage > this.availableTonnageCapacity();
  });

  protected onBreweryTypeChange(breweryType: BreweryType): void {
    this.form.controls.breweryId.reset();
    this.form.controls.breweryId.enable();
    this.breweriesStore.loadBreweriesByType(breweryType);
  }

  protected submit(): void {
    const dispatchHub = this.dispatchHub();
    if (this.form.invalid || !dispatchHub || this.tonnageExceeded()) {
      this.form.markAllAsTouched();
      return;
    }
    const {breweryType, breweryId, assignedTonnage} = this.form.getRawValue();
    const brewery = this.breweriesStore.getBreweryById(breweryId!);
    if (!brewery) return;

    const created = this.dispatchesStore.addDispatchOrder(new DispatchOrder({
      id: 0,
      dispatchHubId: dispatchHub.id,
      breweryType: breweryType!,
      breweryId: brewery.id,
      breweryName: brewery.name,
      assignedTonnage: Number(assignedTonnage),
      dispatchedAt: new Date()
    }));
    if (created) this.navigateToHome();
  }

  protected cancel(): void {
    this.navigateToHome();
  }

  private navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
