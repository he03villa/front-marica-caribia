import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeIdentificationService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  getAllTypeIdentification() {
    const url = `${ environment.urlApi }${ environment.api.typeIdentification.name }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
