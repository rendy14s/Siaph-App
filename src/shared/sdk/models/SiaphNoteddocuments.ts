/* tslint:disable */

declare var Object: any;
export interface SiaphNoteddocumentsInterface {
  "idTracking": number;
  "idDoc": number;
  "dateNoted": Date;
  "notesDoc": string;
  "idNoted"?: number;
}

export class SiaphNoteddocuments implements SiaphNoteddocumentsInterface {
  "idTracking": number;
  "idDoc": number;
  "dateNoted": Date;
  "notesDoc": string;
  "idNoted": number;
  constructor(data?: SiaphNoteddocumentsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphNoteddocuments`.
   */
  public static getModelName() {
    return "SiaphNoteddocuments";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphNoteddocuments for dynamic purposes.
  **/
  public static factory(data: SiaphNoteddocumentsInterface): SiaphNoteddocuments{
    return new SiaphNoteddocuments(data);
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
      name: 'SiaphNoteddocuments',
      plural: 'SiaphNoteddocuments',
      path: 'SiaphNoteddocuments',
      properties: {
        "idTracking": {
          name: 'idTracking',
          type: 'number'
        },
        "idDoc": {
          name: 'idDoc',
          type: 'number'
        },
        "dateNoted": {
          name: 'dateNoted',
          type: 'Date'
        },
        "notesDoc": {
          name: 'notesDoc',
          type: 'string'
        },
        "idNoted": {
          name: 'idNoted',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
