import { Component } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public url: string;

  constructor() {
    this.url = environment.url;
  }

}
