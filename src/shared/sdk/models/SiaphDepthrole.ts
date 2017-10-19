/* tslint:disable */

declare var Object: any;
export interface SiaphDepthroleInterface {
  "userRole": string;
  "nameRole": string;
  "depthCode": string;
  "idRole"?: number;
}

export class SiaphDepthrole implements SiaphDepthroleInterface {
  "userRole": string;
  "nameRole": string;
  "depthCode": string;
  "idRole": number;
  constructor(data?: SiaphDepthroleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphDepthrole`.
   */
  public static getModelName() {
    return "SiaphDepthrole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphDepthrole for dynamic purposes.
  **/
  public static factory(data: SiaphDepthroleInterface): SiaphDepthrole{
    return new SiaphDepthrole(data);
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
      name: 'SiaphDepthrole',
      plural: 'SiaphDepthroles',
      properties: {
        "userRole": {
          name: 'userRole',
          type: 'string'
        },
        "nameRole": {
          name: 'nameRole',
          type: 'string'
        },
        "depthCode": {
          name: 'depthCode',
          type: 'string'
        },
        "idRole": {
          name: 'idRole',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
