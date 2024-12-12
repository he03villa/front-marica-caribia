import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaServicioService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllSelectCrear() {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async getAllLista() {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ environment.api.boleta_servicio.service.lista }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async descargarPdf(id:number) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ id }/${ environment.api.boleta_servicio.service.pdf }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
