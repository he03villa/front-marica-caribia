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
    return this._http.get(url);
  }

  /**
   * Sends a POST request with the given URL and body.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  metodoPost(url:string, body:any,) {
    return this._http.post(url, body);
  }

  /**
   * Sends a PUT request with the given URL and body.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @returns An Observable of the response, with the response body as a JSON object.
   */
  metodoPut(url:string, body:any) {
    return this._http.put(url, body);
  }

  /**
   * Sends a DELETE request with the given URL.
   * @param url The URL of the request.
   * @returns An Observable of the response.
   */
  metodoDelete(url:string) {
    return this._http.delete(url);
  }
}
