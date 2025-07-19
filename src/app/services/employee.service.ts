import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  public saveFromScaner(data:any) {
    const url = `${ environment.urlApi }${ environment.api.empleados.service.scanFront }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }
  
  public saveBackScaner(data:any) {
    const url = `${ environment.urlApi }${ environment.api.empleados.service.scanBack }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }


}
