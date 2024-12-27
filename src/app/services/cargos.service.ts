import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllCargos(data:any = null) {
    let params = new HttpParams();
    if(data?.buscar != '') {
      params = params.set('buscar', data?.buscar)
    };
    const url = `${ environment.urlApi }${ environment.api.cargo.name }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
