import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Services} from '../models/services/services';
import {Comments} from '../models/comments';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Comments[]> {
        return this.http.get<Comments[]>(this.apiUrl + 'comments');
    }


    save(comment: Comments) {
        return this.http.post(this.apiUrl + 'comments', comment);
    }
}
