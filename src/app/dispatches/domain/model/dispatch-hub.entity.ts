import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

export class DispatchHub implements BaseEntity {
  #id: number;
  #name: string;
  #breweryType: BreweryType;
  #maxTonnage: number;

  constructor(props: { id: number; name: string; breweryType: BreweryType; maxTonnage: number }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#breweryType = props.breweryType;
    this.#maxTonnage = props.maxTonnage;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  get maxTonnage(): number {
    return this.#maxTonnage;
  }

  set maxTonnage(value: number) {
    this.#maxTonnage = value;
  }
}
