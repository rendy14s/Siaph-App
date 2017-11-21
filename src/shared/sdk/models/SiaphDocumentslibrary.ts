/* tslint:disable */

declare var Object: any;
export interface SiaphDocumentslibraryInterface {
  "idDoc": number;
  "namePhoto"?: string;
  "idPhoto"?: number;
}

export class SiaphDocumentslibrary implements SiaphDocumentslibraryInterface {
  "idDoc": number;
  "namePhoto": string;
  "idPhoto": number;
  constructor(data?: SiaphDocumentslibraryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SiaphDocumentslibrary`.
   */
  public static getModelName() {
    return "SiaphDocumentslibrary";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SiaphDocumentslibrary for dynamic purposes.
  **/
  public static factory(data: SiaphDocumentslibraryInterface): SiaphDocumentslibrary{
    return new SiaphDocumentslibrary(data);
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
      name: 'SiaphDocumentslibrary',
      plural: 'SiaphDocumentslibraries',
      path: 'SiaphDocumentslibraries',
      idName: 'idPhoto',
      properties: {
        "idDoc": {
          name: 'idDoc',
          type: 'number'
        },
        "namePhoto": {
          name: 'namePhoto',
          type: 'string'
        },
        "idPhoto": {
          name: 'idPhoto',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
