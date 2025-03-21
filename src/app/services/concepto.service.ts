import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllConceptos() {
    const url = `${ environment.urlApi }${ environment.api.conceptos.name }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.conceptos.name }`;;
    return this._service.promise(this._data.metodoPost(url, data));
  }
}
