import { Component } from '@angular/core';
import { appConstants } from './app.constants';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = appConstants.stocksTitle;
}

