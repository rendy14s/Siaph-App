/* tslint:disable */

declare var Object: any;
export interface SiaphTrackingdocumentsInterface {
  "statusDisposisi": string;
  "prosesDate": Date;
  "editedDate": Date;
  "editedBy": string;
  "positionDisposisi"?: string;
  "statusDoc"?: string;
  "latelyDoc"?: string;
  "idTracking"?: number;
  "idDoc"?: number;
  "fromDoc"?: number;
  "toDoc"?: number;
}

export class SiaphTrackingdocuments implements SiaphTrackingdocumentsInterface {
  "statusDisposisi": string;
  "prosesDate": Date;
  "editedDate": Date;
  "editedBy": string;
  "positionDisposisi": string;
  "statusDoc": string;
  "latelyDoc": string;
  "idTracking": number;
  "idDoc": number;
  "fromDoc": number;
  "toDoc": number;
  constructor(data?: SiaphTrackingdocumentsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphTrackingdocuments`.
   */
  public static getModelName() {
    return "SiaphTrackingdocuments";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphTrackingdocuments for dynamic purposes.
  **/
  public static factory(data: SiaphTrackingdocumentsInterface): SiaphTrackingdocuments{
    return new SiaphTrackingdocuments(data);
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
      name: 'SiaphTrackingdocuments',
      plural: 'SiaphTrackingdocuments',
      path: 'SiaphTrackingdocuments',
      properties: {
        "statusDisposisi": {
          name: 'statusDisposisi',
          type: 'string'
        },
        "prosesDate": {
          name: 'prosesDate',
          type: 'Date'
        },
        "editedDate": {
          name: 'editedDate',
          type: 'Date'
        },
        "editedBy": {
          name: 'editedBy',
          type: 'string'
        },
        "positionDisposisi": {
          name: 'positionDisposisi',
          type: 'string'
        },
        "statusDoc": {
          name: 'statusDoc',
          type: 'string'
        },
        "latelyDoc": {
          name: 'latelyDoc',
          type: 'string'
        },
        "idTracking": {
          name: 'idTracking',
          type: 'number'
        },
        "idDoc": {
          name: 'idDoc',
          type: 'number'
        },
        "fromDoc": {
          name: 'fromDoc',
          type: 'number'
        },
        "toDoc": {
          name: 'toDoc',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
