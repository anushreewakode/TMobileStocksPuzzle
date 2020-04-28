import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { chartConstants } from './chart.constants';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;
  private chartSubscription:Subscription;
  
  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  
  ngOnInit() {
    this.chart = chartConstants.chartData;
    if (this.data$)
    this.chartSubscription = this.data$.subscribe(newData => (this.chartData = newData));
  }

  ngOnDestroy() {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe()
    }
  } 
}
