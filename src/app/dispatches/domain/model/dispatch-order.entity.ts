import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

export class DispatchOrder implements BaseEntity {
  #id: number;
  #dispatchHubId: number;
  #breweryType: BreweryType;
  #breweryId: string;
  #breweryName: string;
  #assignedTonnage: number;
  #dispatchedAt: Date;

  constructor(props: {
    id: number;
    dispatchHubId: number;
    breweryType: BreweryType;
    breweryId: string;
    breweryName: string;
    assignedTonnage: number;
    dispatchedAt: Date;
  }) {
    this.#id = props.id;
    this.#dispatchHubId = props.dispatchHubId;
    this.#breweryType = props.breweryType;
    this.#breweryId = props.breweryId;
    this.#breweryName = props.breweryName;
    this.#assignedTonnage = props.assignedTonnage;
    this.#dispatchedAt = props.dispatchedAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get dispatchHubId(): number {
    return this.#dispatchHubId;
  }

  set dispatchHubId(value: number) {
    this.#dispatchHubId = value;
  }

  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  get breweryId(): string {
    return this.#breweryId;
  }

  set breweryId(value: string) {
    this.#breweryId = value;
  }

  get breweryName(): string {
    return this.#breweryName;
  }

  set breweryName(value: string) {
    this.#breweryName = value;
  }

  get assignedTonnage(): number {
    return this.#assignedTonnage;
  }

  set assignedTonnage(value: number) {
    this.#assignedTonnage = value;
  }

  get dispatchedAt(): Date {
    return this.#dispatchedAt;
  }

  set dispatchedAt(value: Date) {
    this.#dispatchedAt = value;
  }
}
