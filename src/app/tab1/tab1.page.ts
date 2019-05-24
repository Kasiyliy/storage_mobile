import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {CommentService} from '../services/comment.service';
import {Comments} from '../models/comments';
import {ToastService} from '../services/toast.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../services/services/service.service';
import {HttpClient} from '@angular/common/http';
import {Appointments} from '../models/appointments/appointments';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    public url: string;
    loading = false;
    comments: Comments[] = [];
    addComment: FormGroup;

    constructor(
        private commentService: CommentService,
        private toastrService: ToastService,
        private builder: FormBuilder,
        private http: HttpClient
    ) {
        this.url = environment.url;
    }

    ngOnInit(): void {
        this.loading = true;
        this.commentService.getAll().subscribe(perf => {
            this.comments = perf;
            this.loading = false;
        }, err => {
            this.loading = false;
            this.toastrService.presentDarkToast('Ошибка!');
        });

        this.addComment = this.builder.group({
            name: ['', Validators.required],
            text: ['', Validators.required],
        });
    }




    add() {
        const comment = new Comments();
        comment.name = this.addComment.get('name').value;
        comment.text = this.addComment.get('text').value;
        this.http.post(environment.apiUrl + 'comments', {comment})
            .subscribe(perf => {
                this.toastrService.presentDangerToast('Коммент добавлен!');
            }, err => {
                this.toastrService.presentDangerToast('Ошибка!');
            });
    }
}
