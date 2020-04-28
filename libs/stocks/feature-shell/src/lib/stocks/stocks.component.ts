import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CustomDateValidator } from './stocks.validator';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  maxDate = new Date();
  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, [Validators.required, CustomDateValidator.fromToDateValidator]],
      toDate: [null, [Validators.required, CustomDateValidator.fromToDateValidator]]
    },
      { validator: CustomDateValidator.fromToDateValidator('fromDate', 'toDate') }
    );
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      const period = 'max';
      this.priceQuery.fetchQuote(symbol, period, fromDate, toDate);
    }
  }
}
