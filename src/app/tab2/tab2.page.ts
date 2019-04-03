import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../services/services/service.service';
import {Services} from '../models/services/services';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    services: Services[] = [];

    constructor(private serviceService: ServiceService) {

    }

    public getAll() {
        this.serviceService.getAll().subscribe(perf => {
            this.services = perf;
            console.log(this.services);
        }, err => {
            console.log(err);
        });
    }

    ngOnInit(): void {
        this.getAll();
    }


}
