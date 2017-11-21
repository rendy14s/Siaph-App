/* tslint:disable */

declare var Object: any;
export interface SiaphContainerInterface {
  "id"?: number;
}

export class SiaphContainer implements SiaphContainerInterface {
  "id": number;
  constructor(data?: SiaphContainerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphContainer`.
   */
  public static getModelName() {
    return "SiaphContainer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphContainer for dynamic purposes.
  **/
  public static factory(data: SiaphContainerInterface): SiaphContainer{
    return new SiaphContainer(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'SiaphContainer',
      plural: 'SiaphContainers',
      path: 'SiaphContainers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
