import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
        // return this.http.post(this.apiUrl + 'comments/store', comment);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.apiUrl + 'comments/store', {
            headers: headers, params: {
                name: comment.name,
                text: comment.text
            }
        });
    }
}
