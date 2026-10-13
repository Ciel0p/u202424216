import {Component, inject} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchesStore} from '../../../../dispatches/application/dispatches.store';
import {
  DispatchHubSummary
} from '../../../../dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinner, TranslatePipe, DispatchHubSummary],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly store = inject(DispatchesStore);
}
