import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlippyApp } from '../data/slippy_data/app';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  host: string;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.host = 'http://localhost:8000';
  }

  get<T>(url: string) {
    return this.http.get<T>(this.host + url, {
      headers: this.headers,
    });
  }
  post<T>(url: string, body: any) {
    return this.http.post<T>(this.host + url, body, {
      headers: this.headers,
    });
  }
}
