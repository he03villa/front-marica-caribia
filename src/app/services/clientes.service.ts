import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllClients(data:any = null) {
    let params = new HttpParams();
    params = params.set('page', data.page);
    params = params.set('limite', data.limite);
    if(data.buscar != '') {
      params = params.set('buscar', data.buscar)
    };
    const url = `${ environment.urlApi }${ environment.api.clients.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.clients.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.clients.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async getClient(id:number) {
    const url = `${ environment.urlApi }${ environment.api.clients.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async delete(id:number) {
    const url = `${ environment.urlApi }${ environment.api.clients.name }/${ environment.api.clients.service.unlink }/${ id }`;
    return this._service.promise(this._data.metodoPacth(url));
  }
}
