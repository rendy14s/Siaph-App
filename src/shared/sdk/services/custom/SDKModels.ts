/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Acl } from '../../models/Acl';
import { Accesstoken } from '../../models/Accesstoken';
import { Rolemapping } from '../../models/Rolemapping';
import { SiaphDepthrole } from '../../models/SiaphDepthrole';
import { SiaphDocuments } from '../../models/SiaphDocuments';
import { SiaphDocumentslibrary } from '../../models/SiaphDocumentslibrary';
import { SiaphNoteddocuments } from '../../models/SiaphNoteddocuments';
import { SiaphTrackingdocuments } from '../../models/SiaphTrackingdocuments';
import { SiaphUsercredential } from '../../models/SiaphUsercredential';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Acl: Acl,
    Accesstoken: Accesstoken,
    Rolemapping: Rolemapping,
    SiaphDepthrole: SiaphDepthrole,
    SiaphDocuments: SiaphDocuments,
    SiaphDocumentslibrary: SiaphDocumentslibrary,
    SiaphNoteddocuments: SiaphNoteddocuments,
    SiaphTrackingdocuments: SiaphTrackingdocuments,
    SiaphUsercredential: SiaphUsercredential,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
