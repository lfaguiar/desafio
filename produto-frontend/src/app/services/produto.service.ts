import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getRestService(path_api): Observable<any> {
    return this.http.get('http://localhost:9093/' + path_api)
    .map((res: Response) => res)  
  }
  
  postRestService(path_api, params): Observable<any> {
    var json = JSON.stringify({var1: 'teste', var2: 1000});
    var parametros = 'json=' + json;
    return this.http.post('http://localhost:9093', 
      parametros, httpOptions)
        .map(res=> res);
  }

  getRestServiceAuth(path_api): Observable<any> {
    return this.http.get('http://localhost:9093/' + path_api)
    .map((res: Response) => res)
  }
}