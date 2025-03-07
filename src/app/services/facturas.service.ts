import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAll(data:any = null) {
    let params = new HttpParams();
    if(data.buscar != '') {
      params = params.set('buscar', data.buscar)
    };
    if(data.fecha_inicio != '') {
      params = params.set('fecha_inicio', data.fecha_inicio)
    };
    if(data.fecha_fin != '') {
      params = params.set('fecha_fin', data.fecha_fin)
    };
    const url = `${ environment.urlApi }${ environment.api.facturas.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async getFactura(id:number) {
    const url = `${ environment.urlApi }${ environment.api.facturas.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.facturas.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.facturas.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async delete(id:number) {
    const url = `${ environment.urlApi }${ environment.api.facturas.name }/${ id }`;
    return this._service.promise(this._data.metodoDelete(url));
  }
}
