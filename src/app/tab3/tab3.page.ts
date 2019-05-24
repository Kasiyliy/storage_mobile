import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '../models/services/services';
import {ServiceService} from '../services/services/service.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ToastService} from '../services/toast.service';
import {Employees} from '../models/appointments/employees';
import {Service} from '../models/appointments/services';
import * as moment from 'moment';
import {Appointments} from '../models/appointments/appointments';

@Component({
    selector: 'app-tab3',
    templateUrl: './tab3.page.html',
    styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

    services: Services[];
    employees: Employees[];
    service: Service;
    addAppointment: FormGroup;
    success = false;
    price = 0;

    constructor(private serviceService: ServiceService,
                private toastService: ToastService,
                private builder: FormBuilder,
                private http: HttpClient) {


        this.addAppointment = this.builder.group({
            email: ['', [Validators.required, Validators.email]],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
            employee_id: ['', Validators.required],
            service_id: ['', Validators.required],
            start_time: ['', Validators.required],
            finish_time: ['', Validators.required],
            comments: ['', Validators.required],
            date: ['', Validators.required],
        });

        this.serviceService.getAll().subscribe(perf => {
            this.services = perf;
        });
    }

    ngOnInit() {

    }

    add() {
        const appointment = new Appointments();
        appointment.email = this.addAppointment.get('email').value;
        appointment.first_name = this.addAppointment.get('first_name').value;
        appointment.last_name = this.addAppointment.get('last_name').value;
        appointment.phone = this.addAppointment.get('phone').value;
        appointment.employee_id = this.addAppointment.get('employee_id').value;
        appointment.service_id = this.addAppointment.get('service_id').value;
        appointment.start_time = this.addAppointment.get('start_time').value;
        appointment.finish_time = this.addAppointment.get('finish_time').value;
        appointment.comments = this.addAppointment.get('comments').value;

        this.http.post(environment.apiUrl + 'appointment/store', {appointment})
            .subscribe(perf => {
                this.toastService.presentInfoToast('Added');
                console.log(perf);
            }, err => {
                this.toastService.presentDarkToast('Error!');
            });
    }

    change() {

        const service_id = this.addAppointment.get('service_id').value;
        const date = this.addAppointment.get('date').value;

        if (service_id && date) {
            this.http.get<any>(environment.apiUrl + 'employees', {params: {service_id, date}})
                .subscribe(perf => {
                    this.employees = perf;
                    if (this.employees.length > 0) {
                        this.success = true;
                    } else {
                        this.success = false;
                    }

                    if (!this.success) {
                        this.toastService.presentDarkToast('Нет свободных обслуживающих в это время!');
                    }
                }, err => {
                    this.toastService.presentDarkToast('Ошибка!');
                    this.success = false;
                });
        }
    }

    change2() {
        const service_id = this.addAppointment.get('service_id').value;
        const start_time = moment(this.addAppointment.get('start_time').value, 'HH:mm');
        const finish_time = moment(this.addAppointment.get('finish_time').value, 'HH:mm');
        const difference = moment.duration(finish_time.diff(start_time));
        const hours = difference.asHours() * 60;


        if (service_id && start_time && finish_time) {
            this.http.get<any>(environment.apiUrl + 'service', {params: {service_id}})
                .subscribe(perf => {
                    this.service = perf;
                    this.price = hours * this.service.price / 60;
                });
        }
    }

}
