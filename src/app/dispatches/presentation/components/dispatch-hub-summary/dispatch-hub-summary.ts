import {Component, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchHub} from '../../../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../../../domain/model/dispatch-order.entity';

@Component({
  selector: 'app-dispatch-hub-summary',
  imports: [MatCardModule, MatListModule, MatDividerModule, DecimalPipe, TranslatePipe],
  templateUrl: './dispatch-hub-summary.html',
  styleUrl: './dispatch-hub-summary.css'
})
export class DispatchHubSummary {
  readonly dispatchHub = input.required<DispatchHub>();
  readonly dispatchOrders = input.required<DispatchOrder[]>();
  readonly totalDispatchedTonnage = input.required<number>();
  readonly availableTonnageCapacity = input.required<number>();
}
