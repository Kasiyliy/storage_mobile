import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {Tab3Page} from './tab3.page';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';

const routes: Routes = [
    {
        path: '',
        component: Tab3Page
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule
    ],
    declarations: [Tab3Page]
})
export class Tab3PageModule {
}
