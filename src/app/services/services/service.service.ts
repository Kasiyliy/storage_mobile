import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Services} from '../../models/services/services';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getAllOnlyVisible(): Observable<Services[]> {
        return this.http.get<Services[]>(this.apiUrl + 'services');
    }

    getAll(): Observable<Services[]> {
        return this.http.get<Services[]>(this.apiUrl + 'services/all');
    }
}
