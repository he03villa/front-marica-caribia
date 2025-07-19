import { inject, Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAll() {
    const url = `${ environment.urlApi }${ environment.api.user.name }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.user.name }/${ environment.api.user.service.save }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async login(data:any) {
    const url = `${ environment.urlApi }${ environment.api.login }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async register(data:any) {
    const url = `${ environment.urlApi }${ environment.api.register }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }
}
