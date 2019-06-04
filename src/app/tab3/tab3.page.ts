import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '../models/services/services';
import {ServiceService} from '../services/services/service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
            comments: ['', Validators.required],
            date: ['', Validators.required],
        });

        this.serviceService.getAllOnlyVisible().subscribe(perf => {
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
        appointment.starting_hour = (<string>this.addAppointment.get('start_time').value).split(':')[0];
        appointment.finish_hour = (parseInt(appointment.starting_hour, 10) + 1) + '';
        appointment.starting_minute = '00';
        appointment.finish_minute = '00';
        appointment.date = this.addAppointment.get('date').value;
        appointment.comments = this.addAppointment.get('comments').value;

        this.http.get<any>(environment.apiUrl + 'appointment/store', {
            params:
                {
                    email: appointment.email,
                    first_name: appointment.first_name,
                    last_name: appointment.last_name,
                    phone: appointment.phone,
                    employee_id: appointment.employee_id,
                    service_id: appointment.service_id,
                    date: appointment.date,
                    comments: appointment.comments,
                    starting_hour: appointment.starting_hour,
                    starting_minute: appointment.starting_minute,
                    finish_hour: appointment.finish_hour,
                    finish_minute: appointment.finish_minute,
                }
        })
            .subscribe(perf => {
                if (perf.success === true) {
                    this.addAppointment.reset();
                    this.toastService.presentInfoToast('Добавлено!');
                } else {
                    this.toastService.presentWarningToast('Выберите другое время!');
                }
                console.log(perf);
            }, err => {
                this.toastService.presentDarkToast('Ошибка!!');
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

        const starting_hour = (<string>this.addAppointment.get('start_time').value).split(':')[0];
        const finish_hour = (parseInt(starting_hour, 10) + 1) + '';
        const finishing_minute = '00';

        const first_name = this.addAppointment.get('first_name').value;
        const last_name = this.addAppointment.get('last_name').value;
        const phone = this.addAppointment.get('phone').value;
        const email = this.addAppointment.get('email').value;
        const comments = this.addAppointment.get('comments').value;
        const service_id = this.addAppointment.get('service_id').value;
        const start_time = moment(this.addAppointment.get('start_time').value, 'HH:mm');
        const finish_time = moment(finish_hour + ':' + finishing_minute, 'HH:mm');
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        if (service_id && start_time && finish_time) {
            this.http.get<any>(environment.apiUrl + 'service', {
                headers: headers, params: {
                    service_id: service_id + '',
                    phone: phone + '',
                    email: email + '',
                    comments: comments + '',
                    start_time: start_time + '',
                    finish_time: finish_time + '',
                    first_name: first_name + '',
                    last_name: last_name + '',
                }
            })
                .subscribe(perf => {
                    this.service = perf;
                    this.price = this.service.price;
                });
        }
    }

}
