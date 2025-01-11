import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

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

  async getAllLista(data:any = null) {
    let params = new HttpParams();
    if(data.buscar != '') {
      params = params.set('buscar', data.buscar)
    };
    if(data.estado != '') {
      params = params.set('estado', data.estado)
    };
    if(data.servicio != '') {
      params = params.set('servicio', data.servicio)
    };
    if(data.motoNave != '') {
      params = params.set('motoNave', data.motoNave)
    };
    if(data.piloto != '') {
      params = params.set('piloto', data.piloto)
    };
    if(data.destino != '') {
      params = params.set('destino', data.destino)
    };
    if(data.lancha != '') {
      params = params.set('lancha', data.lancha)
    };
    if(data.fecha_salida != '') {
      params = params.set('fecha_salida', data.fecha_salida)
    };
    if(data.fecha_regreso != '') {
      params = params.set('fecha_regreso', data.fecha_regreso)
    };
    console.log(params.toString());
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ environment.api.boleta_servicio.service.lista }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async descargarPdf(id:number) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ id }/${ environment.api.boleta_servicio.service.pdf }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async update(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async updateFacturacion(id:number, data:any) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ id }/${ environment.api.boleta_servicio.service.facturacion }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }
}
