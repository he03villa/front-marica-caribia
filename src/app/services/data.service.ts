import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  /**
   * Sends a GET request with the given URL.
   * @param url The URL of the request.
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  metodoGet(url:string) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.token.access_token}`);
    }
    return this._http.get(url, header);
  }

  /**
   * Sends a POST request with the given URL and body.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  metodoPost(url:string, body:any,) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.token.access_token}`);
    }
    return this._http.post(url, body, header);
  }

  /**
   * Sends a PUT request with the given URL and body.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  metodoPut(url:string, body:any) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.token.access_token}`);
    }
    return this._http.put(url, body, header);
  }

  /**
   * Sends a DELETE request with the given URL.
   * @param url The URL of the request.
   * @returns An Observable of the response.
   */
  metodoDelete(url:string) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.token.access_token}`);
    }
    return this._http.delete(url, header);
  }

  /**
   * Sends a PATCH request with the given URL.
   * @param url The URL of the request.
   * @returns An Observable of the response.
   */
  metodoPacth(url:string, body:any = undefined) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.token.access_token}`);
    }
    return this._http.patch(url, body, header);
  }
}
