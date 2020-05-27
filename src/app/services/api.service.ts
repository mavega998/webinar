import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(`${environment.url_api}/login`, user, this.headers());
  }

  //EVENTOS

  getEventos() {
    return this.http.get(`${environment.url_api}/eventos`, this.headers());
  }

  getEvento(id) {
    return this.http.get(`${environment.url_api}/eventos/${id}`, this.headers());
  }

  getRedirectEvent(url) {
    return this.http.get(`${environment.url_api}/eventos/redirect/${url}`, this.headers());
  }

  delEvento(id) {
    return this.http.delete(`${environment.url_api}/eventos/${id}`, this.headers());
  }

  putEvento(id, evento) {
    return this.http.put(`${environment.url_api}/eventos/${id}`, evento, this.headers());
  }

  postEvento(evento) {
    return this.http.post(`${environment.url_api}/eventos`, evento, this.headers());
  }

  //ENTIDADES

  getEntidades() {
    return this.http.get(`${environment.url_api}/entidades`, this.headers());
  }

  getEntidad(id) {
    return this.http.get(`${environment.url_api}/entidades/${id}`, this.headers());
  }

  delEntidad(id) {
    return this.http.delete(`${environment.url_api}/entidades/${id}`, this.headers());
  }

  putEntidad(id, entidad) {
    return this.http.put(`${environment.url_api}/entidades/${id}`, entidad, this.headers());
  }

  postEntidad(entidad) {
    return this.http.post(`${environment.url_api}/entidades`, entidad, this.headers());
  }

  //AREAS

  getAreas() {
    return this.http.get(`${environment.url_api}/areas`, this.headers());
  }

  getArea(id) {
    return this.http.get(`${environment.url_api}/areas/${id}`, this.headers());
  }

  delArea(id) {
    return this.http.delete(`${environment.url_api}/areas/${id}`, this.headers());
  }

  postArea(area) {
    return this.http.post(`${environment.url_api}/areas`, area, this.headers());
  }

  private headers() {
    const headers = new HttpHeaders();
    headers.append('Allow-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', undefined);
    const options = { headers, withCredentials: false };
    return options;
  }
}
