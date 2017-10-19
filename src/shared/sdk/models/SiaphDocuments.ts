/* tslint:disable */

declare var Object: any;
export interface SiaphDocumentsInterface {
  "noDoc": string;
  "fromDoc": string;
  "dateDoc": Date;
  "acceptDateDoc": Date;
  "noAgendaDoc": string;
  "subjectDoc": string;
  "notesDoc": string;
  "createDateDoc": Date;
  "publishedByDoc": string;
  "idDoc"?: number;
}

export class SiaphDocuments implements SiaphDocumentsInterface {
  "noDoc": string;
  "fromDoc": string;
  "dateDoc": Date;
  "acceptDateDoc": Date;
  "noAgendaDoc": string;
  "subjectDoc": string;
  "notesDoc": string;
  "createDateDoc": Date;
  "publishedByDoc": string;
  "idDoc": number;
  constructor(data?: SiaphDocumentsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphDocuments`.
   */
  public static getModelName() {
    return "SiaphDocuments";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphDocuments for dynamic purposes.
  **/
  public static factory(data: SiaphDocumentsInterface): SiaphDocuments{
    return new SiaphDocuments(data);
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
      name: 'SiaphDocuments',
      plural: 'SiaphDocuments',
      properties: {
        "noDoc": {
          name: 'noDoc',
          type: 'string'
        },
        "fromDoc": {
          name: 'fromDoc',
          type: 'string'
        },
        "dateDoc": {
          name: 'dateDoc',
          type: 'Date'
        },
        "acceptDateDoc": {
          name: 'acceptDateDoc',
          type: 'Date'
        },
        "noAgendaDoc": {
          name: 'noAgendaDoc',
          type: 'string'
        },
        "subjectDoc": {
          name: 'subjectDoc',
          type: 'string'
        },
        "notesDoc": {
          name: 'notesDoc',
          type: 'string'
        },
        "createDateDoc": {
          name: 'createDateDoc',
          type: 'Date'
        },
        "publishedByDoc": {
          name: 'publishedByDoc',
          type: 'string'
        },
        "idDoc": {
          name: 'idDoc',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
