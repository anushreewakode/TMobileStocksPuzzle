import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { stockConstants } from './stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  private stockPickerFormSubscription:Subscription;
  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = stockConstants.timePeriodsData;;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerFormSubscription = this.stockPickerForm.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.fetchQuote();
    });
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy() {
    if(this.stockPickerFormSubscription) { 
      this.stockPickerFormSubscription.unsubscribe()
    }
}
}
