/* tslint:disable */

declare var Object: any;
export interface AclInterface {
  "model"?: string;
  "property"?: string;
  "accesstype"?: string;
  "permission"?: string;
  "principaltype"?: string;
  "principalid"?: string;
  "id"?: number;
}

export class Acl implements AclInterface {
  "model": string;
  "property": string;
  "accesstype": string;
  "permission": string;
  "principaltype": string;
  "principalid": string;
  "id": number;
  constructor(data?: AclInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Acl`.
   */
  public static getModelName() {
    return "Acl";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Acl for dynamic purposes.
  **/
  public static factory(data: AclInterface): Acl{
    return new Acl(data);
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
      name: 'Acl',
      plural: 'Acls',
      path: 'Acls',
      idName: 'id',
      properties: {
        "model": {
          name: 'model',
          type: 'string'
        },
        "property": {
          name: 'property',
          type: 'string'
        },
        "accesstype": {
          name: 'accesstype',
          type: 'string'
        },
        "permission": {
          name: 'permission',
          type: 'string'
        },
        "principaltype": {
          name: 'principaltype',
          type: 'string'
        },
        "principalid": {
          name: 'principalid',
          type: 'string'
        },
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
