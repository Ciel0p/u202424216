import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from './brewery-type';

export class Brewery implements BaseEntity {
  #id: string;
  #name: string;
  #breweryType: BreweryType;

  constructor(props: { id: string; name: string; breweryType: BreweryType }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#breweryType = props.breweryType;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
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
}
