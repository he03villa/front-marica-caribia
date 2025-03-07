import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllServicios(data:any = null) {
    let params = new HttpParams();
    if(data.buscar != '') {
      params = params.set('buscar', data.buscar)
    };
    const url = `${ environment.urlApi }${ environment.api.servicios.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.servicios.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.servicios.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async getServicio(id:number) {
    const url = `${ environment.urlApi }${ environment.api.servicios.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
