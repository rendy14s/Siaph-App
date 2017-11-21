/* tslint:disable */

declare var Object: any;
export interface SiaphUsercredentialInterface {
  "username"?: string;
  "password": string;
  "depthCode"?: string;
  "access"?: string;
  "idUser"?: number;
}

export class SiaphUsercredential implements SiaphUsercredentialInterface {
  "username": string;
  "password": string;
  "depthCode": string;
  "access": string;
  "idUser": number;
  constructor(data?: SiaphUsercredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphUsercredential`.
   */
  public static getModelName() {
    return "SiaphUsercredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphUsercredential for dynamic purposes.
  **/
  public static factory(data: SiaphUsercredentialInterface): SiaphUsercredential{
    return new SiaphUsercredential(data);
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
      name: 'SiaphUsercredential',
      plural: 'SiaphUsercredentials',
      path: 'SiaphUsercredentials',
      idName: 'idUser',
      properties: {
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "depthCode": {
          name: 'depthCode',
          type: 'string'
        },
        "access": {
          name: 'access',
          type: 'string'
        },
        "idUser": {
          name: 'idUser',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
