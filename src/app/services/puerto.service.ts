import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuertoService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getServicisos(id:number) {
    const url = `${ environment.urlApi }${ environment.api.puertos_or_destinos.name }/${ id }/${ environment.api.puertos_or_destinos.services.servicios }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async getServicisosAll(data:any = null) {
    let params = new HttpParams();
    if(data.buscar != '') {
      params = params.set('buscar', data.buscar)
    };
    const url = `${ environment.urlApi }${ environment.api.puertos_or_destinos.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async updateServicios(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.puertos_or_destinos.name }/${ id }/${ environment.api.puertos_or_destinos.services.servicios }`;;
    return this._service.promise(this._data.metodoPut(url, data));
  }
}
